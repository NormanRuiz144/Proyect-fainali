import type { HttpContext } from '@adonisjs/core/http'
import { ingresarInstitu } from '#validators/institucione'
import Institucione from '#models/institucione'

export default class InstitucionesController {
  // Listar todas las instituciones//
  async obtenerInstituciones({ response }: HttpContext) {
    const listinstituc = await Institucione.all()

    if (!listinstituc || listinstituc.length === 0) {
      throw new Error('No se han encontrado Instituciones.')
    }
    return response.ok({ lista_Instituciones: listinstituc })
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
}
