import vine from '@vinejs/vine'

export const ingresarReporte = vine.compile(
  vine.object({
    idUsuario: vine.number(),
    idInstitucion: vine.number(),
    idProblematica: vine.number(),
    idSector: vine.number().optional(),
    formato: vine.string().maxLength(200).trim(),
    ubicacion: vine.string().maxLength(200).trim(),
    nvlPrioridad: vine.number().optional(),
    estado: vine.string().maxLength(50).optional(),
  })
)    