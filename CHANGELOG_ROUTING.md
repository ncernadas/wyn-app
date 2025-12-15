# Cambios en el Sistema de Rutas

## Problema Identificado

La aplicación mostraba un 404 al acceder a `http://10.0.100.212/wyn` porque:

1. El archivo `proxy.ts` (middleware de Next.js 16) estaba configurado con `localePrefix: 'as-needed'`
2. Esto significaba que el español (locale por defecto) NO tenía prefijo en la URL
3. Pero la estructura de carpetas usa `[locale]/` para TODAS las rutas
4. Esto creaba un conflicto: la URL no tenía prefijo pero las rutas sí lo requerían

## Solución Implementada

### 1. Cambio en `src/proxy.ts`

**Antes:**
```typescript
localePrefix: 'as-needed', // Hide prefix for Spanish, show /en/ for English
```

**Después:**
```typescript
localePrefix: 'always', // Always show locale prefix (/es/, /en/) to work with [locale] folder structure
```

### 2. Actualización de `LanguagePicker.tsx`

Se actualizó la lógica de cambio de idioma para que funcione con ambos locales teniendo prefijo:

**Antes:**
- Español: sin prefijo (`/`)
- Inglés: con prefijo (`/en`)

**Después:**
- Español: con prefijo (`/es`)
- Inglés: con prefijo (`/en`)

## Nuevas URLs

### Sin BasePath (desarrollo local sin `/wyn`)
```
http://localhost:3000/es      → Español
http://localhost:3000/en      → Inglés
http://localhost:3000/        → Redirect a /es
```

### Con BasePath (desarrollo local con `/wyn` o producción)
```
http://localhost:3000/wyn/es  → Español
http://localhost:3000/wyn/en  → Inglés
http://localhost:3000/wyn     → Redirect a /wyn/es
```

### Producción
```
http://10.0.100.212/wyn/es    → Español
http://10.0.100.212/wyn/en    → Inglés
http://10.0.100.212/wyn       → Redirect a /wyn/es (automático por proxy.ts)
```

## Comportamiento del Proxy

El middleware en `src/proxy.ts` ahora:

1. **Detecta cuando no hay locale en la URL** (ej: `/wyn`)
2. **Redirige automáticamente al locale por defecto** (`/wyn/es`)
3. **Respeta el basePath** configurado en `next.config.ts`
4. **Mantiene la ruta después del locale** (ej: `/wyn/about` → `/wyn/es/about`)

## Archivos Modificados

1. `src/proxy.ts` - Cambio de `localePrefix: 'as-needed'` a `localePrefix: 'always'`
2. `src/components/navbar/LanguagePicker.tsx` - Actualización de lógica de cambio de idioma
3. `DEPLOY.md` - Actualización de URLs en la documentación

## Testing

Para probar los cambios:

```bash
# 1. Desarrollo local con basePath
pnpm run dev:base

# 2. Probar las URLs:
# - http://localhost:3000/wyn → debería redirigir a /wyn/es
# - http://localhost:3000/wyn/es → debería funcionar
# - http://localhost:3000/wyn/en → debería funcionar

# 3. Cambiar idioma usando el LanguagePicker y verificar que funcione
```

## Deploy en Producción

Después de estos cambios, necesitas:

```bash
# 1. Hacer commit de los cambios
git add .
git commit -m "fix: configurar localePrefix a 'always' para resolver 404"
git push

# 2. En la VM, hacer pull y rebuild
cd /var/www/wyn-app
git pull origin main
pnpm install
pnpm run build:deploy

# 3. Copiar archivos estáticos
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static

# 4. Reiniciar PM2
pm2 restart wyn-app

# 5. Verificar que funciona
curl http://localhost:3003/es
# O desde el navegador: http://10.0.100.212/wyn/es
```

## Nota Importante

Ahora TODAS las URLs requieren el prefijo de locale:
- ✅ `/es/` o `/wyn/es` (con basePath)
- ✅ `/en/` o `/wyn/en` (con basePath)
- ❌ `/` ya no funciona directamente (redirige automáticamente)
- ❌ `/wyn` ya no funciona directamente (redirige automáticamente)

El redirect es automático y transparente gracias al middleware `proxy.ts`.
