# 🎯 Simaksi Gunung - Sistem Manajemen Akademik

Aplikasi web modern untuk login, registrasi, dan manajemen akademik dengan desain yang menarik.

## ✨ Fitur Utama

- ✅ Halaman Login dengan validasi
- ✅ Halaman Registrasi dengan form lengkap
- ✅ Dashboard user dengan profil
- ✅ Autentikasi JWT
- ✅ Password hashing dengan BCrypt
- ✅ Desain modern dan responsive
- ✅ Gradien background yang menarik

## 🛠️ Tech Stack

### Backend
- Node.js + Express.js
- JWT Authentication
- BCryptjs (Password Hashing)
- CORS enabled

### Frontend  
- React 18 dengan Vite
- Tailwind CSS
- React Router
- Axios

## 🚀 Cara Menjalankan

### 1. Setup Backend

```bash
cd server
npm install
npm start
```

Server akan berjalan di `http://localhost:5000`

### 2. Setup Frontend

Buka terminal baru:

```bash
cd client
npm install
npm run dev
```

Frontend akan berjalan di `http://localhost:3000`

## 📝 User Testing

Setelah kedua aplikasi berjalan:

1. Buka http://localhost:3000
2. Klik "Daftar sekarang"
3. Isi form dengan data Anda
4. Setelah registrasi, Anda akan otomatis login
5. Dashboard menampilkan profil Anda

## 🎨 Desain

### Warna Utama
- Login: Biru gradien (#3B82F6 - #1D4ED8)
- Register: Indigo gradien (#6366F1 - #4F46E5)

### Fitur Desain
- Modern card design dengan shadow
- Gradient background yang elegan
- Responsive mobile-first
- Smooth transitions
- Form inputs dengan focus effect
- Show/hide password toggle
- Error & success notifications

## 📁 File Structure

```
project_simaksi_gunung/
├── server/
│   ├── index.js          # API server
│   ├── package.json
│   └── .env.example
│
└── client/
    ├── src/
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   └── Dashboard.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── api.js
    │   └── index.css
    ├── index.html
    └── package.json
```

## 🔐 Security

- Password di-hash dengan BCrypt (10 salt rounds)
- JWT token dengan expiration 24 jam
- CORS protection
- Input validation di frontend dan backend
- Error handling yang aman

## 📚 API Endpoints

```
POST   /api/auth/register    - Registrasi user
POST   /api/auth/login       - Login user
GET    /api/auth/verify      - Verifikasi token
```

## 🎯 Fitur Dashboard

- Tampilkan nama lengkap, email, ID user
- Status user (Aktif)
- Quick access menu
- Fitur akademik, jadwal, pesan, laporan
- Tombol logout

---

**Dibuat dengan ❤️ menggunakan Express.js + React.js**