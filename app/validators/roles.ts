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

export const shemaRoles = vine.object({
  nomRol: vine.string().minLength(1).maxLength(15).trim(),
  nomId: vine.number().positive().optional(),
})

export const ingresarRol = vine.compile(shemaRoles)

// Asignamos el proveedor de mensajes al validador compilado
// ... después de compilar ...
ingresarRol.messagesProvider = new SimpleMessagesProvider(mensajesPersonalizados)
