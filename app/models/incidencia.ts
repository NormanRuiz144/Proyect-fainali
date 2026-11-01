import { IncidenciaSchema } from '#database/schema'
import { belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import DetalleIncidencia from './detalle_incidencia.ts'
import Problematica from './problematica.ts'
import Sectores from './sectores.ts'
import Usuario from './user.ts'

export default class Incidencia extends IncidenciaSchema {
  @column({
    prepare: (value: string[] | null) => (value === null ? null : JSON.stringify(value)),
    consume: (value: string[] | string | null) =>
      typeof value === 'string' ? JSON.parse(value) : value,
  })
  declare formato: string[] | null

  @belongsTo(() => Usuario, { foreignKey: 'idUsuario' })
  declare usuario: BelongsTo<typeof Usuario>

  @belongsTo(() => Problematica, { foreignKey: 'idProblematica' })
  declare problematica: BelongsTo<typeof Problematica>

  @belongsTo(() => Sectores, { foreignKey: 'idSector' })
  declare sector: BelongsTo<typeof Sectores>

  @hasMany(() => DetalleIncidencia, { foreignKey: 'idIncidencia' })
  declare detalles: HasMany<typeof DetalleIncidencia>
}
