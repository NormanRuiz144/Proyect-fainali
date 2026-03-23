import Problematica from '#models/problematica'
import { ingresarProblem } from '#validators/problematica'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProblematicasController {
    //Listar Problemas\\
    async obtenerProblematicas ({response}:HttpContext) {
        const listaproblem = await Problematica.all()

        if(!listaproblem || listaproblem.length == 0){
            throw new Error('Nose han enconctrado problematicas.')
        }
        return response.ok({lista_Problematicas:listaproblem})
    }

      // Crear un nueva problematica\\
      async crearProblematica({request, response}:HttpContext){
        const { problema } = await request.validateUsing(ingresarProblem)
        const nuevaProblem = await Problematica.create({ problema })

        if(!nuevaProblem) 
        {
        throw new Error('No se ha podido registrar la problematica.')
        }

        return response.ok({
            mensaje:'Problematica registrada con exito.',
            problematicas: nuevaProblem
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
        problematica: encontradaProblem 
      })
    }

    return response.status(404).json({ 
      mensaje: 'La problemática no pudo ser encontrada para actualizar.' 
    })
  }

      

}   