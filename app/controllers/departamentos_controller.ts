import type { HttpContext } from '@adonisjs/core/http'
import Departamento from '#models/departamento'
import { ingresarDepart } from '#validators/departamento'

export default class DepartamentosController {
  async obtenerDepartamentos({ response, request }: HttpContext) {
    const requestedPage = request.input('page')

    if (requestedPage === undefined) {
      const departamentos = await Departamento.query()
        .where('is_deleted', false)
        .orderBy('nom_departamento')
      return response.ok({ lista_Departamentos: departamentos })
    }

    const page = Number(requestedPage)
    if (!Number.isInteger(page) || page < 1) {
      return response.badRequest({ mensaje: 'El parámetro page debe ser un entero positivo.' })
    }

    const departamentos = await Departamento.query()
      .where('is_deleted', false)
      .orderBy('nom_departamento')
      .paginate(page, 5)

    return response.ok({ lista_Departamentos: departamentos })
  }

  async crearDepartamento({ request, response }: HttpContext) {
    const { nomDepartamento } = await request.validateUsing(ingresarDepart)
    const existente = await Departamento.query().where('nom_departamento', nomDepartamento).first()

    if (existente) {
      return response.conflict({
        mensaje: `Ya existe un departamento con el nombre: ${nomDepartamento}.`,
      })
    }

    const departamento = await Departamento.create({ nomDepartamento })
    return response.created({ mensaje: 'Departamento creado.', departamento })
  }

  async actualizarDepart({ params, request, response }: HttpContext) {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ mensaje: 'ID de departamento inválido.' })
    }

    const { nomDepartamento } = await request.validateUsing(ingresarDepart)
    const departamento = await Departamento.find(id)
    if (!departamento) {
      return response.notFound({ mensaje: 'Departamento no encontrado.' })
    }

    const duplicado = await Departamento.query()
      .where('nom_departamento', nomDepartamento)
      .whereNot('id', id)
      .first()
    if (duplicado) {
      return response.conflict({
        mensaje: `Ya existe un departamento con el nombre: ${nomDepartamento}.`,
      })
    }

    departamento.nomDepartamento = nomDepartamento
    await departamento.save()
    return response.ok({ mensaje: 'Departamento actualizado correctamente.', departamento })
  }

  async eliminarDepartamento({ params, response }: HttpContext) {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ mensaje: 'ID de departamento inválido.' })
    }

    const departamento = await Departamento.find(id)
    if (!departamento || departamento.isDeleted) {
      return response.notFound({ mensaje: 'Departamento no encontrado o ya eliminado.' })
    }

    departamento.isDeleted = true
    await departamento.save()
    return response.ok({ mensaje: 'Departamento eliminado correctamente.' })
  }

  async restaurarDepartamento({ params, response }: HttpContext) {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ mensaje: 'ID de departamento inválido.' })
    }

    const departamento = await Departamento.find(id)
    if (!departamento || !departamento.isDeleted) {
      return response.notFound({ mensaje: 'Departamento no encontrado o ya activo.' })
    }

    departamento.isDeleted = false
    await departamento.save()
    return response.ok({ mensaje: 'Departamento restaurado correctamente.' })
  }
}
