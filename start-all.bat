@echo off
echo Starting PitchMind...
start "PitchMind Backend"  cmd /k "cd /d ""%~dp0backend"" && pip install -r requirements.txt --quiet && python -m uvicorn main:app --reload --port 8000"
timeout /t 3 /nobreak >nul
start "PitchMind Frontend" cmd /k "cd /d ""%~dp0frontend"" && npm install && npm run dev"
echo.
echo  Both servers are starting in separate windows.
echo  Frontend: http://localhost:5173
echo  Backend:  http://localhost:8000
echo.
