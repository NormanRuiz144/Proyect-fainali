import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'

const modules = [
  'departamentos',
  'municipios',
  'problematicas',
  'sectores',
  'permisos',
  'usuarios',
  'operadores',
  'mensajes',
  'incidencias',
  'operador_permiso',
  'detalle_incidencias',
  'detalle_mensajes',
  'banned_users',
]

const actions = [
  ['ver', 'Consultar'],
  ['crear', 'Crear'],
  ['actualizar', 'Actualizar'],
  ['eliminar', 'Eliminar'],
] as const

export default class extends BaseSeeder {
  async run() {
    for (const module of modules) {
      for (const [action, label] of actions) {
        const codigo = `${module}.${action}`
        const exists = await db.from('permisos').where('codigo', codigo).first()

        if (!exists) {
          await db.table('permisos').insert({
            codigo,
            nombre: `${label} ${module}`,
            descripcion: `Permite ${action} registros del módulo ${module}.`,
          })
        }
      }
    }

    const codigoAdministrarPermisos = 'permisos.administrar'
    const exists = await db.from('permisos').where('codigo', codigoAdministrarPermisos).first()
    if (!exists) {
      await db.table('permisos').insert({
        codigo: codigoAdministrarPermisos,
        nombre: 'Administrar permisos',
        descripcion: 'Permite asignar, revocar y administrar permisos de los operadores.',
      })
    }
  }
}
