/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.user.registrarse': {
    methods: ["POST"],
    pattern: '/auth/resgistro',
    tokens: [{"old":"/auth/resgistro","type":0,"val":"auth","end":""},{"old":"/auth/resgistro","type":0,"val":"resgistro","end":""}],
    types: placeholder as Registry['auth.user.registrarse']['types'],
  },
  'auth.access_token.store': {
    methods: ["POST"],
    pattern: '/auth/login',
    tokens: [{"old":"/auth/login","type":0,"val":"auth","end":""},{"old":"/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.access_token.store']['types'],
  },
  'auth.access_token.destroy': {
    methods: ["POST"],
    pattern: '/auth/logout',
    tokens: [{"old":"/auth/logout","type":0,"val":"auth","end":""},{"old":"/auth/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.access_token.destroy']['types'],
  },
  'profile.profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/account/profile',
    tokens: [{"old":"/account/profile","type":0,"val":"account","end":""},{"old":"/account/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.profile.show']['types'],
  },
  'user.list_usuarios_insti': {
    methods: ["GET","HEAD"],
    pattern: '/usuarios/list',
    tokens: [{"old":"/usuarios/list","type":0,"val":"usuarios","end":""},{"old":"/usuarios/list","type":0,"val":"list","end":""}],
    types: placeholder as Registry['user.list_usuarios_insti']['types'],
  },
  'user.crear_usuario': {
    methods: ["POST"],
    pattern: '/usuarios/crear',
    tokens: [{"old":"/usuarios/crear","type":0,"val":"usuarios","end":""},{"old":"/usuarios/crear","type":0,"val":"crear","end":""}],
    types: placeholder as Registry['user.crear_usuario']['types'],
  },
  'user.buscar_usurio_by_id': {
    methods: ["GET","HEAD"],
    pattern: '/usuarios/:userId',
    tokens: [{"old":"/usuarios/:userId","type":0,"val":"usuarios","end":""},{"old":"/usuarios/:userId","type":1,"val":"userId","end":""}],
    types: placeholder as Registry['user.buscar_usurio_by_id']['types'],
  },
  'user.actualizar_usuario': {
    methods: ["PUT"],
    pattern: '/usuarios/actualizar/:userId',
    tokens: [{"old":"/usuarios/actualizar/:userId","type":0,"val":"usuarios","end":""},{"old":"/usuarios/actualizar/:userId","type":0,"val":"actualizar","end":""},{"old":"/usuarios/actualizar/:userId","type":1,"val":"userId","end":""}],
    types: placeholder as Registry['user.actualizar_usuario']['types'],
  },
  'user.reasignar_institucion_rol': {
    methods: ["PUT"],
    pattern: '/usuarios/reasignar/:userId',
    tokens: [{"old":"/usuarios/reasignar/:userId","type":0,"val":"usuarios","end":""},{"old":"/usuarios/reasignar/:userId","type":0,"val":"reasignar","end":""},{"old":"/usuarios/reasignar/:userId","type":1,"val":"userId","end":""}],
    types: placeholder as Registry['user.reasignar_institucion_rol']['types'],
  },
  'user.baja_insti': {
    methods: ["PUT"],
    pattern: '/usuarios/bajaInst/:userId',
    tokens: [{"old":"/usuarios/bajaInst/:userId","type":0,"val":"usuarios","end":""},{"old":"/usuarios/bajaInst/:userId","type":0,"val":"bajaInst","end":""},{"old":"/usuarios/bajaInst/:userId","type":1,"val":"userId","end":""}],
    types: placeholder as Registry['user.baja_insti']['types'],
  },
  'departamentos.obtener_departamentos': {
    methods: ["GET","HEAD"],
    pattern: '/departamento/listar',
    tokens: [{"old":"/departamento/listar","type":0,"val":"departamento","end":""},{"old":"/departamento/listar","type":0,"val":"listar","end":""}],
    types: placeholder as Registry['departamentos.obtener_departamentos']['types'],
  },
  'departamentos.crear_departamento': {
    methods: ["POST"],
    pattern: '/departamento/agregar',
    tokens: [{"old":"/departamento/agregar","type":0,"val":"departamento","end":""},{"old":"/departamento/agregar","type":0,"val":"agregar","end":""}],
    types: placeholder as Registry['departamentos.crear_departamento']['types'],
  },
  'departamentos.actualizar_depart': {
    methods: ["PUT"],
    pattern: '/departamento/actu/:id',
    tokens: [{"old":"/departamento/actu/:id","type":0,"val":"departamento","end":""},{"old":"/departamento/actu/:id","type":0,"val":"actu","end":""},{"old":"/departamento/actu/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['departamentos.actualizar_depart']['types'],
  },
  'municipios.obtener_municipios': {
    methods: ["GET","HEAD"],
    pattern: '/municipios/listar',
    tokens: [{"old":"/municipios/listar","type":0,"val":"municipios","end":""},{"old":"/municipios/listar","type":0,"val":"listar","end":""}],
    types: placeholder as Registry['municipios.obtener_municipios']['types'],
  },
  'municipios.crear_municipio': {
    methods: ["POST"],
    pattern: '/municipios/agregar',
    tokens: [{"old":"/municipios/agregar","type":0,"val":"municipios","end":""},{"old":"/municipios/agregar","type":0,"val":"agregar","end":""}],
    types: placeholder as Registry['municipios.crear_municipio']['types'],
  },
  'municipios.actualizar_municipio': {
    methods: ["PUT"],
    pattern: '/municipios/actu/:id',
    tokens: [{"old":"/municipios/actu/:id","type":0,"val":"municipios","end":""},{"old":"/municipios/actu/:id","type":0,"val":"actu","end":""},{"old":"/municipios/actu/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['municipios.actualizar_municipio']['types'],
  },
  'problematicas.obtener_problematicas': {
    methods: ["GET","HEAD"],
    pattern: '/problematica/listar',
    tokens: [{"old":"/problematica/listar","type":0,"val":"problematica","end":""},{"old":"/problematica/listar","type":0,"val":"listar","end":""}],
    types: placeholder as Registry['problematicas.obtener_problematicas']['types'],
  },
  'problematicas.crear_problematica': {
    methods: ["POST"],
    pattern: '/problematica/agregar',
    tokens: [{"old":"/problematica/agregar","type":0,"val":"problematica","end":""},{"old":"/problematica/agregar","type":0,"val":"agregar","end":""}],
    types: placeholder as Registry['problematicas.crear_problematica']['types'],
  },
  'problematicas.actualizar_problematica': {
    methods: ["PUT"],
    pattern: '/problematica/actu/:id',
    tokens: [{"old":"/problematica/actu/:id","type":0,"val":"problematica","end":""},{"old":"/problematica/actu/:id","type":0,"val":"actu","end":""},{"old":"/problematica/actu/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['problematicas.actualizar_problematica']['types'],
  },
  'instituciones.obtener_instituciones': {
    methods: ["GET","HEAD"],
    pattern: '/instituciones/listar',
    tokens: [{"old":"/instituciones/listar","type":0,"val":"instituciones","end":""},{"old":"/instituciones/listar","type":0,"val":"listar","end":""}],
    types: placeholder as Registry['instituciones.obtener_instituciones']['types'],
  },
  'instituciones.crear_institucion': {
    methods: ["POST"],
    pattern: '/instituciones/agregar',
    tokens: [{"old":"/instituciones/agregar","type":0,"val":"instituciones","end":""},{"old":"/instituciones/agregar","type":0,"val":"agregar","end":""}],
    types: placeholder as Registry['instituciones.crear_institucion']['types'],
  },
  'instituciones.actualizar_instituc': {
    methods: ["PUT"],
    pattern: '/instituciones/actu/:id',
    tokens: [{"old":"/instituciones/actu/:id","type":0,"val":"instituciones","end":""},{"old":"/instituciones/actu/:id","type":0,"val":"actu","end":""},{"old":"/instituciones/actu/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['instituciones.actualizar_instituc']['types'],
  },
  'reportes.obtener_reportes': {
    methods: ["GET","HEAD"],
    pattern: '/reportes/listar',
    tokens: [{"old":"/reportes/listar","type":0,"val":"reportes","end":""},{"old":"/reportes/listar","type":0,"val":"listar","end":""}],
    types: placeholder as Registry['reportes.obtener_reportes']['types'],
  },
  'reportes.crear_reporte': {
    methods: ["POST"],
    pattern: '/reportes/agregar',
    tokens: [{"old":"/reportes/agregar","type":0,"val":"reportes","end":""},{"old":"/reportes/agregar","type":0,"val":"agregar","end":""}],
    types: placeholder as Registry['reportes.crear_reporte']['types'],
  },
  'reportes.actualizar_reporte': {
    methods: ["PUT"],
    pattern: '/reportes/actualizar/:id',
    tokens: [{"old":"/reportes/actualizar/:id","type":0,"val":"reportes","end":""},{"old":"/reportes/actualizar/:id","type":0,"val":"actualizar","end":""},{"old":"/reportes/actualizar/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['reportes.actualizar_reporte']['types'],
  },
  'sectores.obtener_sectores': {
    methods: ["GET","HEAD"],
    pattern: '/sectores/listar',
    tokens: [{"old":"/sectores/listar","type":0,"val":"sectores","end":""},{"old":"/sectores/listar","type":0,"val":"listar","end":""}],
    types: placeholder as Registry['sectores.obtener_sectores']['types'],
  },
  'sectores.obtener_sector_id': {
    methods: ["GET","HEAD"],
    pattern: '/sectores/obtener/:id',
    tokens: [{"old":"/sectores/obtener/:id","type":0,"val":"sectores","end":""},{"old":"/sectores/obtener/:id","type":0,"val":"obtener","end":""},{"old":"/sectores/obtener/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['sectores.obtener_sector_id']['types'],
  },
  'sectores.crear_sector': {
    methods: ["POST"],
    pattern: '/sectores/agregar',
    tokens: [{"old":"/sectores/agregar","type":0,"val":"sectores","end":""},{"old":"/sectores/agregar","type":0,"val":"agregar","end":""}],
    types: placeholder as Registry['sectores.crear_sector']['types'],
  },
  'sectores.actualizar_sector': {
    methods: ["PUT"],
    pattern: '/sectores/actu/:id',
    tokens: [{"old":"/sectores/actu/:id","type":0,"val":"sectores","end":""},{"old":"/sectores/actu/:id","type":0,"val":"actu","end":""},{"old":"/sectores/actu/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['sectores.actualizar_sector']['types'],
  },
  'roles.obtener_rol': {
    methods: ["GET","HEAD"],
    pattern: '/roles/listar',
    tokens: [{"old":"/roles/listar","type":0,"val":"roles","end":""},{"old":"/roles/listar","type":0,"val":"listar","end":""}],
    types: placeholder as Registry['roles.obtener_rol']['types'],
  },
  'roles.obtener_rol_id': {
    methods: ["GET","HEAD"],
    pattern: '/roles/obtener/:id',
    tokens: [{"old":"/roles/obtener/:id","type":0,"val":"roles","end":""},{"old":"/roles/obtener/:id","type":0,"val":"obtener","end":""},{"old":"/roles/obtener/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['roles.obtener_rol_id']['types'],
  },
  'roles.crear_rol': {
    methods: ["POST"],
    pattern: '/roles/agregar',
    tokens: [{"old":"/roles/agregar","type":0,"val":"roles","end":""},{"old":"/roles/agregar","type":0,"val":"agregar","end":""}],
    types: placeholder as Registry['roles.crear_rol']['types'],
  },
  'roles.actualizar_rol': {
    methods: ["PUT"],
    pattern: '/roles/actu/:id',
    tokens: [{"old":"/roles/actu/:id","type":0,"val":"roles","end":""},{"old":"/roles/actu/:id","type":0,"val":"actu","end":""},{"old":"/roles/actu/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['roles.actualizar_rol']['types'],
  },
  'deta_reporte.obtener_deta_reporte': {
    methods: ["GET","HEAD"],
    pattern: '/detalleReportes/detalleReportes',
    tokens: [{"old":"/detalleReportes/detalleReportes","type":0,"val":"detalleReportes","end":""},{"old":"/detalleReportes/detalleReportes","type":0,"val":"detalleReportes","end":""}],
    types: placeholder as Registry['deta_reporte.obtener_deta_reporte']['types'],
  },
  'deta_reporte.obtener_detalle_id': {
    methods: ["GET","HEAD"],
    pattern: '/detalleReportes/detalleReportes/:id',
    tokens: [{"old":"/detalleReportes/detalleReportes/:id","type":0,"val":"detalleReportes","end":""},{"old":"/detalleReportes/detalleReportes/:id","type":0,"val":"detalleReportes","end":""},{"old":"/detalleReportes/detalleReportes/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['deta_reporte.obtener_detalle_id']['types'],
  },
  'deta_reporte.crear_detalle_reporte': {
    methods: ["POST"],
    pattern: '/detalleReportes/detalleReportes',
    tokens: [{"old":"/detalleReportes/detalleReportes","type":0,"val":"detalleReportes","end":""},{"old":"/detalleReportes/detalleReportes","type":0,"val":"detalleReportes","end":""}],
    types: placeholder as Registry['deta_reporte.crear_detalle_reporte']['types'],
  },
  'deta_reporte.actualizar_detalle_reporte': {
    methods: ["PUT"],
    pattern: '/detalleReportes/detalleReportes/:id',
    tokens: [{"old":"/detalleReportes/detalleReportes/:id","type":0,"val":"detalleReportes","end":""},{"old":"/detalleReportes/detalleReportes/:id","type":0,"val":"detalleReportes","end":""},{"old":"/detalleReportes/detalleReportes/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['deta_reporte.actualizar_detalle_reporte']['types'],
  },
  'dashboard.show_data': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/load',
    tokens: [{"old":"/dashboard/load","type":0,"val":"dashboard","end":""},{"old":"/dashboard/load","type":0,"val":"load","end":""}],
    types: placeholder as Registry['dashboard.show_data']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
