#!/bin/bash

# Script de Deploy para WYN App
# Este script automatiza el proceso de deploy en la VM

set -e  # Detener el script si hay errores

echo "🚀 Iniciando proceso de deploy de WYN App..."

# Colores para mensajes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Función para imprimir mensajes
print_message() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# 1. Verificar dependencias
echo ""
echo "📋 Verificando dependencias..."

if ! command -v node &> /dev/null; then
    print_error "Node.js no está instalado"
    exit 1
fi
print_message "Node.js $(node -v) instalado"

if ! command -v pnpm &> /dev/null; then
    print_error "pnpm no está instalado. Instálalo con: npm install -g pnpm"
    exit 1
fi
print_message "pnpm $(pnpm -v) instalado"

if ! command -v pm2 &> /dev/null; then
    print_error "PM2 no está instalado. Instálalo con: npm install -g pm2"
    exit 1
fi
print_message "PM2 instalado"

# 2. Instalar dependencias
echo ""
echo "📦 Instalando dependencias..."
pnpm install
print_message "Dependencias instaladas"

# 3. Build de producción
echo ""
echo "🔨 Construyendo la aplicación..."
pnpm run build:deploy
print_message "Build completado"

# 4. Copiar archivos estáticos
echo ""
echo "📁 Copiando archivos estáticos..."

# Verificar que el directorio standalone existe
if [ ! -d ".next/standalone" ]; then
    print_error "El directorio .next/standalone no existe. El build falló."
    exit 1
fi

# Limpiar directorio público anterior si existe
if [ -d ".next/standalone/public" ]; then
    print_message "Limpiando directorio público anterior..."
    rm -rf .next/standalone/public
fi

# Copiar archivos públicos (incluyendo todas las subcarpetas)
print_message "Copiando archivos públicos..."
cp -r public .next/standalone/public

# Verificar que las carpetas críticas se copiaron
if [ ! -d ".next/standalone/public/logos" ]; then
    print_warning "Advertencia: carpeta logos no encontrada"
fi
if [ ! -d ".next/standalone/public/patterns" ]; then
    print_warning "Advertencia: carpeta patterns no encontrada"
fi

# Copiar archivos estáticos de Next.js
print_message "Copiando archivos estáticos de Next.js..."
cp -r .next/static .next/standalone/.next/static

print_message "Archivos estáticos copiados correctamente"

# 5. Crear directorio de logs si no existe
echo ""
echo "📝 Configurando logs..."
mkdir -p logs
print_message "Directorio de logs creado"

# 6. Gestión de PM2
echo ""
echo "🔄 Gestionando proceso PM2..."

# Verificar si la aplicación ya está corriendo
if pm2 describe wyn-app > /dev/null 2>&1; then
    print_warning "La aplicación ya está corriendo. Reiniciando..."
    pm2 restart wyn-app
    print_message "Aplicación reiniciada"
else
    print_message "Iniciando nueva instancia..."
    pm2 start ecosystem.config.js
    print_message "Aplicación iniciada"
fi

# Guardar configuración de PM2
pm2 save

# 7. Verificar el estado
echo ""
echo "✅ Verificando el estado de la aplicación..."
pm2 status wyn-app

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ Deploy completado exitosamente!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 Información del deploy:"
echo "   - URL: http://10.0.100.212/wyn"
echo "   - Puerto local: 3003"
echo "   - Proceso PM2: wyn-app"
echo ""
echo "🔍 Comandos útiles:"
echo "   - Ver logs:      pm2 logs wyn-app"
echo "   - Ver estado:    pm2 status"
echo "   - Reiniciar:     pm2 restart wyn-app"
echo "   - Detener:       pm2 stop wyn-app"
echo ""
echo "📝 Logs guardados en: ./logs/"
echo ""
