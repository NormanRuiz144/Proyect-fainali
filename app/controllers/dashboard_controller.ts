import Reporte from '#models/reporte'
import Problematica from '#models/problematica'
import Institucione from '#models/institucione'
import Sectores from '#models/sectores'
import DetalleReportes from '#models/detalleReporte'
import Usuario from '#models/user'
import Roles from '#models/roles'
import BannedUser from '#models/banned_user'
import { DateTime } from 'luxon'
import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  async showData({ auth, request, response }: HttpContext) {
    // esto controla la obtención de métricas y gráficos del panel de control
    
    const userLogged = await auth.authenticate()
    await userLogged.load((preloader) => {
      preloader.load('Institucion')
      preloader.load('rol')
    })
    
    let idInstitucion: number | null = null
    
    // Si el usuario es Super Admin (Rol: 'Super-Admin'), permitimos filtrar por parámetro de URL
    if (userLogged.rol?.rol === 'Super-Admin') {
      const queryId = request.input('institucionId')
      idInstitucion = queryId !== undefined ? (queryId === '0' || queryId === '' ? null : Number(queryId)) : null // null significa "Todas las Instituciones"
    } else {
      // Si es un admin normal, lo obligamos a ver solo su propia institución
      idInstitucion = userLogged.idInstitucion
      if (!idInstitucion) {
        return response.status(403).json({ error: 'Usuario sin institución asignada o permisos insuficientes' })
      }
    }

    const today = DateTime.now()

    // consulta de reportes condicional según la institución seleccionada
    const reporteQuery = Reporte.query()
      .select('estado', 'nvl_prioridad', 'fecha_gen', 'fecha_fin', 'id_problematica', 'id_sector')
      .orderBy('id', 'desc')

    if (idInstitucion !== null) {
      reporteQuery.where('id_institucion', idInstitucion)
    }

    const [reportes, institucion] = await Promise.all([
      reporteQuery,
      idInstitucion !== null ? Institucione.find(idInstitucion) : null,
    ])

    const reportesAll = reportes
    const totalReportes = reportesAll.length
    
    // Definir variables para KPIs
    let reportesActivos = 0
    let reportesFinalizados = 0
    let alertasAltaPrioridad = 0
    let totalDiasRespuesta = 0

    // Llenar KPIs calculados en caliente
    for (const reporte of reportesAll) {
      const estado = reporte.estado
      const prioridad = reporte.nvlPrioridad

      if (estado === 'Pendiente' || estado === 'En Proceso') {
        reportesActivos++
      }
      if (estado === 'Finalizado') {
        reportesFinalizados++
      }
      if (prioridad === 10) {
        alertasAltaPrioridad++
      }

      const fechaGenL = reporte.fechaGen as DateTime
      const fechaFinL = (reporte.fechaFin || today) as DateTime
      const dias = fechaFinL.diff(fechaGenL, 'days').days
      totalDiasRespuesta += dias
    }

    const indiceResolucion =
      totalReportes > 0 ? Math.round((reportesFinalizados / totalReportes) * 100 * 10) / 10 : 0
    const tiempoPromedio =
      totalReportes > 0 ? Math.round((totalDiasRespuesta / totalReportes) * 10) / 10 : 0

    const problemCounts = new Map<number, number>()
    for (const r of reportesAll) {
      const idProblematica = r.idProblematica
      if (idProblematica) {
        problemCounts.set(idProblematica, (problemCounts.get(idProblematica) || 0) + 1)
      }
    }

    const problemas = await Problematica.query()
      .select('id', 'problema')
      .whereIn('id', Array.from(problemCounts.keys()))

    const porProblema = problemas
      .map((p) => ({
        problema: p.problema,
        total: problemCounts.get(p.id) || 0,
      }))
      .sort((a, b) => b.total - a.total)

    const sectorCounts = new Map<number, number>()
    for (const r of reportesAll) {
      const idSector = r.idSector
      if (idSector) {
        sectorCounts.set(idSector, (sectorCounts.get(idSector) || 0) + 1)
      }
    }

    let porSector: { sector: string; total: number }[] = []
    if (sectorCounts.size > 0) {
      const sectores = await Sectores.query()
        .select('id', 'nombre_sector')
        .whereIn('id', Array.from(sectorCounts.keys()))

      porSector = sectores
        .map((s) => ({
          sector: s.nombreSector,
          total: sectorCounts.get(s.id) || 0,
        }))
        .sort((a, b) => b.total - a.total)
    }

    // consulta de últimos seguimientos con filtro condicional
    const segQuery = DetalleReportes.query()
      .select(
        'detallereportes.descripcion as descripcion',
        'detallereportes.fecha_seguimiento as fechaSeg'
      )
      .join('reportes', 'detallereportes.id_reporte', 'reportes.id')
      .join('usuarios', 'detallereportes.id_usuario', 'usuarios.id')
      .orderBy('detallereportes.fecha_seguimiento', 'desc')
      .limit(10)

    if (idInstitucion !== null) {
      segQuery.where('reportes.id_institucion', idInstitucion)
    }

    const ultimoSeguimiento = await segQuery

    const seguimiento = ultimoSeguimiento.map((dr: any) => ({
      descripcion: dr.descripcion,
      fecha: dr.fechaSeg ? DateTime.fromJSDate(dr.fechaSeg).toISO() : null,
    }))

    return response.json({
      kpis: {
        reportesActivos,
        indiceResolucion,
        tiempoPromedioDias: tiempoPromedio,
        alertasAltaPrioridad,
      },
      porProblema,
      porSector,
      institucion: {
        nombre: institucion ? (institucion as any).nombreInstitucion : 'Todas las Instituciones',
        cargaTrabajo: totalReportes,
      },
      seguimiento,
    })
  }

  async showSuperAdminData({ response }: HttpContext) {
    const today = DateTime.now().startOf('day')
    const oldPendingLimit = today.minus({ days: 7 })
    const expiringLimit = today.plus({ days: 7 })

    const [reportes, instituciones, usuarios, roles, baneosActivos] = await Promise.all([
      Reporte.query()
        .select(
          'id',
          'estado',
          'nvl_prioridad',
          'fecha_gen',
          'fecha_fin',
          'id_institucion',
          'id_problematica',
          'id_sector'
        )
        .orderBy('fecha_gen', 'desc'),
      Institucione.query().select('id', 'nombre_institucion', 'is_deleted'),
      Usuario.query().select('id', 'nombres', 'apellidos', 'id_rol', 'id_institucion'),
      Roles.query().select('id', 'rol'),
      BannedUser.query()
        .where('activo', true)
        .preload('user', (query) => {
          query.select('id', 'nombres', 'apellidos')
        }),
    ])

    const totalReportes = reportes.length
    let reportesActivos = 0
    let reportesFinalizados = 0
    let alertasAltaPrioridad = 0
    let totalDiasResolucion = 0
    const porEstado = new Map<string, number>([
      ['Pendiente', 0],
      ['En Proceso', 0],
      ['Finalizado', 0],
    ])
    const porInstitucion = new Map<number, {
      total: number
      activos: number
      finalizados: number
      diasRespuesta: number
    }>()
    const porProblematica = new Map<number, number>()
    const porSector = new Map<number, number>()
    const tendencia = new Map<string, number>()
    const reportesPendientesAntiguos: any[] = []
    const reportesAltaPrioridad: any[] = []

    for (let i = 6; i >= 0; i--) {
      tendencia.set(today.minus({ days: i }).toISODate()!, 0)
    }

    for (const reporte of reportes) {
      const estado = reporte.estado || 'Sin estado'
      const fechaGen = reporte.fechaGen as DateTime
      const fechaFin = (reporte.fechaFin || today) as DateTime
      const dias = Math.max(0, fechaFin.diff(fechaGen, 'days').days)

      porEstado.set(estado, (porEstado.get(estado) || 0) + 1)

      if (estado === 'Pendiente' || estado === 'En Proceso') {
        reportesActivos++
      }
      if (estado === 'Finalizado') {
        reportesFinalizados++
      }
      if (reporte.nvlPrioridad === 10) {
        alertasAltaPrioridad++
        reportesAltaPrioridad.push({
          id: reporte.id,
          estado,
          fecha: fechaGen.toISO(),
          prioridad: reporte.nvlPrioridad,
        })
      }
      if (estado === 'Pendiente' && fechaGen < oldPendingLimit) {
        reportesPendientesAntiguos.push({
          id: reporte.id,
          estado,
          fecha: fechaGen.toISO(),
          diasPendiente: Math.floor(today.diff(fechaGen.startOf('day'), 'days').days),
        })
      }

      totalDiasResolucion += dias

      if (reporte.idInstitucion) {
        const actual = porInstitucion.get(reporte.idInstitucion) || {
          total: 0,
          activos: 0,
          finalizados: 0,
          diasRespuesta: 0,
        }
        actual.total++
        actual.diasRespuesta += dias
        if (estado === 'Pendiente' || estado === 'En Proceso') actual.activos++
        if (estado === 'Finalizado') actual.finalizados++
        porInstitucion.set(reporte.idInstitucion, actual)
      }

      if (reporte.idProblematica) {
        porProblematica.set(reporte.idProblematica, (porProblematica.get(reporte.idProblematica) || 0) + 1)
      }

      if (reporte.idSector) {
        porSector.set(reporte.idSector, (porSector.get(reporte.idSector) || 0) + 1)
      }

      const fechaKey = fechaGen.toISODate()
      if (fechaKey && tendencia.has(fechaKey)) {
        tendencia.set(fechaKey, (tendencia.get(fechaKey) || 0) + 1)
      }
    }

    const indiceResolucion =
      totalReportes > 0 ? Math.round((reportesFinalizados / totalReportes) * 1000) / 10 : 0
    const tiempoPromedioDias =
      totalReportes > 0 ? Math.round((totalDiasResolucion / totalReportes) * 10) / 10 : 0

    const adminRole = roles.find((rol) => rol.rol === 'Admin')
    const ciudadanosRole = roles.find((rol) => rol.rol === 'default')
    const usuariosPorRol = roles.map((rol) => ({
      rol: rol.rol,
      total: usuarios.filter((usuario) => usuario.idRol === rol.id).length,
    }))

    const institucionesSinAdmin = instituciones
      .filter((institucion) => !institucion.isDeleted)
      .filter((institucion) => {
        return !usuarios.some(
          (usuario) => usuario.idInstitucion === institucion.id && usuario.idRol === adminRole?.id
        )
      })
      .map((institucion) => ({
        id: institucion.id,
        nombre: institucion.nombreInstitucion,
      }))

    const institucionesRanking = instituciones
      .filter((institucion) => !institucion.isDeleted)
      .map((institucion) => {
        const resumen = porInstitucion.get(institucion.id) || {
          total: 0,
          activos: 0,
          finalizados: 0,
          diasRespuesta: 0,
        }
        return {
          id: institucion.id,
          nombre: institucion.nombreInstitucion,
          totalReportes: resumen.total,
          reportesActivos: resumen.activos,
          indiceResolucion:
            resumen.total > 0 ? Math.round((resumen.finalizados / resumen.total) * 1000) / 10 : 0,
          tiempoPromedioDias:
            resumen.total > 0 ? Math.round((resumen.diasRespuesta / resumen.total) * 10) / 10 : 0,
        }
      })
      .sort((a, b) => b.totalReportes - a.totalReportes)
      .slice(0, 8)

    const problematicas = porProblematica.size
      ? await Problematica.query().select('id', 'problema').whereIn('id', Array.from(porProblematica.keys()))
      : []
    const problemasFrecuentes = problematicas
      .map((problematica) => ({
        problema: problematica.problema || 'Sin nombre',
        total: porProblematica.get(problematica.id) || 0,
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 8)

    const sectores = porSector.size
      ? await Sectores.query()
          .select('id', 'nombre_sector', 'id_municipios')
          .whereIn('id', Array.from(porSector.keys()))
          .preload('municipio')
      : []
    const zonasActivas = sectores
      .map((sector) => ({
        sector: sector.nombreSector,
        municipio: sector.municipio?.nomMunicipio || 'Sin municipio',
        total: porSector.get(sector.id) || 0,
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 8)

    const baneosTemporales = baneosActivos.filter((ban) => ban.tipoBan === 'TEMPORAL')
    const baneosPermanentes = baneosActivos.filter((ban) => ban.tipoBan === 'PERMANENTE')
    const baneosPorVencer = baneosTemporales
      .filter((ban) => {
        if (!ban.fechaFin) return false
        const fechaFin = ban.fechaFin as DateTime
        return fechaFin >= today && fechaFin <= expiringLimit
      })
      .map((ban) => ({
        userId: ban.userId,
        nombre: ban.user ? `${ban.user.nombres} ${ban.user.apellidos}` : 'Usuario',
        fechaFin: ban.fechaFin?.toISODate() || null,
        diasRestantes: ban.fechaFin
          ? Math.max(0, Math.ceil((ban.fechaFin as DateTime).diff(today, 'days').days))
          : null,
      }))

    const seguimientos = await DetalleReportes.query()
      .select('descripcion', 'fecha_seguimiento')
      .orderBy('fecha_seguimiento', 'desc')
      .limit(5)

    const actividadReciente = [
      ...reportes.slice(0, 5).map((reporte) => ({
        tipo: 'reporte',
        descripcion: `Reporte #${reporte.id} creado (${reporte.estado || 'Sin estado'})`,
        fecha: (reporte.fechaGen as DateTime).toISO(),
      })),
      ...seguimientos.map((seguimiento: any) => ({
        tipo: 'seguimiento',
        descripcion: seguimiento.descripcion,
        fecha: seguimiento.fechaSeguimiento ? seguimiento.fechaSeguimiento.toISO() : null,
      })),
      ...baneosActivos.slice(0, 5).map((ban) => ({
        tipo: 'baneo',
        descripcion: `Usuario suspendido: ${ban.user ? `${ban.user.nombres} ${ban.user.apellidos}` : `#${ban.userId}`}`,
        fecha: ban.fechaInicio ? (ban.fechaInicio as DateTime).toISO() : null,
      })),
    ]
      .filter((actividad) => actividad.fecha)
      .sort((a, b) => new Date(b.fecha!).getTime() - new Date(a.fecha!).getTime())
      .slice(0, 10)

    return response.ok({
      kpis: {
        totalReportes,
        reportesActivos,
        reportesFinalizados,
        indiceResolucion,
        tiempoPromedioDias,
        alertasAltaPrioridad,
        baneosActivos: baneosActivos.length,
      },
      instituciones: {
        total: instituciones.filter((institucion) => !institucion.isDeleted).length,
        ranking: institucionesRanking,
        sinAdmin: institucionesSinAdmin,
      },
      reportes: {
        porEstado: Array.from(porEstado.entries()).map(([estado, total]) => ({ estado, total })),
        tendencia: Array.from(tendencia.entries()).map(([fecha, total]) => ({ fecha, total })),
      },
      problemasFrecuentes,
      zonasActivas,
      usuariosModeracion: {
        totalUsuarios: usuarios.length,
        ciudadanos: ciudadanosRole
          ? usuarios.filter((usuario) => usuario.idRol === ciudadanosRole.id).length
          : 0,
        admins: adminRole ? usuarios.filter((usuario) => usuario.idRol === adminRole.id).length : 0,
        porRol: usuariosPorRol,
        baneos: {
          activos: baneosActivos.length,
          temporales: baneosTemporales.length,
          permanentes: baneosPermanentes.length,
          porVencer: baneosPorVencer,
        },
      },
      alertas: {
        reportesAltaPrioridad: reportesAltaPrioridad.slice(0, 6),
        reportesPendientesAntiguos: reportesPendientesAntiguos.slice(0, 6),
        institucionesSinAdmin: institucionesSinAdmin.slice(0, 6),
        baneosPorVencer: baneosPorVencer.slice(0, 6),
      },
      actividadReciente,
    })
  }
}
