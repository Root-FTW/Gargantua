@echo off
echo Descargando audio para Gargantua...
echo.

REM Verificar si yt-dlp está instalado
yt-dlp --version >nul 2>&1
if %errorlevel% neq 0 (
    echo yt-dlp no está instalado. Instalando...
    pip install yt-dlp
    if %errorlevel% neq 0 (
        echo Error: No se pudo instalar yt-dlp. Asegúrate de tener Python y pip instalados.
        pause
        exit /b 1
    )
)

REM Crear directorio assets si no existe
if not exist "assets" mkdir assets

REM Descargar el audio
echo Descargando audio desde YouTube...
yt-dlp -x --audio-format mp3 -o "assets/gargantua-theme.%%(ext)s" "https://www.youtube.com/watch?v=UDVtMYqUAyw"

if %errorlevel% equ 0 (
    echo.
    echo ¡Audio descargado exitosamente!
    echo El archivo se guardó como: assets/gargantua-theme.mp3
    echo.
    echo Ahora puedes abrir index.html en tu navegador.
) else (
    echo.
    echo Error al descargar el audio. Verifica tu conexión a internet.
)

echo.
pause
