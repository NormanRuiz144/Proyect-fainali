import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.destroy': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'departamentos.obtener_departamentos': { paramsTuple?: []; params?: {} }
    'departamentos.crear_departamento': { paramsTuple?: []; params?: {} }
    'departamentos.actualizar_depart': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'municipios.obtener_departamentos': { paramsTuple?: []; params?: {} }
    'municipios.crear_municipio': { paramsTuple?: []; params?: {} }
    'municipios.actualizar_municipio': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'problematicas.obtener_problematicas': { paramsTuple?: []; params?: {} }
    'problematicas.crear_problematica': { paramsTuple?: []; params?: {} }
    'problematicas.actualizar_problematica': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'instituciones.obtener_instituciones': { paramsTuple?: []; params?: {} }
    'instituciones.crear_institucion': { paramsTuple?: []; params?: {} }
    'instituciones.actualizar_instituc': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'departamentos.obtener_departamentos': { paramsTuple?: []; params?: {} }
    'municipios.obtener_departamentos': { paramsTuple?: []; params?: {} }
    'problematicas.obtener_problematicas': { paramsTuple?: []; params?: {} }
    'instituciones.obtener_instituciones': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'departamentos.obtener_departamentos': { paramsTuple?: []; params?: {} }
    'municipios.obtener_departamentos': { paramsTuple?: []; params?: {} }
    'problematicas.obtener_problematicas': { paramsTuple?: []; params?: {} }
    'instituciones.obtener_instituciones': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.destroy': { paramsTuple?: []; params?: {} }
    'departamentos.crear_departamento': { paramsTuple?: []; params?: {} }
    'municipios.crear_municipio': { paramsTuple?: []; params?: {} }
    'problematicas.crear_problematica': { paramsTuple?: []; params?: {} }
    'instituciones.crear_institucion': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'departamentos.actualizar_depart': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'municipios.actualizar_municipio': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'problematicas.actualizar_problematica': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'instituciones.actualizar_instituc': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}