import type { HttpContext } from '@adonisjs/core/http'
import Municipio from '#models/municipio'
import Sectores from '#models/sectores'
import { ingresarSector } from '#validators/sector'

export default class SectoresController {
  async obtenerSectores({ request, response }: HttpContext) {
    const requestedPage = request.input('page')
    const requestedMunicipio = request.input('idMunicipio')
    const idMunicipio = requestedMunicipio === undefined ? undefined : Number(requestedMunicipio)

    if (idMunicipio !== undefined && (!Number.isInteger(idMunicipio) || idMunicipio < 1)) {
      return response.badRequest({ mensaje: 'El parámetro idMunicipio debe ser un entero positivo.' })
    }

    if (requestedPage === undefined) {
      const sectoresQuery = Sectores.query()
        .where('is_deleted', false)
        .preload('municipio')
        .orderBy('nom_sector')
      if (idMunicipio !== undefined) sectoresQuery.where('id_municipio', idMunicipio)
      const sectores = await sectoresQuery
      return response.ok({ lista_Sectores: sectores })
    }

    const page = Number(requestedPage)
    if (!Number.isInteger(page) || page < 1) {
      return response.badRequest({ mensaje: 'El parámetro page debe ser un entero positivo.' })
    }

    const sectoresQuery = Sectores.query()
      .where('is_deleted', false)
      .preload('municipio')
      .orderBy('nom_sector')
    if (idMunicipio !== undefined) sectoresQuery.where('id_municipio', idMunicipio)
    const sectores = await sectoresQuery.paginate(page, 10)
    return response.ok({ lista_Sectores: sectores })
  }

  async obtenerSectorId({ params, response }: HttpContext) {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ mensaje: 'ID de sector inválido.' })
    }

    const sector = await Sectores.query().where('id', id).preload('municipio').first()
    if (!sector || sector.isDeleted) {
      return response.notFound({ mensaje: 'Sector no encontrado.' })
    }

    return response.ok({ mensaje: 'Sector encontrado.', sector })
  }

  async sectoresPorMunicipio({ params, response }: HttpContext) {
    const idMunicipio = Number(params.id)
    if (!Number.isInteger(idMunicipio) || idMunicipio < 1) {
      return response.badRequest({ mensaje: 'ID de municipio inválido.' })
    }

    const sectores = await Sectores.query()
      .where('id_municipio', idMunicipio)
      .where('is_deleted', false)
      .preload('municipio')
      .orderBy('nom_sector')

    return response.ok({ lista_Sectores: sectores })
  }

  async crearSector({ request, response }: HttpContext) {
    const { nomSector, idMunicipio } = await request.validateUsing(ingresarSector)
    const municipio = await Municipio.find(idMunicipio)
    if (!municipio || municipio.isDeleted) {
      return response.notFound({ mensaje: 'Municipio no encontrado o eliminado.' })
    }

    const existing = await Sectores.query()
      .where('nom_sector', nomSector)
      .where('id_municipio', idMunicipio)
      .first()
    if (existing) {
      return response.conflict({
        mensaje: `Ya existe un sector con el nombre: ${nomSector} en este municipio.`,
      })
    }

    const sector = await Sectores.create({ nomSector, idMunicipio })
    await sector.load('municipio')
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

    const { nomSector, idMunicipio } = await request.validateUsing(ingresarSector)
    const municipio = await Municipio.find(idMunicipio)
    if (!municipio || municipio.isDeleted) {
      return response.notFound({ mensaje: 'Municipio no encontrado o eliminado.' })
    }

    const duplicate = await Sectores.query()
      .where('nom_sector', nomSector)
      .where('id_municipio', idMunicipio)
      .whereNot('id', id)
      .first()
    if (duplicate) {
      return response.conflict({
        mensaje: `Ya existe un sector con el nombre: ${nomSector} en este municipio.`,
      })
    }

    sector.nomSector = nomSector
    sector.idMunicipio = idMunicipio
    await sector.save()
    await sector.load('municipio')
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
