import { BannedUserSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Usuario from '#models/user'

export default class BannedUser extends BannedUserSchema {
  @belongsTo(() => Usuario, { foreignKey: 'userId' })
  declare user: BelongsTo<typeof Usuario>

  @belongsTo(() => Usuario, { foreignKey: 'adminId' })
  declare adminUser: BelongsTo<typeof Usuario>
}
