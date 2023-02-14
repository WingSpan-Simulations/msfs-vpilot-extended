@echo off
setlocal enabledelayedexpansion

IF EXIST types/msfstypes (
    rmdir /S /Q types\msfstypes
    mkdir types\msfstypes
)

echo Getting types from GitHub
git clone https://github.com/microsoft/msfs-avionics-mirror.git 
echo D | xcopy /e msfs-avionics-mirror\src\msfstypes types\msfstypes 
rmdir /s /q msfs-avionics-mirror

for /F "delims=" %%A in ('dir types /B/S/A-D') do (
    set path=%%~fA

    if /I "!path:~-5!"==".d.ts" (
        for %%i in ("!path!") do set fileName=%%~nxi
        set fileName=!fileName:.d.ts=!
        set tmpPath=!path:.d.ts=!

        echo // @ts-nocheck > "!tmpPath!.tmp"
        echo. >> "!tmpPath!.tmp"

        type "!path!" >> "!tmpPath!.tmp"
        type "!tmpPath!.tmp" > "!path!"

        del "!tmpPath!.tmp"
    )
)