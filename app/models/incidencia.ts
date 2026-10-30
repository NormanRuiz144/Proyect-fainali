import { IncidenciaSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import DetalleIncidencia from './detalle_incidencia.ts'
import Problematica from './problematica.ts'
import Sectores from './sectores.ts'
import Usuario from './user.ts'

export default class Incidencia extends IncidenciaSchema {
  @belongsTo(() => Usuario, { foreignKey: 'idUsuario' })
  declare usuario: BelongsTo<typeof Usuario>

  @belongsTo(() => Problematica, { foreignKey: 'idProblematica' })
  declare problematica: BelongsTo<typeof Problematica>

  @belongsTo(() => Sectores, { foreignKey: 'idSector' })
  declare sector: BelongsTo<typeof Sectores>

  @hasMany(() => DetalleIncidencia, { foreignKey: 'idIncidencia' })
  declare detalles: HasMany<typeof DetalleIncidencia>
}
