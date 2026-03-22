import { MunicipioSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Departamento from './departamento.ts'

export default class Municipio extends MunicipioSchema {
  @hasMany(() => Departamento)
  declare departamento: HasMany<typeof Departamento>
}
