//import Municipio from "#models/municipio"
import Municipio from "#models/municipio"
import Sectores from "#models/sectores"
import { ingresarSector } from "#validators/sector"
//import { ingresarSector } from "#validators/sector"

import type { HttpContext } from '@adonisjs/core/http'
//import vine from "@vinejs/vine"


//GET_SECTORES//

 export default class SectoresController {
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
        mensaje: `No se encontró el sector con id ${idSector}.`,
      })
    }

    // Respuesta exitosa
    return response.ok({
      mensaje: 'Sector encontrado.',
      sector,
    })
}

//GET_SECTOR//

async crearSector({ request, response }: HttpContext) {
  // 1. Validar datos de entrada (VineJS)
  // Asegúrate de que en 'ingresarSector' el campo idMunicipio NO sea .optional()
  const { nomSector, idMunicipio } = await request.validateUsing(ingresarSector)

  // --- VALIDACIÓN DE OBLIGATORIEDAD Y EXISTENCIA ---
  if (!idMunicipio) {
    return response.status(400).json({
      mensaje: 'El ID del municipio es obligatorio para crear un sector.'
    })
  }

  // Verificar si el municipio existe en la base de datos
  const municipioExiste = await Municipio.find(idMunicipio)

  if (!municipioExiste) {
    return response.status(404).json({
      mensaje: `El municipio con ID ${idMunicipio} no existe. Debes incluir un municipio válido.`
    })
  }
  // -------------------------------------------------

  // 2. Verificar duplicidad compuesta (Nombre + Municipio)
  const existe = await Sectores.query()
    .where('nombre_sector', nomSector)
    .andWhere('id_municipios', idMunicipio) // Quitamos el '!' porque ya validamos que existe
    .first()

  if (existe) {
    return response.status(409).json({
      mensaje: `El sector '${nomSector}' ya existe en este municipio.`,
    })
  }

  // 3. Creación del registro
  const nuevoSector = await Sectores.create({
    nombreSector: nomSector,
    idMunicipios: idMunicipio
  })

  // 4. Respuesta exitosa
  return response.created({
    mensaje: 'Sector creado correctamente.',
    Sectores: nuevoSector
  })
}

// async crearSector({ request, response }: HttpContext) {
//   // 1. Validar datos de entrada (VineJS)
//   const { nomSector, idMunicipio } = await request.validateUsing(ingresarSector)

//   // --- NUEVA VALIDACIÓN: ¿Existe el municipio? ---
//   // Reemplaza 'Municipio' por el nombre real de tu modelo de Municipios
//   const municipioExiste = await Municipio.find(idMunicipio)

//   if (!municipioExiste) {
//     return response.status(404).json({
//       mensaje: `El municipio con ID ${idMunicipio} no existe. Por favor, ingresa un ID válido.`
//     })
//   }
//   // -----------------------------------------------

//   // 2. Verificar duplicidad compuesta (Nombre + Municipio)
//   const existe = await Sectores.query()
//     .where('nombre_sector', nomSector)
//     .andWhere('id_municipios', idMunicipio!)
//     .first()

//   if (existe) {
//     return response.status(409).json({
//       mensaje: `El sector '${nomSector}' ya existe en este municipio.`,
//     })
//   }

//   // 3. Creación del registro
//   const nuevoSector = await Sectores.create({
//     nombreSector: nomSector,
//     idMunicipios: idMunicipio
//   })

//   // 4. Respuesta exitosa
//   return response.created({
//     mensaje: 'Sector creado correctamente.',
//     Sectores: nuevoSector
//   })
// }

// async crearSector({ request, response }: HttpContext) {
//   // 1. Validar datos (usando tu validador con mensajes personalizados)
//   const { nomSector, idMunicipio } = await request.validateUsing(ingresarSector)

//   // 2. Verificar duplicidad compuesta (Nombre + Municipio)
//   const existe = await Sectores.query()
//     .where('nombre_sector', nomSector) // Nombre de la columna en la DB
//     .andWhere('id_municipios', idMunicipio)
//     .first()

//   if (existe) {
//     // Usamos 409 (Conflict) porque el recurso ya existe en esa combinación
//     return response.status(409).json({
//       mensaje: `El sector '${nomSector}' ya existe en este municipio.`,
//     })
//   }

//   // 3. Creación del registro
//   const nuevoSector = await Sectores.create({
//     nombreSector: nomSector,
//     idMunicipios: idMunicipio
//   })

