import vine from '@vinejs/vine'

const codigoPermiso = () =>
  vine
    .string()
    .minLength(3)
    .maxLength(100)
    .trim()
    .regex(/^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)+$/)

const nombrePermiso = () => vine.string().minLength(3).maxLength(150).trim()
const descripcionPermiso = () => vine.string().minLength(3).maxLength(500).trim()

export const crearPermisoValidator = vine.create({
  codigo: codigoPermiso().unique({ table: 'permisos', column: 'codigo' }),
  nombre: nombrePermiso(),
  descripcion: descripcionPermiso(),
})

export const actualizarPermisoValidator = vine.create({
  codigo: codigoPermiso().optional(),
  nombre: nombrePermiso().optional(),
  descripcion: descripcionPermiso().optional(),
})
