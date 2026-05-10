import Departamento from '#models/departamento'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const departementosData = [
      { nom_departamento: 'Boaco' },
      { nom_departamento: 'Carazo' },
      { nom_departamento: 'Chinandega' },
      { nom_departamento: 'Chontales' },
      { nom_departamento: 'Estelí' },
      { nom_departamento: 'Granada' },
      { nom_departamento: 'Jinotega' },
      { nom_departamento: 'León' },
      { nom_departamento: 'Madriz' },
      { nom_departamento: 'Managua' },
      { nom_departamento: 'Masaya' },
      { nom_departamento: 'Matagalpa' },
      { nom_departamento: 'Nueva Segovia' },
      { nom_departamento: 'Río San Juan' },
      { nom_departamento: 'Rivas' },
      { nom_departamento: 'RACCN' }, // Región Autónoma de la Costa Caribe Norte
      { nom_departamento: 'RACCS' }, // Región Autónoma de la Costa Caribe Sur
    ]

    for (const departamento of departementosData) {
      const exists = await Departamento.findBy('nom_departamento', departamento.nom_departamento)
      if (!exists) {
        await Departamento.create({ nomDepartamento: departamento.nom_departamento })
      }
    }
  }
}