//   // 4. Respuesta exitosa
//   return response.created({
//     mensaje: 'Sector creado correctamente.',
//     Sectores: nuevoSector
//   })
// }






// //PUT_SECTOR//
async actualizarSector({ params, request, response }: HttpContext) {
  // 1. Validar el FORMATO del ID
  const idSector = Number(params.id)

  if (isNaN(idSector) || idSector <= 0) {
    return response.status(400).json({
      mensaje: 'ID inválido, vuelve a intentarlo.'
    })
  }

  // 2. Validar la EXISTENCIA del ID en la base de datos
  // Hacemos la búsqueda al principio para no procesar nada más si falla
  const sectorEncontrado = await Sectores.find(idSector)

  if (!sectorEncontrado) {
    return response.status(404).json({
      mensaje: `El sector con ID ${idSector} no existe en el sistema.`
    })
  }

  // 3. Validar los datos del cuerpo (Body)
  // Solo llegamos aquí si el ID del sector es válido y existe
  const datosNuevos = await request.validateUsing(ingresarSector)

  // 4. Verificar si el nuevo nombre ya está en uso por OTRO registro
  const existeNombre = await Sectores.query()
    .where('nombreSector', datosNuevos.nomSector)
    .whereNot('id', idSector) // Excluimos el registro actual
    .first()

  if (existeNombre) {
    return response.status(409).json({
      mensaje: `El nombre del sector ya está en uso: ${datosNuevos.nomSector}.`,
    })
  }

  // 5. Aplicar cambios y guardar
  sectorEncontrado.nombreSector = datosNuevos.nomSector

  // Si también quieres permitir cambiar el municipio:
  sectorEncontrado.idMunicipios = datosNuevos.idMunicipio!

  await sectorEncontrado.save()

  return response.ok({
    mensaje: 'El sector fue actualizado correctamente.',
    sector: sectorEncontrado
  })
}
// async actualizarSector({ params, request, response }: HttpContext) {
//   // 1. Convertimos y validamos el ID inmediatamente
//   const idSector = Number(params.id)

//   // Validamos si es NaN (string inválido) o si el id es 0/vacío
//   if (isNaN(idSector) || idSector <= 0) {
//     return response.status(400).json({
//       mensaje: 'ID inválido, vuelve a intentarlo.'
//     })
//   }

//   // 2. Validamos los datos del cuerpo (Body)
//   const nuevoSector = await request.validateUsing(ingresarSector)

//   // 3. Verificamos si el nombre ya existe en OTRO registro
//   // Usamos .whereNot('id', idSector) para que no se autovalide con el mismo registro
//   const existe = await Sectores.query()
//     .where('nombreSector', nuevoSector.nomSector)
//     .whereNot('id', idSector)
//     .first()

//   if (existe) {
//     return response.status(409).json({
//       mensaje: `El nombre del sector ya está en uso: ${nuevoSector.nomSector}.`,
//     })
//   }

//   // 4. Buscamos y actualizamos
//   const sectorEncontrado = await Sectores.find(idSector)

//   if (sectorEncontrado) {
//     sectorEncontrado.nombreSector = nuevoSector.nomSector
//     // Si tu validador trae idMunicipio, asegúrate de actualizarlo también si es necesario
//     await sectorEncontrado.save()

//     return response.ok({ mensaje: 'El sector fue actualizado.' })
//   }

//   return response.status(404).json({
//     mensaje: 'Vaya algo salió mal, sector no encontrado.'
//   })
}

  // async actualizarSector({ params, request, response }: HttpContext) {
  //   const idSector = Number(params.id)
  //   const nuevoSector = await request.validateUsing(ingresarSector)

  //   const exite = await Sectores.query()
  //     .where('nombreSector', nuevoSector.nomSector)
  //     .first()
  //   if (exite) {
  //     return response.status(404).json({
  //       mensaje: `Sector existente: ${nuevoSector.nomSector}.`,
  //     })
  //   }

  //   let sectorEncontrado = await Sectores.query().where('id', idSector).first()

  //   if (sectorEncontrado) {
  //     sectorEncontrado.nombreSector = nuevoSector.nomSector
  //     await sectorEncontrado.save()
  //     return response.ok({ mensage: 'El sector fue actualizado.' })
  //   }
  //   return response.status(404).json({ mensaje: 'Vaya algo salio mal, sector no actualizado.' })
  // }

