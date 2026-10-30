/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  public: {
    user: {
      registrarse: typeof routes['public.user.registrarse']
    }
    departamentos: {
      obtenerDepartamentos: typeof routes['public.departamentos.obtener_departamentos']
    }
    municipios: {
      municipiosPorDepartamento: typeof routes['public.municipios.municipios_por_departamento']
    }
    sectores: {
      obtenerSectores: typeof routes['public.sectores.obtener_sectores']
    }
  }
  accessToken: {
    store: typeof routes['access_token.store']
    destroy: typeof routes['access_token.destroy']
  }
  profile: {
    show: typeof routes['profile.show']
  }
  user: {
    listUsuarios: typeof routes['user.list_usuarios']
    crearUsuario: typeof routes['user.crear_usuario']
    buscarUsurioById: typeof routes['user.buscar_usurio_by_id']
    actualizarUsuario: typeof routes['user.actualizar_usuario']
  }
  ban: {
    banUser: typeof routes['ban.ban_user']
    unbanUser: typeof routes['ban.unban_user']
    listBannedUsers: typeof routes['ban.list_banned_users']
  }
  departamentos: {
    obtenerDepartamentos: typeof routes['departamentos.obtener_departamentos']
    crearDepartamento: typeof routes['departamentos.crear_departamento']
    actualizarDepart: typeof routes['departamentos.actualizar_depart']
    eliminarDepartamento: typeof routes['departamentos.eliminar_departamento']
    restaurarDepartamento: typeof routes['departamentos.restaurar_departamento']
  }
  municipios: {
    municipiosPorDepartamento: typeof routes['municipios.municipios_por_departamento']
    obtenerMunicipios: typeof routes['municipios.obtener_municipios']
    crearMunicipio: typeof routes['municipios.crear_municipio']
    actualizarMunicipio: typeof routes['municipios.actualizar_municipio']
    eliminarMunicipio: typeof routes['municipios.eliminar_municipio']
    restaurarMunicipio: typeof routes['municipios.restaurar_municipio']
  }
  sectores: {
    obtenerSectores: typeof routes['sectores.obtener_sectores']
    crearSector: typeof routes['sectores.crear_sector']
    obtenerSectorId: typeof routes['sectores.obtener_sector_id']
    actualizarSector: typeof routes['sectores.actualizar_sector']
    eliminarSector: typeof routes['sectores.eliminar_sector']
    restaurarSector: typeof routes['sectores.restaurar_sector']
  }
  incidencias: {
    historialUsuario: typeof routes['incidencias.historial_usuario']
    obtenerIncidencias: typeof routes['incidencias.obtener_incidencias']
    crearIncidencia: typeof routes['incidencias.crear_incidencia']
    obtenerIncidencia: typeof routes['incidencias.obtener_incidencia']
    actualizarIncidencia: typeof routes['incidencias.actualizar_incidencia']
    actualizarEstadoIncidencia: typeof routes['incidencias.actualizar_estado_incidencia']
  }
  detalleIncidencias: {
    obtenerDetalles: typeof routes['detalle_incidencias.obtener_detalles']
    crearDetalle: typeof routes['detalle_incidencias.crear_detalle']
    obtenerDetalle: typeof routes['detalle_incidencias.obtener_detalle']
    actualizarDetalle: typeof routes['detalle_incidencias.actualizar_detalle']
  }
  dashboard: {
    showData: typeof routes['dashboard.show_data']
  }
}
