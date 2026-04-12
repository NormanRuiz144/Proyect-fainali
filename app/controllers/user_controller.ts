import Usuarios from '#models/user'
import {
  actualizarUsuarioValidator,
  bajaValidator,
  crearUsuarioValidator,
  signupValidator,
} from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import UserTransformer from '#transformers/user_transformer'
import { Exception } from '@adonisjs/core/exceptions'

export default class UserController {
  // Registrarse (usar Accesstoken)
  async registrarse({ request, serialize }: HttpContext) {
    const {
      numeroCedula,
      nombres,
      apellidos,
      sexo,
      correo,
      contrasena,
      idInstitucion,
      idSector,
      idRol,
    } = await request.validateUsing(signupValidator)

    const user = await Usuarios.create({
      numeroCedula,
      nombres,
      apellidos,
      sexo,
      correo,
      contrasena,
      idInstitucion: idInstitucion,
      idSector,
      idRol,
    })
    const token = await Usuarios.accessTokens.create(user)

    return serialize({
      user: UserTransformer.transform(user),
      token: token.value!.release(),
    })
  }

  // Listar los usuarios que formen parte de x institucion
  async listUsuariosInsti({ request, response }: HttpContext) {
    const idInti = request.input('idInstitucion')
    try {
      const list = await Usuarios.query()
        .select(['nombres', 'apellidos', 'correo', 'id_sector', 'id_rol'])
        .where('id_intitucion', idInti)

      if (list && list.length === 0) {
        response
          .status(400)
          .json({ message: 'No se an encontrado usuarios pertenecientes a dicha institucion.' })
      }

      response.status(200).json({ lista: list })
    } catch (error) {
      response.status(500).json({
        message: 'Error: Ocurrio un error al consultar con la base de datos.',
        error: error,
      })
    }
  }
  // Crear un Usuario (sin accessToken)
  async crearUsuario({ request, response }: HttpContext) {
    const data = await request.validateUsing(crearUsuarioValidator)
    try {
      const usuarioCreado = await Usuarios.create(data)
      response.status(201).json({ message: 'Usuario creado exitosamente', user: usuarioCreado })
    } catch (error) {
      response.status(500).json({
        message: 'Error: Ocurrio un error al crear el usuario.',
        error: error,
      })
    }
  }
  // Buscar usuarios por id
  async buscarUsurioById({ params, response }: HttpContext) {
    const userId = Number(params.userId)
    if (!userId) {
      throw new Exception('No se pudo realizar la busqueda', { status: 404 })
    }
    const usuarioFinded = await Usuarios.query().where('id', userId).firstOrFail()
    if (!usuarioFinded) {
      throw new Exception('Usuario no encontrado.', { status: 404 })
    }
    response.ok({ message: 'Usuario encontrado', Usuario: usuarioFinded })
  }
  // Actualizar datos de un usuario
  async actualizarUsuario({ params, request, response }: HttpContext) {
    const userId = Number(params.userId)
    const dataUpdate = await request.validateUsing(actualizarUsuarioValidator)
    if (!userId) {
      throw new Exception('No se pudo realizar la busqueda', { status: 404 })
    }
    const usuarioFinded = await Usuarios.query().where('id', userId).first()
    if (!usuarioFinded) {
      throw new Exception('Usuario no encontrado.', { status: 404 })
    }
    // zona pa actualizar
    usuarioFinded.nombres = dataUpdate.nombres || usuarioFinded.nombres
    usuarioFinded.apellidos = dataUpdate.apellidos || usuarioFinded.apellidos
    usuarioFinded.sexo = dataUpdate.sexo || usuarioFinded.sexo
    usuarioFinded.idSector = dataUpdate.idSector || usuarioFinded.idSector

    await usuarioFinded.save()

    response.ok({ message: 'Usuario actualizado', Usuario: usuarioFinded })
  }
  // Reasignar de Institucion
  async reasignarInstitucionRol({ params, request, response, auth }: HttpContext) {
    const userId = Number(params.userId)
    const userAuth = await auth.authenticate()
    const dataUpdate = await request.validateUsing(actualizarUsuarioValidator)
    if (!userId) {
      throw new Exception('No se pudo realizar la busqueda', { status: 404 })
    }
    const usuarioFinded = await Usuarios.query().where('id', userId).first()
    if (!usuarioFinded) {
      throw new Exception('Usuario no encontrado.', { status: 404 })
    }
    // zona pa actualizar
    if (userAuth.idRol == 1) {
      usuarioFinded.idRol = dataUpdate.idRol || usuarioFinded.idRol
      usuarioFinded.idInstitucion = dataUpdate.idInstitucion || usuarioFinded.idInstitucion
    } else {
      response.abort(
        { message: 'Error: Solo un usuario administardor puede realizar esa acción.' },
        403
      )
    }

    await usuarioFinded.save()
    await usuarioFinded.load('Institucion')
    // await usuarioFinded.load('Roles')

    response.ok({ message: 'Usuario reasignado', Usuario: usuarioFinded })
  }
  // Dar de baja de la institucion a la que pertenece
  async bajaInsti({ params, request, response, auth }: HttpContext) {
    const userId = Number(params.userId)
    const userAuth = await auth.authenticate()
    const { idInstitucion } = await request.validateUsing(bajaValidator)
    if (!userId) {
      throw new Exception('No se pudo realizar la busqueda', { status: 404 })
    }
    const usuarioFinded = await Usuarios.query().where('id', userId).first()
    if (!usuarioFinded) {
      throw new Exception('Usuario no encontrado.', { status: 404 })
    }
    // zona pa actualizar
    if (userAuth.idRol == 1 && userAuth.idInstitucion === idInstitucion) {
      usuarioFinded.idRol = 2
      usuarioFinded.idInstitucion = null
    } else {
      response.abort({ message: 'Error: No tienes acceso a este recurso.' }, 403)
    }
    await usuarioFinded.save()
    response.ok({ message: 'El Usuario ya no pertenece a la institucion' })
  }
  // Deshabilitar Usuario
}
