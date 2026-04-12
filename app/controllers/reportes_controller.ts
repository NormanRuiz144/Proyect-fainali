import Reporte from '#models/reporte'
import { ingresarReporte } from '#validators/reporte'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon' //sirve para dejar la fecha fija cuando se crea
import { v2 as cloudinary } from 'cloudinary'


   
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
    // Esto  configuracion se pone ADENTRO de la función para asegurar que esta vaina
    // reconozca los valores del .env al momento exacto de hacer la petición
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
      api_key: process.env.CLOUDINARY_API_KEY || '',
      api_secret: process.env.CLOUDINARY_API_SECRET || ''
    })

    const datosGenerales = await request.validateUsing(ingresarReporte)
    
    // Extraer imagenes del arreglo de formato validadas
    const imagenes = datosGenerales.formato
    let urlsSeguras: string[] = []

    if (imagenes && imagenes.length > 0) {
      for (const imagen of imagenes) {
        if (imagen.tmpPath) {
          const resultado = await cloudinary.uploader.upload(imagen.tmpPath, {
            folder: 'reportes' // Las imágenes se guardarán en esta carpeta en Cloudinary
          })
          urlsSeguras.push(resultado.secure_url)
        }
      }
    }

    // Séparamos 'formato' para manejarlo manualmente con las URLs de Cloudinary
    const { formato, ...restoDatos } = datosGenerales

    const nuevoReporte = await Reporte.create({
      ...restoDatos,
      formato: urlsSeguras.length > 0 ? JSON.stringify(urlsSeguras) : null,
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
      // Configuramos Cloudinary aquí también para las actualizaciones
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
        api_key: process.env.CLOUDINARY_API_KEY || '',
        api_secret: process.env.CLOUDINARY_API_SECRET || ''
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
        reporte: encontradoReporte 
      })
    }

    return response.status(404).json({ 
      mensaje: 'El reporte no pudo ser encontrado para actualizar.' 
    })
  }
}