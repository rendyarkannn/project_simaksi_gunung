# �️ SIMAKSI Gunung - Sistem Informasi Manajemen Pendakian Gunung

Aplikasi web untuk login user dan admin untuk sistem manajemen pendakian gunung di Indonesia.

## ✨ Fitur

- ✅ Halaman Login User (dengan registrasi)
- ✅ Halaman Login Admin
- ✅ Autentikasi JWT terpisah untuk user dan admin
- ✅ Password hashing dengan BCrypt
- ✅ Desain modern dan responsive
- ✅ Form validasi lengkap

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

### Single Command (Recommended)
Dari root directory, jalankan kedua server sekaligus:

```bash
npm run dev
```

Ini akan menjalankan:
- Backend di `http://localhost:5000`
- Frontend di `http://localhost:3001`

### Atau Manual

**Terminal 1 - Backend:**
```bash
cd server
npm install
npm start
```

**Terminal 2 - Frontend:**
```bash
cd client
npm install
npm run dev
```

## 📝 User Testing

### User - Registrasi & Login
1. Buka http://localhost:3001
2. Klik "Belum punya akun? Daftar di sini"
3. Isi form registrasi:
   - Nama Lengkap
   - Email
   - Password (min 6 karakter)
4. Klik "Daftar"
5. Otomatis login dan masuk ke dashboard

### User - Login
1. Buka http://localhost:3001
2. Isi email dan password
3. Klik "Login"

### Admin - Login
1. Buka http://localhost:3001/admin/login
2. Gunakan kredensial:
   - **Email:** `admin@gunung.com`
   - **Password:** `admin123456`
3. Klik "Login Admin"
4. Masuk ke Admin Dashboard

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
│   ├── index.js              # Express API server
│   ├── package.json
│   └── node_modules/
│
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx         # User login page
│   │   │   ├── Register.jsx      # User register page
│   │   │   ├── Dashboard.jsx     # User dashboard
│   │   │   ├── AdminLogin.jsx    # Admin login page
│   │   │   └── AdminDashboard.jsx # Admin dashboard
│   │   ├── api.js                # API service layer
│   │   ├── App.jsx               # Main router component
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── package.json                  # Root config (npm run dev)
├── README.md
└── .gitignore
```

## 🔐 Security

- Password di-hash dengan BCrypt (10 salt rounds)
- JWT token dengan expiration 24 jam
- CORS protection
- Input validation di frontend dan backend
- Separate authentication untuk user dan admin

## 📚 API Endpoints

```
POST   /api/auth/register    - Registrasi user baru
POST   /api/auth/login       - Login user
GET    /api/auth/verify      - Verifikasi token user

POST   /api/admin/login      - Login admin
GET    /api/admin/verify     - Verifikasi token admin
```

## 🎯 Pages

### User Flows
- **Login** (`/login`) - User login dengan email & password
- **Register** (`/register`) - User registrasi akun baru
- **Dashboard** (`/dashboard`) - User dashboard dengan profil

### Admin Flows
- **Admin Login** (`/admin/login`) - Admin login
- **Admin Dashboard** (`/admin/dashboard`) - Admin panel untuk manage user

## 💾 Test Credentials

### Admin
- **Email:** `admin@gunung.com`
- **Password:** `admin123456`

### User Test
- **Email:** Daftar akun baru via register page
- **Password:** Sesuai yang Anda buat saat registrasi

## 📝 Development Notes

- Frontend menggunakan Vite + React 18 untuk development yang cepat
- Backend menggunakan Express.js dengan simple in-memory storage untuk demo
- Untuk production, integrasikan dengan database seperti MongoDB atau PostgreSQL
- Token disimpan di localStorage untuk persistence login

### Admin Credentials
- Email: `admin@gunung.com`
- Password: `admin123456`

### Admin Dashboard
- Total user terdaftar
- User aktif
- Tabel daftar user dengan detail
- Aksi hapus user

---

**Dibuat dengan ❤️ menggunakan Express.js + React.js**