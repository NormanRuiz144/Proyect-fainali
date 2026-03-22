import vine from '@vinejs/vine'

export const ingresarMuni = vine.create({
  nomMunicipio: vine.string().minLength(1).maxLength(30).trim(),
  idDepartamento: vine.number().positive(),
})
