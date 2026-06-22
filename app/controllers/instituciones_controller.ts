import type { HttpContext } from '@adonisjs/core/http'
import { ingresarInstitu } from '#validators/institucione'
import Institucione from '#models/institucione'

export default class InstitucionesController {
  // Listar todas las instituciones//
  async obtenerInstituciones({ response, request }: HttpContext) {
    const pagina = request.input('page')
    const contenidoPagina = 5

    let listinstituc: Institucione[]

    if (isNaN(pagina)) {
      listinstituc = await Institucione.query().select('*')
    } else {
      listinstituc = await Institucione.query().select('*').paginate(pagina, contenidoPagina)
    }

    if (!listinstituc || listinstituc.length === 0) {
      throw new Error('No se han encontrado Instituciones.')
    }
    return response.ok({ lista_Instituciones: listinstituc })
  }

  //Filtar por municipio del usuario
  async institucionesPorMunicipio({ params, response }: HttpContext) {
    const idMuni = Number(params.id)

    if (isNaN(idMuni)) {
      return response.status(400).json({ mensaje: 'ID de municipio inválido.' })
    }

    const listaInstituc = await Institucione.query().where('id_municipio', idMuni)

    if (!listaInstituc || listaInstituc.length === 0) {
      return response
        .status(404)
        .json({ mensaje: 'No se encontraron instituciones para este municipio.' })
    }

    return response.ok({ lista_Instituciones: listaInstituc })
  }

  // Crear un nueva Institucion//
  async crearInstitucion({ request, response }: HttpContext) {
    const { nombreInstitucion, idMunicipio } = await request.validateUsing(ingresarInstitu)
    const exite = await Institucione.query().where('nombre_institucion', nombreInstitucion).first()
    if (exite) {
      return response.status(404).json({
        mensaje: `Ya existe una institucion con ese nombre: ${nombreInstitucion}.`,
      })
    }
    const nuevaInstituc = await Institucione.create({
      nombreInstitucion,
      idMunicipio: idMunicipio,
    })

    if (!nuevaInstituc) {
      throw new Error('No se ha creado el Institucione.')
    }
    return response.ok({ mensaje: 'Institucion creada.', Institucione: nuevaInstituc })
  }

  // Actualizar una Institucion//ese creo que no sea necesario pero lo deje XD
  async actualizarInstituc({ params, request, response }: HttpContext) {
    const idInstituc = Number(params.id)
    const nuevaInstituc = await request.validateUsing(ingresarInstitu)

    const exite = await Institucione.query()
      .where('nombre_institucion', nuevaInstituc.nombreInstitucion)
      .andWhere('id', '!=', idInstituc)
      .first()
    if (exite) {
      return response.status(404).json({
        mensaje: `Ya existe una Institucion con ese nombre: ${nuevaInstituc.nombreInstitucion}.`,
      })
    }

    let encontradaInstituc = await Institucione.query().where('id', idInstituc).first()

    if (encontradaInstituc) {
      encontradaInstituc.nombreInstitucion = nuevaInstituc.nombreInstitucion
      encontradaInstituc.idMunicipio = nuevaInstituc.idMunicipio
      await encontradaInstituc.save()
      return response.ok({ mensage: 'La institucion se a actualizado correctamente.' })
    }
    return response.status(404).json({ mensaje: 'La institucion no pude ser actualizado.' })
  }

  // Eliminar una Institucion
  async eliminarInstitucion({ params, response }: HttpContext) {
    const idInstituc = Number(params.id)
    const encontradaInstituc = await Institucione.query().where('id', idInstituc).first()

    if (encontradaInstituc && !encontradaInstituc.isDeleted) {
      encontradaInstituc.isDeleted = true
      await encontradaInstituc.save()
      return response.ok({
        mensaje: 'La institucion se ha eliminado correctamente.',
      })
    }

    return response.status(404).json({
      mensaje: 'La institucion no pudo ser encontrada para eliminar.',
    })
  }

  async restaurarInstitucion({ params, response }: HttpContext) {
    const idInstituc = Number(params.id)
    const encontradaInstituc = await Institucione.query().where('id', idInstituc).first()

    if (encontradaInstituc && encontradaInstituc.isDeleted) {
      encontradaInstituc.isDeleted = false
      await encontradaInstituc.save()
      return response.ok({
        mensaje: 'La institucion se ha restaurado correctamente.',
      })
    }

    return response.status(404).json({
      mensaje: 'La institucion no pudo ser encontrada para restaurar.',
    })
  }
}
