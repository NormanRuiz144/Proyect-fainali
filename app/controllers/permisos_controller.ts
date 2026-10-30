import type { HttpContext } from '@adonisjs/core/http'
import OperadorPermiso from '#models/operador_permiso'
import Permiso from '#models/permiso'
import { actualizarPermisoValidator, crearPermisoValidator } from '#validators/permiso'

export default class PermisosController {
  async obtenerPermisos({ request, response }: HttpContext) {
    const page = Number(request.input('page', 1))
    if (!Number.isInteger(page) || page < 1) {
      return response.badRequest({ mensaje: 'El parámetro page debe ser un entero positivo.' })
    }

    const permisos = await Permiso.query().orderBy('codigo').paginate(page, 20)
    return response.ok({ listaPermisos: permisos })
  }

  async obtenerPermiso({ params, response }: HttpContext) {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ mensaje: 'ID de permiso inválido.' })
    }

    const permiso = await Permiso.find(id)
    if (!permiso) return response.notFound({ mensaje: 'Permiso no encontrado.' })

    return response.ok({ permiso })
  }

  async crearPermiso({ request, response }: HttpContext) {
    const data = await request.validateUsing(crearPermisoValidator)
    const permiso = await Permiso.create(data)
    return response.created({ mensaje: 'Permiso creado correctamente.', permiso })
  }

  async actualizarPermiso({ params, request, response }: HttpContext) {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ mensaje: 'ID de permiso inválido.' })
    }

    const permiso = await Permiso.find(id)
    if (!permiso) return response.notFound({ mensaje: 'Permiso no encontrado.' })

    const data = await request.validateUsing(actualizarPermisoValidator)
    if (data.codigo && data.codigo !== permiso.codigo) {
      const duplicate = await Permiso.query()
        .where('codigo', data.codigo)
        .whereNot('id', id)
        .first()
      if (duplicate) return response.conflict({ mensaje: 'Ya existe un permiso con ese código.' })
    }

    permiso.merge(data)
    await permiso.save()
    return response.ok({ mensaje: 'Permiso actualizado correctamente.', permiso })
  }

  async eliminarPermiso({ params, response }: HttpContext) {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ mensaje: 'ID de permiso inválido.' })
    }

    const permiso = await Permiso.find(id)
    if (!permiso) return response.notFound({ mensaje: 'Permiso no encontrado.' })

    if (await OperadorPermiso.query().where('id_permiso', id).first()) {
      return response.conflict({ mensaje: 'No se puede eliminar un permiso que está asignado.' })
    }

    await permiso.delete()
    return response.ok({ mensaje: 'Permiso eliminado correctamente.' })
  }
}
