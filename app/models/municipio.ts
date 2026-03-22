import { MunicipioSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Departamento from './departamento.ts'

export default class Municipio extends MunicipioSchema {
  @belongsTo(() => Departamento)
  declare departamento: BelongsTo<typeof Departamento>
}
