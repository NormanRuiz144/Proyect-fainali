import Departamento from '#models/departamento'
import Municipio from '#models/municipio'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const idDepart = await Departamento.query()
      .select('id')
      .where('nom_departamento', 'Rivas')
      .firstOrFail()
    const municipioData = [
      {
        nom_municipio: 'Rivas',
        id_departamento: idDepart.id,
      },
      {
        nom_municipio: 'San Juan del Sur',
        id_departamento: idDepart.id,
      },
      {
        nom_municipio: 'Tola',
        id_departamento: idDepart.id,
      },
      {
        nom_municipio: 'Belén',
        id_departamento: idDepart.id,
      },
      {
        nom_municipio: 'Potosí',
        id_departamento: idDepart.id,
      },
      {
        nom_municipio: 'Altagracia',
        id_departamento: idDepart.id,
      },

      { nom_municipio: 'Moyogalpa', id_departamento: idDepart.id },
      { nom_municipio: 'Cárdenas', id_departamento: idDepart.id },
      { nom_municipio: 'San Jorge', id_departamento: idDepart.id },
      { nom_municipio: 'Buenos Aires', id_departamento: idDepart.id },
    ]
    for (const municipio of municipioData) {
      const exists = await Municipio.findBy('nom_municipio', municipio.nom_municipio)
      if (!exists) {
        await Municipio.create({
          nomMunicipio: municipio.nom_municipio,
          idDepartamento: municipio.id_departamento,
        })
      }
    }
  }
}
