import type { HttpContext } from '@adonisjs/core/http'
import BannedUser from '#models/banned_user'
import DetalleIncidencia from '#models/detalle_incidencia'
import Incidencia from '#models/incidencia'
import Operador from '#models/operador'
import Problematica from '#models/problematica'
import Sectores from '#models/sectores'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

export default class DashboardController {
  private async assertOperador(ctx: HttpContext) {
    const user = ctx.auth.getUserOrFail()
    const operador = await Operador.query().where('id_usuario', user.id).first()

    if (!operador) {
      return null
    }

    return operador
  }

  private async buildDashboard(request: HttpContext['request']) {
    const today = DateTime.now().startOf('day')
    const oldPendingLimit = today.minus({ days: 7 })
    const expiringLimit = today.plus({ days: 7 })
    const { sectorId, problematicaId, fechaDesde, fechaHasta } = request.qs()

    const incidenciasQuery = Incidencia.query()
      .select(
        'id',
        'estado',
        'nvl_prioridad',
        'fecha_gen',
        'fecha_fin',
        'id_problematica',
        'id_sector'
      )
      .orderBy('fecha_gen', 'desc')

    const idSector = Number(sectorId)
    if (sectorId && Number.isInteger(idSector) && idSector > 0) {
      incidenciasQuery.where('id_sector', idSector)
    }

    const idProblematica = Number(problematicaId)
    if (problematicaId && Number.isInteger(idProblematica) && idProblematica > 0) {
      incidenciasQuery.where('id_problematica', idProblematica)
    }

    const desde = fechaDesde ? DateTime.fromISO(fechaDesde) : null
    if (desde?.isValid) incidenciasQuery.where('fecha_gen', '>=', desde.startOf('day').toSQL()!)

    const hasta = fechaHasta ? DateTime.fromISO(fechaHasta) : null
    if (hasta?.isValid) incidenciasQuery.where('fecha_gen', '<=', hasta.endOf('day').toSQL()!)

    const incidencias = await incidenciasQuery
    const porEstado = new Map<string, number>()
    const porProblematica = new Map<number, number>()
    const porSector = new Map<number, number>()
    const tendencia = new Map<string, number>()
    const incidenciasPendientesAntiguas: {
      id: number
      fecha: string | null
      diasPendiente: number
    }[] = []
    const incidenciasAltaPrioridad: {
      id: number
      estado: string
      fecha: string | null
      prioridad: number
    }[] = []

    for (let offset = 6; offset >= 0; offset--) {
      tendencia.set(today.minus({ days: offset }).toISODate()!, 0)
    }

    let activas = 0
    let finalizadas = 0
    let totalDiasResolucion = 0

    for (const incidencia of incidencias) {
      const estado = incidencia.estado || 'Sin estado'
      const estadoNormalizado = estado.toLowerCase()
      const fechaGen = incidencia.fechaGen
      const fechaFin = incidencia.fechaFin || today
      const dias = Math.max(0, fechaFin.diff(fechaGen, 'days').days)

      porEstado.set(estado, (porEstado.get(estado) || 0) + 1)
      totalDiasResolucion += dias

      if (estadoNormalizado === 'pendiente' || estadoNormalizado === 'en proceso') activas++
      if (estadoNormalizado === 'finalizado' || estadoNormalizado === 'finalizada') finalizadas++

      const estaResuelta = estadoNormalizado === 'finalizado' || estadoNormalizado === 'finalizada' || estadoNormalizado === 'resuelto' || estadoNormalizado === 'resuelta'
      if ((incidencia.nvlPrioridad || 0) >= 4 && !estaResuelta) {
        incidenciasAltaPrioridad.push({
          id: incidencia.id,
          estado,
          fecha: fechaGen.toISO(),
          prioridad: incidencia.nvlPrioridad || 0,
        })
      }

      if (estadoNormalizado === 'pendiente' && fechaGen < oldPendingLimit) {
        incidenciasPendientesAntiguas.push({
          id: incidencia.id,
          fecha: fechaGen.toISO(),
          diasPendiente: Math.floor(today.diff(fechaGen.startOf('day'), 'days').days),
        })
      }

      porProblematica.set(
        incidencia.idProblematica,
        (porProblematica.get(incidencia.idProblematica) || 0) + 1
      )
      if (incidencia.idSector) {
        porSector.set(incidencia.idSector, (porSector.get(incidencia.idSector) || 0) + 1)
      }

      const dateKey = fechaGen.toISODate()
      if (dateKey && tendencia.has(dateKey)) {
        tendencia.set(dateKey, (tendencia.get(dateKey) || 0) + 1)
      }
    }

    const [problematicas, sectores, baneosActivos, seguimientos, operadores, permisosAsignados] =
      await Promise.all([
        porProblematica.size
          ? Problematica.query()
              .select('id', 'problematica')
              .whereIn('id', [...porProblematica.keys()])
          : [],
        porSector.size
          ? Sectores.query()
              .select('id', 'nom_sector')
              .whereIn('id', [...porSector.keys()])
          : [],
        BannedUser.query()
          .where('activo', true)
          .preload('usuario', (query) => query.select('id', 'nombres', 'apellidos')),
        DetalleIncidencia.query()
          .preload('incidencia')
          .preload('operador', (query) => {
            query.preload('usuario', (userQuery) => userQuery.select('id', 'nombres', 'apellidos'))
          })
          .orderBy('fecha_seguimiento', 'desc')
          .limit(5),
        Operador.query().preload('usuario', (query) =>
          query.select('id', 'nombres', 'apellidos', 'correo')
        ),
        db.from('operador_permiso').count('* as total'),
      ])

    const problemasFrecuentes = problematicas
      .map((problematica) => ({
        problema: problematica.problematica || 'Sin nombre',
        total: porProblematica.get(problematica.id) || 0,
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 8)

    const zonasActivas = sectores
      .map((sector) => ({
        sector: sector.nomSector,
        total: porSector.get(sector.id) || 0,
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 8)

    const baneosPorVencer = baneosActivos
      .filter((ban) => {
        if (ban.tipoBan !== 'TEMPORAL' || !ban.fechaFin) return false
        return ban.fechaFin >= today && ban.fechaFin <= expiringLimit
      })
      .map((ban) => ({
        userId: ban.idUsuario,
        nombre: ban.usuario ? `${ban.usuario.nombres} ${ban.usuario.apellidos}` : 'Usuario',
        fechaFin: ban.fechaFin?.toISODate() || null,
        diasRestantes: ban.fechaFin
          ? Math.max(0, Math.ceil(ban.fechaFin.diff(today, 'days').days))
          : null,
      }))

    const actividadReciente = [
      ...incidencias.slice(0, 5).map((incidencia) => ({
        tipo: 'incidencia',
        descripcion: `Incidencia #${incidencia.id} creada (${incidencia.estado || 'Sin estado'})`,
        fecha: incidencia.fechaGen.toISO(),
      })),
      ...seguimientos.map((seguimiento) => ({
        tipo: 'seguimiento',
        descripcion: seguimiento.descripcion,
        fecha: seguimiento.fechaSeguimiento?.toISO() || null,
      })),
      ...baneosActivos.slice(0, 5).map((ban) => ({
        tipo: 'baneo',
        descripcion: `Usuario suspendido: ${ban.usuario ? `${ban.usuario.nombres} ${ban.usuario.apellidos}` : `#${ban.idUsuario}`}`,
        fecha: ban.fechaInicio?.toISO() || null,
      })),
    ]
      .filter((actividad) => actividad.fecha)
      .sort((a, b) => new Date(b.fecha!).getTime() - new Date(a.fecha!).getTime())
      .slice(0, 10)

    const totalIncidencias = incidencias.length
    return {
      kpis: {
        totalIncidencias,
        incidenciasActivas: activas,
        incidenciasFinalizadas: finalizadas,
        indiceResolucion:
          totalIncidencias > 0 ? Math.round((finalizadas / totalIncidencias) * 1000) / 10 : 0,
        tiempoPromedioDias:
          totalIncidencias > 0 ? Math.round((totalDiasResolucion / totalIncidencias) * 10) / 10 : 0,
        alertasAltaPrioridad: incidenciasAltaPrioridad.length,
        baneosActivos: baneosActivos.length,
      },
      incidencias: {
        porEstado: [...porEstado.entries()].map(([estado, total]) => ({ estado, total })),
        tendencia: [...tendencia.entries()].map(([fecha, total]) => ({ fecha, total })),
      },
      problemasFrecuentes,
      zonasActivas,
      operadores: {
        total: operadores.length,
        permisosAsignados: Number(permisosAsignados[0].total),
        lista: operadores,
      },
      alertas: {
        incidenciasAltaPrioridad: incidenciasAltaPrioridad.slice(0, 6),
        incidenciasPendientesAntiguas: incidenciasPendientesAntiguas.slice(0, 6),
        baneosPorVencer: baneosPorVencer.slice(0, 6),
      },
      actividadReciente,
      seguimientosRecientes: seguimientos,
    }
  }

  async showData(ctx: HttpContext) {
    if (!(await this.assertOperador(ctx))) {
      return ctx.response.forbidden({ mensaje: 'Este dashboard es exclusivo para operadores.' })
    }

    return ctx.response.ok(await this.buildDashboard(ctx.request))
  }

  async showSuperAdminData(ctx: HttpContext) {
    return this.showData(ctx)
  }
}
