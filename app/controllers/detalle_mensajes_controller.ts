import type { HttpContext } from '@adonisjs/core/http'
import DetalleIncidencia from '#models/detalle_incidencia'
import DetalleMensaje from '#models/detalle_mensaje'
import Mensaje from '#models/mensaje'
import Operador from '#models/operador'
import {
  actualizarDetalleMensajeValidator,
  crearDetalleMensajeValidator,
} from '#validators/detalle_mensaje'

export default class DetalleMensajesController {
  private async puedeVincularMensaje(
    userId: number,
    idDetalleIncidencia: number,
    idMensaje: number
  ) {
    const [operador, detalleIncidencia, mensaje] = await Promise.all([
      Operador.query().where('id_usuario', userId).first(),
      DetalleIncidencia.find(idDetalleIncidencia),
      Mensaje.find(idMensaje),
    ])

    return Boolean(
      operador &&
      detalleIncidencia &&
      mensaje &&
      detalleIncidencia.idOperador === operador.id &&
      mensaje.creadoPor === userId
    )
  }

  async obtenerDetalleMensajes({ request, response }: HttpContext) {
    const page = Number(request.input('page', 1))
    if (!Number.isInteger(page) || page < 1) {
      return response.badRequest({ mensaje: 'El parámetro page debe ser un entero positivo.' })
    }

    const detalleMensajes = await DetalleMensaje.query()
      .preload('detalleIncidencia')
      .preload('mensaje', (query) => query.preload('creador'))
      .orderBy('id', 'desc')
      .paginate(page, 20)
    return response.ok({ listaDetalleMensajes: detalleMensajes })
  }

  async obtenerDetalleMensaje({ params, response }: HttpContext) {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ mensaje: 'ID de detalle de mensaje inválido.' })
    }

    const detalleMensaje = await DetalleMensaje.query()
      .where('id', id)
      .preload('detalleIncidencia')
      .preload('mensaje', (query) => query.preload('creador'))
      .first()
    if (!detalleMensaje) return response.notFound({ mensaje: 'Detalle de mensaje no encontrado.' })

    return response.ok({ detalleMensaje })
  }

  async crearDetalleMensaje({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(crearDetalleMensajeValidator)
    const user = auth.getUserOrFail()
    if (!(await this.puedeVincularMensaje(user.id, data.idDetalleIncidencia, data.idMensaje))) {
      return response.forbidden({
        mensaje: 'Solo puedes vincular tus mensajes a seguimientos que te pertenecen.',
      })
    }

    const existing = await DetalleMensaje.query()
      .where('id_detalle_incidencia', data.idDetalleIncidencia)
      .where('id_mensaje', data.idMensaje)
      .first()
    if (existing) {
      return response.conflict({ mensaje: 'El mensaje ya está vinculado a este seguimiento.' })
    }

    const detalleMensaje = await DetalleMensaje.create(data)
    await detalleMensaje.load((preloader) => {
      preloader.load('detalleIncidencia')
      preloader.load('mensaje')
    })
    return response.created({ mensaje: 'Mensaje vinculado correctamente.', detalleMensaje })
  }

  async actualizarDetalleMensaje({ params, request, response, auth }: HttpContext) {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ mensaje: 'ID de detalle de mensaje inválido.' })
    }

    const detalleMensaje = await DetalleMensaje.find(id)
    if (!detalleMensaje) return response.notFound({ mensaje: 'Detalle de mensaje no encontrado.' })

    const data = await request.validateUsing(actualizarDetalleMensajeValidator)
    if (data.idDetalleIncidencia === undefined && data.idMensaje === undefined) {
      return response.badRequest({
        mensaje: 'Debes proporcionar al menos un campo para actualizar.',
      })
    }

    const idDetalleIncidencia = data.idDetalleIncidencia ?? detalleMensaje.idDetalleIncidencia
    const idMensaje = data.idMensaje ?? detalleMensaje.idMensaje
    const user = auth.getUserOrFail()
    if (!(await this.puedeVincularMensaje(user.id, idDetalleIncidencia, idMensaje))) {
      return response.forbidden({
        mensaje: 'Solo puedes vincular tus mensajes a seguimientos que te pertenecen.',
      })
    }

    const duplicate = await DetalleMensaje.query()
      .where('id_detalle_incidencia', idDetalleIncidencia)
      .where('id_mensaje', idMensaje)
      .whereNot('id', id)
      .first()
    if (duplicate) {
      return response.conflict({ mensaje: 'El mensaje ya está vinculado a este seguimiento.' })
    }

    detalleMensaje.merge(data)
    await detalleMensaje.save()
    return response.ok({ mensaje: 'Detalle de mensaje actualizado correctamente.', detalleMensaje })
  }

  async eliminarDetalleMensaje({ params, response, auth }: HttpContext) {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ mensaje: 'ID de detalle de mensaje inválido.' })
    }

    const detalleMensaje = await DetalleMensaje.find(id)
    if (!detalleMensaje) return response.notFound({ mensaje: 'Detalle de mensaje no encontrado.' })

    const user = auth.getUserOrFail()
    if (
      !(await this.puedeVincularMensaje(
        user.id,
        detalleMensaje.idDetalleIncidencia,
        detalleMensaje.idMensaje
      ))
    ) {
      return response.forbidden({
        mensaje: 'Solo puedes desvincular tus propios mensajes de tus seguimientos.',
      })
    }

    await detalleMensaje.delete()
    return response.ok({ mensaje: 'Detalle de mensaje eliminado correctamente.' })
  }
}
