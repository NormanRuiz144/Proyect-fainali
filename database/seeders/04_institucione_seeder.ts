import Institucione from '#models/institucione'
import Municipio from '#models/municipio'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const idMuni = await Municipio.query()
      .select('id', 'nom_municipio')
      .where('nom_municipio', 'Rivas')
      .firstOrFail()
    const institucionesData = [
      { nombre_institucion: 'Alcaldía de Rivas', id_municipio: idMuni.id },
      { nombre_institucion: `Policia Nacional ${idMuni.nomMunicipio}`, id_municipio: idMuni.id },
      {
        nombre_institucion: 'ENACAL',
        id_municipio: idMuni.id,
      },
      {
        nombre_institucion: 'ENATREL',
        id_municipio: idMuni.id,
      },
      {
        nombre_institucion: 'MTI',
        id_municipio: idMuni.id,
      },
      {
        nombre_institucion: 'FISE',
        id_municipio: idMuni.id,
      },
      {
        nombre_institucion: 'MINED',
        id_municipio: idMuni.id,
      },
      {
        nombre_institucion: 'MINSA',
        id_municipio: idMuni.id,
      },
      {
        nombre_institucion: 'INVUR',
        id_municipio: idMuni.id,
      },
    ]
    for (const insti of institucionesData) {
      const exists = await Institucione.findBy('nombre_institucion', insti.nombre_institucion)
      if (!exists) {
        await Institucione.create({
          nombreInstitucion: insti.nombre_institucion,
          idMunicipio: insti.id_municipio,
        })
      }
    }
  }
}
