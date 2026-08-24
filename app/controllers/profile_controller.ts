import UserTransformer from '#transformers/user_transformer'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProfileController {
  async show({ auth, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    await user.load((preloader) => {
      preloader.load('rol')
      preloader.load('Institucion')
      preloader.load('sector', (sectorQuery) => {
        sectorQuery.preload('municipio')
      })
    })

    return serialize(UserTransformer.transform(user))
  }
}
