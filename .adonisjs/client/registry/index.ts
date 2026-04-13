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
    pattern: '/departamento',
    tokens: [{"old":"/departamento","type":0,"val":"departamento","end":""}],
    types: placeholder as Registry['departamentos.obtener_departamentos']['types'],
  },
  'departamentos.crear_departamento': {
    methods: ["POST"],
    pattern: '/departamento',
    tokens: [{"old":"/departamento","type":0,"val":"departamento","end":""}],
    types: placeholder as Registry['departamentos.crear_departamento']['types'],
  },
  'departamentos.actualizar_depart': {
    methods: ["PUT"],
    pattern: '/departamento/:id',
    tokens: [{"old":"/departamento/:id","type":0,"val":"departamento","end":""},{"old":"/departamento/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['departamentos.actualizar_depart']['types'],
  },
  'municipios.obtener_departamentos': {
    methods: ["GET","HEAD"],
    pattern: '/municipios',
    tokens: [{"old":"/municipios","type":0,"val":"municipios","end":""}],
    types: placeholder as Registry['municipios.obtener_departamentos']['types'],
  },
  'municipios.crear_municipio': {
    methods: ["POST"],
    pattern: '/municipios',
    tokens: [{"old":"/municipios","type":0,"val":"municipios","end":""}],
    types: placeholder as Registry['municipios.crear_municipio']['types'],
  },
  'municipios.actualizar_municipio': {
    methods: ["PUT"],
    pattern: '/municipios/:id',
    tokens: [{"old":"/municipios/:id","type":0,"val":"municipios","end":""},{"old":"/municipios/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['municipios.actualizar_municipio']['types'],
  },
  'problematicas.obtener_problematicas': {
    methods: ["GET","HEAD"],
    pattern: '/problematica',
    tokens: [{"old":"/problematica","type":0,"val":"problematica","end":""}],
    types: placeholder as Registry['problematicas.obtener_problematicas']['types'],
  },
  'problematicas.crear_problematica': {
    methods: ["POST"],
    pattern: '/problematica',
    tokens: [{"old":"/problematica","type":0,"val":"problematica","end":""}],
    types: placeholder as Registry['problematicas.crear_problematica']['types'],
  },
  'problematicas.actualizar_problematica': {
    methods: ["PUT"],
    pattern: '/problematica/:id',
    tokens: [{"old":"/problematica/:id","type":0,"val":"problematica","end":""},{"old":"/problematica/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['problematicas.actualizar_problematica']['types'],
  },
  'instituciones.obtener_instituciones': {
    methods: ["GET","HEAD"],
    pattern: '/instituciones',
    tokens: [{"old":"/instituciones","type":0,"val":"instituciones","end":""}],
    types: placeholder as Registry['instituciones.obtener_instituciones']['types'],
  },
  'instituciones.crear_institucion': {
    methods: ["POST"],
    pattern: '/instituciones',
    tokens: [{"old":"/instituciones","type":0,"val":"instituciones","end":""}],
    types: placeholder as Registry['instituciones.crear_institucion']['types'],
  },
  'instituciones.actualizar_instituc': {
    methods: ["PUT"],
    pattern: '/instituciones/:id',
    tokens: [{"old":"/instituciones/:id","type":0,"val":"instituciones","end":""},{"old":"/instituciones/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['instituciones.actualizar_instituc']['types'],
  },
  'reportes.obtener_reportes': {
    methods: ["GET","HEAD"],
    pattern: '/reportes',
    tokens: [{"old":"/reportes","type":0,"val":"reportes","end":""}],
    types: placeholder as Registry['reportes.obtener_reportes']['types'],
  },
  'reportes.crear_reporte': {
    methods: ["POST"],
    pattern: '/reportes',
    tokens: [{"old":"/reportes","type":0,"val":"reportes","end":""}],
    types: placeholder as Registry['reportes.crear_reporte']['types'],
  },
  'reportes.actualizar_reporte': {
    methods: ["PUT"],
    pattern: '/reportes/:id',
    tokens: [{"old":"/reportes/:id","type":0,"val":"reportes","end":""},{"old":"/reportes/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['reportes.actualizar_reporte']['types'],
  },
  'sectores.obtener_sectores': {
    methods: ["GET","HEAD"],
    pattern: '/sectores',
    tokens: [{"old":"/sectores","type":0,"val":"sectores","end":""}],
    types: placeholder as Registry['sectores.obtener_sectores']['types'],
  },
  'sectores.obtener_sector_id': {
    methods: ["GET","HEAD"],
    pattern: '/sectores/:id',
    tokens: [{"old":"/sectores/:id","type":0,"val":"sectores","end":""},{"old":"/sectores/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['sectores.obtener_sector_id']['types'],
  },
  'sectores.crear_sector': {
    methods: ["POST"],
    pattern: '/sectores',
    tokens: [{"old":"/sectores","type":0,"val":"sectores","end":""}],
    types: placeholder as Registry['sectores.crear_sector']['types'],
  },
  'sectores.actualizar_sector': {
    methods: ["PUT"],
    pattern: '/sectores/:id',
    tokens: [{"old":"/sectores/:id","type":0,"val":"sectores","end":""},{"old":"/sectores/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['sectores.actualizar_sector']['types'],
  },
  'roles.obtener_rol': {
    methods: ["GET","HEAD"],
    pattern: '/roles',
    tokens: [{"old":"/roles","type":0,"val":"roles","end":""}],
    types: placeholder as Registry['roles.obtener_rol']['types'],
  },
  'roles.obtener_rol_id': {
    methods: ["GET","HEAD"],
    pattern: '/roles/:id',
    tokens: [{"old":"/roles/:id","type":0,"val":"roles","end":""},{"old":"/roles/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['roles.obtener_rol_id']['types'],
  },
  'roles.crear_rol': {
    methods: ["POST"],
    pattern: '/roles',
    tokens: [{"old":"/roles","type":0,"val":"roles","end":""}],
    types: placeholder as Registry['roles.crear_rol']['types'],
  },
  'roles.actualizar_rol': {
    methods: ["PUT"],
    pattern: '/roles/:id',
    tokens: [{"old":"/roles/:id","type":0,"val":"roles","end":""},{"old":"/roles/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['roles.actualizar_rol']['types'],
  },
  'deta_reporte.obtener_deta_reporte': {
    methods: ["GET","HEAD"],
    pattern: '/detalleReportes',
    tokens: [{"old":"/detalleReportes","type":0,"val":"detalleReportes","end":""}],
    types: placeholder as Registry['deta_reporte.obtener_deta_reporte']['types'],
  },
  'deta_reporte.obtener_detalle_id': {
    methods: ["GET","HEAD"],
    pattern: '/detalleReportes/:id',
    tokens: [{"old":"/detalleReportes/:id","type":0,"val":"detalleReportes","end":""},{"old":"/detalleReportes/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['deta_reporte.obtener_detalle_id']['types'],
  },
  'deta_reporte.crear_detalle_reporte': {
    methods: ["POST"],
    pattern: '/detalleReportes',
    tokens: [{"old":"/detalleReportes","type":0,"val":"detalleReportes","end":""}],
    types: placeholder as Registry['deta_reporte.crear_detalle_reporte']['types'],
  },
  'deta_reporte.actualizar_detalle_reporte': {
    methods: ["PUT"],
    pattern: '/detalleReportes/:id',
    tokens: [{"old":"/detalleReportes/:id","type":0,"val":"detalleReportes","end":""},{"old":"/detalleReportes/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['deta_reporte.actualizar_detalle_reporte']['types'],
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
