import vine from '@vinejs/vine'

/**
 * Shared rules for email and password.
 */
const email = () => vine.string().email().maxLength(254).trim()
const password = () => vine.string().minLength(8).maxLength(32).trim()

/**
 * Validator to use when performing self-signup
 */
export const signupValidator = vine.create({
  numeroCedula: vine.string().unique({ table: 'usuarios', column: 'numero_cedula' }),
  nombres: vine.string().trim(),
  apellidos: vine.string().trim(),
  sexo: vine.string().maxLength(1).minLength(1),
  correo: email().unique({ table: 'usuarios', column: 'correo' }),
  contrasena: password(),
  confirmationContra: password().sameAs('contrasena'),
  idSector: vine.number(),
  idRol: vine.number(),
  idInstitucion: vine.number().optional(),
})

/**
 * Validator to use before validating user credentials
 * during login
 */
export const loginValidator = vine.create({
  correo: email(),
  contrasena: vine.string(),
})

export const crearUsuarioValidator = vine.create({
  numeroCedula: vine.string().unique({ table: 'usuarios', column: 'numero_cedula' }),
  nombres: vine.string().trim(),
  apellidos: vine.string().trim(),
  sexo: vine.string().maxLength(1).minLength(1),
  correo: email().unique({ table: 'usuarios', column: 'correo' }),
  contrasena: password(),
  idSector: vine.number(),
  idRol: vine.number(),
  idInstitucion: vine.number().optional(),
})

export const actualizarUsuarioValidator = vine.create({
  numeroCedula: vine.string().unique({ table: 'usuarios', column: 'numero_cedula' }).optional(),
  nombres: vine.string().trim().optional(),
  apellidos: vine.string().trim().optional(),
  sexo: vine.string().maxLength(1).minLength(1).optional(),
  idSector: vine.number().optional(),
  idRol: vine.number().optional(),
  idInstitucion: vine.number().optional(),
})

export const reasignarValidator = vine.create({
  idRol: vine.number().min(1).nonNegative(),
  idInstitucion: vine.number().min(1).nonNegative(),
})

export const bajaValidator = vine.create({
  idInstitucion: vine.number(),
})
