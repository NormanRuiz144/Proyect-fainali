import Roles from '#models/roles'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const rolesData = [{ rol: 'default' }, { rol: 'Admin' }, { rol: 'Super-Admin' }]
    for (const role of rolesData) {
      const exists = await Roles.findBy('rol', role.rol)
      if (!exists) {
        await Roles.create({ rol: role.rol })
      }
    }
  }
}
