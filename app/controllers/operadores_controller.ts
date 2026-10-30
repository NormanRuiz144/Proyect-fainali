import type { HttpContext } from '@adonisjs/core/http'
import Operador from '#models/operador'
import { actualizarOperadorValidator, crearOperadorValidator } from '#validators/operador'

export default class OperadoresController {
  async obtenerOperadores({ request, response }: HttpContext) {
    const page = Number(request.input('page', 1))
    if (!Number.isInteger(page) || page < 1) {
      return response.badRequest({ mensaje: 'El parámetro page debe ser un entero positivo.' })
    }

    const operadores = await Operador.query()
      .preload('usuario')
      .orderBy('id', 'desc')
      .paginate(page, 10)
    return response.ok({ listaOperadores: operadores })
  }

  async obtenerOperador({ params, response }: HttpContext) {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ mensaje: 'ID de operador inválido.' })
    }

    const operador = await Operador.query().where('id', id).preload('usuario').first()
    if (!operador) return response.notFound({ mensaje: 'Operador no encontrado.' })

    return response.ok({ operador })
  }

  async crearOperador({ request, response }: HttpContext) {
    const { idUsuario } = await request.validateUsing(crearOperadorValidator)
    const existing = await Operador.findBy('id_usuario', idUsuario)
    if (existing)
      return response.conflict({ mensaje: 'El usuario ya está registrado como operador.' })

    const operador = await Operador.create({ idUsuario })
    await operador.load('usuario')
    return response.created({ mensaje: 'Operador creado correctamente.', operador })
  }

  async actualizarOperador({ params, request, response }: HttpContext) {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ mensaje: 'ID de operador inválido.' })
    }

    const operador = await Operador.find(id)
    if (!operador) return response.notFound({ mensaje: 'Operador no encontrado.' })

    const { idUsuario } = await request.validateUsing(actualizarOperadorValidator)
    const duplicate = await Operador.query()
      .where('id_usuario', idUsuario)
      .whereNot('id', id)
      .first()
    if (duplicate)
      return response.conflict({ mensaje: 'El usuario ya está registrado como operador.' })

    operador.idUsuario = idUsuario
    await operador.save()
    await operador.load('usuario')
    return response.ok({ mensaje: 'Operador actualizado correctamente.', operador })
  }

  async eliminarOperador({ params, response }: HttpContext) {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ mensaje: 'ID de operador inválido.' })
    }

    const operador = await Operador.query().where('id', id).preload('permisosAsignados').first()
    if (!operador) return response.notFound({ mensaje: 'Operador no encontrado.' })

    const hasDependencies =
      operador.permisosAsignados.length > 0 ||
      (await operador.related('detallesIncidencia').query().first()) !== null ||
      (await operador.related('baneosRealizados').query().first()) !== null
    if (hasDependencies) {
      return response.conflict({
        mensaje: 'No se puede eliminar un operador con permisos, seguimientos o baneos asociados.',
      })
    }

    await operador.delete()
    return response.ok({ mensaje: 'Operador eliminado correctamente.' })
  }
}
