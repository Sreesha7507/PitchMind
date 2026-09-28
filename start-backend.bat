@echo off
title PitchMind Backend
cd /d "%~dp0backend"

echo.
echo  =====================================================
echo   PitchMind Backend  ^|  http://localhost:8000
echo  =====================================================
echo.
echo  Installing / checking dependencies...
pip install -r requirements.txt --quiet

echo.
echo  Starting FastAPI server...
echo  API docs: http://localhost:8000/docs
echo  Health:   http://localhost:8000/health
echo.
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
pause
