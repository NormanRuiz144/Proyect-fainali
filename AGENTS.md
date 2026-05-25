# AGENTS.md

## Framework & Stack
- **AdonisJS v7** (Node.js full-stack framework)
- **TypeScript** with ES modules
- **PostgreSQL** via AdonisJS Lucid ORM
- **Auth**: Built-in `@adonisjs/auth` with access tokens

## Developer Commands
```bash
npm run dev        # Dev server with HMR
npm run start      # Production server
npm run build      # Build for production
npm run test       # Run Japa tests
npm run lint       # ESLint
npm run format     # Prettier
npm run typecheck  # TypeScript check
```

## Architecture
- **Entrypoint**: `bin/server.ts`
- **Routes**: `start/routes.ts`
- **Middleware**: `start/kernel.ts` - registers `auth` and `rolGuardia`
- **Controllers**: `app/controllers/*.ts`
- **Models**: `app/models/*.ts`
- **Validators**: `app/validators/*.ts`
- **Database**: `config/database.ts` - PostgreSQL connection

## Auth & Roles
- Custom role guard middleware: `app/middleware/guardian_roles_middleware.ts`
- All routes (except `/`, `/auth/*`, `/swagger`, `/docs`) require auth
- Use `middleware.rolGuardia(['RoleName'])` for role-based access

## Environment
Requires `.env` with: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_DATABASE`, `APP_KEY`, `CLOUDINARY_*`

## API Docs
- Swagger: `/swagger`
- UI: `/docs`

## Run Order
1. `npm run lint`
2. `npm run typecheck`
3. `npm run test`