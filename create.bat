@echo off
setlocal enabledelayedexpansion

for %%s in (1 2) do (
    if not exist "semester-%%s" mkdir "semester-%%s"
    for /L %%i in (1,1,20) do (
        set "num=0%%i"
        set "num=!num:~-2!"
        type nul > "semester-%%s\lesson-!num!.html"
    )
)

echo All folders and 40 lesson files have been created!
pause