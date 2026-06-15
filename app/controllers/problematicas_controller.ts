import Institucione from '#models/institucione'
import Problematica from '#models/problematica'
import ProblematicaInstitucion from '#models/problematica_institucion'
import { ingresarProblem, asignarInstitucion } from '#validators/problematica'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProblematicasController {
  //Listar Problemas\\
  async obtenerProblematicas({ response }: HttpContext) {
    const listaproblem = await Problematica.all()

    if (!listaproblem || listaproblem.length == 0) {
      throw new Error('Nose han enconctrado problematicas.')
    }
    return response.ok({ lista_Problematicas: listaproblem })
  }

  // Crear un nueva problematica\\
  async crearProblematica({ request, response }: HttpContext) {
    const { problema } = await request.validateUsing(ingresarProblem)
    const nuevaProblem = await Problematica.create({ problema })

    if (!nuevaProblem) {
      throw new Error('No se ha podido registrar la problematica.')
    }

    return response.ok({
      mensaje: 'Problematica registrada con exito.',
      problematicas: nuevaProblem,
    })
  }

  // Actualizar una Problematica\\
  async actualizarProblematica({ params, request, response }: HttpContext) {
    const idProblem = Number(params.id)
    const nuevaProblem = await request.validateUsing(ingresarProblem)

    const encontradaProblem = await Problematica.query().where('id', idProblem).first()

    if (encontradaProblem) {
      encontradaProblem.problema = nuevaProblem.problema
      await encontradaProblem.save()
      return response.ok({
        mensaje: 'La problemática se ha actualizado correctamente.',
        problematica: encontradaProblem,
      })
    }

    return response.status(404).json({
      mensaje: 'La problemática no pudo ser encontrada para actualizar.',
    })
  }

  async eliminarProblematica({ params, response }: HttpContext) {
    const idProblem = Number(params.id)
    const encontradaProblem = await Problematica.query().where('id', idProblem).first()

    if (encontradaProblem && !encontradaProblem.isDeleted) {
      encontradaProblem.isDeleted = true
      await encontradaProblem.save()
      return response.ok({
        mensaje: 'La problemática se ha eliminado correctamente.',
      })
    }

    return response.status(404).json({
      mensaje: 'La problemática no pudo ser encontrada para eliminar.',
    })
  }

  async restaurarProblematica({ params, response }: HttpContext) {
    const idProblem = Number(params.id)
    const encontradaProblem = await Problematica.query().where('id', idProblem).first()

    if (encontradaProblem && encontradaProblem.isDeleted) {
      encontradaProblem.isDeleted = false
      await encontradaProblem.save()
      return response.ok({
        mensaje: 'La problemática se ha restaurado correctamente.',
      })
    }

    return response.status(404).json({
      mensaje: 'La problemática no pudo ser encontrada para restaurar.',
    })
  }

  async filtrarByInstitucion({ params, response }: HttpContext) {
    const problematicasInstitucion = await ProblematicaInstitucion.query().select('*')

    if (problematicasInstitucion.length === 0) {
      response.json({
        mensaje: 'No se han encontrado asociaciones entre problemáticas e instituciones.',
      })
      return
    }

    const idInstitucion = params.idInst
    const institucionEncontrada = await Institucione.query()
      .select('*')
      .where('id', idInstitucion)
      .first()
    if (!institucionEncontrada) {
      response.notFound('Error: La institucion no encontrada')
      return
    }

    const problematicas = await ProblematicaInstitucion.query()
      .select('*')
      .where('id_institucion', institucionEncontrada.id)
      .preload('problematica')

    return { lista_problematicas: problematicas }
  }
  async listarInstitucionesAsociadas({ params, response }: HttpContext) {
    const problematicasInstitucion = await ProblematicaInstitucion.query().select('*')

    if (problematicasInstitucion.length === 0) {
      response.json({
        mensaje: 'No se han encontrado asociaciones entre problemáticas e instituciones.',
      })
      return
    }

    const idProblematica = params.idProb
    const problematicaEncontrada = await Problematica.query()
      .select('*')
      .where('id', idProblematica)
      .first()
    if (!problematicaEncontrada) {
      response.notFound('Error: La problemática no encontrada')
      return
    }

    const instituciones = await ProblematicaInstitucion.query()
      .select('*')
      .where('id_problematica', problematicaEncontrada.id)
      .preload('institucion')

    return { lista_instituciones: instituciones }
  }

  async asignarIntitucion({ request, response }: HttpContext) {
    const { idInstitucion, idProblematica } = await request.validateUsing(asignarInstitucion)

    const institucionEncontrada = await Institucione.findBy('id', idInstitucion)
    const problematicaEncontrada = await Problematica.findBy('id', idProblematica)

    if (!institucionEncontrada || !problematicaEncontrada) {
      response.notFound('Error: Problematica o Institucion no encontradas')
      return
    } else {
      const asociacionExistente = await ProblematicaInstitucion.query()
        .where('id_institucion', idInstitucion)
        .where('id_problematica', idProblematica)
        .first()

      if (asociacionExistente) {
        response.conflict('Error: La asociación entre la problemática y la institución ya existe')
        return
      }
    }

    await ProblematicaInstitucion.create({
      idInstitucion: institucionEncontrada?.id,
      idProblematica: problematicaEncontrada?.id,
    })

    response.ok({ mensaje: 'Institucion asociada correctamente' })
  }

  async eliminarAsociacion({ request, response }: HttpContext) {
    const { idInstitucion, idProblematica } = await request.validateUsing(asignarInstitucion)

    const asociacion = await ProblematicaInstitucion.query()
      .where('id_institucion', idInstitucion)
      .where('id_problematica', idProblematica)
      .first()

    if (!asociacion) {
      response.notFound('Error: Asociación no encontrada')
      return
    }

    await asociacion.delete()
    response.ok({ mensaje: 'Asociación eliminada correctamente' })
  }
}
