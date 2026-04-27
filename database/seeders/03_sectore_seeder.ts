import Municipio from '#models/municipio'
import Sectores from '#models/sectores'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const idMuni = await Municipio.query()
      .select('id')
      .where('nom_municipio', 'Rivas')
      .firstOrFail()
    const sectoresData = [
      { nombre_sector: 'Barrio El Rosario', id_municipios: idMuni.id },
      { nombre_sector: 'Barrio San Francisco', id_municipios: idMuni.id },
      { nombre_sector: 'Barrio La Puebla', id_municipios: idMuni.id },
      { nombre_sector: 'Barrio Popoyuapa', id_municipios: idMuni.id },
      { nombre_sector: 'Barrio Pedro Joaquín Chamorro', id_municipios: idMuni.id },
      { nombre_sector: 'Barrio Cristo Rey', id_municipios: idMuni.id },
      { nombre_sector: 'Barrio Gaspar García Laviana', id_municipios: idMuni.id },
      { nombre_sector: 'Barrio Eduardo Ñamendi', id_municipios: idMuni.id },
      { nombre_sector: 'Barrio Nicaraocallí', id_municipios: idMuni.id },
      { nombre_sector: 'Barrio Monsenor Lezcano', id_municipios: idMuni.id },
      { nombre_sector: 'Barrio Javier Guerra', id_municipios: idMuni.id },
      { nombre_sector: 'Barrio La Florida', id_municipios: idMuni.id },
      { nombre_sector: 'Sector Los Pinos', id_municipios: idMuni.id },
      { nombre_sector: 'Sector Calle Enmedio', id_municipios: idMuni.id },
      { nombre_sector: 'Sector Las Piedras', id_municipios: idMuni.id },
    ]

    for (const sector of sectoresData) {
      const exists = await Sectores.findBy('nombre_sector', sector.nombre_sector)
      if (!exists) {
        await Sectores.create({
          nombreSector: sector.nombre_sector,
          idMunicipios: sector.id_municipios,
        })
      }
    }
  }
}
