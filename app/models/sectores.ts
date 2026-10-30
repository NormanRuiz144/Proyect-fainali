import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { SectoreSchema } from '#database/schema'
import Incidencia from './incidencia.ts'
import Usuario from './user.ts'

export default class Sectores extends SectoreSchema {
  @hasMany(() => Usuario, { foreignKey: 'idSector' })
  declare usuarios: HasMany<typeof Usuario>

  @hasMany(() => Incidencia, { foreignKey: 'idSector' })
  declare incidencias: HasMany<typeof Incidencia>
}
