import { RoleSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Usuario from './user.ts'

export default class Roles extends RoleSchema {
  @hasMany(() => Usuario)
  declare usuario: HasMany<typeof Usuario>

}
