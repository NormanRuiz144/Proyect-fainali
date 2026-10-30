import type { HttpContext } from '@adonisjs/core/http'
import Sectores from '#models/sectores'
import { ingresarSector } from '#validators/sector'

export default class SectoresController {
  async obtenerSectores({ request, response }: HttpContext) {
    const requestedPage = request.input('page')
    if (requestedPage === undefined) {
      const sectores = await Sectores.query().where('is_deleted', false).orderBy('nom_sector')
      return response.ok({ lista_Sectores: sectores })
    }

    const page = Number(requestedPage)
    if (!Number.isInteger(page) || page < 1) {
      return response.badRequest({ mensaje: 'El parámetro page debe ser un entero positivo.' })
    }

    const sectores = await Sectores.query()
      .where('is_deleted', false)
      .orderBy('nom_sector')
      .paginate(page, 10)
    return response.ok({ lista_Sectores: sectores })
  }

  async obtenerSectorId({ params, response }: HttpContext) {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ mensaje: 'ID de sector inválido.' })
    }

    const sector = await Sectores.find(id)
    if (!sector || sector.isDeleted) {
      return response.notFound({ mensaje: 'Sector no encontrado.' })
    }

    return response.ok({ mensaje: 'Sector encontrado.', sector })
  }

  async sectoresPorMunicipio({ response }: HttpContext) {
    return response.gone({ mensaje: 'Los sectores ya no se relacionan con municipios.' })
  }

  async crearSector({ request, response }: HttpContext) {
    const { nomSector } = await request.validateUsing(ingresarSector)
    const existing = await Sectores.query().where('nom_sector', nomSector).first()
    if (existing) {
      return response.conflict({ mensaje: `Ya existe un sector con el nombre: ${nomSector}.` })
    }

    const sector = await Sectores.create({ nomSector })
    return response.created({ mensaje: 'Sector creado correctamente.', sector })
  }

  async actualizarSector({ params, request, response }: HttpContext) {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ mensaje: 'ID de sector inválido.' })
    }

    const sector = await Sectores.find(id)
    if (!sector) {
      return response.notFound({ mensaje: 'Sector no encontrado.' })
    }

    const { nomSector } = await request.validateUsing(ingresarSector)
    const duplicate = await Sectores.query()
      .where('nom_sector', nomSector)
      .whereNot('id', id)
      .first()
    if (duplicate) {
      return response.conflict({ mensaje: `Ya existe un sector con el nombre: ${nomSector}.` })
    }

    sector.nomSector = nomSector
    await sector.save()
    return response.ok({ mensaje: 'Sector actualizado correctamente.', sector })
  }

  async eliminarSector({ params, response }: HttpContext) {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ mensaje: 'ID de sector inválido.' })
    }

    const sector = await Sectores.find(id)
    if (!sector || sector.isDeleted) {
      return response.notFound({ mensaje: 'Sector no encontrado o ya eliminado.' })
    }

    sector.isDeleted = true
    await sector.save()
    return response.ok({ mensaje: 'Sector eliminado correctamente.' })
  }

  async restaurarSector({ params, response }: HttpContext) {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ mensaje: 'ID de sector inválido.' })
    }

    const sector = await Sectores.find(id)
    if (!sector || !sector.isDeleted) {
      return response.notFound({ mensaje: 'Sector no encontrado o ya activo.' })
    }

    sector.isDeleted = false
    await sector.save()
    return response.ok({ mensaje: 'Sector restaurado correctamente.' })
  }
}
