import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { SectoreSchema } from '#database/schema'
import Incidencia from './incidencia.ts'
import Municipio from './municipio.ts'
import Usuario from './user.ts'

export default class Sectores extends SectoreSchema {
  @belongsTo(() => Municipio, { foreignKey: 'idMunicipio' })
  declare municipio: BelongsTo<typeof Municipio>

  @hasMany(() => Usuario, { foreignKey: 'idSector' })
  declare usuarios: HasMany<typeof Usuario>

  @hasMany(() => Incidencia, { foreignKey: 'idSector' })
  declare incidencias: HasMany<typeof Incidencia>
}
