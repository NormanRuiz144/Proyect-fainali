import vine from '@vinejs/vine'

export const ingresarInstitu = vine.create({
  nombreInstitucion: vine.string().minLength(1).maxLength(255).trim(),
  id_municipio: vine.number()
})