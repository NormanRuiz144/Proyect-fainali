import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.user.registrarse': { paramsTuple?: []; params?: {} }
    'auth.access_token.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.destroy': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'user.list_usuarios': { paramsTuple?: []; params?: {} }
    'user.list_usuarios_insti': { paramsTuple?: []; params?: {} }
    'user.crear_usuario': { paramsTuple?: []; params?: {} }
    'user.buscar_usurio_by_id': { paramsTuple: [ParamValue]; params: {'userId': ParamValue} }
    'user.actualizar_usuario': { paramsTuple: [ParamValue]; params: {'userId': ParamValue} }
    'user.reasignar_institucion_rol': { paramsTuple: [ParamValue]; params: {'userId': ParamValue} }
    'user.baja_insti': { paramsTuple: [ParamValue]; params: {'userId': ParamValue} }
    'departamentos.obtener_departamentos': { paramsTuple?: []; params?: {} }
    'departamentos.crear_departamento': { paramsTuple?: []; params?: {} }
    'departamentos.actualizar_depart': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'departamentos.eliminar_departamento': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'departamentos.restaurar_departamento': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'municipios.municipios_por_departamento': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'municipios.obtener_municipios': { paramsTuple?: []; params?: {} }
    'municipios.crear_municipio': { paramsTuple?: []; params?: {} }
    'municipios.actualizar_municipio': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'municipios.eliminar_municipio': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'municipios.restaurar_municipio': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sectores.sectores_por_municipio': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'problematicas.obtener_problematicas': { paramsTuple?: []; params?: {} }
    'problematicas.crear_problematica': { paramsTuple?: []; params?: {} }
    'problematicas.actualizar_problematica': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'problematicas.eliminar_problematica': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'problematicas.restaurar_problematica': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'problematicas.filtrar_by_institucion': { paramsTuple: [ParamValue]; params: {'idInst': ParamValue} }
    'problematicas.listar_instituciones_asociadas': { paramsTuple: [ParamValue]; params: {'idProb': ParamValue} }
    'problematicas.asignar_intitucion': { paramsTuple?: []; params?: {} }
    'problematicas.eliminar_asociacion': { paramsTuple?: []; params?: {} }
    'instituciones.obtener_instituciones': { paramsTuple?: []; params?: {} }
    'instituciones.instituciones_por_municipio': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'instituciones.crear_institucion': { paramsTuple?: []; params?: {} }
    'instituciones.actualizar_instituc': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'instituciones.eliminar_institucion': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'instituciones.restaurar_institucion': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reportes.historial_usuario': { paramsTuple?: []; params?: {} }
    'reportes.obtener_reportes': { paramsTuple?: []; params?: {} }
    'reportes.crear_reporte': { paramsTuple?: []; params?: {} }
    'reportes.actualizar_reporte': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reportes.actualizar_estado_reporte': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reportes.obtener_reporte_int': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sectores.obtener_sectores': { paramsTuple?: []; params?: {} }
    'sectores.obtener_sector_id': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sectores.crear_sector': { paramsTuple?: []; params?: {} }
    'sectores.actualizar_sector': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sectores.eliminar_sector': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sectores.restaurar_sector': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'roles.obtener_rol': { paramsTuple?: []; params?: {} }
    'roles.obtener_rol_id': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'roles.crear_rol': { paramsTuple?: []; params?: {} }
    'roles.actualizar_rol': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'deta_reporte.obtener_deta_reporte': { paramsTuple?: []; params?: {} }
    'deta_reporte.obtener_detalle_id': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'deta_reporte.crear_detalle_reporte': { paramsTuple?: []; params?: {} }
    'deta_reporte.actualizar_detalle_reporte': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'dashboard.show_data': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'user.list_usuarios': { paramsTuple?: []; params?: {} }
    'user.list_usuarios_insti': { paramsTuple?: []; params?: {} }
    'user.buscar_usurio_by_id': { paramsTuple: [ParamValue]; params: {'userId': ParamValue} }
    'departamentos.obtener_departamentos': { paramsTuple?: []; params?: {} }
    'municipios.municipios_por_departamento': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'municipios.obtener_municipios': { paramsTuple?: []; params?: {} }
    'sectores.sectores_por_municipio': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'problematicas.obtener_problematicas': { paramsTuple?: []; params?: {} }
    'problematicas.filtrar_by_institucion': { paramsTuple: [ParamValue]; params: {'idInst': ParamValue} }
    'problematicas.listar_instituciones_asociadas': { paramsTuple: [ParamValue]; params: {'idProb': ParamValue} }
    'instituciones.obtener_instituciones': { paramsTuple?: []; params?: {} }
    'instituciones.instituciones_por_municipio': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reportes.historial_usuario': { paramsTuple?: []; params?: {} }
    'reportes.obtener_reportes': { paramsTuple?: []; params?: {} }
    'reportes.obtener_reporte_int': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sectores.obtener_sectores': { paramsTuple?: []; params?: {} }
    'sectores.obtener_sector_id': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'roles.obtener_rol': { paramsTuple?: []; params?: {} }
    'roles.obtener_rol_id': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'deta_reporte.obtener_deta_reporte': { paramsTuple?: []; params?: {} }
    'deta_reporte.obtener_detalle_id': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'dashboard.show_data': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'user.list_usuarios': { paramsTuple?: []; params?: {} }
    'user.list_usuarios_insti': { paramsTuple?: []; params?: {} }
    'user.buscar_usurio_by_id': { paramsTuple: [ParamValue]; params: {'userId': ParamValue} }
    'departamentos.obtener_departamentos': { paramsTuple?: []; params?: {} }
    'municipios.municipios_por_departamento': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'municipios.obtener_municipios': { paramsTuple?: []; params?: {} }
    'sectores.sectores_por_municipio': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'problematicas.obtener_problematicas': { paramsTuple?: []; params?: {} }
    'problematicas.filtrar_by_institucion': { paramsTuple: [ParamValue]; params: {'idInst': ParamValue} }
    'problematicas.listar_instituciones_asociadas': { paramsTuple: [ParamValue]; params: {'idProb': ParamValue} }
    'instituciones.obtener_instituciones': { paramsTuple?: []; params?: {} }
    'instituciones.instituciones_por_municipio': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reportes.historial_usuario': { paramsTuple?: []; params?: {} }
    'reportes.obtener_reportes': { paramsTuple?: []; params?: {} }
    'reportes.obtener_reporte_int': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sectores.obtener_sectores': { paramsTuple?: []; params?: {} }
    'sectores.obtener_sector_id': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'roles.obtener_rol': { paramsTuple?: []; params?: {} }
    'roles.obtener_rol_id': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'deta_reporte.obtener_deta_reporte': { paramsTuple?: []; params?: {} }
    'deta_reporte.obtener_detalle_id': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'dashboard.show_data': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.user.registrarse': { paramsTuple?: []; params?: {} }
    'auth.access_token.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.destroy': { paramsTuple?: []; params?: {} }
    'user.crear_usuario': { paramsTuple?: []; params?: {} }
    'departamentos.crear_departamento': { paramsTuple?: []; params?: {} }
    'municipios.crear_municipio': { paramsTuple?: []; params?: {} }
    'problematicas.crear_problematica': { paramsTuple?: []; params?: {} }
    'problematicas.asignar_intitucion': { paramsTuple?: []; params?: {} }
    'instituciones.crear_institucion': { paramsTuple?: []; params?: {} }
    'reportes.crear_reporte': { paramsTuple?: []; params?: {} }
    'sectores.crear_sector': { paramsTuple?: []; params?: {} }
    'roles.crear_rol': { paramsTuple?: []; params?: {} }
    'deta_reporte.crear_detalle_reporte': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'user.actualizar_usuario': { paramsTuple: [ParamValue]; params: {'userId': ParamValue} }
    'user.reasignar_institucion_rol': { paramsTuple: [ParamValue]; params: {'userId': ParamValue} }
    'user.baja_insti': { paramsTuple: [ParamValue]; params: {'userId': ParamValue} }
    'departamentos.actualizar_depart': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'municipios.actualizar_municipio': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'problematicas.actualizar_problematica': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'instituciones.actualizar_instituc': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reportes.actualizar_reporte': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sectores.actualizar_sector': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'roles.actualizar_rol': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'deta_reporte.actualizar_detalle_reporte': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'departamentos.eliminar_departamento': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'municipios.eliminar_municipio': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'problematicas.eliminar_problematica': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'problematicas.eliminar_asociacion': { paramsTuple?: []; params?: {} }
    'instituciones.eliminar_institucion': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sectores.eliminar_sector': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'departamentos.restaurar_departamento': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'municipios.restaurar_municipio': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'problematicas.restaurar_problematica': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'instituciones.restaurar_institucion': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reportes.actualizar_estado_reporte': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sectores.restaurar_sector': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}