# Guía de Deploy - WYN App

Esta guía describe el proceso de deploy de la aplicación WYN en una VM Ubuntu con Nginx y PM2.

## Información del Deploy

- **URL de Producción (Español)**: http://10.0.100.212/wyn/es
- **URL de Producción (Inglés)**: http://10.0.100.212/wyn/en
- **Puerto de la Aplicación**: 3003
- **Gestor de Paquetes**: pnpm
- **Process Manager**: PM2
- **Reverse Proxy**: Nginx

**Nota**: Al acceder a http://10.0.100.212/wyn se redirigirá automáticamente a /wyn/es (locale por defecto).

## Configuración de Nginx

La aplicación se sirve a través de Nginx con la siguiente configuración:

```nginx
location /wyn {
    proxy_pass http://localhost:3003;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

## Requisitos Previos en la VM

Asegúrate de tener instalado en la VM Ubuntu:

```bash
# Node.js (v18 o superior)
node -v

# pnpm
npm install -g pnpm

# PM2
npm install -g pm2

# Nginx
sudo systemctl status nginx
```

## Proceso de Deploy

### 1. Clonar el Repositorio

```bash
cd /var/www  # o el directorio que prefieras
git clone <URL_DEL_REPOSITORIO> wyn-app
cd wyn-app
```

### 2. Instalar Dependencias

```bash
pnpm install
```

### 3. Build de Producción

```bash
pnpm run build:deploy
```

Este comando:
- Configura el basePath a `/wyn`
- Genera el build con modo standalone
- Optimiza los assets para producción

### 4. Preparar la Estructura Standalone

El build standalone requiere copiar archivos estáticos:

```bash
# IMPORTANTE: Limpiar público anterior si existe (evita archivos obsoletos)
rm -rf .next/standalone/public

# Copiar archivos públicos (incluye todas las subcarpetas: logos, patterns, etc.)
cp -r public .next/standalone/public

# Verificar que las carpetas críticas se copiaron
ls -la .next/standalone/public/logos
ls -la .next/standalone/public/patterns

# Copiar archivos estáticos de Next.js
cp -r .next/static .next/standalone/.next/static

# Crear directorio de logs
mkdir -p logs
```

**Nota**: Es crucial que el comando `cp -r` incluya TODAS las subcarpetas de `public/`. Si algunas imágenes no se ven, verifica que las carpetas `logos/` y `patterns/` existan en `.next/standalone/public/`.

### 5. Iniciar con PM2

```bash
# Iniciar la aplicación
pm2 start ecosystem.config.js

# Guardar la configuración de PM2
pm2 save

# Configurar PM2 para iniciar en el arranque del sistema
pm2 startup
```

### 6. Verificar el Deploy

```bash
# Ver el estado de la aplicación
pm2 status

# Ver los logs en tiempo real
pm2 logs wyn-app

# Verificar que la aplicación responde
curl http://localhost:3003/wyn
```

## Comandos Útiles de PM2

```bash
# Ver estado de la aplicación
pm2 status

# Ver logs
pm2 logs wyn-app

# Reiniciar la aplicación
pm2 restart wyn-app

# Detener la aplicación
pm2 stop wyn-app

# Eliminar la aplicación de PM2
pm2 delete wyn-app

# Monitorear recursos
pm2 monit
```

## Actualizar la Aplicación

Para actualizar la aplicación después de cambios:

```bash
# 1. Ir al directorio del proyecto
cd /var/www/wyn-app

# 2. Obtener los últimos cambios
git pull origin main

# 3. Instalar nuevas dependencias (si las hay)
pnpm install

# 4. Hacer el build
pnpm run build:deploy

# 5. Copiar archivos estáticos
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static

# 6. Reiniciar la aplicación
pm2 restart wyn-app
```

## Desarrollo Local con BasePath

Para probar localmente con el basePath `/wyn`:

```bash
# Desarrollo con basePath
pnpm run dev:base

# La app estará disponible en:
# - Español: http://localhost:3000/wyn/es
# - Inglés: http://localhost:3000/wyn/en
# - Redirect automático: http://localhost:3000/wyn → http://localhost:3000/wyn/es
```

## Scripts Disponibles

- `pnpm dev` - Desarrollo sin basePath (raíz)
- `pnpm dev:base` - Desarrollo con basePath `/wyn`
- `pnpm build` - Build de producción sin basePath
- `pnpm build:deploy` - Build de producción con basePath `/wyn` (standalone)
- `pnpm start` - Iniciar en modo producción sin basePath
- `pnpm start:deploy` - Iniciar en modo producción con basePath `/wyn`

## Troubleshooting

### La aplicación no carga los assets

Verifica que los archivos estáticos se hayan copiado correctamente:

```bash
ls -la .next/standalone/public
ls -la .next/standalone/.next/static
```

### Error 502 Bad Gateway en Nginx

Verifica que la aplicación esté corriendo:

```bash
pm2 status
pm2 logs wyn-app
```

### Las rutas no funcionan correctamente

Asegúrate de que:
1. El build se hizo con `pnpm run build:deploy`
2. La variable `NEXT_PUBLIC_BASE_PATH` está configurada en `/wyn`
3. Nginx está configurado correctamente con el `location /wyn`

### Ver los logs de la aplicación

```bash
# Logs en tiempo real
pm2 logs wyn-app

# Logs guardados
cat logs/out.log
cat logs/err.log
```

## Notas Importantes

1. **BasePath**: La aplicación está configurada para funcionar con el basePath `/wyn`. Todas las rutas y assets se ajustan automáticamente.

2. **Imágenes**: Las imágenes utilizan la función `getImagePath()` que añade automáticamente el basePath.

3. **Standalone Mode**: El modo standalone de Next.js crea un build optimizado que incluye solo las dependencias necesarias.

4. **PM2**: La configuración de PM2 está en `ecosystem.config.js` con todas las variables de entorno necesarias.

5. **Logs**: Los logs de PM2 se guardan en el directorio `logs/` del proyecto.
