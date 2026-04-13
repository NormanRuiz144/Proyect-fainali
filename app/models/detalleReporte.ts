//import { DetallereporteSchema } from "#database/schema";
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
//import Reporte from "./reporte.ts";
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.ts'
import { DateTime } from 'luxon'
import Reporte from './reporte.ts'

export default class DetalleReportes extends BaseModel {
  public static table = 'detallereportes'

  @column({ isPrimary: true, columnName: 'id' })
  public id!: number
  @column()
  public descripcion!: string
  @column()
  public fechaSeguimiento!: DateTime
  @column()
  public id_reporte!: number
  @column()
  public id_usuario!: number

  @belongsTo(() => Reporte, { foreignKey: 'id_reporte' })
  public reporte!: BelongsTo<typeof Reporte>

  @belongsTo(() => User, { foreignKey: 'id_usuario' })
  public usuario!: BelongsTo<typeof User>
}
