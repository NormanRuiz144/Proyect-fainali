import vine from '@vinejs/vine'

const contenidoMensaje = () => vine.string().minLength(1).maxLength(2000).trim()

export const crearMensajeValidator = vine.create({
  mensaje: contenidoMensaje(),
  idDetalleIncidencia: vine
    .number()
    .positive()
    .exists({ table: 'detalle_incidencias', column: 'id' }),
})

export const actualizarMensajeValidator = vine.create({
  mensaje: contenidoMensaje(),
})
