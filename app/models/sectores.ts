import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { SectoreSchema } from '#database/schema'
import Municipio from './municipio.ts'
import Usuario from './user.ts'

export default class Sectores extends SectoreSchema {
  @belongsTo(() => Municipio)
  declare municipio: BelongsTo<typeof Municipio>

  @hasMany(() => Usuario)
  declare usuario: HasMany<typeof Usuario>
}
