import { BannedUserSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Operador from './operador.ts'
import Usuario from './user.ts'

export default class BannedUser extends BannedUserSchema {
  @belongsTo(() => Usuario, { foreignKey: 'idUsuario' })
  declare usuario: BelongsTo<typeof Usuario>

  @belongsTo(() => Operador, { foreignKey: 'idOperador' })
  declare operador: BelongsTo<typeof Operador>
}
