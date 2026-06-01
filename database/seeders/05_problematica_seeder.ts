import Problematica from '#models/problematica'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const problematicasData = [
      { problema: 'Fuga de agua en la calle' },
      { problema: 'Incendio' },
      { problema: 'Alteracion y disturbio' },
      { problema: 'Baches en la calle' },
      { problema: 'Aguas estancadas' },
      { problema: 'Cables tendidos' },
      { problema: 'Corte de energía eléctrica' },
      { problema: 'Basura acumulada' }
    ]

    for (const item of problematicasData) {
      const exists = await Problematica.findBy('problema', item.problema)
      if (!exists) {
        await Problematica.create({ problema: item.problema })
      }
    }
  }
}
