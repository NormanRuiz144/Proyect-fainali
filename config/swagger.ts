export default {
  uiEnabled: true,
  uiUrl: 'docs',
  specEnabled: true,
  specUrl: '/swagger.json',
  middleware: [],
  path: './',
  tagIndex: 2,
  info: {
    title: 'Mi API con AdonisJS',
    version: '1.0.0',
    description: 'Documentación generada xd',
  },
  snakeCase: true,

  debug: false, // set to true, to get some useful debug output
  ignore: ['/swagger', '/docs'],
  preferredPutPatch: 'PUT', // if PUT/PATCH are provided for the same route, prefer PUT
  common: {
    parameters: {}, // OpenAPI conform parameters that are commonly used
    headers: {}, // OpenAPI conform headers that are commonly used
  },
  securitySchemes: {}, // optional
  authMiddlewares: ['auth', 'auth:api'], // optional
  defaultSecurityScheme: 'BearerAuth', // optional
  persistAuthorization: true, // persist authorization between reloads on the swagger page
  showFullPath: false, // the path displayed after endpoint summary
  ignoreDefaultPatterns: false, // ignore default patterns such as /uploads/* /assets/* /static/* /public/*
  sanitizeInvalidSchemaRefs: true, // default true: replaces unresolved $ref schemas with safe fallbacks to avoid Swagger resolver errors
  include: ['start/routes.ts'],
  exclude: ['node_modules'],
}
