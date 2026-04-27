/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import AutoSwagger from '@rnwonder/adonis-autoswagger'
import swagger from '#config/swagger'

router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})

router.get('/docs', async () => {
  return AutoSwagger.default.ui('/swagger', swagger)
})

//Ruta super importante
router.get('/', () => {
  return { hello: 'world' }
})
// Grupo de autenticacion
router.group(() => {
  router
    .group(() => {
      router.post('resgistro', [controllers.User, 'registrarse'])
      router.post('login', [controllers.AccessToken, 'store'])
      router.post('logout', [controllers.AccessToken, 'destroy']).use(middleware.auth())
    })
    .prefix('auth')
    .as('auth')

  router
    .group(() => {
      router.get('/profile', [controllers.Profile, 'show'])
    })
    .prefix('account')
    .as('profile')
    .use(middleware.auth())
})
// rutas de Usuario
router
  .group(() => {
    router.get('/listar', [controllers.User, 'listUsuariosInsti'])
    router.post('/crear', [controllers.User, 'crearUsuario'])
    router.get('/obtener/:userId', [controllers.User, 'buscarUsurioById'])
    router.put('/actualizar/:userId', [controllers.User, 'actualizarUsuario'])
    router.put('/reasignar/:userId', [controllers.User, 'reasignarInstitucionRol'])
    router.put('/bajaInst/:userId', [controllers.User, 'bajaInsti'])
    // router.delete('/dormirUsuario/:userId',[controllers.User, ''])
  })
  .prefix('/usuarios')
  .use(middleware.auth())
  .use(middleware.rolGuardia(['Admin']))

// Rutas de departamentos
router
  .group(() => {
    router.get('/listar', [controllers.Departamentos, 'obtenerDepartamentos'])
    router.post('/agregar', [controllers.Departamentos, 'crearDepartamento'])
    router.put('/actu/:id', [controllers.Departamentos, 'actualizarDepart'])
  })
  .prefix('departamento')
  .use(middleware.auth())
  .use(middleware.rolGuardia(['Admin']))

// Rutas de Municipios
router
  .group(() => {
    router.get('/listar', [controllers.Municipios, 'obtenerMunicipios'])
    router.post('/agregar', [controllers.Municipios, 'crearMunicipio'])
    router.put('/actu/:id', [controllers.Municipios, 'actualizarMunicipio'])
  })
  .prefix('municipios')
  .use(middleware.auth())
  .use(middleware.rolGuardia(['Admin']))

//Rutas de Problematicas
router
  .group(() => {
    router.get('/listar', [controllers.Problematicas, 'obtenerProblematicas'])
    router.post('/agregar', [controllers.Problematicas, 'crearProblematica'])
    router.put('/actu/:id', [controllers.Problematicas, 'actualizarProblematica'])
  })
  .prefix('problematica')
  .use(middleware.auth())
  .use(middleware.rolGuardia(['Admin']))

// //Rutas de Instituciones
router
  .group(() => {
    router.get('/listar', [controllers.Instituciones, 'obtenerInstituciones'])
    router.post('/agregar', [controllers.Instituciones, 'crearInstitucion'])
    router.put('/actu/:id', [controllers.Instituciones, 'actualizarInstituc'])
  })
  .prefix('instituciones')
  .use(middleware.auth())
  .use(middleware.rolGuardia(['Admin']))

// Rutas de Reportes
router
  .group(() => {
    router
      .get('/listar', [controllers.Reportes, 'obtenerReportes'])
      .use(middleware.rolGuardia(['Admin']))
    router
      .post('/agregar', [controllers.Reportes, 'crearReporte'])
      .use(middleware.rolGuardia(['Admin', 'default']))
    router
      .put('/actu/:id', [controllers.Reportes, 'actualizarReporte'])
      .use(middleware.rolGuardia(['Admin', 'default']))
  })
  .prefix('reportes')
  .use(middleware.auth())

//Rutas Sectores//
router
  .group(() => {
    router.get('/listar', [controllers.Sectores, 'obtenerSectores'])
    router
      .get('/obtener/:id', [controllers.Sectores, 'obtenerSectorId'])
      .use(middleware.rolGuardia(['Admin']))
    router
      .post('/agregar', [controllers.Sectores, 'crearSector'])
      .use(middleware.rolGuardia(['Admin']))
    router
      .put('/actu/:id', [controllers.Sectores, 'actualizarSector'])
      .use(middleware.rolGuardia(['Admin']))
  })
  .prefix('sectores')
  .use(middleware.auth())

//RUTAS ROL//
router
  .group(() => {
    router.get('/listar', [controllers.Roles, 'obtenerRol'])
    router.get('/obtener/:id', [controllers.Roles, 'obtenerRolId'])
    router.post('/agregar', [controllers.Roles, 'crearRol'])
    router.put('/actu/:id', [controllers.Roles, 'actualizarRol'])
  })
  .prefix('roles')
  .use(middleware.auth())
  .use(middleware.rolGuardia(['Admin']))

//RUTAS DETALLE REPORTE//
router
  .group(() => {
    router.get('/listar', [controllers.DetaReporte, 'obtenerDetaReporte'])
    router.get('/obtener/:id', [controllers.DetaReporte, 'obtenerDetalleId'])
    router.post('/agregar', [controllers.DetaReporte, 'crearDetalleReporte'])
    router.put('/actu/:id', [controllers.DetaReporte, 'actualizarDetalleReporte'])
  })
  .prefix('detalleReportes')
  .use(middleware.auth())
  .use(middleware.rolGuardia(['Admin']))

// Rutas pal Dashboard
router
  .group(() => {
    router.get('/load', [controllers.Dashboard, 'showData'])
  })
  .prefix('dashboard')
  .use(middleware.auth())
  .use(middleware.rolGuardia(['Admin']))
