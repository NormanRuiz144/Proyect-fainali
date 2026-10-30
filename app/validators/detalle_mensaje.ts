import vine from '@vinejs/vine'

export const crearDetalleMensajeValidator = vine.create({
  idDetalleIncidencia: vine
    .number()
    .positive()
    .exists({ table: 'detalle_incidencias', column: 'id' }),
  idMensaje: vine.number().positive().exists({ table: 'mensajes', column: 'id' }),
})

export const actualizarDetalleMensajeValidator = vine.create({
  idDetalleIncidencia: vine
    .number()
    .positive()
    .exists({ table: 'detalle_incidencias', column: 'id' })
    .optional(),
  idMensaje: vine.number().positive().exists({ table: 'mensajes', column: 'id' }).optional(),
})
