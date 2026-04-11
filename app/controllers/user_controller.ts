import User from '#models/user'
import { signupValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import UserTransformer from '#transformers/user_transformer'

export default class UserController {
  async store({ request, serialize }: HttpContext) {
    const {
      numero_cedula,
      nombres,
      apellidos,
      sexo,
      correo,
      contrasena,
      idInstitucion,
      idSector,
      idRol,
    } = await request.validateUsing(signupValidator)

    const user = await User.create({
      numeroCedula: numero_cedula,
      nombres,
      apellidos,
      sexo,
      correo,
      contrasena: contrasena,
      idInstitucion,
      idSector,
      idRol,
    })
    const token = await User.accessTokens.create(user)

    return serialize({
      user: UserTransformer.transform(user),
      token: token.value!.release(),
    })
  }
}
