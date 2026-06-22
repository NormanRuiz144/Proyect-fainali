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
    idUsuario: vine.number().optional(), // El frontend ya no necesita enviarlo, se tomará del token
    idInstitucion: vine.number().exists({ table: 'instituciones', column: 'id' }),
    idProblematica: vine.number().exists({ table: 'problematicas', column: 'id' }),
    idSector: vine.number().exists({ table: 'sectores', column: 'id' }).optional(),
    formato: vine.array(
      vine.file({
        size: '20mb',
        extnames: ['jpg', 'png', 'jpeg', 'webp', 'heic']
      })
    ).maxLength(6).optional(),
    ubicacion: vine.string().maxLength(500).trim(),
    descripcion: vine.string().maxLength(1000).optional(),
    nvlPrioridad: vine.number().optional(),
    estado: vine.string().maxLength(50).optional(), // Ignorado en backend pero opcional
  })


export const ingresarReporte= vine.compile(schemaReporte)

ingresarReporte.messagesProvider = new SimpleMessagesProvider(mensajesPersonalizados)
