import vine from '@vinejs/vine'


export const ingresarProblem = vine.create({
    problema: vine.string().minLength(1).maxLength(255).trim(), //tiene que ir el nombre a como sale en las tablas
})
