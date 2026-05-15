import User from '#models/user'
import { loginValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import UserTransformer from '#transformers/user_transformer'
import env from '#start/env'

export default class AccessTokenController {
  async store({ request, serialize, response }: HttpContext) {
    const { correo, contrasena } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(correo, contrasena)
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
      // token: token.value!.release(),
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
