import vine from '@vinejs/vine'

export const crearOperadorValidator = vine.create({
  idUsuario: vine.number().positive().exists({ table: 'usuarios', column: 'id' }),
})

export const actualizarOperadorValidator = vine.create({
  idUsuario: vine.number().positive().exists({ table: 'usuarios', column: 'id' }),
})
