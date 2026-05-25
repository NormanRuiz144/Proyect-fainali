/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    user: {
      registrarse: typeof routes['auth.user.registrarse']
    }
    accessToken: {
      store: typeof routes['auth.access_token.store']
      destroy: typeof routes['auth.access_token.destroy']
    }
  }
  profile: {
    profile: {
      show: typeof routes['profile.profile.show']
    }
  }
  user: {
    listUsuarios: typeof routes['user.list_usuarios']
    listUsuariosInsti: typeof routes['user.list_usuarios_insti']
    crearUsuario: typeof routes['user.crear_usuario']
    buscarUsurioById: typeof routes['user.buscar_usurio_by_id']
    actualizarUsuario: typeof routes['user.actualizar_usuario']
    reasignarInstitucionRol: typeof routes['user.reasignar_institucion_rol']
    bajaInsti: typeof routes['user.baja_insti']
  }
  departamentos: {
    obtenerDepartamentos: typeof routes['departamentos.obtener_departamentos']
    crearDepartamento: typeof routes['departamentos.crear_departamento']
    actualizarDepart: typeof routes['departamentos.actualizar_depart']
  }
  municipios: {
    municipiosPorDepartamento: typeof routes['municipios.municipios_por_departamento']
    obtenerMunicipios: typeof routes['municipios.obtener_municipios']
    crearMunicipio: typeof routes['municipios.crear_municipio']
    actualizarMunicipio: typeof routes['municipios.actualizar_municipio']
  }
  sectores: {
    sectoresPorMunicipio: typeof routes['sectores.sectores_por_municipio']
    obtenerSectores: typeof routes['sectores.obtener_sectores']
    obtenerSectorId: typeof routes['sectores.obtener_sector_id']
    crearSector: typeof routes['sectores.crear_sector']
    actualizarSector: typeof routes['sectores.actualizar_sector']
  }
  problematicas: {
    obtenerProblematicas: typeof routes['problematicas.obtener_problematicas']
    crearProblematica: typeof routes['problematicas.crear_problematica']
    actualizarProblematica: typeof routes['problematicas.actualizar_problematica']
  }
  instituciones: {
    obtenerInstituciones: typeof routes['instituciones.obtener_instituciones']
    crearInstitucion: typeof routes['instituciones.crear_institucion']
    actualizarInstituc: typeof routes['instituciones.actualizar_instituc']
  }
  reportes: {
    obtenerReportes: typeof routes['reportes.obtener_reportes']
    crearReporte: typeof routes['reportes.crear_reporte']
    actualizarReporte: typeof routes['reportes.actualizar_reporte']
    obtenerReporteInt: typeof routes['reportes.obtener_reporte_int']
  }
  roles: {
    obtenerRol: typeof routes['roles.obtener_rol']
    obtenerRolId: typeof routes['roles.obtener_rol_id']
    crearRol: typeof routes['roles.crear_rol']
    actualizarRol: typeof routes['roles.actualizar_rol']
  }
  detaReporte: {
    obtenerDetaReporte: typeof routes['deta_reporte.obtener_deta_reporte']
    obtenerDetalleId: typeof routes['deta_reporte.obtener_detalle_id']
    crearDetalleReporte: typeof routes['deta_reporte.crear_detalle_reporte']
    actualizarDetalleReporte: typeof routes['deta_reporte.actualizar_detalle_reporte']
  }
  dashboard: {
    showData: typeof routes['dashboard.show_data']
  }
}
