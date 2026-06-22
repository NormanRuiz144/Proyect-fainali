import Municipio from '#models/municipio'
import { ingresarMuni } from '#validators/municipio'
import type { HttpContext } from '@adonisjs/core/http'

export default class MunicipiosController {
  async obtenerMunicipios({ response, request }: HttpContext) {
    const pagina = request.input('page')
    const contenidoPagina = 5

    let listaMuni: Municipio[]

    if (isNaN(pagina)) {
      listaMuni = await Municipio.query().select('*')
    } else {
      listaMuni = await Municipio.query().select('*').paginate(pagina, contenidoPagina)
    }

    if (!listaMuni || listaMuni.length == 0) {
      throw new Error('No se han encontrado Municipios.')
    }
    return response.ok({ lista_Municipios: listaMuni })
  }

  async municipiosPorDepartamento({ params, response }: HttpContext) {
    const idDepart = Number(params.id)

    if (isNaN(idDepart)) {
      return response.status(400).json({ mensaje: 'ID de departamento inválido.' })
    }

    const listaMuni = await Municipio.query().where('id_departamento', idDepart)

    if (!listaMuni || listaMuni.length === 0) {
      return response
        .status(404)
        .json({ mensaje: 'No se encontraron municipios para este departamento.' })
    }

    return response.ok({ lista_Municipios: listaMuni })
  }

  async crearMunicipio({ request, response }: HttpContext) {
    const { nomMunicipio, idDepartamento } = await request.validateUsing(ingresarMuni)
    const exite = await Municipio.query()
      .where('nom_municipio', nomMunicipio)
      .andWhere('id_departamento', idDepartamento)
      .first()
    if (exite) {
      return response.status(404).json({
        mensaje: `Ya existe un Municipio con el nombre: ${nomMunicipio}.`,
      })
    }
    const nuevoMuni = await Municipio.create({
      idDepartamento: idDepartamento,
      nomMunicipio: nomMunicipio,
    })

    if (!nuevoMuni) {
      throw new Error('No se ha creado el municipio.')
    }
    return response.ok({ mensaje: 'Municipio creado.', Municipio: nuevoMuni })
  }

  // Actualizar un Departamento
  async actualizarMunicipio({ params, request, response }: HttpContext) {
    const idMuni = Number(params.id)
    const nuevoMuni = await request.validateUsing(ingresarMuni)

    const exite = await Municipio.query()
      .where('nom_municipio', nuevoMuni.nomMunicipio)
      .andWhere('id_departamento', nuevoMuni.idDepartamento)
      .first()
    if (exite) {
      return response.status(404).json({
        mensaje: `Ya existe un Municipio con el nombre: ${nuevoMuni.nomMunicipio}.`,
      })
    }

    let encontradoMuni = await Municipio.query().where('id', idMuni).first()

    if (encontradoMuni) {
      encontradoMuni.nomMunicipio = nuevoMuni.nomMunicipio
      await encontradoMuni.save()
      return response.ok({ mensage: 'El municipio sea actualizado correctamente.' })
    }
    return response.status(404).json({ mensaje: 'El municipio no pudo ser actualizado.' })
  }

  async eliminarMunicipio({ params, response }: HttpContext) {
    const idMuni = Number(params.id)
    const encontradoMuni = await Municipio.query().where('id', idMuni).first()

    if (encontradoMuni && !encontradoMuni.isDeleted) {
      encontradoMuni.isDeleted = true
      await encontradoMuni.save()
      return response.ok({
        mensaje: 'El municipio se ha eliminado correctamente.',
      })
    }

    return response.status(404).json({
      mensaje: 'El municipio no pudo ser encontrado para eliminar.',
    })
  }

  async restaurarMunicipio({ params, response }: HttpContext) {
    const idMuni = Number(params.id)
    const encontradoMuni = await Municipio.query().where('id', idMuni).first()

    if (encontradoMuni && encontradoMuni.isDeleted) {
      encontradoMuni.isDeleted = false
      await encontradoMuni.save()
      return response.ok({
        mensaje: 'El municipio se ha restaurado correctamente.',
      })
    }

    return response.status(404).json({
      mensaje: 'El municipio no pudo ser encontrado para restaurar.',
    })
  }
}
