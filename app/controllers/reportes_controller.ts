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




  // Obtener historial de reportes del usuario autenticado
  async historialUsuario({ response, auth }: HttpContext) {
    const usuarioAutenticado = auth.user
    if (!usuarioAutenticado) {
      return response.unauthorized({ mensaje: 'Debe iniciar sesión.' })
    }

    const reportes = await Reporte.query()
      .where('idUsuario', usuarioAutenticado.id)
      .preload('institucion')
      .preload('problematica')
      .orderBy('fechaGen', 'desc')

    return response.ok({ lista_Reportes: reportes })
  }

  //   BUSCAR REPORTE POR ID DE INSTITUCION//
  // // GET_POR_ID
  // public async obtenerReporteInt({ params, response, auth }: HttpContext) {
  //   const idInstitucion = Number(params.id)

  //   // 1. Obtener el ID del usuario autenticado de la sesión/token
  //   // Esto evita que alguien suplante a otro usuario
  //   const usuarioAutenticado = auth.user
  //   if (!usuarioAutenticado) {
  //     return response.unauthorized({ mensaje: 'Debe iniciar sesión.' })
  //   }

  //   // 2. Validar que el parámetro ID de la institución sea un número
  //   if (isNaN(idInstitucion)) {
  //     return response.badRequest({ mensaje: 'El ID de institución no es válido.' })
  //   }

  //   // 3. Consulta de seguridad:
  //   // Filtramos por la institución Y por el dueño de los reportes simultáneamente
  //   const reportes = await Reporte.query()
  //     .where('idInstitucion', idInstitucion)
  //     .where('idUsuario', usuarioAutenticado.id)

  //   // 4. Validar si existen resultados
  //   // Si está vacío, puede ser que la institución no exista O que el usuario no tenga acceso
  //   if (reportes.length === 0) {
  //     return response.forbidden({
  //       mensaje: 'No tienes permiso para acceder a esta información o la institución no existe.',
  //     })
  //   }

  //   return response.ok({
  //     mensaje: 'Información recuperada con éxito.',
  //     data: reportes,
  //   })
  // }
  // BUSCAR REPORTES POR INSTITUCIÓN (Acceso para miembros de la misma)
  public async obtenerReporteInt({ params, response, auth }: HttpContext) {
    const idInstitucionSolicitada = Number(params.id)
    const usuarioAutenticado = auth.user

    // 1. Verificar autenticación
    if (!usuarioAutenticado) {
      return response.unauthorized({ mensaje: 'Debe iniciar sesión.' })
    }

    // 2. Validar que el parámetro ID sea un número
    if (isNaN(idInstitucionSolicitada)) {
      return response.badRequest({ mensaje: 'El ID de institución no es válido.' })
    }

    // 3. VALIDACIÓN DE PERTENENCIA:
    // ¿El usuario pertenece a la institución que quiere consultar?
    if (usuarioAutenticado.idInstitucion !== idInstitucionSolicitada) {
      return response.forbidden({
        mensaje: 'No tienes permiso para estos reportes .',
      })
    }

    // 4. Consulta: Traemos TODOS los reportes de esa institución
    // Ya no filtramos por idUsuario, solo por idInstitucion
    const reportes = await Reporte.query()
      .where('idInstitucion', idInstitucionSolicitada)
      // Opcional: puedes cargar los datos del usuario que creó cada reporte
      .preload('usuario')
      .preload('institucion')
      .preload('problematica')

    // 5. Validar si existen resultados
    if (reportes.length === 0) {
      return response.ok({
        mensaje: 'La institución no tiene reportes registrados todavía.',
        data: [],
      })
    }

    return response.ok({
      mensaje: 'Información de la institución recuperada con éxito.',
      total: reportes.length,
      data: reportes,
    })
  }

  // Crear un nuevo reporte
  async crearReporte({ request, response, auth }: HttpContext) {
    // Esto  configuracion se pone ADENTRO de la función para asegurar que esta vaina
    // reconozca los valores del .env al momento exacto de hacer la petición
    cloudinary.config({
      cloud_name: env.get('CLOUDINARY_CLOUD_NAME') || '',
      api_key: env.get('CLOUDINARY_API_KEY') || '',
      api_secret: env.get('CLOUDINARY_API_SECRET') || '',
    })

    const datosGenerales = await request.validateUsing(ingresarReporte)
    const usuarioAutenticado = auth.user

    if (!usuarioAutenticado) {
      return response.unauthorized({ mensaje: 'Debe iniciar sesión para crear un reporte.' })
    }

    const imagenes = datosGenerales.formato
    let urlsSeguras: string[] = []

    // Si se subieron imágenes, se mandan a Cloudinary
    if (imagenes && imagenes.length > 0) {
      for (const imagen of imagenes) {
        if (imagen.tmpPath) {
          const resultado = await cloudinary.uploader.upload(imagen.tmpPath, {
            folder: 'reportes',
          })
          urlsSeguras.push(resultado.secure_url)
        }
      }
    }

    const { formato, estado, idUsuario, ...restoDatos } = datosGenerales

    const nuevoReporte = await Reporte.create({
      ...restoDatos,
      idUsuario: usuarioAutenticado.id, // Forzar ID del usuario autenticado (Prevenir Spoofing)
      estado: 'Pendiente', // Forzar estado Pendiente siempre al crear
      // Guardamos el arreglo de URLs como texto JSON si hay imágenes
      ...(urlsSeguras.length > 0 ? { formato: JSON.stringify(urlsSeguras) } : {}),
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
  async actualizarReporte({ params, request, response, auth }: HttpContext) {
    const idRep = Number(params.id)
    const datosNuevos = await request.validateUsing(ingresarReporte)
    const usuarioAutenticado = auth.user

    if (!usuarioAutenticado) {
      return response.unauthorized({ mensaje: 'Debe iniciar sesión para editar un reporte.' })
    }

    const encontradoReporte = await Reporte.query().where('id', idRep).first()

    if (encontradoReporte) {
      // Verificar propiedad del reporte o permisos de admin
      if (encontradoReporte.idUsuario !== usuarioAutenticado.id && usuarioAutenticado.idRol !== 1 && usuarioAutenticado.idRol !== 2) {
        return response.forbidden({ mensaje: 'No tienes permisos para modificar este reporte.' })
      }

      // Evitar que el ciudadano edite un reporte que ya está siendo atendido
      if (encontradoReporte.estado !== 'Pendiente' && usuarioAutenticado.idRol !== 1 && usuarioAutenticado.idRol !== 2) {
        return response.forbidden({ mensaje: 'No puedes modificar un reporte que ya está en proceso o finalizado.' })
      }

      // Configuramos Cloudinary aquí también para las actualizaciones
      cloudinary.config({
        cloud_name: env.get('CLOUDINARY_CLOUD_NAME') || '',
        api_key: env.get('CLOUDINARY_API_KEY') || '',
        api_secret: env.get('CLOUDINARY_API_SECRET') || '',
      })

      const imagenes = datosNuevos.formato
      let urlsSeguras: string[] = []

      // Si se subieron nuevas imágenes, se mandanna a Cloudinary
      if (imagenes && imagenes.length > 0) {
        for (const imagen of imagenes) {
          if (imagen.tmpPath) {
            const resultado = await cloudinary.uploader.upload(imagen.tmpPath, {
              folder: 'reportes',
            })
            urlsSeguras.push(resultado.secure_url)
          }
        }
      }

      const { formato, estado, idUsuario, fechaGen, ...restoDatos } = datosNuevos

      const reporteActualizado = {
        ...restoDatos,
        // Solo se actualiza el campo de formato si se subieron nuevas imágenes
        ...(urlsSeguras.length > 0 ? { formato: JSON.stringify(urlsSeguras) } : {}),
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

  // Actualizar SOLO el estado del reporte
  async actualizarEstadoReporte({ params, request, response }: HttpContext) {
    const idRep = Number(params.id)
    const { estado } = request.only(['estado'])

    const encontradoReporte = await Reporte.query().where('id', idRep).first()

    if (encontradoReporte) {
      encontradoReporte.estado = estado
      await encontradoReporte.save()
      return response.ok({
        mensaje: 'El estado del reporte se ha actualizado correctamente.',
        reporte: encontradoReporte,
      })
    }

    return response.status(404).json({
      mensaje: 'El reporte no pudo ser encontrado para actualizar.',
    })
  }
}
