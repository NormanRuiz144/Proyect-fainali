# ===============================
# BUILD
# ===============================
FROM node:22-alpine AS build
WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json ./
COPY tsconfig.json ./

# Instalar dependencias (incluyendo devDependencies para el build)
RUN npm ci

# Copiar el código fuente
COPY . .

# Compilar TypeScript a JS (genera build/)
RUN node ace build

# ===============================
# RUNTIME
# ===============================
FROM node:22-alpine
WORKDIR /app

# Copiar solo dependencias de producción
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copiar el build generado
COPY --from=build /app/build ./build

# Copiar la carpeta .adonisjs (necesaria en runtime)
COPY --from=build /app/.adonisjs ./.adonisjs

# Render asigna el puerto vía variable PORT
EXPOSE 8080

ENV NODE_ENV=production
ENV HOST=0.0.0.0

# AdonisJS usa PORT=... y HOST=0.0.0.0 internamente
CMD ["node", "build/bin/server.js"]
