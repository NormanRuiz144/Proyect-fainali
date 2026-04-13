import { InstitucioneSchema } from '#database/schema'
import { belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Municipio from './municipio.ts'
import User from './user.ts'
import Reporte from './reporte.ts'

export default class Institucione extends InstitucioneSchema {
  @column({ columnName: 'id_municipio' })
  declare id_municipio: number

  @belongsTo(() => Municipio, { foreignKey: 'id_municipio' })
  declare municipio: BelongsTo<typeof Municipio>

  @hasMany(() => User, { foreignKey: 'id_institucion' })
  declare institucion: HasMany<typeof User>

  @hasMany(() => Reporte, { foreignKey: 'id_institucion' })
  declare reporte: HasMany<typeof Reporte>
}
