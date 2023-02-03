@echo off

:menu
color d

echo                  _________-----_____
echo        ____------           __      ----_
echo  ___----             ___------              \
echo     ----________        ----                 \
echo                -----__    ^|             _____)
echo                     __-                /     \
echo         _______-----    ___--          \    /)\
echo   ------_______      ---____            \__/  /
echo                -----__    \ --    _          /\
echo                       --__--__     \_____/   \_/\
echo                               ---^|   /          ^|
echo                                  ^| ^|___________^|
echo                                  ^| ^| ((_(_)^| )_)
echo                                  ^|  \_((_(_)^|/(_)
echo                                   \             (
echo                                    \_____________)  
echo.
echo Welcome to Saturn Launcher !
echo. 
echo Faites votre choix :
echo.
echo 1. Lancer Visual Studio Code
echo 2. Lancer Saturn
echo 3. Credits
echo 4. Quitter
echo.
set /p choice=Entrez votre choix : 

if "%choice%" == "1" (
    goto :vs
) else if "%choice%" == "2" (
    goto :starting
) else if "%choice%" == "3" (
    goto :credits
)
) else if "%choice%" == "4" (
    exit
)


:starting

cls

echo                  _________-----_____
echo        ____------           __      ----_
echo  ___----             ___------              \
echo     ----________        ----                 \
echo                -----__    ^|             _____)
echo                     __-                /     \
echo         _______-----    ___--          \    /)\
echo   ------_______      ---____            \__/  /
echo                -----__    \ --    _          /\
echo                       --__--__     \_____/   \_/\
echo                               ---^|   /          ^|
echo                                  ^| ^|___________^|
echo                                  ^| ^| ((_(_)^| )_)
echo                                  ^|  \_((_(_)^|/(_)
echo                                   \             (
echo                                    \_____________)

echo Saturn will be started !

echo. 

echo Importants links :
echo   - Github repository : https://github.com/FlexXydev/SaturnDev
echo   - Discord server : https://discord.gg/ndJyxZs3sF
echo   - FlexXy's Github : https://github.com/FlexXydev/
echo   - Bat'0s's Github : https://github.com/W0rldsww

echo.

echo Credits to :
echo   - FlexXydev :  Founder of Saturn / Developper
echo   - Bat'0s : Co-founder of Saturn

start "" "bat\saturn.bat"
start "" "bat\wsstart.bat"

exit
goto :menu


:credits

cls

echo                  _________-----_____
echo        ____------           __      ----_
echo  ___----             ___------              \
echo     ----________        ----                 \
echo                -----__    ^|             _____)
echo                     __-                /     \
echo         _______-----    ___--          \    /)\
echo   ------_______      ---____            \__/  /
echo                -----__    \ --    _          /\
echo                       --__--__     \_____/   \_/\
echo                               ---^|   /          ^|
echo                                  ^| ^|___________^|
echo                                  ^| ^| ((_(_)^| )_)
echo                                  ^|  \_((_(_)^|/(_)
echo                                   \             (
echo                                    \_____________)

echo Credits :

echo. 

echo Importants links :
echo   - Github repository : https://github.com/FlexXydev/SaturnDev
echo   - Discord server : https://discord.gg/ndJyxZs3sF
echo   - FlexXy's Github : https://github.com/FlexXydev/
echo   - Bat'0s's Github : https://github.com/W0rldsww

echo.

echo Credits to :
echo   - FlexXydev :  Founder of Saturn / Developper
echo   - Bat'0s : Co-founder of Saturn

echo 1. Back to main menu

set /p credits=Entrez votre choix : 

if "%credits%" == "1" (
    cls
    goto :menu
)

:vs

start "" "run.bat"
code .

exit


pause