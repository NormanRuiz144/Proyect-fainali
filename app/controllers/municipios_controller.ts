import type { HttpContext } from '@adonisjs/core/http'
import Departamento from '#models/departamento'
import Municipio from '#models/municipio'
import { ingresarMuni } from '#validators/municipio'

export default class MunicipiosController {
  async obtenerMunicipios({ response, request }: HttpContext) {
    const requestedPage = request.input('page')

    if (requestedPage === undefined) {
      const municipios = await Municipio.query().where('is_deleted', false).orderBy('nom_municipio')
      return response.ok({ lista_Municipios: municipios })
    }

    const page = Number(requestedPage)
    if (!Number.isInteger(page) || page < 1) {
      return response.badRequest({ mensaje: 'El parámetro page debe ser un entero positivo.' })
    }

    const municipios = await Municipio.query()
      .where('is_deleted', false)
      .orderBy('nom_municipio')
      .paginate(page, 5)

    return response.ok({ lista_Municipios: municipios })
  }

  async municipiosPorDepartamento({ params, response }: HttpContext) {
    const idDepartamento = Number(params.id)
    if (!Number.isInteger(idDepartamento) || idDepartamento < 1) {
      return response.badRequest({ mensaje: 'ID de departamento inválido.' })
    }

    const municipios = await Municipio.query()
      .where('id_departamento', idDepartamento)
      .where('is_deleted', false)
      .orderBy('nom_municipio')

    return response.ok({ lista_Municipios: municipios })
  }

  async crearMunicipio({ request, response }: HttpContext) {
    const { nomMunicipio, idDepartamento } = await request.validateUsing(ingresarMuni)
    const departamento = await Departamento.find(idDepartamento)
    if (!departamento || departamento.isDeleted) {
      return response.notFound({ mensaje: 'Departamento no encontrado o eliminado.' })
    }

    const existente = await Municipio.query().where('nom_municipio', nomMunicipio).first()
    if (existente) {
      return response.conflict({
        mensaje: `Ya existe un municipio con el nombre: ${nomMunicipio}.`,
      })
    }

    const municipio = await Municipio.create({ idDepartamento, nomMunicipio })
    return response.created({ mensaje: 'Municipio creado.', municipio })
  }

  async actualizarMunicipio({ params, request, response }: HttpContext) {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ mensaje: 'ID de municipio inválido.' })
    }

    const { nomMunicipio, idDepartamento } = await request.validateUsing(ingresarMuni)
    const municipio = await Municipio.find(id)
    if (!municipio) {
      return response.notFound({ mensaje: 'Municipio no encontrado.' })
    }

    const departamento = await Departamento.find(idDepartamento)
    if (!departamento || departamento.isDeleted) {
      return response.notFound({ mensaje: 'Departamento no encontrado o eliminado.' })
    }

    const duplicado = await Municipio.query()
      .where('nom_municipio', nomMunicipio)
      .whereNot('id', id)
      .first()
    if (duplicado) {
      return response.conflict({
        mensaje: `Ya existe un municipio con el nombre: ${nomMunicipio}.`,
      })
    }

    municipio.nomMunicipio = nomMunicipio
    municipio.idDepartamento = idDepartamento
    await municipio.save()
    return response.ok({ mensaje: 'Municipio actualizado correctamente.', municipio })
  }

  async eliminarMunicipio({ params, response }: HttpContext) {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ mensaje: 'ID de municipio inválido.' })
    }

    const municipio = await Municipio.find(id)
    if (!municipio || municipio.isDeleted) {
      return response.notFound({ mensaje: 'Municipio no encontrado o ya eliminado.' })
    }

    municipio.isDeleted = true
    await municipio.save()
    return response.ok({ mensaje: 'Municipio eliminado correctamente.' })
  }

  async restaurarMunicipio({ params, response }: HttpContext) {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ mensaje: 'ID de municipio inválido.' })
    }

    const municipio = await Municipio.find(id)
    if (!municipio || !municipio.isDeleted) {
      return response.notFound({ mensaje: 'Municipio no encontrado o ya activo.' })
    }

    municipio.isDeleted = false
    await municipio.save()
    return response.ok({ mensaje: 'Municipio restaurado correctamente.' })
  }
}
