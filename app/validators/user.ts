import vine from '@vinejs/vine'

/**
 * Shared rules for email and password.
 */
const email = () => vine.string().email().maxLength(254)
const password = () => vine.string().minLength(8).maxLength(32)

/**
 * Validator to use when performing self-signup
 */
export const signupValidator = vine.create({
  numeroCedula: vine.string().unique({ table: 'usuarios' }),
  nombres: vine.string().trim(),
  apellidos: vine.string().trim(),
  sexo: vine.string().maxLength(1).minLength(1),
  correo: email().unique({ table: 'usuarios', column: 'correo' }),
  contrasena: password(),
  passwordConfirmation: password().sameAs('contraseña'),
  idSector: vine.number(),
  idRol: vine.number(),
  idInstitucion: vine.number().optional(),
})

/**
 * Validator to use before validating user credentials
 * during login
 */
export const loginValidator = vine.create({
  email: email(),
  password: vine.string(),
})
