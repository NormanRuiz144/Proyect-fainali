import Institucione from '#models/institucione'
import Reporte from '#models/reporte'
import { ingresarReporte } from '#validators/reporte'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon' //sirve para dejar la fecha fija cuando se crea
import { v2 as cloudinary } from 'cloudinary'
import env from '#start/env'

export default class ReportesController {
  // Listar Reportes
  async obtenerReportes({ response }: HttpContext) {
    const listaReportes = await Reporte.query()
      .preload('usuario')
      .preload('institucion')
      .preload('problematica')
    // .preload('sector')

    // const listaReportes = await Reporte.all()

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
    // Esto  configuracion se pone ADENTRO de la función para asegurar que esta vaina
    // reconozca los valores del .env al momento exacto de hacer la petición
    cloudinary.config({
      cloud_name: env.get('CLOUDINARY_CLOUD_NAME') || '',
      api_key: env.get('CLOUDINARY_API_KEY') || '',
      api_secret: env.get('CLOUDINARY_API_SECRET') || ''
    })

    const datosGenerales = await request.validateUsing(ingresarReporte)

    const imagenes = datosGenerales.formato
    let urlsSeguras: string[] = []

    // Si se subieron imágenes, se mandan a Cloudinary
    if (imagenes && imagenes.length > 0) {
      for (const imagen of imagenes) {
        if (imagen.tmpPath) {
          const resultado = await cloudinary.uploader.upload(imagen.tmpPath, {
            folder: 'reportes'
          })
          urlsSeguras.push(resultado.secure_url)
        }
      }
    }

    const { formato, ...restoDatos } = datosGenerales

    const nuevoReporte = await Reporte.create({
      ...restoDatos,
      // Guardamos el arreglo de URLs como texto JSON si hay imágenes
      ...(urlsSeguras.length > 0 ? { formato: JSON.stringify(urlsSeguras) } : {}),
      estado: restoDatos.estado || 'Pendiente', // El estado por defecto será Pendiente
      fechaGen: DateTime.now(), // Asigna por defecto la fecha y hora actual automáticamente
    })

    if (!nuevoReporte) {
      throw new Error('No se ha podido registrar el reporte.')
    }

    return response.ok({
      mensaje: 'Reporte registrado con éxito.',
      reporte: nuevoReporte,
    })
  }




    //recibir idUsuario y idInstitucion validar que estos coincidan de ser haci permitir ver los reportes de esa institucion de lo contrario no permitir el aceso.





  // Actualizar un reporte
  async actualizarReporte({ params, request, response }: HttpContext) {
    const idRep = Number(params.id)
    const datosNuevos = await request.validateUsing(ingresarReporte)

    const encontradoReporte = await Reporte.query().where('id', idRep).first()

    if (encontradoReporte) {
      // Configuramos Cloudinary aquí también para las actualizaciones
      cloudinary.config({
        cloud_name: env.get('CLOUDINARY_CLOUD_NAME') || '',
        api_key: env.get('CLOUDINARY_API_KEY') || '',
        api_secret: env.get('CLOUDINARY_API_SECRET') || ''
      })

      const imagenes = datosNuevos.formato
      let urlsSeguras: string[] = []

      // Si se subieron nuevas imágenes, se mandanna a Cloudinary
      if (imagenes && imagenes.length > 0) {
        for (const imagen of imagenes) {
          if (imagen.tmpPath) {
            const resultado = await cloudinary.uploader.upload(imagen.tmpPath, {
              folder: 'reportes'
            })
            urlsSeguras.push(resultado.secure_url)
          }
        }
      }

      const { formato, ...restoDatos } = datosNuevos
      
      const reporteActualizado = {
        ...restoDatos,
        // Solo se actualiza el campo de formato si se subieron nuevas imágenes
        ...(urlsSeguras.length > 0 ? { formato: JSON.stringify(urlsSeguras) } : {})
      }

      encontradoReporte.merge(reporteActualizado)
      await encontradoReporte.save()
      return response.ok({
        mensaje: 'El reporte se ha actualizado correctamente.',
        reporte: encontradoReporte,
      })
    }

    return response.status(404).json({
      mensaje: 'El reporte no pudo ser encontrado para actualizar.',
    })
  }
}
