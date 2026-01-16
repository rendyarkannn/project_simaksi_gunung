#!/bin/bash

echo "🚀 Memulai setup Simaksi Gunung..."

# Backend Setup
echo "📦 Setup Backend..."
cd server
npm install
cp .env.example .env
echo "✅ Backend ready!"

# Frontend Setup
echo "📦 Setup Frontend..."
cd ../client
npm install
echo "✅ Frontend ready!"

echo ""
echo "🎉 Setup selesai!"
echo ""
echo "📝 Jalankan aplikasi:"
echo "   Terminal 1: cd server && npm start"
echo "   Terminal 2: cd client && npm run dev"
echo ""
echo "🌐 Akses: http://localhost:3000"
