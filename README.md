# Gargantua - Black Hole Visualization

Una impresionante visualización 3D de un agujero negro con música de fondo atmosférica.

## Características

- Visualización realista de un agujero negro con disco de acreción
- Efectos de lente gravitacional
- Campo de estrellas dinámico con efecto de parpadeo
- Música de fondo automática que inicia desde el segundo 30
- Controles de cámara interactivos
- Efectos de post-procesamiento con bloom

## Configuración de Audio

Para que la música de fondo funcione correctamente, necesitas descargar el audio del video de YouTube y colocarlo en la carpeta `assets/`:

### Pasos para obtener el audio:

1. **Descargar el audio del video de YouTube:**
   - URL del video: https://www.youtube.com/watch?v=UDVtMYqUAyw
   - Puedes usar herramientas como:
     - `yt-dlp` (recomendado)
     - `youtube-dl`
     - Sitios web como `y2mate.com` o `savefrom.net`

2. **Usando yt-dlp (recomendado):**
   ```bash
   # Instalar yt-dlp
   pip install yt-dlp
   
   # Descargar solo el audio en formato MP3
   yt-dlp -x --audio-format mp3 -o "assets/gargantua-theme.%(ext)s" "https://www.youtube.com/watch?v=UDVtMYqUAyw"
   ```

3. **Alternativamente, usando youtube-dl:**
   ```bash
   # Instalar youtube-dl
   pip install youtube-dl
   
   # Descargar audio
   youtube-dl -x --audio-format mp3 -o "assets/gargantua-theme.%(ext)s" "https://www.youtube.com/watch?v=UDVtMYqUAyw"
   ```

4. **Asegúrate de que el archivo se llame:**
   - `assets/gargantua-theme.mp3`

### Configuración del Audio

El audio está configurado para:
- ✅ Autoplay (se inicia automáticamente)
- ✅ Loop infinito
- ✅ Volumen al 100% con fade-in suave
- ✅ Inicio desde el segundo 40
- ✅ Sin controles visibles
- ✅ Efecto de fade-in cinematográfico (5 segundos)
- ✅ Transición suave de volumen de 0% a 100%
- ✅ Interfaz minimalista que se integra con el tema espacial

**Nota:** Algunos navegadores bloquean el autoplay por políticas de seguridad. En ese caso, el audio se iniciará con el primer clic del usuario.

## Despliegue

### GitHub y Vercel

1. **Subir a GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Black hole visualization with background music"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/gargantua.git
   git push -u origin main
   ```

2. **Desplegar en Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Conecta tu repositorio de GitHub
   - Vercel detectará automáticamente que es un proyecto estático
   - El despliegue será automático

### Estructura del Proyecto

```
gargantua/
├── index.html          # Archivo principal
├── assets/             # Recursos multimedia
│   ├── gargantua-theme.mp3  # Música de fondo (debes descargarla)
│   └── gargantua-theme.ogg  # Formato alternativo (opcional)
└── README.md           # Este archivo
```

## Tecnologías Utilizadas

- **Three.js** - Renderizado 3D
- **WebGL** - Gráficos acelerados por hardware
- **Shaders GLSL** - Efectos visuales personalizados
- **Web Audio API** - Reproducción de audio

## Controles

- **Clic y arrastrar:** Rotar la cámara
- **Scroll:** Zoom in/out
- **Botón Auto-Rotate:** Activar/desactivar rotación automática

## Compatibilidad

- Navegadores modernos con soporte para WebGL 2.0
- Chrome, Firefox, Safari, Edge (versiones recientes)
- Dispositivos móviles compatibles

## Licencia

Este proyecto es de código abierto. Siéntete libre de modificarlo y mejorarlo.
