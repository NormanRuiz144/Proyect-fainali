import Municipio from '#models/municipio'
import Sectores from '#models/sectores'
import { ingresarSector } from '#validators/sector'
import type { HttpContext } from '@adonisjs/core/http'

export default class SectoresController {
  //GET_SECTORES//
  async obtenerSectores({ response }: HttpContext) {
    const listaSectores = await Sectores.all()

    if (!listaSectores || listaSectores.length == 0) {
      throw new Error('Vaya no se encontro ningun Sector.')
    }
    return response.ok({ lista_Sectores: listaSectores })
  }

  //GET_SECTOR_ID//

  public async obtenerSectorId({ params, response }: HttpContext) {
    const idSector = Number(params.id)

    // Validar que el id sea un número válido
    if (isNaN(idSector)) {
      return response.status(400).json({
        mensaje: 'El parámetro id no es válido.',
      })
    }

    // Buscar el sector por id
    const sector = await Sectores.find(idSector)

    if (!sector) {
      return response.status(404).json({
        mensaje: `Id no valido.`,
      })
    }

    // Respuesta exitosa
    return response.ok({
      mensaje: 'Sector encontrado.',
      sector,
    })
  }

  //GET_SECTORES_POR_MUNICIPIO//
  async sectoresPorMunicipio({ params, response }: HttpContext) {
    const idMuni = Number(params.id)

    if (isNaN(idMuni)) {
      return response.status(400).json({ mensaje: 'ID de municipio inválido.' })
    }

    const listaSectores = await Sectores.query().where('id_municipios', idMuni)

    return response.ok({ lista_Sectores: listaSectores || [] })
  }

  //POST_SECTOR//

  async crearSector({ request, response }: HttpContext) {
    // 1. Validar datos de entrada (VineJS)
    // Asegúrate de que en 'ingresarSector' el campo idMunicipio NO sea .optional()
    const { nomSector, idMunicipio } = await request.validateUsing(ingresarSector)

    // --- VALIDACIÓN DE OBLIGATORIEDAD Y EXISTENCIA ---
    if (!idMunicipio) {
      return response.status(400).json({
        mensaje: 'El ID del municipio es obligatorio para crear un sector.',
      })
    }

    // Verificar si el municipio existe en la base de datos
    const municipioExiste = await Municipio.find(idMunicipio)

    if (!municipioExiste) {
      return response.status(404).json({
        mensaje: `El municipio con ID ${idMunicipio} no existe. Debes incluir un municipio válido.`,
      })
    }

    // Verificar duplicidad compuesta (Nombre + Municipio)
    const existe = await Sectores.query()
      .where('nombre_sector', nomSector)
      .andWhere('id_municipios', idMunicipio) // Quitamos el '!' porque ya validamos que existe
      .first()

    if (existe) {
      return response.status(409).json({
        mensaje: `El sector '${nomSector}' ya existe en este municipio.`,
      })
    }

    // Creación del registro
    const nuevoSector = await Sectores.create({
      nombreSector: nomSector,
      idMunicipios: idMunicipio,
    })

    // Respuesta exitosa
    return response.created({
      mensaje: 'Sector creado correctamente.',
      Sectores: nuevoSector,
    })
  }

  // //PUT_SECTOR//
  async actualizarSector({ params, request, response }: HttpContext) {
    // Validar el FORMATO del ID del Sector
    const idSector = Number(params.id)

    if (isNaN(idSector) || idSector <= 0) {
      return response.status(400).json({
        mensaje: 'ID de sector inválido.',
      })
    }

    // Validar la EXISTENCIA del Sector
    const sectorEncontrado = await Sectores.find(idSector)

    if (!sectorEncontrado) {
      return response.status(404).json({
        mensaje: `El sector con ID ${idSector} no existe.`,
      })
    }

    // Validar los datos del cuerpo (Body)
    const datosNuevos = await request.validateUsing(ingresarSector)

    // --- NUEVAS VALIDACIONES ---

    // Validar que el municipio enviado EXISTA
    const municipioExiste = await Municipio.find(datosNuevos.idMunicipio)
    if (!municipioExiste) {
      return response.status(404).json({
        mensaje: `El municipio con ID ${datosNuevos.idMunicipio} no existe.`,
      })
    }

    // Validar que el municipio corresponda al registro que se intenta editar
    // Esto asegura que no estés intentando mover un sector a un municipio que no le pertenece originalmente
    if (sectorEncontrado.idMunicipios !== datosNuevos.idMunicipio) {
      return response.status(403).json({
        mensaje: 'El id del municipio enviado no corresponde al registro original de este sector.',
      })
    }

    // --- FIN DE NUEVAS VALIDACIONES ---

    // Verificar si el nuevo nombre ya está en uso por OTRO registro
    const existeNombre = await Sectores.query()
      .where('nombreSector', datosNuevos.nomSector)
      .whereNot('id', idSector)
      .first()

    if (existeNombre) {
      return response.status(409).json({
        mensaje: `El nombre del sector ya está en uso: ${datosNuevos.nomSector}.`,
      })
    }

    // Aplicar cambios y guardar
    sectorEncontrado.nombreSector = datosNuevos.nomSector
    sectorEncontrado.idMunicipios = datosNuevos.idMunicipio!

    await sectorEncontrado.save()

    return response.ok({
      mensaje: 'El sector fue actualizado correctamente.',
      sector: sectorEncontrado,
    })
  }

  async eliminarSector({ params, response }: HttpContext) {
    const idSector = Number(params.id)
    const encontradoSector = await Sectores.query().where('id', idSector).first()

    if (encontradoSector && !encontradoSector.isDeleted) {
      encontradoSector.isDeleted = true
      await encontradoSector.save()
      return response.ok({
        mensaje: 'El sector se ha eliminado correctamente.',
      })
    }

    return response.status(404).json({
      mensaje: 'El sector no pudo ser encontrado para eliminar.',
    })
  }

  async restaurarSector({ params, response }: HttpContext) {
    const idSector = Number(params.id)
    const encontradoSector = await Sectores.query().where('id', idSector).first()

    if (encontradoSector && encontradoSector.isDeleted) {
      encontradoSector.isDeleted = false
      await encontradoSector.save()
      return response.ok({
        mensaje: 'El sector se ha restaurado correctamente.',
      })
    }

    return response.status(404).json({
      mensaje: 'El sector no pudo ser encontrado para restaurar.',
    })
  }
}
