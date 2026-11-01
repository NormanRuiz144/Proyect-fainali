import type { HttpContext } from '@adonisjs/core/http'
import { v2 as cloudinary } from 'cloudinary'
import env from '#start/env'
import Incidencia from '#models/incidencia'
import Operador from '#models/operador'
import db from '@adonisjs/lucid/services/db'
import {
  actualizarEstadoIncidenciaValidator,
  actualizarIncidenciaValidator,
  crearIncidenciaValidator,
} from '#validators/incidencia'
import { DateTime } from 'luxon'

export default class IncidenciasController {
  private normalizarImagenes(
    formato: unknown
  ): { tmpPath?: string; extname?: string; size?: number }[] | undefined | null {
    if (!formato) return undefined

    const archivos = Array.isArray(formato) ? formato : [formato]
    const extensionesPermitidas = ['jpg', 'jpeg', 'png', 'webp', 'heic']
    if (
      archivos.length > 6 ||
      archivos.some(
        (archivo: any) =>
          !archivo?.tmpPath ||
          !extensionesPermitidas.includes(String(archivo.extname).toLowerCase()) ||
          Number(archivo.size) > 20 * 1024 * 1024
      )
    ) {
      return null
    }

    return archivos as { tmpPath?: string; extname?: string; size?: number }[]
  }

  private configureCloudinary() {
    cloudinary.config({
      cloud_name: env.get('CLOUDINARY_CLOUD_NAME') || '',
      api_key: env.get('CLOUDINARY_API_KEY') || '',
      api_secret: env.get('CLOUDINARY_API_SECRET') || '',
    })
  }

  private async uploadImages(files?: { tmpPath?: string }[]) {
    if (!files?.length) return undefined

    this.configureCloudinary()
    const urls: string[] = []
    for (const file of files) {
      if (file.tmpPath) {
        const result = await cloudinary.uploader.upload(file.tmpPath, { folder: 'incidencias' })
        urls.push(result.secure_url)
      }
    }

    return urls.length ? urls : undefined
  }

  async obtenerIncidencias({ request, response }: HttpContext) {
    const page = Number(request.input('page', 1))
    if (!Number.isInteger(page) || page < 1) {
      return response.badRequest({ mensaje: 'El parámetro page debe ser un entero positivo.' })
    }

    const query = Incidencia.query()
      .preload('usuario')
      .preload('problematica')
      .preload('sector')
      .orderBy('fecha_gen', 'desc')

    const { estado, idProblematica, idSector } = request.qs()
    if (estado) query.where('estado', estado)
    if (Number(idProblematica) > 0) query.where('id_problematica', Number(idProblematica))
    if (Number(idSector) > 0) query.where('id_sector', Number(idSector))

    return response.ok({ lista_Incidencias: await query.paginate(page, 10) })
  }

  async obtenerIncidencia({ params, response, auth }: HttpContext) {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ mensaje: 'ID de incidencia inválido.' })
    }

    const incidencia = await Incidencia.query()
      .where('id', id)
      .preload('usuario')
      .preload('problematica')
      .preload('sector')
      .preload('detalles', (detalleQuery) => {
        detalleQuery
          .preload('operador', (operadorQuery) => {
            operadorQuery.preload('usuario', (usuarioQuery) =>
              usuarioQuery.select('id', 'nombres', 'apellidos')
            )
          })
          .preload('mensajes', (detalleMensajeQuery) => {
            detalleMensajeQuery.preload('mensaje', (mensajeQuery) => {
              mensajeQuery.preload('creador', (usuarioQuery) =>
                usuarioQuery.select('id', 'nombres', 'apellidos')
              )
            })
          })
          .orderBy('fecha_seguimiento', 'desc')
      })
      .first()
    if (!incidencia) return response.notFound({ mensaje: 'Incidencia no encontrada.' })

    const user = auth.getUserOrFail()
    if (incidencia.idUsuario !== user.id) {
      const operador = await Operador.query().where('id_usuario', user.id).first()
      const puedeVer =
        operador &&
        (await db
          .from('operador_permiso as asignacion')
          .innerJoin('permisos as permiso', 'permiso.id', 'asignacion.id_permiso')
          .where('asignacion.id_operador', operador.id)
          .where('asignacion.activo', true)
          .where('permiso.codigo', 'incidencias.ver')
          .first())

      if (!puedeVer) {
        return response.forbidden({ mensaje: 'No tienes permiso para consultar esta incidencia.' })
      }
    }

    return response.ok({ incidencia })
  }

  async historialUsuario({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const incidencias = await Incidencia.query()
      .where('id_usuario', user.id)
      .preload('problematica')
      .preload('sector')
      .orderBy('fecha_gen', 'desc')

    return response.ok({ lista_Incidencias: incidencias })
  }

  async crearIncidencia({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(crearIncidenciaValidator)
    const user = auth.getUserOrFail()
    const archivos = this.normalizarImagenes(data.formato)
    if (archivos === null) {
      return response.badRequest({ mensaje: 'Las evidencias deben ser hasta 6 imágenes válidas de máximo 20 MB.' })
    }
    const formato = await this.uploadImages(archivos)

    const incidencia = await Incidencia.create({
      idUsuario: user.id,
      idProblematica: data.idProblematica,
      idSector: data.idSector ?? null,
      ubicacion: data.ubicacion,
      descripcion: data.descripcion ?? null,
      nvlPrioridad: data.nvlPrioridad ?? null,
      formato: formato ?? null,
      estado: 'Pendiente',
      fechaGen: DateTime.now(),
    })

    return response.created({ mensaje: 'Incidencia registrada correctamente.', incidencia })
  }

  async actualizarIncidencia({ params, request, response, auth }: HttpContext) {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ mensaje: 'ID de incidencia inválido.' })
    }

    const incidencia = await Incidencia.find(id)
    if (!incidencia) return response.notFound({ mensaje: 'Incidencia no encontrada.' })

    const user = auth.getUserOrFail()
    if (incidencia.idUsuario !== user.id) {
      return response.forbidden({ mensaje: 'Solo puedes editar tus propias incidencias.' })
    }
    if (incidencia.estado !== 'Pendiente') {
      return response.forbidden({
        mensaje: 'No puedes editar una incidencia en proceso o finalizada.',
      })
    }

    const data = await request.validateUsing(actualizarIncidenciaValidator)
    const archivos = this.normalizarImagenes(data.formato)
    if (archivos === null) {
      return response.badRequest({ mensaje: 'Las evidencias deben ser hasta 6 imágenes válidas de máximo 20 MB.' })
    }
    const formato = await this.uploadImages(archivos)
    incidencia.merge({ ...data, ...(formato ? { formato } : {}) })
    await incidencia.save()

    return response.ok({ mensaje: 'Incidencia actualizada correctamente.', incidencia })
  }

  async actualizarEstadoIncidencia({ params, request, response, auth }: HttpContext) {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ mensaje: 'ID de incidencia inválido.' })
    }

    const user = auth.getUserOrFail()
    const operador = await Operador.query().where('id_usuario', user.id).first()
    if (!operador)
      return response.forbidden({ mensaje: 'Solo un operador puede actualizar el estado.' })

    const incidencia = await Incidencia.find(id)
    if (!incidencia) return response.notFound({ mensaje: 'Incidencia no encontrada.' })

    const { estado } = await request.validateUsing(actualizarEstadoIncidenciaValidator)
    incidencia.estado = estado
    await incidencia.save()
    return response.ok({ mensaje: 'Estado actualizado correctamente.', incidencia })
  }
}
