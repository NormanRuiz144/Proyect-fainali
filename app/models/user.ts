import { UsuarioSchema } from '#database/schema'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { type AccessToken, DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import Institucione from './institucione.ts'

export default class User extends compose(UsuarioSchema, withAuthFinder(hash)) {
  static accessTokens = DbAccessTokensProvider.forModel(User)
  declare currentAccessToken?: AccessToken

  get initials() {
    const [first, last] = this.nombres ? this.nombres.split(' ') : this.correo.split('@')
    if (first && last) {
      return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase()
    }
    return `${first.slice(0, 2)}`.toUpperCase()
  }

  // Relaciones
  @belongsTo(() => Institucione)
  declare Institucion: BelongsTo<typeof Institucione>
  // @belongsTo(() => Role)
  // declare rol: BelongsTo<typeof Institucione>
  // @belongsTo(() => Sectores)
  // declare sector: BelongsTo<typeof Institucione>
}
