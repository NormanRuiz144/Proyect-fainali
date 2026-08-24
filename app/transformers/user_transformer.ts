import type User from '#models/user'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class UserTransformer extends BaseTransformer<User> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'apellidos',
        'correo',
        'createdAt',
        'id',
        'idInstitucion',
        'idRol',
        'idSector',
        'nombres',
        'numeroCedula',
        'sexo',
        'updatedAt',
      ]),
      rol: this.resource.rol
        ? { id: this.resource.rol.id, rol: this.resource.rol.rol }
        : null,
      institucion: this.resource.Institucion
        ? {
            id: this.resource.Institucion.id,
            nombreInstitucion: this.resource.Institucion.nombreInstitucion,
            idMunicipio: this.resource.Institucion.id_municipio,
          }
        : null,
      sector: this.resource.sector
        ? {
            id: this.resource.sector.id,
            nombreSector: this.resource.sector.nombreSector,
            idMunicipios: this.resource.sector.idMunicipios,
            municipio: this.resource.sector.municipio
              ? {
                  id: this.resource.sector.municipio.id,
                  nomMunicipio: this.resource.sector.municipio.nomMunicipio,
                  idDepartamentos: this.resource.sector.municipio.idDepartamento,
                }
              : null,
          }
        : null,
    }
  }
}
