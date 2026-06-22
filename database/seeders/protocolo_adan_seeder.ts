import Sectores from '#models/sectores'
import Usuario from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    const idSector = await Sectores.query().select('id').where('nom_sector', 'Rivas').firstOrFail()
    const user0Data = {
      apellidos: 'Frist Admin',
      contrasena: 'Password123!',
      correo: 'admin0@gmail.com',
      createdAt: DateTime.now(),
      idInstitucion: null,
      idRol: 1,
      idSector: idSector.id,
      nombres: 'Adan',
      numeroCedula: '000-000000-0000A',
      sexo: 'M',
      updatedAt: DateTime.now(),
    }

    const exists = await Usuario.findBy('cedula', user0Data.numeroCedula)
    if (!exists) {
      await Usuario.create(user0Data)
    }
  }
}
