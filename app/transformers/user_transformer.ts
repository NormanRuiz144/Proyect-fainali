import type Operador from '#models/operador'
import type Sectores from '#models/sectores'
import type User from '#models/user'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class UserTransformer extends BaseTransformer<User> {
  toObject() {
    const sector = this.resource.$preloaded.sector as Sectores | undefined
    const operador = this.resource.$preloaded.operador as Operador | undefined

    return {
      ...this.pick(this.resource, [
        'apellidos',
        'correo',
        'createdAt',
        'id',
        'idSector',
        'nombres',
        'numeroCedula',
        'sexo',
        'updatedAt',
      ]),
      sector: sector ? { id: sector.id, nomSector: sector.nomSector } : null,
      operador: operador ? { id: operador.id } : null,
    }
  }
}
