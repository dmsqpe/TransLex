@echo off
if "%GEMINI_API_KEY%"=="" (
    echo Defina a variavel GEMINI_API_KEY antes de iniciar o servidor.
    echo Exemplo no PowerShell:
    echo $env:GEMINI_API_KEY="SUA_API_AQUI"
    exit /b 1
)

node server.js
