import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'

export default class extends BaseSeeder {
  async run() {
    const sectoresData = [
      'Barrio El Rosario',
      'Barrio San Francisco',
      'Barrio La Puebla',
      'Barrio Popoyuapa',
      'Barrio Pedro Joaquín Chamorro',
      'Barrio Cristo Rey',
      'Barrio Gaspar García Laviana',
      'Barrio Eduardo Ñamendi',
      'Barrio Nicaraocallí',
      'Barrio Monsenor Lezcano',
      'Barrio Javier Guerra',
      'Barrio La Florida',
      'Sector Los Pinos',
      'Sector Calle Enmedio',
      'Sector Las Piedras',
    ]

    for (const nomSector of sectoresData) {
      const exists = await db.from('sectores').where('nom_sector', nomSector).first()
      if (!exists) {
        await db.table('sectores').insert({ nom_sector: nomSector })
      }
    }
  }
}
