import type { HttpContext } from '@adonisjs/core/http'
import OperadorPermiso from '#models/operador_permiso'
import {
  actualizarPermisoOperadorValidator,
  asignarPermisoOperadorValidator,
} from '#validators/operador_permiso'

export default class OperadorPermisosController {
  async obtenerAsignaciones({ request, response }: HttpContext) {
    const page = Number(request.input('page', 1))
    if (!Number.isInteger(page) || page < 1) {
      return response.badRequest({ mensaje: 'El parámetro page debe ser un entero positivo.' })
    }

    const asignaciones = await OperadorPermiso.query()
      .preload('operador', (query) => query.preload('usuario'))
      .preload('permiso')
      .orderBy('id', 'desc')
      .paginate(page, 20)
    return response.ok({ listaAsignaciones: asignaciones })
  }

  async obtenerAsignacion({ params, response }: HttpContext) {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ mensaje: 'ID de asignación inválido.' })
    }

    const asignacion = await OperadorPermiso.query()
      .where('id', id)
      .preload('operador', (query) => query.preload('usuario'))
      .preload('permiso')
      .first()
    if (!asignacion) return response.notFound({ mensaje: 'Asignación no encontrada.' })

    return response.ok({ asignacion })
  }

  async asignarPermiso({ request, response }: HttpContext) {
    const data = await request.validateUsing(asignarPermisoOperadorValidator)
    const existing = await OperadorPermiso.query()
      .where('id_operador', data.idOperador)
      .where('id_permiso', data.idPermiso)
      .first()
    if (existing)
      return response.conflict({ mensaje: 'El permiso ya está asignado a este operador.' })

    const asignacion = await OperadorPermiso.create({
      idOperador: data.idOperador,
      idPermiso: data.idPermiso,
      activo: data.activo ?? true,
    })
    await asignacion.load((preloader) => {
      preloader.load('operador', (query) => query.preload('usuario'))
      preloader.load('permiso')
    })
    return response.created({ mensaje: 'Permiso asignado correctamente.', asignacion })
  }

  async actualizarAsignacion({ params, request, response }: HttpContext) {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ mensaje: 'ID de asignación inválido.' })
    }

    const asignacion = await OperadorPermiso.find(id)
    if (!asignacion) return response.notFound({ mensaje: 'Asignación no encontrada.' })

    const { activo } = await request.validateUsing(actualizarPermisoOperadorValidator)
    asignacion.activo = activo
    await asignacion.save()
    return response.ok({ mensaje: 'Estado del permiso actualizado correctamente.', asignacion })
  }

  async eliminarAsignacion({ params, response }: HttpContext) {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ mensaje: 'ID de asignación inválido.' })
    }

    const asignacion = await OperadorPermiso.find(id)
    if (!asignacion) return response.notFound({ mensaje: 'Asignación no encontrada.' })

    await asignacion.delete()
    return response.ok({ mensaje: 'Asignación eliminada correctamente.' })
  }
}
