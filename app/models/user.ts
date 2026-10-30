import { UsuarioSchema } from '#database/schema'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { type AccessToken, DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import { belongsTo, hasMany, hasOne } from '@adonisjs/lucid/orm'
import BannedUser from './banned_user.ts'
import Incidencia from './incidencia.ts'
import Mensaje from './mensaje.ts'
import Operador from './operador.ts'
import Sectores from './sectores.ts'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['correo'],
  passwordColumnName: 'password',
})

export default class Usuario extends compose(UsuarioSchema, AuthFinder) {
  static accessTokens = DbAccessTokensProvider.forModel(Usuario)
  declare currentAccessToken?: AccessToken

  @belongsTo(() => Sectores, { foreignKey: 'idSector' })
  declare sector: BelongsTo<typeof Sectores>

  @hasOne(() => Operador, { foreignKey: 'idUsuario' })
  declare operador: HasOne<typeof Operador>

  @hasMany(() => Incidencia, { foreignKey: 'idUsuario' })
  declare incidencias: HasMany<typeof Incidencia>

  @hasMany(() => Mensaje, { foreignKey: 'creadoPor' })
  declare mensajes: HasMany<typeof Mensaje>

  @hasMany(() => BannedUser, { foreignKey: 'idUsuario' })
  declare baneos: HasMany<typeof BannedUser>
}
