# Guía de Despliegue - Gargantua

## Pasos para subir a GitHub y desplegar en Vercel

### 1. Preparar el repositorio local

```bash
# Inicializar git (si no está inicializado)
git init

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "Initial commit: Gargantua black hole visualization with background music"

# Configurar la rama principal
git branch -M main
```

### 2. Crear repositorio en GitHub

1. Ve a [GitHub.com](https://github.com)
2. Haz clic en "New repository"
3. Nombra tu repositorio (ej: `gargantua-black-hole`)
4. Déjalo público para que Vercel pueda acceder
5. NO inicialices con README (ya tienes uno)
6. Haz clic en "Create repository"

### 3. Conectar con GitHub

```bash
# Agregar el remote origin (reemplaza con tu URL)
git remote add origin https://github.com/TU-USUARIO/gargantua-black-hole.git

# Subir el código
git push -u origin main
```

### 4. Desplegar en Vercel

#### Opción A: Desde la web de Vercel
1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en "Sign up" o "Log in"
3. Conecta tu cuenta de GitHub
4. Haz clic en "New Project"
5. Selecciona tu repositorio `gargantua-black-hole`
6. Vercel detectará automáticamente que es un sitio estático
7. Haz clic en "Deploy"

#### Opción B: Usando Vercel CLI
```bash
# Instalar Vercel CLI
npm i -g vercel

# Hacer login
vercel login

# Desplegar
vercel

# Para despliegues futuros
vercel --prod
```

### 5. Configuración automática

El proyecto incluye:
- `vercel.json` - Configuración de Vercel
- `package.json` - Metadatos del proyecto
- `.gitignore` - Archivos a ignorar en git

### 6. Actualizaciones futuras

Para actualizar el sitio:

```bash
# Hacer cambios en tu código
# Luego:
git add .
git commit -m "Descripción de los cambios"
git push

# Vercel desplegará automáticamente
```

### 7. Verificar el despliegue

1. Vercel te dará una URL como: `https://gargantua-black-hole.vercel.app`
2. Abre la URL en tu navegador
3. Verifica que:
   - La visualización del agujero negro funcione
   - La música de fondo se reproduzca (puede requerir interacción del usuario)
   - Los controles respondan correctamente

### 8. Dominio personalizado (opcional)

Si tienes un dominio propio:
1. Ve a tu proyecto en Vercel Dashboard
2. Haz clic en "Settings" > "Domains"
3. Agrega tu dominio personalizado
4. Sigue las instrucciones para configurar DNS

### Notas importantes:

- **Audio**: El archivo de audio está incluido en el repositorio. Si es muy grande, considera usar Git LFS.
- **Autoplay**: Algunos navegadores bloquean autoplay. El código maneja esto automáticamente.
- **Performance**: El sitio está optimizado para carga rápida con CDN de Vercel.
- **HTTPS**: Vercel proporciona HTTPS automáticamente.

### Solución de problemas:

**Si el audio no se reproduce:**
- Verifica que el archivo `assets/gargantua-theme.mp3` existe
- Algunos navegadores requieren interacción del usuario antes de reproducir audio
- Revisa la consola del navegador para errores

**Si el despliegue falla:**
- Verifica que todos los archivos estén en el repositorio
- Revisa los logs de build en Vercel Dashboard
- Asegúrate de que no hay errores en el código

**Si la visualización no funciona:**
- Verifica que el navegador soporte WebGL
- Revisa la consola para errores de JavaScript
- Prueba en un navegador diferente
