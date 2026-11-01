import type { HttpContext } from '@adonisjs/core/http'
import UserTransformer from '#transformers/user_transformer'

export default class ProfileController {
  async show({ auth, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    await user.load((preloader) => {
      preloader.load('sector')
      preloader.load('operador', (operadorQuery) => {
        operadorQuery.preload('permisosAsignados', (asignacionesQuery) => {
          asignacionesQuery.where('activo', true).preload('permiso')
        })
      })
    })

    return serialize(UserTransformer.transform(user))
  }
}
