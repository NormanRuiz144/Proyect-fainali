import Institucione from '#models/institucione'
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



  //BUSCAR REPORTE POR ID DE INSTITUCION//
//GET_POR_ID
  //   public async obtenerReporteInt({ params, response }: HttpContext) {
  //     const idInstitucion = Number(params.id)

  //     // Validar que el id sea un número válido
  //     if (isNaN(idInstitucion)) {
  //       return response.status(400).json({
  //         mensaje: 'El parámetro id no es válido.',
  //       })
  //     }

  //     // Buscar el sector por id
  //     //const institucion = await Reporte.all()
  //     const institucion = await Reporte.query().where('id ', idInstitucion)


  //     if (!Institucione) {
  //       return response.status(404).json({
  //         mensaje: `Ingresar un Id valido.`,
  //       })
  //     }else{
  //      return response.ok({
  //       mensaje: 'Rol encontrado.',
  //      institucion,
  //     })

  //     }

  //     // Respuesta exitosa

  // }
  public async obtenerReporteInt({ params, response }: HttpContext) {
  const idInstitucion = Number(params.id)

  // Validar que el id sea un número válido
  if (isNaN(idInstitucion)) {
    return response.status(400).json({
      mensaje: 'El parámetro id no es válido.',
    })
  }

  // Buscar registros por id
  const institucion = await Reporte.query().where('idInstitucion', idInstitucion)

  if (!institucion || institucion.length === 0) {
    return response.status(404).json({
      mensaje: `No se encontró ningún reporte con el id ${idInstitucion}.`,
    })
  }

  return response.ok({
    mensaje: 'Reporte(s) encontrado(s).',
    institucion,
  })
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




    //recibir idUsuario y idInstitucion validar que estos coincidan de ser haci permitir ver los reportes de esa institucion de lo contrario no permitir el aceso.





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
