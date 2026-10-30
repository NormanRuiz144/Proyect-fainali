import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const AccessToken = () => import('#controllers/access_token_controller')
const Ban = () => import('#controllers/ban_controller')
const Dashboard = () => import('#controllers/dashboard_controller')
const Departamentos = () => import('#controllers/departamentos_controller')
const DetalleIncidencias = () => import('#controllers/detalle_incidencias_controller')
const DetalleMensajes = () => import('#controllers/detalle_mensajes_controller')
const Incidencias = () => import('#controllers/incidencias_controller')
const Municipios = () => import('#controllers/municipios_controller')
const OperadorPermisos = () => import('#controllers/operador_permisos_controller')
const Operadores = () => import('#controllers/operadores_controller')
const Permisos = () => import('#controllers/permisos_controller')
const Problematicas = () => import('#controllers/problematicas_controller')
const Profile = () => import('#controllers/profile_controller')
const Sectores = () => import('#controllers/sectores_controller')
const User = () => import('#controllers/user_controller')
const Mensajes = () => import('#controllers/mensajes_controller')

router.get('/', () => ({ status: 'ok' }))

router
  .group(() => {
    router.post('/registro', [User, 'registrarse'])
    router.get('/departamentos', [Departamentos, 'obtenerDepartamentos'])
    router.get('/departamentos/:id/municipios', [Municipios, 'municipiosPorDepartamento'])
    router.get('/problematicas', [Problematicas, 'obtenerProblematicas'])
    router.get('/sectores', [Sectores, 'obtenerSectores'])
  })
  .prefix('/public')
  .as('public')

router.post('/auth/login', [AccessToken, 'store'])
router.post('/auth/logout', [AccessToken, 'destroy']).use(middleware.auth())
router.get('/account/profile', [Profile, 'show']).use(middleware.auth())

router
  .group(() => {
    router.get('/', [User, 'listUsuarios']).use(middleware.permisosOperador(['usuarios.ver']))
    router.post('/', [User, 'crearUsuario']).use(middleware.permisosOperador(['usuarios.crear']))
    router
      .get('/:userId', [User, 'buscarUsurioById'])
      .use(middleware.permisosOperador(['usuarios.ver']))
    router
      .put('/:userId', [User, 'actualizarUsuario'])
      .use(middleware.permisosOperador(['usuarios.actualizar']))
    router
      .post('/baneos', [Ban, 'banUser'])
      .use(middleware.permisosOperador(['banned_users.crear']))
    router
      .patch('/:userId/desbanear', [Ban, 'unbanUser'])
      .use(middleware.permisosOperador(['banned_users.actualizar']))
    router
      .get('/baneos/activos', [Ban, 'listBannedUsers'])
      .use(middleware.permisosOperador(['banned_users.ver']))
  })
  .prefix('/usuarios')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/', [Departamentos, 'obtenerDepartamentos'])
    router
      .post('/', [Departamentos, 'crearDepartamento'])
      .use(middleware.permisosOperador(['departamentos.crear']))
    router
      .put('/:id', [Departamentos, 'actualizarDepart'])
      .use(middleware.permisosOperador(['departamentos.actualizar']))
    router
      .delete('/:id', [Departamentos, 'eliminarDepartamento'])
      .use(middleware.permisosOperador(['departamentos.eliminar']))
    router
      .patch('/:id/restaurar', [Departamentos, 'restaurarDepartamento'])
      .use(middleware.permisosOperador(['departamentos.actualizar']))
    router.get('/:id/municipios', [Municipios, 'municipiosPorDepartamento'])
  })
  .prefix('/departamentos')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/', [Municipios, 'obtenerMunicipios'])
    router
      .post('/', [Municipios, 'crearMunicipio'])
      .use(middleware.permisosOperador(['municipios.crear']))
    router
      .put('/:id', [Municipios, 'actualizarMunicipio'])
      .use(middleware.permisosOperador(['municipios.actualizar']))
    router
      .delete('/:id', [Municipios, 'eliminarMunicipio'])
      .use(middleware.permisosOperador(['municipios.eliminar']))
    router
      .patch('/:id/restaurar', [Municipios, 'restaurarMunicipio'])
      .use(middleware.permisosOperador(['municipios.actualizar']))
  })
  .prefix('/municipios')
  .use(middleware.auth())

router
  .group(() => {
    router
      .post('/', [Problematicas, 'crearProblematica'])
      .use(middleware.permisosOperador(['problematicas.crear']))
    router
      .get('/:id', [Problematicas, 'obtenerProblematica'])
      .use(middleware.permisosOperador(['problematicas.ver']))
    router
      .put('/:id', [Problematicas, 'actualizarProblematica'])
      .use(middleware.permisosOperador(['problematicas.actualizar']))
    router
      .delete('/:id', [Problematicas, 'eliminarProblematica'])
      .use(middleware.permisosOperador(['problematicas.eliminar']))
    router
      .patch('/:id/restaurar', [Problematicas, 'restaurarProblematica'])
      .use(middleware.permisosOperador(['problematicas.actualizar']))
  })
  .prefix('/problematicas')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/', [Sectores, 'obtenerSectores'])
    router.post('/', [Sectores, 'crearSector']).use(middleware.permisosOperador(['sectores.crear']))
    router
      .get('/:id', [Sectores, 'obtenerSectorId'])
      .use(middleware.permisosOperador(['sectores.ver']))
    router
      .put('/:id', [Sectores, 'actualizarSector'])
      .use(middleware.permisosOperador(['sectores.actualizar']))
    router
      .delete('/:id', [Sectores, 'eliminarSector'])
      .use(middleware.permisosOperador(['sectores.eliminar']))
    router
      .patch('/:id/restaurar', [Sectores, 'restaurarSector'])
      .use(middleware.permisosOperador(['sectores.actualizar']))
  })
  .prefix('/sectores')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/historial', [Incidencias, 'historialUsuario'])
    router
      .get('/', [Incidencias, 'obtenerIncidencias'])
      .use(middleware.permisosOperador(['incidencias.ver']))
    router.post('/', [Incidencias, 'crearIncidencia'])
    router.get('/:id', [Incidencias, 'obtenerIncidencia'])
    router.put('/:id', [Incidencias, 'actualizarIncidencia'])
    router
      .patch('/:id/estado', [Incidencias, 'actualizarEstadoIncidencia'])
      .use(middleware.permisosOperador(['incidencias.actualizar']))
  })
  .prefix('/incidencias')
  .use(middleware.auth())

