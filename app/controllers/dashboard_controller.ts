import Reporte from '#models/reporte'
import Problematica from '#models/problematica'
import Institucione from '#models/institucione'
import Sectores from '#models/sectores'
import DetalleReportes from '#models/detalleReporte'
import { DateTime } from 'luxon'
import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  async showData({ auth, response }: HttpContext) {
    const userLogged = await auth.authenticate()
    await userLogged.load((preloader) => {
      preloader.load('Institucion')
      preloader.load('rol')
    })

    const idInstitucion = userLogged.idInstitucion

    if (!idInstitucion) {
      return response.status(403).json({ error: 'Usuario sin institución asignada' })
    }

    const today = DateTime.now()

    const [reportes, institucion] = await Promise.all([
      Reporte.query()
        .where('id_institucion', idInstitucion)
        .select('estado', 'nvl_prioridad', 'fecha_gen', 'fecha_fin', 'id_problematica', 'id_sector')
        .orderBy('id', 'desc'),
      Institucione.find(idInstitucion),
    ])

    const reportesAll = reportes
    const totalReportes = reportesAll.length
    // Definir variables para KPIs
    let reportesActivos = 0
    let reportesFinalizados = 0
    let alertasAltaPrioridad = 0
    let totalDiasRespuesta = 0

    // Llenar KPIs
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
    // Obtener los últimos 10 seguimientos
    const ultimoSeguimiento = await DetalleReportes.query()
      .select(
        'detallereportes.descripcion as descripcion',
        'detallereportes.fecha_seguimiento as fechaSeg'
      )
      .join('reportes', 'detallereportes.id_reporte', 'reportes.id')
      .join('usuarios', 'detallereportes.id_usuario', 'usuarios.id')
      .where('reportes.id_institucion', idInstitucion)
      .orderBy('detallereportes.fecha_seguimiento', 'desc')
      .limit(10)

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
        nombre: (institucion as any)?.nombreInstitucion || 'Institución',
        cargaTrabajo: totalReportes,
      },
      seguimiento,
    })
  }
}
