@echo off

:: Prompt for commit message
set /p type="Type: "
set /p message="Message: "

:: Execute git commands
git add .
git commit -m "%type%: %message%"
git push

:: Pause to see the output
pause