import Usuarios from '#models/user'
import {
  actualizarUsuarioValidator,
  bajaValidator,
  crearUsuarioValidator,
  reasignarValidator,
  signupValidator,
} from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import { Exception } from '@adonisjs/core/exceptions'

export default class UserController {
  // Registrarse (usar Accesstoken)
  async registrarse({ request, serialize }: HttpContext) {
    const { numeroCedula, nombres, apellidos, sexo, correo, contrasena, idSector } =
      await request.validateUsing(signupValidator)

    const userData: Record<string, unknown> = {
      numeroCedula,
      nombres,
      apellidos,
      sexo,
      correo,
      contrasena,
      idSector,
      idRol: 3,
    }

    const user = await Usuarios.create(userData)
    const token = await Usuarios.accessTokens.create(user)

    return serialize({
      // user: UserTransformer.transform(user),
      user: user,
      token: token.value!.release(),
    })
  }

  // Listar los usuarios
  async listUsuarios({ response, request }: HttpContext) {
    const pagina = request.input('page')
    const contenidoPagina = 5
    try {
      const list = await Usuarios.query()
        .select('id', 'numeroCedula', 'nombres', 'apellidos', 'correo', 'id_sector', 'id_rol')
        .where('id_rol', '!=', '1')
        .paginate(pagina, contenidoPagina)

      if (list && list.length === 0) {
        response.status(400).json({ message: 'No se han encontrado usuarios.' })
      }

      response.status(200).json({ lista: list })
    } catch (error) {
      response.status(500).json({
        message: 'Error: Ocurrio un error al consultar con la base de datos.',
        error: error,
      })
    }
  }
  // Listar los usuarios que formen parte de x institucion
  async listUsuariosInsti({ auth, response }: HttpContext) {
    const user = await auth.authenticate()
    const idInsti = user!.idInstitucion
    if (!idInsti) {
      throw new Exception('El usuario usado no tiene acceso este recurso.', { status: 403 })
    }
    try {
      const list = await Usuarios.query()
        .select('id', 'nombres', 'apellidos', 'correo', 'id_sector', 'id_rol')
        .where('id_institucion', idInsti || 0)

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
    const usuarioFinded = await Usuarios.query()
      .select('numero_cedula', 'nombres', 'apellidos', 'sexo', 'correo', 'id_rol', 'id_institucion')
      .where('id', userId)
      .firstOrFail()
    if (!usuarioFinded) {
      throw new Exception('Usuario no encontrado.', { status: 404 })
    }
    await usuarioFinded.load('rol')
    await usuarioFinded.load('Institucion')
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
    usuarioFinded.numeroCedula = dataUpdate.numeroCedula || usuarioFinded.numeroCedula
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
    const dataUpdate = await request.validateUsing(reasignarValidator)
    if (userAuth.id == userId) {
      throw new Exception('No puedes reasignarte a ti mismo', { status: 400 })
    }
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
    // const idInstitucion = userAuth.idInstitucion!
    // if (!userId) {
    //   throw new Exception('No se pudo realizar la busqueda', { status: 404 })
    // }
    const usuarioFinded = await Usuarios.query()
      .where('id', userId)
      // .andWhere('id_institucion', idInstitucion)
      .first()
    if (!usuarioFinded) {
      throw new Exception('Usuario no encontrado.', { status: 404 })
    }
    // zona pa actualizar
    // if (userAuth.idRol == 1 && userAuth.idInstitucion === idInstitucion) {
    if (userAuth.idRol == 1) {
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
