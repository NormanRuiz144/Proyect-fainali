import type { HttpContext } from '@adonisjs/core/http'
import DetalleIncidencia from '#models/detalle_incidencia'
import Incidencia from '#models/incidencia'
import Operador from '#models/operador'
import {
  actualizarDetalleIncidenciaValidator,
  crearDetalleIncidenciaValidator,
} from '#validators/detalle_incidencia'
import { DateTime } from 'luxon'

export default class DetalleIncidenciasController {
  async obtenerDetalles({ request, response }: HttpContext) {
    const page = Number(request.input('page', 1))
    if (!Number.isInteger(page) || page < 1) {
      return response.badRequest({ mensaje: 'El parámetro page debe ser un entero positivo.' })
    }

    const detalles = await DetalleIncidencia.query()
      .preload('incidencia')
      .preload('operador')
      .orderBy('fecha_seguimiento', 'desc')
      .paginate(page, 10)
    return response.ok({ lista_DetallesIncidencia: detalles })
  }

  async obtenerDetalle({ params, response }: HttpContext) {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ mensaje: 'ID de detalle inválido.' })
    }

    const detalle = await DetalleIncidencia.query()
      .where('id', id)
      .preload('incidencia')
      .preload('operador')
      .first()
    if (!detalle) return response.notFound({ mensaje: 'Detalle de incidencia no encontrado.' })

    return response.ok({ detalle })
  }

  async crearDetalle({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(crearDetalleIncidenciaValidator)
    const incidencia = await Incidencia.find(data.idIncidencia)
    if (!incidencia) return response.notFound({ mensaje: 'Incidencia no encontrada.' })

    const user = auth.getUserOrFail()
    const operador = await Operador.query().where('id_usuario', user.id).first()
    if (!operador)
      return response.forbidden({ mensaje: 'Solo un operador puede crear seguimientos.' })

    const detalle = await DetalleIncidencia.create({
      idIncidencia: incidencia.id,
      idOperador: operador.id,
      descripcion: data.descripcion,
      fechaSeguimiento: data.fechaSeguimiento ?? DateTime.now(),
    })

    return response.created({ mensaje: 'Seguimiento creado correctamente.', detalle })
  }

  async actualizarDetalle({ params, request, response, auth }: HttpContext) {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ mensaje: 'ID de detalle inválido.' })
    }

    const detalle = await DetalleIncidencia.find(id)
    if (!detalle) return response.notFound({ mensaje: 'Detalle de incidencia no encontrado.' })

    const user = auth.getUserOrFail()
    const operador = await Operador.query().where('id_usuario', user.id).first()
    if (!operador || detalle.idOperador !== operador.id) {
      return response.forbidden({
        mensaje: 'Solo el operador creador puede actualizar este seguimiento.',
      })
    }

    const data = await request.validateUsing(actualizarDetalleIncidenciaValidator)
    detalle.merge(data)
    await detalle.save()
    return response.ok({ mensaje: 'Seguimiento actualizado correctamente.', detalle })
  }
}
