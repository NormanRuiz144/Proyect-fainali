import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'

export default class extends BaseSeeder {
  async run() {
    const problematicasData = [
      'Fuga de agua en la calle',
      'Incendio',
      'Alteracion y disturbio',
      'Baches en la calle',
      'Aguas estancadas',
      'Cables tendidos',
      'Corte de energía eléctrica',
      'Basura acumulada',
    ]

    for (const problematica of problematicasData) {
      const exists = await db.from('problematicas').where('problematica', problematica).first()
      if (!exists) {
        await db.table('problematicas').insert({ problematica })
      }
    }
  }
}
