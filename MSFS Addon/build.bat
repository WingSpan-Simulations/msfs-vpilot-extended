@setlocal enabledelayedexpansion
@echo off

IF EXIST out/layout.json ( 
    DEL /f out\layout.json 
)

@REM IF EXIST Build/Packages (
@REM      rmdir /S /Q _Temp
@REM     rmdir /S /Q Build\Packages
@REM )

IF EXIST InGamePanels (
    rmdir /S /Q InGamePanels
    mkdir InGamePanels
)

IF EXIST out (
    rmdir /S /Q out
    mkdir out
)

echo Launching MSFS to create panel SPB
"%MSFS_SDK%\Tools\bin\fspackagetool.exe" -nopause "Build\meqolo-vpilot-extender.xml"
copy "Build\Packages\meqolo-vpilot-extender\Build\meqolo-vpilot-extender.spb" "InGamePanels" 


echo ^{ > out/layout.json
echo    "content": [ >> out/layout.json

set MSFS_SDK=C:\MSFS SDK\
set bottomdir=%~dp0
set packageVersion=0
set /A totalFileSize=0
set /A loopIndex=0

for /F "delims=" %%A in ('dir /B/S/A-D') do (
    set absPath=%%~fA
    CALL :GET_RELATIVE_PATH !absPath!
    CALL :CHECK_FILE_BLACKLIST !path!

    IF !fileBlacklisted!==false ( 
        set /A loopSize=loopSize+1
        set /A totalFileSize=totalFileSize+%%~zA
    )
)

for /F "tokens=* delims=," %%G in (manifest.json) do (
    set manifest=%%G
    set textToOutput=!manifest!

    IF "!loopIndex!"=="0" (
        IF EXIST out/manifest.json (
            DEL /F out\manifest.json
        )
    )

    IF not "x!manifest:total_package_size=!"=="x!manifest!" (
        set textToOutput=    "total_package_size": "!totalFileSize!"
    )

    echo !textToOutput! >> out/manifest.json
    set /A loopIndex=loopIndex+1
)

set /A loopIndex=0

echo Copying files to /out/

for /F "delims=" %%A in ('dir /B/S/A-D') do (
    set absPath=%%~fA
    CALL :GET_RELATIVE_PATH !absPath!
    CALL :CHECK_FILE_BLACKLIST !path!

    IF !fileBlacklisted!==false (
        CALL :DATE_TO_UNIX %%~tA
        
        set datePrefixIncrement=!return:~0,1!
        set /A datePrefix=116444736+datePrefixIncrement
        set /A loopIndex=loopIndex+1
        set return=!return:~1,-1!!return:~-1!

        echo        ^{ >> out/layout.json
        echo            "path": "!path!", >> out/layout.json
        echo            "size": %%~zA, >> out/layout.json
        echo            "date": !datePrefix!!return! >> out/layout.json

        IF !loopIndex!==!loopSize! (echo        ^} >> out/layout.json) else (echo       ^}, >> out/layout.json)

        echo F | %systemroot%\System32\xcopy "!path:/=\!" "out\!path:/=\!" /y
    )
)

echo    ^] >> out/layout.json
echo ^} >> out/layout.json

:GET_RELATIVE_PATH absPath
    set path=!absPath!
    set path=!path:%bottomdir%= !
    set path=!path:\=/!
    for /f "tokens=* delims= " %%a in ("!path!") do set "path=%%a"
EXIT /B 0

:CHECK_FILE_BLACKLIST path
    set "%fileBlacklisted=false"
    FOR %%G IN (
        "layout.json"
        "manifest.json"
        "build.bat"
        "out"
        "Build"
    ) DO (
        IF not "x!path:%%~G=!"=="x!path!" set "%fileBlacklisted=true"
    )
EXIT /B 0

:DATE_TO_UNIX date time
    set totalTime=0
    set day=!date:~0,2!
    set month=!date:~3,2!
    set year=!date:~6,4!

    set hour=!time~0,2!
    set minute=!time~3,2!
    set second=!time~6,2!

    set /A year=year-1970
    set /A month=month-1

    set /A year=year*31556736
    set /A month=month*2629757
    set /A day=day*86400
    set /A hour=hour*3600
    set /A minute=minute*60

    set /A totalTime=year+month
    set /A totalTime=totalTime+day
    set /A totalTime=totalTime+hour
    set /A totalTime=totalTime+minute
    set /A totalTime=totalTime

    set  "%return=!totalTime!"
EXIT /B 0