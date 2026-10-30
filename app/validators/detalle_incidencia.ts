import vine from '@vinejs/vine'

export const crearDetalleIncidenciaValidator = vine.create({
  idIncidencia: vine.number().positive().exists({ table: 'incidencias', column: 'id' }),
  descripcion: vine.string().minLength(1).maxLength(500).trim(),
  fechaSeguimiento: vine.date().optional(),
})

export const actualizarDetalleIncidenciaValidator = vine.create({
  descripcion: vine.string().minLength(1).maxLength(500).trim().optional(),
  fechaSeguimiento: vine.date().optional(),
})
