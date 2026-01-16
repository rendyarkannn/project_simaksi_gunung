import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(express.json());

// Simple in-memory database
let users = [];

// Admin credentials (hardcoded untuk demo)
const ADMIN_EMAIL = 'admin@gunung.com';
const ADMIN_PASSWORD = 'admin123456'; // akan di-hash

// Validation Middleware
const validateRegister = [
  body('fullName').notEmpty().withMessage('Nama lengkap wajib diisi'),
  body('email').isEmail().withMessage('Email tidak valid'),
  body('password').isLength({ min: 6 }).withMessage('Password minimal 6 karakter'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password tidak cocok');
    }
    return true;
  })
];

const validateLogin = [
  body('email').isEmail().withMessage('Email tidak valid'),
  body('password').notEmpty().withMessage('Password wajib diisi')
];

// Routes

// Register
app.post('/api/auth/register', validateRegister, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password } = req.body;

    // Check if user already exists
    const userExists = users.find(u => u.email === email);
    if (userExists) {
      return res.status(409).json({ message: 'Email sudah terdaftar' });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create user
    const newUser = {
      id: Date.now().toString(),
      fullName,
      email,
      password: hashedPassword,
      createdAt: new Date()
    };

    users.push(newUser);

    // Create JWT token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Registrasi berhasil',
      token,
      user: {
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
});

// Login
app.post('/api/auth/login', validateLogin, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }

    // Check password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login berhasil',
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
});

// Verify token
app.get('/api/auth/verify', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token tidak ditemukan' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.find(u => u.id === decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    res.json({
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email
      }
    });
  } catch (error) {
    res.status(401).json({ message: 'Token tidak valid' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server berjalan dengan baik' });
});

// ===== ADMIN ROUTES =====

// Admin Login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== ADMIN_EMAIL) {
      return res.status(401).json({ message: 'Email admin tidak valid' });
    }

    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ message: 'Password admin salah' });
    }

    const token = jwt.sign(
      { id: 'admin', email: ADMIN_EMAIL, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login admin berhasil',
      token,
      user: {
        id: 'admin',
        email: ADMIN_EMAIL,
        role: 'admin',
        name: 'Administrator'
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
});

// Get all users (admin only)
app.get('/api/admin/users', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token tidak ditemukan' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Akses ditolak. Hanya admin yang dapat mengakses' });
    }

    res.json({
      total: users.length,
      users: users.map(user => ({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        createdAt: user.createdAt
      }))
    });
  } catch (error) {
    res.status(401).json({ message: 'Token tidak valid' });
  }
});

// Delete user (admin only)
app.delete('/api/admin/users/:id', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token tidak ditemukan' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Akses ditolak. Hanya admin yang dapat mengakses' });
    }

    const userIndex = users.findIndex(u => u.id === req.params.id);
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    const deletedUser = users.splice(userIndex, 1);
    res.json({ 
      message: 'User berhasil dihapus',
      user: deletedUser[0]
    });
  } catch (error) {
    res.status(401).json({ message: 'Token tidak valid' });
  }
});

// Verify admin token
app.get('/api/admin/verify', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token tidak ditemukan' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Akses ditolak' });
    }

    res.json({
      user: {
        id: decoded.id,
        email: decoded.email,
        role: 'admin',
        name: 'Administrator'
      }
    });
  } catch (error) {
    res.status(401).json({ message: 'Token tidak valid' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