router
  .group(() => {
    router
      .get('/', [DetalleIncidencias, 'obtenerDetalles'])
      .use(middleware.permisosOperador(['detalle_incidencias.ver']))
    router
      .post('/', [DetalleIncidencias, 'crearDetalle'])
      .use(middleware.permisosOperador(['detalle_incidencias.crear']))
    router
      .get('/:id', [DetalleIncidencias, 'obtenerDetalle'])
      .use(middleware.permisosOperador(['detalle_incidencias.ver']))
    router
      .put('/:id', [DetalleIncidencias, 'actualizarDetalle'])
      .use(middleware.permisosOperador(['detalle_incidencias.actualizar']))
  })
  .prefix('/detalle-incidencias')
  .use(middleware.auth())

router
  .group(() => {
    router
      .get('/', [Operadores, 'obtenerOperadores'])
      .use(middleware.permisosOperador(['operadores.ver']))
    router
      .post('/', [Operadores, 'crearOperador'])
      .use(middleware.permisosOperador(['operadores.crear']))
    router
      .get('/:id', [Operadores, 'obtenerOperador'])
      .use(middleware.permisosOperador(['operadores.ver']))
    router
      .put('/:id', [Operadores, 'actualizarOperador'])
      .use(middleware.permisosOperador(['operadores.actualizar']))
    router
      .delete('/:id', [Operadores, 'eliminarOperador'])
      .use(middleware.permisosOperador(['operadores.eliminar']))
  })
  .prefix('/operadores')
  .use(middleware.auth())

router
  .group(() => {
    router
      .get('/', [Permisos, 'obtenerPermisos'])
      .use(middleware.permisosOperador(['permisos.ver']))
    router.post('/', [Permisos, 'crearPermiso']).use(middleware.administrarPermisos())
    router
      .get('/:id', [Permisos, 'obtenerPermiso'])
      .use(middleware.permisosOperador(['permisos.ver']))
    router.put('/:id', [Permisos, 'actualizarPermiso']).use(middleware.administrarPermisos())
    router.delete('/:id', [Permisos, 'eliminarPermiso']).use(middleware.administrarPermisos())
  })
  .prefix('/permisos')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/', [OperadorPermisos, 'obtenerAsignaciones']).use(middleware.administrarPermisos())
    router.post('/', [OperadorPermisos, 'asignarPermiso']).use(middleware.administrarPermisos())
    router
      .get('/:id', [OperadorPermisos, 'obtenerAsignacion'])
      .use(middleware.administrarPermisos())
    router
      .put('/:id', [OperadorPermisos, 'actualizarAsignacion'])
      .use(middleware.administrarPermisos())
    router
      .delete('/:id', [OperadorPermisos, 'eliminarAsignacion'])
      .use(middleware.administrarPermisos())
  })
  .prefix('/operador-permisos')
  .use(middleware.auth())

router
  .group(() => {
    router
      .get('/', [Mensajes, 'obtenerMensajes'])
      .use(middleware.permisosOperador(['mensajes.ver']))
    router
      .post('/', [Mensajes, 'crearMensaje'])
      .use(middleware.permisosOperador(['mensajes.crear']))
    router
      .get('/:id', [Mensajes, 'obtenerMensaje'])
      .use(middleware.permisosOperador(['mensajes.ver']))
    router
      .put('/:id', [Mensajes, 'actualizarMensaje'])
      .use(middleware.permisosOperador(['mensajes.actualizar']))
    router
      .delete('/:id', [Mensajes, 'eliminarMensaje'])
      .use(middleware.permisosOperador(['mensajes.eliminar']))
  })
  .prefix('/mensajes')
  .use(middleware.auth())

router
  .group(() => {
    router
      .get('/', [DetalleMensajes, 'obtenerDetalleMensajes'])
      .use(middleware.permisosOperador(['detalle_mensajes.ver']))
    router
      .post('/', [DetalleMensajes, 'crearDetalleMensaje'])
      .use(middleware.permisosOperador(['detalle_mensajes.crear']))
    router
      .get('/:id', [DetalleMensajes, 'obtenerDetalleMensaje'])
      .use(middleware.permisosOperador(['detalle_mensajes.ver']))
    router
      .put('/:id', [DetalleMensajes, 'actualizarDetalleMensaje'])
      .use(middleware.permisosOperador(['detalle_mensajes.actualizar']))
    router
      .delete('/:id', [DetalleMensajes, 'eliminarDetalleMensaje'])
      .use(middleware.permisosOperador(['detalle_mensajes.eliminar']))
  })
  .prefix('/detalle-mensajes')
  .use(middleware.auth())

router
  .get('/dashboard', [Dashboard, 'showData'])
  .use([middleware.auth(), middleware.permisosOperador(['operadores.ver'])])
