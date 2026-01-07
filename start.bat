@echo off
echo "🚀 Setting up Synapse..."

echo.
echo Starting backend server...
cd backend
npm run dev > backend.log 2>&1 &
timeout /t 5 >nul

echo.
echo Starting frontend development server...
cd ..\frontend
npm run dev

echo.
echo Application started successfully!
echo.
echo Backend log: backend\backend.log
pause
