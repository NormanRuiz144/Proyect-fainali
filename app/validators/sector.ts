import vine from '@vinejs/vine'

export const ingresarSector = vine.create({
  nomSector: vine.string().minLength(1).maxLength(100).trim(),
})
