import vine, { SimpleMessagesProvider } from '@vinejs/vine'

// 1. Definimos los mensajes personalizados
const mensajesPersonalizados = {
  'required': 'Este campo es obligatorio.',
  'string': 'Debes ingresar un valor válido (texto).',
  'number': 'Debes ingresar un valor válido (número).',
  'minLength': 'El valor es demasiado corto.',
  'maxLength': 'El valor no debe superar los 15 caracteres.',
  'positive': 'Debes ingresar un valor válido (debe ser positivo).',
}

const schemaReporte = vine.object({
    idUsuario: vine.number(),
    idInstitucion: vine.number(),
    idProblematica: vine.number(),
    idSector: vine.number().optional(),
    formato: vine.string().maxLength(200).trim(),
    ubicacion: vine.string().maxLength(200).trim(),
    nvlPrioridad: vine.number().optional(),
    estado: vine.string().maxLength(50).optional(),
  })


export const ingresarReporte= vine.compile(schemaReporte)

ingresarReporte.messagesProvider = new SimpleMessagesProvider(mensajesPersonalizados)
