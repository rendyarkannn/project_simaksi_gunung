import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyToken } from '../api';

function Dashboard({ onLogout }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await verifyToken();
        setUser(response.data.user);
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    onLogout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Memuat data Anda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Selamat Datang! 👋
              </h1>
              <p className="text-gray-600">Simaksi Gunung - Sistem Akademik</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition"
            >
              Keluar
            </button>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Profil Saya</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Nama Lengkap
                </label>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-800 font-semibold">{user?.fullName}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Email
                </label>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-800 font-semibold">{user?.email}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  ID Pengguna
                </label>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-800 font-semibold text-sm font-mono">{user?.id}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Status
                </label>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <span className="inline-block px-4 py-2 bg-green-100 text-green-800 font-semibold rounded-lg">
                    ✓ Aktif
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Fitur Menu</h3>
            
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600 hover:bg-blue-100 cursor-pointer transition">
                <p className="font-semibold text-gray-800">📚 Akademik</p>
                <p className="text-sm text-gray-600">Kelola nilai</p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-600 hover:bg-purple-100 cursor-pointer transition">
                <p className="font-semibold text-gray-800">📋 Jadwal</p>
                <p className="text-sm text-gray-600">Lihat jadwal kelas</p>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-600 hover:bg-orange-100 cursor-pointer transition">
                <p className="font-semibold text-gray-800">💬 Pesan</p>
                <p className="text-sm text-gray-600">Hubungi dosen</p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-600 hover:bg-green-100 cursor-pointer transition">
                <p className="font-semibold text-gray-800">📊 Laporan</p>
                <p className="text-sm text-gray-600">Lihat statistik</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>© 2026 Simaksi Gunung. Semua hak dilindungi.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
