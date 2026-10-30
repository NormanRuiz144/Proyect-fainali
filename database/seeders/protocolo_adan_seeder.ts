import { BaseSeeder } from '@adonisjs/lucid/seeders'
import hash from '@adonisjs/core/services/hash'
import db from '@adonisjs/lucid/services/db'

export default class extends BaseSeeder {
  async run() {
    const sector = await db
      .from('sectores')
      .select('id')
      .where('nom_sector', 'Barrio El Rosario')
      .first()
    if (!sector) {
      throw new Error('Debe existir el sector inicial antes de crear al operador Adán.')
    }

    const user0Data = {
      apellidos: 'Frist Admin',
      correo: 'admin0@gmail.com',
      nombres: 'Adan',
      numero_cedula: '11111111111111',
      password: await hash.make('Password123!'),
      sexo: 'M',
      id_sector: sector.id,
      created_at: new Date(),
      updated_at: new Date(),
    }

    let usuario = await db.from('usuarios').select('id').where('correo', user0Data.correo).first()
    if (!usuario) {
      await db.table('usuarios').insert(user0Data)
      usuario = await db.from('usuarios').select('id').where('correo', user0Data.correo).first()
    }

    if (!usuario) {
      throw new Error('No se pudo crear el usuario inicial Adán.')
    }

    let operador = await db.from('operadores').where('id_usuario', usuario.id).first()

    if (!operador) {
      await db.table('operadores').insert({
        id_usuario: usuario.id,
      })
      operador = await db.from('operadores').where('id_usuario', usuario.id).first()
    }

    if (!operador) {
      throw new Error('No se pudo crear el operador inicial Adán.')
    }

    const permisos = await db.from('permisos').select('id')
    for (const permiso of permisos) {
      const asignacion = await db
        .from('operador_permiso')
        .where('id_operador', operador.id)
        .where('id_permiso', permiso.id)
        .first()

      if (asignacion) {
        await db.from('operador_permiso').where('id', asignacion.id).update({ activo: true })
      } else {
        await db.table('operador_permiso').insert({
          id_operador: operador.id,
          id_permiso: permiso.id,
          activo: true,
        })
      }
    }
  }
}
