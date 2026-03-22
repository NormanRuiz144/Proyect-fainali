import vine from '@vinejs/vine'

export const ingresarDepart = vine.create({
  nomdepartamento: vine.string().minLength(1).maxLength(15).trim(),
})
