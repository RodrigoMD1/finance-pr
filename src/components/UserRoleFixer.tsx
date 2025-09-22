import { useState } from 'react';
import { withBase } from '../services/api';

export const UserRoleFixer = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const fixRoles = async () => {
    setMessage('');
    setLoading(true);
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if (!userId || !token) {
      setMessage('No estás autenticado. Inicia sesión.');
      setLoading(false);
      return;
    }

    try {
      // Intenta asignar roles ['admin','user'] a tu propia cuenta
      const res = await fetch(withBase(`/admin/users/${userId}/roles`), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ roles: ['admin', 'user'] })
      });

      if (res.ok) {
        setMessage('✅ Roles actualizados. Cierra sesión y vuelve a iniciar.');
      } else {
        const txt = await res.text();
        setMessage(`❌ Error ${res.status}: ${txt}`);
      }
    } catch (e) {
      setMessage(`❌ Error: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg p-6 mx-auto mt-10 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h3 className="mb-2 text-lg font-semibold text-yellow-800">Arreglar roles de usuario</h3>
      <p className="mb-4 text-yellow-700 text-sm">Tu cuenta admin necesita también el rol 'user' para acceder al portfolio.</p>
      <button
        className="px-4 py-2 text-white bg-yellow-600 rounded hover:bg-yellow-700 disabled:opacity-50"
        onClick={fixRoles}
        disabled={loading}
      >
        {loading ? 'Procesando…' : 'Asignar roles [admin,user] a mi cuenta'}
      </button>
      {message && (
        <div className="p-3 mt-4 text-sm bg-white border border-yellow-300 rounded">
          {message}
        </div>
      )}
    </div>
  );
};
