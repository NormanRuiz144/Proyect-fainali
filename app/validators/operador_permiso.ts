import vine from '@vinejs/vine'

export const asignarPermisoOperadorValidator = vine.create({
  idOperador: vine.number().positive().exists({ table: 'operadores', column: 'id' }),
  idPermiso: vine.number().positive().exists({ table: 'permisos', column: 'id' }),
  activo: vine.boolean().optional(),
})

export const actualizarPermisoOperadorValidator = vine.create({
  activo: vine.boolean(),
})
