import Roles from "#models/roles"
import { ingresarRol } from "#validators/roles"
import type { HttpContext } from '@adonisjs/core/http'


//GET_ROL//

 export default class RolesController {


  async obtenerRol({ response }: HttpContext) {
    const listaRol = await Roles.all()

    if (!listaRol || listaRol.length == 0) {
      throw new Error('Vaya no se encontro ningun rol.')
    }
    return response.ok({ lista_Rol: listaRol })
  }



//GET_POR_ID
    public async obtenerRolId({ params, response }: HttpContext) {
      const idRol = Number(params.id)

      // Validar que el id sea un número válido
      if (isNaN(idRol)) {
        return response.status(400).json({
          mensaje: 'El parámetro id no es válido.',
        })
      }

      // Buscar el sector por id
      const rol = await Roles.find(idRol)

      if (!rol) {
        return response.status(404).json({
          mensaje: `Ingresar un Id valido.`,
        })
      }

      // Respuesta exitosa
      return response.ok({
        mensaje: 'Rol encontrado.',
        rol,
      })
  }

//POST_ROL//

  async crearRol({ request, response }: HttpContext) {
    const { nomRol  } = await request.validateUsing(ingresarRol)
    const exite = await Roles.query().where('rol', nomRol).first()
    if (exite) {
       return response.status(404).json({
        mensaje: `El nombre del rol ya existe: ${nomRol}.`,
      })
    }
    const nuevoRol = await Roles.create({rol:nomRol})

    if (!nuevoRol) {
      throw new Error('No se creo el Rol.')
    }
    return response.ok({ mensaje: 'Rol creado.', Roles: nuevoRol })
  }

//PUT_ROL//

async actualizarRol({ params, request, response }: HttpContext) {
  //  Validar que el ID sea un número válido
  const idRol = Number(params.id)

  if (isNaN(idRol) || idRol <= 0) {
    return response.status(400).json({
      mensaje: 'ID de rol inválido, debe ser un número válido.',
    })
  }

  // Validar que el ROL EXISTA en la base de datos antes de continuar
  const rolEncontrado = await Roles.find(idRol)

  if (!rolEncontrado) {
    return response.status(404).json({
      mensaje: `El rol con ID ${idRol} no existe.`,
    })
  }

  // Validar los datos del cuerpo (Body)
  const nuevoRol = await request.validateUsing(ingresarRol)

  // Verificar si el nuevo nombre del rol ya existe en OTRO registro
  // Usamos whereNot para que no choque con el registro que estamos editando
  const existeNombre = await Roles.query()
    .where('rol', nuevoRol.nomRol)
    .whereNot('id', idRol)
    .first()

  if (existeNombre) {
    return response.status(409).json({
      mensaje: `El nombre de rol '${nuevoRol.nomRol}' ya está siendo usado por otro registro.`,
    })
  }

  // Actualizar y guardar
  rolEncontrado.rol = nuevoRol.nomRol
  await rolEncontrado.save()

  return response.ok({
    mensaje: 'El rol fue actualizado correctamente.',
    rol: rolEncontrado
  })
}

}

//DESABILITAR//
