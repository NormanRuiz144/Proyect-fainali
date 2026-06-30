import User from '#models/user'
import BannedUser from '#models/banned_user'
import { loginValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import UserTransformer from '#transformers/user_transformer'
import env from '#start/env'
import { DateTime } from 'luxon'

export default class AccessTokenController {
  async store({ request, serialize, response }: HttpContext) {
    const { correo, contrasena } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(correo, contrasena)
    await user.load((preloader) => {
      preloader.load('rol')
      preloader.load('sector', (sectorQuery) => {
        sectorQuery.preload('municipio')
      })
    })

    const activeBan = await BannedUser.query()
      .where('user_id', user.id)
      .andWhere('activo', true)
      .first()
    if (activeBan) {
      if (
        activeBan.tipoBan === 'TEMPORAL' &&
        activeBan.fechaFin &&
        DateTime.fromISO(activeBan.fechaFin.toString()) < DateTime.now()
      ) {
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

    response.cookie('token_access', token.value?.release(), {
      domain: '',
      path: '/',
      httpOnly: true,
      secure: env.get('NODE_ENV') === 'production',
      sameSite: 'lax',
      maxAge: '7d',
    })

    return serialize({
      user: UserTransformer.transform(user),
      token: token.value!.release(),
    })
  }

  async destroy({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    if (user.currentAccessToken) {
      await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    }
    response.clearCookie('token_access')
    return {
      message: 'Logged out successfully',
    }
  }
}
