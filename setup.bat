@echo off
echo 🚀 Memulai setup Simaksi Gunung...

REM Backend Setup
echo 📦 Setup Backend...
cd server
call npm install
copy .env.example .env
echo ✅ Backend ready!

REM Frontend Setup
echo 📦 Setup Frontend...
cd ..\client
call npm install
echo ✅ Frontend ready!

echo.
echo 🎉 Setup selesai!
echo.
echo 📝 Jalankan aplikasi:
echo    Terminal 1: cd server ^&^& npm start
echo    Terminal 2: cd client ^&^& npm run dev
echo.
echo 🌐 Akses: http://localhost:3000
pause
