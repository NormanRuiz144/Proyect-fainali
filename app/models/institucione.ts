import { InstitucioneSchema } from '#database/schema'
import { belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Municipio from './municipio.ts'

export default class Institucione extends InstitucioneSchema {
@column({ columnName: 'id_municipio' }) declare id_municipio: number

@belongsTo(() => Municipio, { foreignKey: 'id_municipio', })

declare municipio: BelongsTo<typeof  Municipio>
}