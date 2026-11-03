import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/user'
import UserTransformer from '#transformers/user_transformer'
import {
  actualizarUsuarioValidator,
  crearUsuarioValidator,
  signupValidator,
} from '#validators/user'

export default class UserController {
  async registrarse({ request, response }: HttpContext) {
    const data = await request.validateUsing(signupValidator)
    const user = await Usuario.create({
      numeroCedula: data.numeroCedula,
      nombres: data.nombres,
      apellidos: data.apellidos,
      sexo: data.sexo ?? null,
      correo: data.correo,
      password: data.password,
      idSector: data.idSector,
    })

    await user.load((preloader) => preloader.load('sector'))
    const token = await Usuario.accessTokens.create(user)

    return response.created({
      user: UserTransformer.transform(user),
      token: token.value!.release(),
    })
  }

  async listUsuarios({ request, response }: HttpContext) {
    const page = Number(request.input('page', 1))
    if (!Number.isInteger(page) || page < 1) {
      return response.badRequest({ message: 'El parámetro page debe ser un entero positivo.' })
    }

    const users = await Usuario.query()
      .preload('sector')
      .preload('operador')
      .orderBy('nombres')
      .paginate(page, 10)

    return response.ok({ lista: users })
  }

  async crearUsuario({ request, response }: HttpContext) {
    const data = await request.validateUsing(crearUsuarioValidator)
    const user = await Usuario.create({
      numeroCedula: data.numeroCedula,
      nombres: data.nombres,
      apellidos: data.apellidos,
      sexo: data.sexo ?? null,
      correo: data.correo,
      password: data.password,
      idSector: data.idSector,
    })

    return response.created({ message: 'Usuario creado correctamente.', user })
  }

  async buscarUsurioById({ params, response }: HttpContext) {
    const userId = Number(params.userId)
    if (!Number.isInteger(userId) || userId < 1) {
      return response.badRequest({ message: 'ID de usuario inválido.' })
    }

    const user = await Usuario.query()
      .where('id', userId)
      .preload('sector')
      .preload('operador')
      .first()
    if (!user) {
      return response.notFound({ message: 'Usuario no encontrado.' })
    }

    return response.ok({ message: 'Usuario encontrado.', usuario: user })
  }

  async actualizarUsuario({ params, request, response, auth }: HttpContext) {
    const userId = Number(params.userId)
    if (!Number.isInteger(userId) || userId < 1) {
      return response.badRequest({ message: 'ID de usuario inválido.' })
    }

    const authenticatedUser = auth.getUserOrFail()
    if (authenticatedUser.id !== userId) {
      return response.forbidden({ message: 'No tienes permisos para actualizar este perfil.' })
    }

    const user = await Usuario.find(userId)
    if (!user) {
      return response.notFound({ message: 'Usuario no encontrado.' })
    }

    const data = await request.validateUsing(actualizarUsuarioValidator)
    if (data.correo && data.correo !== user.correo) {
      const duplicate = await Usuario.query().where('correo', data.correo).first()
      if (duplicate) {
        return response.conflict({ message: 'El correo ya está registrado.' })
      }
    }
    if (data.numeroCedula && data.numeroCedula !== user.numeroCedula) {
      const duplicate = await Usuario.query().where('numero_cedula', data.numeroCedula).first()
      if (duplicate) {
        return response.conflict({ message: 'La cédula ya está registrada.' })
      }
    }

    user.merge(data)
    await user.save()
    return response.ok({ message: 'Usuario actualizado correctamente.', user })
  }
}
