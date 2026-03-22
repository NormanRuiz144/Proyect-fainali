import { DepartamentoSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Municipio from './municipio.ts'

export default class Departamento extends DepartamentoSchema {
  @belongsTo(() => Municipio)
  declare municipio: BelongsTo<typeof Municipio>
}
