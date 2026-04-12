//import vine from '@vinejs/vine'

// export const ingresarSector = vine.create({
//   nomSector: vine.string().minLength(1).maxLength(15).trim(),
//   idMunicipio:vine.number().positive(),
//   idSector: vine.number().positive().optional(),
// })




import vine from '@vinejs/vine'
import {  SimpleMessagesProvider } from '@vinejs/vine' // <--- Nota las llaves

// 1. Definimos los mensajes personalizados
const mensajesPersonalizados = {
  'required': 'Este campo es obligatorio.',
  'string': 'Debes ingresar un valor válido (texto).',
  'number': 'Debes ingresar un valor válido (número).',
  'minLength': 'El valor es demasiado corto.',
  'maxLength': 'El valor no debe superar los 15 caracteres.',
  'positive': 'Debes ingresar un valor válido (debe ser positivo).',
}

// 2. Creamos el esquema
const schemaSector = vine.object({
  nomSector: vine.string().minLength(1).maxLength(15).trim(),
  idMunicipio: vine.number().positive(),
  idSector: vine.number().positive().optional(),
})

// 3. Compilamos el validador aplicando los mensajes
export const ingresarSector = vine.compile(schemaSector)

// Asignamos el proveedor de mensajes al validador compilado
// ... después de compilar ...
ingresarSector.messagesProvider = new SimpleMessagesProvider(mensajesPersonalizados)
// import vine from '@vinejs/vine'

