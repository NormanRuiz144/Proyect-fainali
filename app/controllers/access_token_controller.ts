import type { HttpContext } from '@adonisjs/core/http'
import env from '#start/env'
import UserTransformer from '#transformers/user_transformer'
import { loginValidator } from '#validators/user'
import BannedUser from '#models/banned_user'
import User from '#models/user'
import { DateTime } from 'luxon'

export default class AccessTokenController {
  async store({ request, serialize, response }: HttpContext) {
    const { correo, password } = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(correo, password)

    await user.load((preloader) => {
      preloader.load('sector')
      preloader.load('operador')
    })

    const activeBan = await BannedUser.query()
      .where('id_usuario', user.id)
      .where('activo', true)
      .first()

    if (activeBan) {
      const expired =
        activeBan.tipoBan === 'TEMPORAL' &&
        activeBan.fechaFin !== null &&
        activeBan.fechaFin.toMillis() <= DateTime.now().toMillis()

      if (expired) {
        activeBan.activo = false
        await activeBan.save()
      } else {
        return response.forbidden({
          message: 'Tu cuenta está suspendida.',
          motivo: activeBan.motivo,
          tipo: activeBan.tipoBan,
          fechaFin: activeBan.fechaFin,
        })
      }
    }

    const token = await User.accessTokens.create(user)
    const tokenValue = token.value!.release()

    response.cookie('token_access', tokenValue, {
      domain: '',
      path: '/',
      httpOnly: true,
      secure: env.get('NODE_ENV') === 'production',
      sameSite: 'lax',
      maxAge: '7d',
    })

    return serialize({ user: UserTransformer.transform(user), token: tokenValue })
  }

  async destroy({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    if (user.currentAccessToken) {
      await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    }

    response.clearCookie('token_access')
    return { message: 'Sesión cerrada correctamente.' }
  }
}
