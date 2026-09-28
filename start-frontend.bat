@echo off
title PitchMind Frontend
cd /d "%~dp0frontend"

echo.
echo  =====================================================
echo   PitchMind Frontend  ^|  http://localhost:5173
echo  =====================================================
echo.
echo  Installing dependencies (first run only)...
npm install

echo.
echo  Starting Vite dev server...
echo  Open: http://localhost:5173
echo.
npm run dev
pause
