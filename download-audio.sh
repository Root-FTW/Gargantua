#!/bin/bash

echo "Descargando audio para Gargantua..."
echo

# Verificar si yt-dlp está instalado
if ! command -v yt-dlp &> /dev/null; then
    echo "yt-dlp no está instalado. Instalando..."
    pip install yt-dlp
    if [ $? -ne 0 ]; then
        echo "Error: No se pudo instalar yt-dlp. Asegúrate de tener Python y pip instalados."
        exit 1
    fi
fi

# Crear directorio assets si no existe
mkdir -p assets

# Descargar el audio
echo "Descargando audio desde YouTube..."
yt-dlp -x --audio-format mp3 -o "assets/gargantua-theme.%(ext)s" "https://www.youtube.com/watch?v=UDVtMYqUAyw"

if [ $? -eq 0 ]; then
    echo
    echo "¡Audio descargado exitosamente!"
    echo "El archivo se guardó como: assets/gargantua-theme.mp3"
    echo
    echo "Ahora puedes abrir index.html en tu navegador."
else
    echo
    echo "Error al descargar el audio. Verifica tu conexión a internet."
fi

echo
read -p "Presiona Enter para continuar..."
