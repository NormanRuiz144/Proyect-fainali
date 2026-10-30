/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'public.user.registrarse': {
    methods: ["POST"],
    pattern: '/public/registro',
    tokens: [{"old":"/public/registro","type":0,"val":"public","end":""},{"old":"/public/registro","type":0,"val":"registro","end":""}],
    types: placeholder as Registry['public.user.registrarse']['types'],
  },
  'public.departamentos.obtener_departamentos': {
    methods: ["GET","HEAD"],
    pattern: '/public/departamentos',
    tokens: [{"old":"/public/departamentos","type":0,"val":"public","end":""},{"old":"/public/departamentos","type":0,"val":"departamentos","end":""}],
    types: placeholder as Registry['public.departamentos.obtener_departamentos']['types'],
  },
  'public.municipios.municipios_por_departamento': {
    methods: ["GET","HEAD"],
    pattern: '/public/departamentos/:id/municipios',
    tokens: [{"old":"/public/departamentos/:id/municipios","type":0,"val":"public","end":""},{"old":"/public/departamentos/:id/municipios","type":0,"val":"departamentos","end":""},{"old":"/public/departamentos/:id/municipios","type":1,"val":"id","end":""},{"old":"/public/departamentos/:id/municipios","type":0,"val":"municipios","end":""}],
    types: placeholder as Registry['public.municipios.municipios_por_departamento']['types'],
  },
  'public.sectores.obtener_sectores': {
    methods: ["GET","HEAD"],
    pattern: '/public/sectores',
    tokens: [{"old":"/public/sectores","type":0,"val":"public","end":""},{"old":"/public/sectores","type":0,"val":"sectores","end":""}],
    types: placeholder as Registry['public.sectores.obtener_sectores']['types'],
  },
  'access_token.store': {
    methods: ["POST"],
    pattern: '/auth/login',
    tokens: [{"old":"/auth/login","type":0,"val":"auth","end":""},{"old":"/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['access_token.store']['types'],
  },
  'access_token.destroy': {
    methods: ["POST"],
    pattern: '/auth/logout',
    tokens: [{"old":"/auth/logout","type":0,"val":"auth","end":""},{"old":"/auth/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['access_token.destroy']['types'],
  },
  'profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/account/profile',
    tokens: [{"old":"/account/profile","type":0,"val":"account","end":""},{"old":"/account/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.show']['types'],
  },
  'user.list_usuarios': {
    methods: ["GET","HEAD"],
    pattern: '/usuarios',
    tokens: [{"old":"/usuarios","type":0,"val":"usuarios","end":""}],
    types: placeholder as Registry['user.list_usuarios']['types'],
  },
  'user.crear_usuario': {
    methods: ["POST"],
    pattern: '/usuarios',
    tokens: [{"old":"/usuarios","type":0,"val":"usuarios","end":""}],
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
    pattern: '/usuarios/:userId',
    tokens: [{"old":"/usuarios/:userId","type":0,"val":"usuarios","end":""},{"old":"/usuarios/:userId","type":1,"val":"userId","end":""}],
    types: placeholder as Registry['user.actualizar_usuario']['types'],
  },
  'ban.ban_user': {
    methods: ["POST"],
    pattern: '/usuarios/baneos',
    tokens: [{"old":"/usuarios/baneos","type":0,"val":"usuarios","end":""},{"old":"/usuarios/baneos","type":0,"val":"baneos","end":""}],
    types: placeholder as Registry['ban.ban_user']['types'],
  },
  'ban.unban_user': {
    methods: ["PATCH"],
    pattern: '/usuarios/:userId/desbanear',
    tokens: [{"old":"/usuarios/:userId/desbanear","type":0,"val":"usuarios","end":""},{"old":"/usuarios/:userId/desbanear","type":1,"val":"userId","end":""},{"old":"/usuarios/:userId/desbanear","type":0,"val":"desbanear","end":""}],
    types: placeholder as Registry['ban.unban_user']['types'],
  },
  'ban.list_banned_users': {
    methods: ["GET","HEAD"],
    pattern: '/usuarios/baneos/activos',
    tokens: [{"old":"/usuarios/baneos/activos","type":0,"val":"usuarios","end":""},{"old":"/usuarios/baneos/activos","type":0,"val":"baneos","end":""},{"old":"/usuarios/baneos/activos","type":0,"val":"activos","end":""}],
    types: placeholder as Registry['ban.list_banned_users']['types'],
  },
  'departamentos.obtener_departamentos': {
    methods: ["GET","HEAD"],
    pattern: '/departamentos',
    tokens: [{"old":"/departamentos","type":0,"val":"departamentos","end":""}],
    types: placeholder as Registry['departamentos.obtener_departamentos']['types'],
  },
  'departamentos.crear_departamento': {
    methods: ["POST"],
    pattern: '/departamentos',
    tokens: [{"old":"/departamentos","type":0,"val":"departamentos","end":""}],
    types: placeholder as Registry['departamentos.crear_departamento']['types'],
  },
  'departamentos.actualizar_depart': {
    methods: ["PUT"],
    pattern: '/departamentos/:id',
    tokens: [{"old":"/departamentos/:id","type":0,"val":"departamentos","end":""},{"old":"/departamentos/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['departamentos.actualizar_depart']['types'],
  },
  'departamentos.eliminar_departamento': {
    methods: ["DELETE"],
    pattern: '/departamentos/:id',
    tokens: [{"old":"/departamentos/:id","type":0,"val":"departamentos","end":""},{"old":"/departamentos/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['departamentos.eliminar_departamento']['types'],
  },
  'departamentos.restaurar_departamento': {
    methods: ["PATCH"],
    pattern: '/departamentos/:id/restaurar',
    tokens: [{"old":"/departamentos/:id/restaurar","type":0,"val":"departamentos","end":""},{"old":"/departamentos/:id/restaurar","type":1,"val":"id","end":""},{"old":"/departamentos/:id/restaurar","type":0,"val":"restaurar","end":""}],
    types: placeholder as Registry['departamentos.restaurar_departamento']['types'],
  },
  'municipios.municipios_por_departamento': {
    methods: ["GET","HEAD"],
    pattern: '/departamentos/:id/municipios',
    tokens: [{"old":"/departamentos/:id/municipios","type":0,"val":"departamentos","end":""},{"old":"/departamentos/:id/municipios","type":1,"val":"id","end":""},{"old":"/departamentos/:id/municipios","type":0,"val":"municipios","end":""}],
    types: placeholder as Registry['municipios.municipios_por_departamento']['types'],
  },
  'municipios.obtener_municipios': {
    methods: ["GET","HEAD"],
    pattern: '/municipios',
    tokens: [{"old":"/municipios","type":0,"val":"municipios","end":""}],
    types: placeholder as Registry['municipios.obtener_municipios']['types'],
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
  'municipios.eliminar_municipio': {
    methods: ["DELETE"],
    pattern: '/municipios/:id',
    tokens: [{"old":"/municipios/:id","type":0,"val":"municipios","end":""},{"old":"/municipios/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['municipios.eliminar_municipio']['types'],
  },
  'municipios.restaurar_municipio': {
    methods: ["PATCH"],
    pattern: '/municipios/:id/restaurar',
    tokens: [{"old":"/municipios/:id/restaurar","type":0,"val":"municipios","end":""},{"old":"/municipios/:id/restaurar","type":1,"val":"id","end":""},{"old":"/municipios/:id/restaurar","type":0,"val":"restaurar","end":""}],
    types: placeholder as Registry['municipios.restaurar_municipio']['types'],
  },
  'sectores.obtener_sectores': {
    methods: ["GET","HEAD"],
    pattern: '/sectores',
    tokens: [{"old":"/sectores","type":0,"val":"sectores","end":""}],
    types: placeholder as Registry['sectores.obtener_sectores']['types'],
  },
  'sectores.crear_sector': {
    methods: ["POST"],
    pattern: '/sectores',
    tokens: [{"old":"/sectores","type":0,"val":"sectores","end":""}],
    types: placeholder as Registry['sectores.crear_sector']['types'],
  },
  'sectores.obtener_sector_id': {
    methods: ["GET","HEAD"],
    pattern: '/sectores/:id',
    tokens: [{"old":"/sectores/:id","type":0,"val":"sectores","end":""},{"old":"/sectores/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['sectores.obtener_sector_id']['types'],
  },
  'sectores.actualizar_sector': {
    methods: ["PUT"],
    pattern: '/sectores/:id',
    tokens: [{"old":"/sectores/:id","type":0,"val":"sectores","end":""},{"old":"/sectores/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['sectores.actualizar_sector']['types'],
  },
  'sectores.eliminar_sector': {
    methods: ["DELETE"],
    pattern: '/sectores/:id',
    tokens: [{"old":"/sectores/:id","type":0,"val":"sectores","end":""},{"old":"/sectores/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['sectores.eliminar_sector']['types'],
  },
  'sectores.restaurar_sector': {
    methods: ["PATCH"],
    pattern: '/sectores/:id/restaurar',
    tokens: [{"old":"/sectores/:id/restaurar","type":0,"val":"sectores","end":""},{"old":"/sectores/:id/restaurar","type":1,"val":"id","end":""},{"old":"/sectores/:id/restaurar","type":0,"val":"restaurar","end":""}],
    types: placeholder as Registry['sectores.restaurar_sector']['types'],
  },
  'incidencias.historial_usuario': {
    methods: ["GET","HEAD"],
    pattern: '/incidencias/historial',
    tokens: [{"old":"/incidencias/historial","type":0,"val":"incidencias","end":""},{"old":"/incidencias/historial","type":0,"val":"historial","end":""}],
    types: placeholder as Registry['incidencias.historial_usuario']['types'],
  },
  'incidencias.obtener_incidencias': {
    methods: ["GET","HEAD"],
    pattern: '/incidencias',
    tokens: [{"old":"/incidencias","type":0,"val":"incidencias","end":""}],
    types: placeholder as Registry['incidencias.obtener_incidencias']['types'],
  },
  'incidencias.crear_incidencia': {
    methods: ["POST"],
    pattern: '/incidencias',
    tokens: [{"old":"/incidencias","type":0,"val":"incidencias","end":""}],
    types: placeholder as Registry['incidencias.crear_incidencia']['types'],
  },
  'incidencias.obtener_incidencia': {
    methods: ["GET","HEAD"],
    pattern: '/incidencias/:id',
    tokens: [{"old":"/incidencias/:id","type":0,"val":"incidencias","end":""},{"old":"/incidencias/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['incidencias.obtener_incidencia']['types'],
  },
  'incidencias.actualizar_incidencia': {
    methods: ["PUT"],
    pattern: '/incidencias/:id',
    tokens: [{"old":"/incidencias/:id","type":0,"val":"incidencias","end":""},{"old":"/incidencias/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['incidencias.actualizar_incidencia']['types'],
  },
  'incidencias.actualizar_estado_incidencia': {
    methods: ["PATCH"],
    pattern: '/incidencias/:id/estado',
    tokens: [{"old":"/incidencias/:id/estado","type":0,"val":"incidencias","end":""},{"old":"/incidencias/:id/estado","type":1,"val":"id","end":""},{"old":"/incidencias/:id/estado","type":0,"val":"estado","end":""}],
    types: placeholder as Registry['incidencias.actualizar_estado_incidencia']['types'],
  },
  'detalle_incidencias.obtener_detalles': {
    methods: ["GET","HEAD"],
    pattern: '/detalle-incidencias',
    tokens: [{"old":"/detalle-incidencias","type":0,"val":"detalle-incidencias","end":""}],
    types: placeholder as Registry['detalle_incidencias.obtener_detalles']['types'],
  },
  'detalle_incidencias.crear_detalle': {
    methods: ["POST"],
    pattern: '/detalle-incidencias',
    tokens: [{"old":"/detalle-incidencias","type":0,"val":"detalle-incidencias","end":""}],
    types: placeholder as Registry['detalle_incidencias.crear_detalle']['types'],
  },
  'detalle_incidencias.obtener_detalle': {
    methods: ["GET","HEAD"],
    pattern: '/detalle-incidencias/:id',
    tokens: [{"old":"/detalle-incidencias/:id","type":0,"val":"detalle-incidencias","end":""},{"old":"/detalle-incidencias/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['detalle_incidencias.obtener_detalle']['types'],
  },
  'detalle_incidencias.actualizar_detalle': {
    methods: ["PUT"],
    pattern: '/detalle-incidencias/:id',
    tokens: [{"old":"/detalle-incidencias/:id","type":0,"val":"detalle-incidencias","end":""},{"old":"/detalle-incidencias/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['detalle_incidencias.actualizar_detalle']['types'],
  },
  'dashboard.show_data': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard',
    tokens: [{"old":"/dashboard","type":0,"val":"dashboard","end":""}],
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
