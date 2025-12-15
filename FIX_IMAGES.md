# Solución: Imágenes no Visibles en Deploy

## El Problema

Las imágenes en las carpetas `public/logos/svg`, `public/logos/png` y `public/patterns` no se veían en el deploy de la VM, mientras que otras imágenes funcionaban correctamente.

## Causa Raíz

Había **dos problemas combinados**:

### 1. Rutas sin `basePath` en componentes

Los componentes `Navbar.tsx` y `Footer.tsx` usaban el componente `Image` de Next.js con rutas hardcodeadas:

```tsx
// ❌ INCORRECTO - No funciona con basePath
<Image src="/logos/svg/LogoWhite.svg" ... />
```

Cuando se configura un `basePath` (como `/wyn`), estas rutas no se resuelven correctamente porque Next.js busca la imagen en `/logos/svg/LogoWhite.svg` en lugar de `/wyn/logos/svg/LogoWhite.svg`.

### 2. Posible copia incompleta en Standalone

En el modo standalone de Next.js, es necesario copiar manualmente la carpeta `public/` al directorio `.next/standalone/`. Si el comando de copia no se ejecuta correctamente, algunas subcarpetas pueden no copiarse.

## La Solución

### 1. Usar `getImagePath()` en Todos los Componentes

Se actualizaron `Navbar.tsx` y `Footer.tsx` para usar la función helper `getImagePath()`:

**Antes:**
```tsx
import Image from "next/image";

<Image src="/logos/svg/LogoWhite.svg" ... />
```

**Después:**
```tsx
import Image from "next/image";
import { getImagePath } from "@/imagesPath";

<Image src={getImagePath("/logos/svg/LogoWhite.svg")} ... />
```

La función `getImagePath()` añade automáticamente el `basePath` cuando está configurado:

```typescript
// src/imagesPath.ts
export const getImagePath = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
```

### 2. Mejorar Script de Deploy

Se actualizó `deploy.sh` para:

1. Limpiar el directorio `public/` anterior antes de copiar (evita archivos obsoletos)
2. Verificar que las carpetas críticas se copiaron correctamente

```bash
# Limpiar público anterior
rm -rf .next/standalone/public

# Copiar con todas las subcarpetas
cp -r public .next/standalone/public

# Verificar carpetas críticas
if [ ! -d ".next/standalone/public/logos" ]; then
    print_warning "Advertencia: carpeta logos no encontrada"
fi
```

## Archivos Modificados

1. **`src/components/navbar/Navbar.tsx`**
   - Añadido import de `getImagePath`
   - Actualizada ruta del logo: `src={getImagePath("/logos/svg/LogoWhite.svg")}`

2. **`src/components/footer/Footer.tsx`**
   - Añadido import de `getImagePath`
   - Actualizada ruta del logo: `src={getImagePath("/logos/svg/LogoBlack.svg")}`

3. **`deploy.sh`**
   - Añadida limpieza de directorio público anterior
   - Añadida verificación de carpetas críticas

4. **`DEPLOY.md`**
   - Documentación actualizada con notas sobre copia de subcarpetas

## Verificación en la VM

Después de aplicar estos cambios, verifica que todo funciona:

```bash
# 1. Deploy completo
cd /var/www/wyn-app
git pull origin main
pnpm install
pnpm run build:deploy

# 2. Verificar que las carpetas se copiaron
ls -la .next/standalone/public/logos/svg/
ls -la .next/standalone/public/logos/png/
ls -la .next/standalone/public/patterns/

# Deberías ver todos los archivos de imágenes

# 3. Copiar archivos y reiniciar
rm -rf .next/standalone/public
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
pm2 restart wyn-app

# 4. Verificar en el navegador
curl -I http://localhost:3003/es
# Abrir: http://10.0.100.212/wyn/es y verificar que los logos se ven
```

## Regla General para Imágenes

**SIEMPRE usa `getImagePath()` para cualquier ruta de imagen en el proyecto:**

✅ **Correcto:**
```tsx
import { getImagePath } from "@/imagesPath";

// Con next/image
<Image src={getImagePath("/path/to/image.png")} ... />

// Con Chakra UI Image
<ChakraImage src={getImagePath("/path/to/image.png")} />

// En estilos CSS-in-JS
backgroundImage: `url(${getImagePath('/path/to/bg.png')})`
```

❌ **Incorrecto (no funciona con basePath):**
```tsx
<Image src="/path/to/image.png" ... />
<ChakraImage src="/path/to/image.png" />
backgroundImage: 'url(/path/to/bg.png)'
```

## Testing Local

Para probar localmente con basePath:

```bash
# Iniciar con basePath
pnpm run dev:base

# Abrir en navegador
http://localhost:3000/wyn/es

# Verificar que:
# - El logo del navbar (blanco) se ve
# - El logo del footer (negro) se ve
# - Los patrones de fondo se ven
```

## Notas Importantes

1. **La función `getImagePath()` es segura para todas las rutas**: Si no hay basePath configurado, simplemente devuelve la ruta original.

2. **El modo standalone require copia manual**: A diferencia del modo normal de Next.js, en standalone debes copiar manualmente `public/` y `.next/static/`.

3. **Usa `cp -r` para copiar recursivamente**: El flag `-r` asegura que todas las subcarpetas se copien.

4. **Limpia antes de copiar en producción**: Usar `rm -rf .next/standalone/public` antes de copiar evita conflictos con archivos antiguos.
