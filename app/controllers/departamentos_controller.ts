import type { HttpContext } from '@adonisjs/core/http'
import Departamento from '#models/departamento'
import { ingresarDepart } from '#validators/departamento'

export default class DepartamentosController {
  // Listar todos los Departamentos
  /**
   * @obtenerDepartamentos
   * @tag Hola
   * @summary Obtener todos los departamnetos
   * @responseBody 200 - {lista_Departamentos: {id: number, nom_departamento:string }}
   */
  async obtenerDepartamentos({ response, request }: HttpContext) {
    const pagina = request.input('page')
    const contenidoPagina = 5

    let listadepart: Departamento[]

    if (isNaN(pagina)) {
      listadepart = await Departamento.query().select('*')
    } else {
      listadepart = await Departamento.query().select('*').paginate(pagina, contenidoPagina)
    }

    if (!listadepart || listadepart.length == 0) {
      throw new Error('No se han encontrado departamentos.')
    }
    return response.ok({ lista_Departamentos: listadepart })
  }

  // Crear un nuevos Departamento
  async crearDepartamento({ request, response }: HttpContext) {
    const { nomDepartamento } = await request.validateUsing(ingresarDepart)
    const exite = await Departamento.query().where('nom_departamento', nomDepartamento).first()
    if (exite) {
      return response.status(404).json({
        mensaje: `Ya existe un Departamento con el nombre: ${nomDepartamento}.`,
      })
    }
    const nuevoDepart = await Departamento.create({ nomDepartamento })

    if (!nuevoDepart) {
      throw new Error('No se ha creado el departamento.')
    }
    return response.ok({ mensaje: 'Departamento creado.', departamento: nuevoDepart })
  }

  // Actualizar un Departamento
  async actualizarDepart({ params, request, response }: HttpContext) {
    const idDepart = Number(params.id)
    const nuevoDepart = await request.validateUsing(ingresarDepart)

    const exite = await Departamento.query()
      .where('nom_departamento', nuevoDepart.nomDepartamento)
      .andWhere('id', '!=', idDepart)
      .first()
    if (exite) {
      return response.status(404).json({
        mensaje: `Ya existe un Departamento con el nombre: ${nuevoDepart.nomDepartamento}.`,
      })
    }

    let encontradoDepart = await Departamento.query().where('id', idDepart).first()

    if (encontradoDepart) {
      encontradoDepart.nomDepartamento = nuevoDepart.nomDepartamento
      await encontradoDepart.save()
      return response.ok({ mensage: 'El departamento sea actualizado correctamente.' })
    }
    return response.status(404).json({ mensaje: 'El departamento no pudo ser actualizado.' })
  }

  // Eliminar un Departamento
  async eliminarDepartamento({ params, response }: HttpContext) {
    const idDepart = Number(params.id)
    const encontradoDepart = await Departamento.query().where('id', idDepart).first()

    if (encontradoDepart && !encontradoDepart.isDeleted) {
      encontradoDepart.isDeleted = true
      await encontradoDepart.save()
      return response.ok({
        mensaje: 'El departamento se ha eliminado correctamente.',
      })
    }

    return response.status(404).json({
      mensaje: 'El departamento no pudo ser encontrado para eliminar.',
    })
  }

  async restaurarDepartamento({ params, response }: HttpContext) {
    const idDepart = Number(params.id)
    const encontradoDepart = await Departamento.query().where('id', idDepart).first()

    if (encontradoDepart && encontradoDepart.isDeleted) {
      encontradoDepart.isDeleted = false
      await encontradoDepart.save()
      return response.ok({
        mensaje: 'El departamento se ha restaurado correctamente.',
      })
    }

    return response.status(404).json({
      mensaje: 'El departamento no pudo ser encontrado para restaurar.',
    })
  }
}
