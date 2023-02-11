@setlocal enabledelayedexpansion
@echo off

IF EXIST layout.json ( 
    DEL /f layout.json 
)

echo ^{ > layout.json
echo    "content": [ >> layout.json

set bottomdir=%~dp0
set loopSize=0
set loopIndex=0

for /F "Delims=" %%A in ('dir /B/S/A-D') do (
    set absPath=%%~fA
    CALL :GET_RELATIVE_PATH !absPath!
    CALL :CHECK_FILE_BLACKLIST !path!

    IF !fileBlacklisted!==false set /A loopSize=loopSize+1
)

for /F "Delims=" %%A in ('dir /B/S/A-D') do (
    set absPath=%%~fA
    CALL :GET_RELATIVE_PATH !absPath!
    CALL :CHECK_FILE_BLACKLIST !path!

    IF !fileBlacklisted!==false (
        CALL :DATE_TO_UNIX %%~tA
        
        set datePrefixIncrement=!return:~0,1!
        set /A datePrefix=116444736+datePrefixIncrement
        set /A loopIndex=loopIndex+1
        set return=!return:~1,-1!!return:~-1!

        echo        ^{ >> layout.json
        echo            "path": "!path!", >> layout.json
        echo            "size": %%~zA, >> layout.json
        echo            "date": !datePrefix!!return! >> layout.json

        IF !loopIndex!==!loopSize! (echo        ^} >> layout.json) else (echo       ^}, >> layout.json)
    )
)

echo    ^] >> layout.json
echo ^} >> layout.json

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
        "build.bat"
    ) DO (
        IF /I !path!==%%~G set "%fileBlacklisted=true"
    )
EXIT /B 0

:DATE_TO_UNIX date time
    @REM echo date: !date!
    @REM echo time: !time!

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

    @REM echo total: !totalTime!

    set  "%return=!totalTime!"
EXIT /B 0