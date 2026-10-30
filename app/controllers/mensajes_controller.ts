import type { HttpContext } from '@adonisjs/core/http'
import DetalleIncidencia from '#models/detalle_incidencia'
import DetalleMensaje from '#models/detalle_mensaje'
import Mensaje from '#models/mensaje'
import Operador from '#models/operador'
import { actualizarMensajeValidator, crearMensajeValidator } from '#validators/mensaje'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

export default class MensajesController {
  async obtenerMensajes({ request, response }: HttpContext) {
    const page = Number(request.input('page', 1))
    if (!Number.isInteger(page) || page < 1) {
      return response.badRequest({ mensaje: 'El parámetro page debe ser un entero positivo.' })
    }

    const mensajes = await Mensaje.query()
      .preload('creador', (query) => query.select('id', 'nombres', 'apellidos', 'correo'))
      .orderBy('fecha_creacion', 'desc')
      .paginate(page, 20)
    return response.ok({ listaMensajes: mensajes })
  }

  async obtenerMensaje({ params, response }: HttpContext) {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ mensaje: 'ID de mensaje inválido.' })
    }

    const mensaje = await Mensaje.query()
      .where('id', id)
      .preload('creador', (query) => query.select('id', 'nombres', 'apellidos', 'correo'))
      .preload('detalles', (query) => query.preload('detalleIncidencia'))
      .first()
    if (!mensaje) return response.notFound({ mensaje: 'Mensaje no encontrado.' })

    return response.ok({ mensaje })
  }

  async crearMensaje({ request, response, auth }: HttpContext) {
    const { mensaje: contenido, idDetalleIncidencia } =
      await request.validateUsing(crearMensajeValidator)
    const user = auth.getUserOrFail()
    const operador = await Operador.query().where('id_usuario', user.id).first()
    const detalleIncidencia = await DetalleIncidencia.find(idDetalleIncidencia)

    if (!operador || !detalleIncidencia || detalleIncidencia.idOperador !== operador.id) {
      return response.forbidden({
        mensaje: 'Solo el operador responsable del seguimiento puede enviar mensajes.',
      })
    }

    const mensaje = await db.transaction(async (trx) => {
      const nuevoMensaje = new Mensaje()
      nuevoMensaje.useTransaction(trx)
      nuevoMensaje.fill({
        mensaje: contenido,
        creadoPor: user.id,
        fechaCreacion: DateTime.now(),
      })
      await nuevoMensaje.save()

      const detalleMensaje = new DetalleMensaje()
      detalleMensaje.useTransaction(trx)
      detalleMensaje.fill({
        idDetalleIncidencia,
        idMensaje: nuevoMensaje.id,
      })
      await detalleMensaje.save()

      return nuevoMensaje
    })
    await mensaje.load('creador')
    return response.created({
      mensaje: 'Mensaje enviado correctamente.',
      data: mensaje,
      idDetalleIncidencia,
    })
  }

  async actualizarMensaje({ params, request, response, auth }: HttpContext) {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ mensaje: 'ID de mensaje inválido.' })
    }

    const mensaje = await Mensaje.find(id)
    if (!mensaje) return response.notFound({ mensaje: 'Mensaje no encontrado.' })

    if (mensaje.creadoPor !== auth.getUserOrFail().id) {
      return response.forbidden({ mensaje: 'Solo puedes actualizar tus propios mensajes.' })
    }

    const data = await request.validateUsing(actualizarMensajeValidator)
    mensaje.mensaje = data.mensaje
    await mensaje.save()
    return response.ok({ mensaje: 'Mensaje actualizado correctamente.', data: mensaje })
  }

  async eliminarMensaje({ params, response, auth }: HttpContext) {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ mensaje: 'ID de mensaje inválido.' })
    }

    const mensaje = await Mensaje.find(id)
    if (!mensaje) return response.notFound({ mensaje: 'Mensaje no encontrado.' })

    if (mensaje.creadoPor !== auth.getUserOrFail().id) {
      return response.forbidden({ mensaje: 'Solo puedes eliminar tus propios mensajes.' })
    }

    if (await DetalleMensaje.query().where('id_mensaje', id).first()) {
      return response.conflict({
        mensaje: 'No se puede eliminar un mensaje vinculado a un seguimiento.',
      })
    }

    await mensaje.delete()
    return response.ok({ mensaje: 'Mensaje eliminado correctamente.' })
  }
}
