import { MunicipioSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Departamento from './departamento.ts'
import Institucione from './institucione.ts'
import Sectores from './sectores.ts'

export default class Municipio extends MunicipioSchema {
  @belongsTo(() => Departamento, { foreignKey: 'idDepartamento' })
  declare departamento: BelongsTo<typeof Departamento>

  @hasMany(() => Institucione)
  declare institucion: HasMany<typeof Institucione>

  @hasMany(() => Sectores)
  declare sector: HasMany<typeof Sectores>
}
