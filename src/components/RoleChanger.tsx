import React, { useState } from 'react';
import { withBase } from '../services/api';

export const RoleChanger: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const userId = '12b1b432-2f4e-4f2c-96e0-18a1b8f946ef'; // Tu ID de usuario
  const userEmail = 'rodrigo.martinez224@gmail.com'; // Tu email
  
  const promoteToAdmin = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('❌ No hay token de autenticación');
        return;
      }

      // Intentar usar el endpoint de admin para cambiar roles (self-promotion para desarrollo)
  const response = await fetch(withBase('/admin/users/' + userId + '/roles'), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include', // Incluye cookies en la petición
        mode: 'cors', // Modo CORS explícito
        body: JSON.stringify({
          roles: ['admin', 'user']
        })
      });

      if (response.ok) {
        setMessage('✅ Rol actualizado! Limpia el localStorage y vuelve a iniciar sesión.');
      } else {
        const errorData = await response.text();
        setMessage(`❌ Error ${response.status}: ${errorData}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const clearAuthAndReload = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const manualSQLInstructions = () => {
    const sql = `-- Ejecuta esto en tu base de datos:
UPDATE users 
SET roles = ARRAY['admin', 'user']::varchar[] 
WHERE id = '${userId}';

-- O si roles es un campo JSON:
UPDATE users 
SET roles = '["admin", "user"]'::jsonb 
WHERE id = '${userId}';

-- O si roles es un campo de texto simple:
UPDATE users 
SET roles = 'admin' 
WHERE id = '${userId}';`;

    navigator.clipboard.writeText(sql);
    setMessage('📋 SQL copiado al portapapeles! Ejecútalo en tu base de datos.');
  };

  return (
    <div className="max-w-lg p-6 mx-auto mt-10 bg-red-50 border-2 border-red-200 rounded-lg">
      <div className="flex items-center mb-4">
        <div className="p-2 mr-3 bg-red-100 rounded-full">
          🔐
        </div>
        <div>
          <h3 className="text-lg font-semibold text-red-800">Cambiar Rol a Admin</h3>
          <p className="text-sm text-red-600">Usuario sin permisos de administrador</p>
        </div>
      </div>

      <div className="p-4 mb-4 bg-white border border-red-200 rounded">
        <div className="text-sm">
          <p><strong>👤 Usuario:</strong> rodrigo</p>
          <p><strong>📧 Email:</strong> {userEmail}</p>
          <p><strong>🆔 ID:</strong> {userId}</p>
          <p><strong>🏷️ Rol Actual:</strong> <span className="text-red-600 font-semibold">user</span></p>
          <p><strong>🎯 Rol Necesario:</strong> <span className="text-green-600 font-semibold">admin</span></p>
        </div>
      </div>

      {message && (
        <div className="p-3 mb-4 text-sm bg-white border border-red-200 rounded">
          <pre className="whitespace-pre-wrap">{message}</pre>
        </div>
      )}

      <div className="space-y-3">
        <button
          onClick={promoteToAdmin}
          disabled={loading}
          className="w-full px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? '⏳ Procesando...' : '🚀 Intentar Auto-Promoción'}
        </button>

        <button
          onClick={manualSQLInstructions}
          className="w-full px-4 py-2 text-red-700 bg-white border border-red-300 rounded hover:bg-red-50"
        >
          📋 Copiar SQL Manual
        </button>

        <button
          onClick={clearAuthAndReload}
          className="w-full px-4 py-2 text-red-700 bg-yellow-100 border border-yellow-300 rounded hover:bg-yellow-200"
        >
          🗑️ Limpiar Todo y Re-Login
        </button>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
        <p><strong>⚠️ Nota:</strong> Si la auto-promoción falla, usa el SQL manual en tu base de datos y luego limpia el localStorage.</p>
      </div>
    </div>
  );
};
