import type { HttpContext } from '@adonisjs/core/http'
import Problematica from '#models/problematica'
import { ingresarProblematica } from '#validators/problematica'

export default class ProblematicasController {
  async obtenerProblematicas({ request, response }: HttpContext) {
    const requestedPage = request.input('page')
    if (requestedPage === undefined) {
      const problematicas = await Problematica.query()
        .where('is_deleted', false)
        .orderBy('problematica')
      return response.ok({ listaProblematicas: problematicas })
    }

    const page = Number(requestedPage)
    if (!Number.isInteger(page) || page < 1) {
      return response.badRequest({ mensaje: 'El parámetro page debe ser un entero positivo.' })
    }

    const problematicas = await Problematica.query()
      .where('is_deleted', false)
      .orderBy('problematica')
      .paginate(page, 10)
    return response.ok({ listaProblematicas: problematicas })
  }

  async obtenerProblematica({ params, response }: HttpContext) {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ mensaje: 'ID de problemática inválido.' })
    }

    const problematica = await Problematica.find(id)
    if (!problematica || problematica.isDeleted) {
      return response.notFound({ mensaje: 'Problemática no encontrada.' })
    }

    return response.ok({ problematica })
  }

  async crearProblematica({ request, response }: HttpContext) {
    const { problematica: nombre } = await request.validateUsing(ingresarProblematica)
    const existing = await Problematica.query().where('problematica', nombre).first()
    if (existing) {
      return response.conflict({ mensaje: 'Ya existe una problemática con ese nombre.' })
    }

    const problematica = await Problematica.create({
      problematica: nombre,
      isDeleted: false,
    })
    return response.created({ mensaje: 'Problemática creada correctamente.', problematica })
  }

  async actualizarProblematica({ params, request, response }: HttpContext) {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ mensaje: 'ID de problemática inválido.' })
    }

    const problematica = await Problematica.find(id)
    if (!problematica || problematica.isDeleted) {
      return response.notFound({ mensaje: 'Problemática no encontrada.' })
    }

    const { problematica: nombre } = await request.validateUsing(ingresarProblematica)
    const duplicate = await Problematica.query()
      .where('problematica', nombre)
      .whereNot('id', id)
      .first()
    if (duplicate) {
      return response.conflict({ mensaje: 'Ya existe una problemática con ese nombre.' })
    }

    problematica.problematica = nombre
    await problematica.save()
    return response.ok({ mensaje: 'Problemática actualizada correctamente.', problematica })
  }

  async eliminarProblematica({ params, response }: HttpContext) {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ mensaje: 'ID de problemática inválido.' })
    }

    const problematica = await Problematica.find(id)
    if (!problematica || problematica.isDeleted) {
      return response.notFound({ mensaje: 'Problemática no encontrada o ya eliminada.' })
    }

    problematica.isDeleted = true
    await problematica.save()
    return response.ok({ mensaje: 'Problemática eliminada correctamente.' })
  }

  async restaurarProblematica({ params, response }: HttpContext) {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ mensaje: 'ID de problemática inválido.' })
    }

    const problematica = await Problematica.find(id)
    if (!problematica || !problematica.isDeleted) {
      return response.notFound({ mensaje: 'Problemática no encontrada o ya activa.' })
    }

    problematica.isDeleted = false
    await problematica.save()
    return response.ok({ mensaje: 'Problemática restaurada correctamente.' })
  }
}
