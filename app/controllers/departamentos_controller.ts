import type { HttpContext } from '@adonisjs/core/http'
import Departamento from '#models/departamento'
import { ingresarDepart } from '#validators/departamento'

export default class DepartamentosController {
  async obtenerDepartamentos({ response }: HttpContext) {
    const listadepart = await Departamento.all()

    if (!listadepart || listadepart.length == 0) {
      throw new Error('No se han encontrado departamentos.')
    }
    response.ok({ Lista: listadepart })
  }

  async crearDepartamentos({ request, response }: HttpContext) {
    const { nomdepartamento } = await request.validateUsing(ingresarDepart)
    const nuevoDepart = await Departamento.create({ nomdepartamento })

    if (!nuevoDepart) {
      throw new Error('No se ha creado el departamento.')
    }
    response.ok({ mensaje: 'Departamento creado.', departamento: nuevoDepart })
  }
}
