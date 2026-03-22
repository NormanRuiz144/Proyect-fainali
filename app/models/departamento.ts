import { DepartamentoSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Municipio from './municipio.ts'

export default class Departamento extends DepartamentoSchema {
  @hasMany(() => Municipio)
  declare municipios: HasMany<typeof Municipio>
}
