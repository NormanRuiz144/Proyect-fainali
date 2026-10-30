import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'public.user.registrarse': { paramsTuple?: []; params?: {} }
    'public.departamentos.obtener_departamentos': { paramsTuple?: []; params?: {} }
    'public.municipios.municipios_por_departamento': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'public.sectores.obtener_sectores': { paramsTuple?: []; params?: {} }
    'access_token.store': { paramsTuple?: []; params?: {} }
    'access_token.destroy': { paramsTuple?: []; params?: {} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'user.list_usuarios': { paramsTuple?: []; params?: {} }
    'user.crear_usuario': { paramsTuple?: []; params?: {} }
    'user.buscar_usurio_by_id': { paramsTuple: [ParamValue]; params: {'userId': ParamValue} }
    'user.actualizar_usuario': { paramsTuple: [ParamValue]; params: {'userId': ParamValue} }
    'ban.ban_user': { paramsTuple?: []; params?: {} }
    'ban.unban_user': { paramsTuple: [ParamValue]; params: {'userId': ParamValue} }
    'ban.list_banned_users': { paramsTuple?: []; params?: {} }
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
    'sectores.obtener_sectores': { paramsTuple?: []; params?: {} }
    'sectores.crear_sector': { paramsTuple?: []; params?: {} }
    'sectores.obtener_sector_id': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sectores.actualizar_sector': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sectores.eliminar_sector': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sectores.restaurar_sector': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'incidencias.historial_usuario': { paramsTuple?: []; params?: {} }
    'incidencias.obtener_incidencias': { paramsTuple?: []; params?: {} }
    'incidencias.crear_incidencia': { paramsTuple?: []; params?: {} }
    'incidencias.obtener_incidencia': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'incidencias.actualizar_incidencia': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'incidencias.actualizar_estado_incidencia': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'detalle_incidencias.obtener_detalles': { paramsTuple?: []; params?: {} }
    'detalle_incidencias.crear_detalle': { paramsTuple?: []; params?: {} }
    'detalle_incidencias.obtener_detalle': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'detalle_incidencias.actualizar_detalle': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'dashboard.show_data': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'public.departamentos.obtener_departamentos': { paramsTuple?: []; params?: {} }
    'public.municipios.municipios_por_departamento': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'public.sectores.obtener_sectores': { paramsTuple?: []; params?: {} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'user.list_usuarios': { paramsTuple?: []; params?: {} }
    'user.buscar_usurio_by_id': { paramsTuple: [ParamValue]; params: {'userId': ParamValue} }
    'ban.list_banned_users': { paramsTuple?: []; params?: {} }
    'departamentos.obtener_departamentos': { paramsTuple?: []; params?: {} }
    'municipios.municipios_por_departamento': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'municipios.obtener_municipios': { paramsTuple?: []; params?: {} }
    'sectores.obtener_sectores': { paramsTuple?: []; params?: {} }
    'sectores.obtener_sector_id': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'incidencias.historial_usuario': { paramsTuple?: []; params?: {} }
    'incidencias.obtener_incidencias': { paramsTuple?: []; params?: {} }
    'incidencias.obtener_incidencia': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'detalle_incidencias.obtener_detalles': { paramsTuple?: []; params?: {} }
    'detalle_incidencias.obtener_detalle': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'dashboard.show_data': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'public.departamentos.obtener_departamentos': { paramsTuple?: []; params?: {} }
    'public.municipios.municipios_por_departamento': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'public.sectores.obtener_sectores': { paramsTuple?: []; params?: {} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'user.list_usuarios': { paramsTuple?: []; params?: {} }
    'user.buscar_usurio_by_id': { paramsTuple: [ParamValue]; params: {'userId': ParamValue} }
    'ban.list_banned_users': { paramsTuple?: []; params?: {} }
    'departamentos.obtener_departamentos': { paramsTuple?: []; params?: {} }
    'municipios.municipios_por_departamento': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'municipios.obtener_municipios': { paramsTuple?: []; params?: {} }
    'sectores.obtener_sectores': { paramsTuple?: []; params?: {} }
    'sectores.obtener_sector_id': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'incidencias.historial_usuario': { paramsTuple?: []; params?: {} }
    'incidencias.obtener_incidencias': { paramsTuple?: []; params?: {} }
    'incidencias.obtener_incidencia': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'detalle_incidencias.obtener_detalles': { paramsTuple?: []; params?: {} }
    'detalle_incidencias.obtener_detalle': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'dashboard.show_data': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'public.user.registrarse': { paramsTuple?: []; params?: {} }
    'access_token.store': { paramsTuple?: []; params?: {} }
    'access_token.destroy': { paramsTuple?: []; params?: {} }
    'user.crear_usuario': { paramsTuple?: []; params?: {} }
    'ban.ban_user': { paramsTuple?: []; params?: {} }
    'departamentos.crear_departamento': { paramsTuple?: []; params?: {} }
    'municipios.crear_municipio': { paramsTuple?: []; params?: {} }
    'sectores.crear_sector': { paramsTuple?: []; params?: {} }
    'incidencias.crear_incidencia': { paramsTuple?: []; params?: {} }
    'detalle_incidencias.crear_detalle': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'user.actualizar_usuario': { paramsTuple: [ParamValue]; params: {'userId': ParamValue} }
    'departamentos.actualizar_depart': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'municipios.actualizar_municipio': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sectores.actualizar_sector': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'incidencias.actualizar_incidencia': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'detalle_incidencias.actualizar_detalle': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'ban.unban_user': { paramsTuple: [ParamValue]; params: {'userId': ParamValue} }
    'departamentos.restaurar_departamento': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'municipios.restaurar_municipio': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sectores.restaurar_sector': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'incidencias.actualizar_estado_incidencia': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'departamentos.eliminar_departamento': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'municipios.eliminar_municipio': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sectores.eliminar_sector': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}