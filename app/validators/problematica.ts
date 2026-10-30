import vine from '@vinejs/vine'

export const ingresarProblematica = vine.create({
  problematica: vine.string().minLength(1).maxLength(255).trim(),
})
