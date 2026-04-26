
import { UsuarioSchema } from '#database/schema'
import DetalleReportes from '#models/detalleReporte'
import Reporte from '#models/reporte'
import User from '#models/user'
import { actualizarDetalleReporteValidator, ingresarDetalleReporte } from '#validators/detalleReporte'
import type { HttpContext } from '@adonisjs/core/http'



//GET_ALL_DETALLE REPORTE//

 export default class detaReporteController {
 async obtenerDetaReporte({ response }: HttpContext) {
    const listaDetaReporte = await DetalleReportes.all()

    if (!listaDetaReporte ||listaDetaReporte.length == 0) {
      throw new Error('Vaya no se encontro ningun detalle Reporte.')
    }
    return response.ok({ lista_Deta_Reporte: listaDetaReporte})
  }

  //GET DETALLE REPORTE ID//

 public async obtenerDetalleId({ params, response }: HttpContext) {
      const idDetalleReporte = Number(params.id)

      // Validar que el id sea un número válido
      if (isNaN(idDetalleReporte)) {
        return response.status(400).json({
          mensaje: 'El parámetro id no es válido.',
        })
      }

      // Buscar el sector por id
      const detalleReporte = await DetalleReportes.find(idDetalleReporte)

      if (!detalleReporte) {
        return response.status(404).json({
          mensaje: `Ingrese un Id Valido.`,
        })
      }

      // Respuesta exitosa
      return response.ok({
        mensaje: 'Sector encontrado.',
        detalleReporte,
      })
  }



async crearDetalleReporte({ request, response }: HttpContext) {
  const { descripcion, fechaSegui, idReporte, idUsuario } = await request.validateUsing(ingresarDetalleReporte)

  // VALIDAR QUE EL REPORTE EXISTA
  // Reemplaza 'Reporte' por el nombre real de tu modelo de reportes
  const reporteExiste = await Reporte.find(idReporte)
  if (!reporteExiste) {
    return response.status(404).json({
      mensaje: `El reporte con ID ${idReporte} no existe en la base de datos.`,
    })
  }

  //  VALIDAR QUE EL USUARIO EXISTA
  // Reemplaza 'Usuario' por el nombre real de tu modelo de usuarios
  const usuarioExiste = await User.find(idUsuario)
  if (!usuarioExiste) {
    return response.status(404).json({
      mensaje: `El usuario con ID ${idUsuario} no existe en la base de datos.`,
    })
  }

  // Validar que el idReporte no esté ya asignado a otro detalle (Relación 1 a 1)
  const reporteAsignado = await DetalleReportes.query()
    .where('id_reporte', idReporte)
    .first()

  if (reporteAsignado) {
    return response.status(409).json({
      mensaje: `Error: El reporte con ID ${idReporte} ya tiene un detalle asignado y no puede repetirse.`,
    })
  }

  // Evitar duplicado exacto (Opcional pero recomendado)
  const existe = await DetalleReportes.query()
    .where({
      id_reporte: idReporte,
      id_usuario: idUsuario,
      descripcion: descripcion,
      fecha_seguimiento: fechaSegui
    })
    .first()

  if (existe) {
    return response.status(409).json({
      mensaje: `El detalle con la descripción "${descripcion}" ya existe para este reporte.`,
    })
  }

  //  Crear el nuevo registro
  const nuevoDetalleReporte = await DetalleReportes.create({
    id_reporte: idReporte,
    id_usuario: idUsuario,
    descripcion: descripcion,
    fechaSeguimiento: fechaSegui
  })

  return response.ok({
    mensaje: 'Detalle reporte creado con éxito.',
    Sectores: nuevoDetalleReporte
  })
}



async actualizarDetalleReporte({ params, request, response }: HttpContext) {
  // Validar que el ID de la URL sea un número válido
  const idDetalleReporte = Number(params.id)

  if (isNaN(idDetalleReporte) || idDetalleReporte <= 0) {
    return response.status(400).json({
      mensaje: 'ID de detalle inválido, vuelve a intentarlo con un número válido.',
    })
  }

  try {
    //  Validar la EXISTENCIA del registro
    const registro = await DetalleReportes.find(idDetalleReporte)

    if (!registro) {
      return response.status(404).json({
        mensaje: `El detalle de reporte con ID ${idDetalleReporte} no existe.`
      })
    }

    // Validar los datos del Body con el Validador de VineJS
    const datos = await request.validateUsing(actualizarDetalleReporteValidator)

    // 4. Validación manual de seguridad (Campos no vacíos o nulos)
    // Esto evita que espacios en blanco o valores undefined pasen a la DB
    if (!datos.descripcion || datos.descripcion.trim() === '' || !datos.fechaSeguimiento) {
      return response.status(400).json({
        mensaje: 'Todos los campos (descripción y fecha) son obligatorios y no pueden estar vacíos.'
      })
    }

    // Actualizar los campos
    registro.descripcion = datos.descripcion
    registro.fechaSeguimiento = datos.fechaSeguimiento

   //Guardar cambios
    await registro.save()

    return response.ok({ mensaje: 'El detalle Reporte fue actualizado correctamente.' })

 } catch (error) {
  let mensajeError = 'Error desconocido'

  if (error instanceof Error) {
    mensajeError = error.message
  }

  return response.status(500).json({
    mensaje: 'Asegurate de que los campos esten llenos correctamente.',
    error: mensajeError
  })
}
}
 }
