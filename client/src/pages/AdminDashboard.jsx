import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminVerifyToken, getUsers, deleteUser } from '../api';

function AdminDashboard({ onLogout }) {
  const [admin, setAdmin] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminResponse = await adminVerifyToken();
        setAdmin(adminResponse.data.user);

        const usersResponse = await getUsers();
        setUsers(usersResponse.data.users);
      } catch (error) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Yakin ingin menghapus user ini?')) return;

    setDeleteLoading(userId);
    try {
      await deleteUser(userId);
      setUsers(users.filter(u => u.id !== userId));
      setMessage('User berhasil dihapus');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Gagal menghapus user');
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    onLogout();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-red-300 border-t-red-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Memuat data admin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center flex-col md:flex-row gap-4">
            <div>
              <h1 className="text-3xl font-bold text-red-700 mb-2">
                🔐 Admin Panel
              </h1>
              <p className="text-gray-600">Selamat datang, {admin?.name}!</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-4xl mb-2">👥</div>
            <h3 className="text-gray-600 text-sm font-semibold">Total User</h3>
            <p className="text-3xl font-bold text-red-600">{users.length}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-4xl mb-2">✅</div>
            <h3 className="text-gray-600 text-sm font-semibold">User Aktif</h3>
            <p className="text-3xl font-bold text-green-600">{users.length}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-4xl mb-2">📅</div>
            <h3 className="text-gray-600 text-sm font-semibold">Hari Ini</h3>
            <p className="text-sm text-gray-600 mt-2">{new Date().toLocaleDateString('id-ID')}</p>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Daftar User</h2>

          {message && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded">
              {message}
            </div>
          )}

          {users.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg">Belum ada user terdaftar</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">No</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nama</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Terdaftar</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-800">{user.fullName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(user.createdAt).toLocaleDateString('id-ID')}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          disabled={deleteLoading === user.id}
                          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition disabled:opacity-50"
                        >
                          {deleteLoading === user.id ? 'Menghapus...' : 'Hapus'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>© 2026 Simaksi Gunung - Admin Panel</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
