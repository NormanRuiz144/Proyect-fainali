import { UsuarioSchema } from '#database/schema'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { type AccessToken, DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import Institucione from './institucione.ts'
import Roles from './roles.ts'
import Sectores from './sectores.ts'
import Reporte from './reporte.ts'
import DetalleReportes from './detalleReporte.ts'
import { column } from '@adonisjs/lucid/orm'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['correo'],
  passwordColumnName: 'contrasena',
})

export default class Usuario extends compose(UsuarioSchema, AuthFinder) {
  @column({ columnName: 'contrasena', isPrimary: false })
  declare contrasena: string
  static accessTokens = DbAccessTokensProvider.forModel(Usuario)
  declare currentAccessToken?: AccessToken

  // Relaciones
  @belongsTo(() => Institucione, { foreignKey: 'idInstitucion' })
  declare Institucion: BelongsTo<typeof Institucione>

  @belongsTo(() => Roles, { foreignKey: 'idRol' })
  declare rol: BelongsTo<typeof Roles>

  @belongsTo(() => Sectores, { foreignKey: 'idSector' })
  declare sector: BelongsTo<typeof Sectores>

  @hasMany(() => Reporte)
  declare reporte: HasMany<typeof Reporte>

  @hasMany(() => DetalleReportes)
  declare detalleReporte: HasMany<typeof DetalleReportes>
}
