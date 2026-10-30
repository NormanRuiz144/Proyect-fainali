import vine from '@vinejs/vine'

const email = () => vine.string().email().maxLength(254).trim()
const password = () => vine.string().minLength(8).maxLength(72)
const cedula = () => vine.number().positive()

export const signupValidator = vine.create({
  numeroCedula: cedula().unique({ table: 'usuarios', column: 'numero_cedula' }),
  nombres: vine.string().trim(),
  apellidos: vine.string().trim(),
  sexo: vine.string().maxLength(1).minLength(1).optional(),
  correo: email().unique({ table: 'usuarios', column: 'correo' }),
  password: password(),
  confirmationPassword: password().sameAs('password'),
  idSector: vine.number().positive(),
})

export const loginValidator = vine.create({
  correo: email(),
  password: vine.string(),
})

export const crearUsuarioValidator = signupValidator

export const actualizarUsuarioValidator = vine.create({
  numeroCedula: cedula().optional(),
  nombres: vine.string().trim().optional(),
  apellidos: vine.string().trim().optional(),
  sexo: vine.string().maxLength(1).minLength(1).optional(),
  correo: email().optional(),
  password: password().optional(),
  idSector: vine.number().positive().optional(),
})

export const banUser = vine.create({
  userId: vine.number().positive(),
  motivo: vine.string().maxLength(100).optional(),
  fechaFin: vine.date({ formats: ['YYYY-MM-DD'] }).optional(),
  tipo: vine.enum(['TEMPORAL', 'PERMANENTE']),
})
