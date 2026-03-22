import vine from '@vinejs/vine'

export const ingresarDepart = vine.create({
  nomDepartamento: vine.string().minLength(1).maxLength(15).trim(),
})
