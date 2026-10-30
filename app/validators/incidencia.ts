import vine from '@vinejs/vine'

const imagenes = vine
  .array(vine.file({ size: '20mb', extnames: ['jpg', 'png', 'jpeg', 'webp', 'heic'] }))
  .maxLength(6)
  .optional()

export const crearIncidenciaValidator = vine.create({
  idProblematica: vine.number().positive().exists({ table: 'problematicas', column: 'id' }),
  idSector: vine.number().positive().exists({ table: 'sectores', column: 'id' }).optional(),
  formato: imagenes,
  ubicacion: vine.string().maxLength(500).trim(),
  descripcion: vine.string().maxLength(1000).optional(),
  nvlPrioridad: vine.number().min(1).max(5).optional(),
})

export const actualizarIncidenciaValidator = vine.create({
  idProblematica: vine
    .number()
    .positive()
    .exists({ table: 'problematicas', column: 'id' })
    .optional(),
  idSector: vine.number().positive().exists({ table: 'sectores', column: 'id' }).optional(),
  formato: imagenes,
  ubicacion: vine.string().maxLength(500).trim().optional(),
  descripcion: vine.string().maxLength(1000).optional(),
  nvlPrioridad: vine.number().min(1).max(5).optional(),
})

export const actualizarEstadoIncidenciaValidator = vine.create({
  estado: vine.string().minLength(1).maxLength(50).trim(),
})
