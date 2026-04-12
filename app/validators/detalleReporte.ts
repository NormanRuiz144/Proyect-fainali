import vine from '@vinejs/vine'
import {  SimpleMessagesProvider } from '@vinejs/vine'

const mensajesPersonalizados = {
  'required': 'Este campo es obligatorio.',
  'string': 'Debes ingresar un valor válido (texto).',
  'number': 'Debes ingresar un valor válido (número).',
  'minLength': 'El valor es demasiado corto.',
  'maxLength': 'El valor no debe superar los 15 caracteres.',
  'positive': 'Debes ingresar un valor válido (debe ser positivo).',
  'date': 'Debes ingresar una fecha o marca de tiempo válida.',
}

export const schemaDetalleReporte  = vine.object({
    idReporte: vine.number().positive(),
    idUsuario: vine.number().positive(),
    descripcion: vine.string().minLength(1).maxLength(30).trim(),
    //fechaSegui: vine.string().minLength(1).maxLength(30).trim(),
    fechaSegui: vine.date(),
})

export const schemaActualizarDetalleReporte = vine.object(
  {
  descripcion: vine.string().minLength(1).maxLength(30).trim().optional(),
  fechaSeguimiento: vine.date()
  })

  export const ingresarDetalleReporte = vine.compile(schemaDetalleReporte)
  export const actualizarDetalleReporteValidator= vine.compile(schemaActualizarDetalleReporte)

 ingresarDetalleReporte.messagesProvider = new SimpleMessagesProvider(mensajesPersonalizados)
 actualizarDetalleReporteValidator.messagesProvider = new SimpleMessagesProvider(mensajesPersonalizados)



