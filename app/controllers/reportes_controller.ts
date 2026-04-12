import Reporte from '#models/reporte'
import { ingresarReporte } from '#validators/reporte'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon' //sirve para dejar la fecha fija cuando se crea

export default class ReportesController {
  // Listar Reportes
  async obtenerReportes({ response }: HttpContext) {

    // descomentar esto cuando ya esten las que falten xd xd jijin jaja
    // const listaReportes = await Reporte.query().preload('usuario').preload('institucion').preload('problematica').preload('sector')
    //

    const listaReportes = await Reporte.all()

    if (!listaReportes || listaReportes.length === 0) {
      throw new Error('No se han encontrado reportes.')
    }
    return response.ok({ lista_Reportes: listaReportes })
  }

  // Crear un nuevo reporte
  async crearReporte({ request, response }: HttpContext) {
    const datosGenerales = await request.validateUsing(ingresarReporte)

    const nuevoReporte = await Reporte.create({
      ...datosGenerales,
      fechaGen: DateTime.now() // Asigna por defecto la fecha y hora actual automáticamente
    })

    if (!nuevoReporte) {
      throw new Error('No se ha podido registrar el reporte.')
    }

    return response.ok({
      mensaje: 'Reporte registrado con éxito.',
      reporte: nuevoReporte
    })
  }

  // Actualizar un reporte
  async actualizarReporte({ params, request, response }: HttpContext) {
    const idRep = Number(params.id)
    const datosNuevos = await request.validateUsing(ingresarReporte)

    const encontradoReporte = await Reporte.query().where('id', idRep).first()

    if (encontradoReporte) {
      encontradoReporte.merge(datosNuevos)
      await encontradoReporte.save()
      return response.ok({
        mensaje: 'El reporte se ha actualizado correctamente.',
        reporte: encontradoReporte
      })
    }

    return response.status(404).json({
      mensaje: 'El reporte no pudo ser encontrado para actualizar.'
    })
  }
}
