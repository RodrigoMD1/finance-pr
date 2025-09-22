import { useState } from 'react';
import { withBase } from '../services/api';

export const AdminTokenFixer = () => {
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const forceAdminToken = async () => {
    setLoading(true);
    setStatus('🔧 Intentando obtener token admin...');

    try {
      // Logout y login especial para admin
  const response = await fetch(withBase('/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Incluye cookies en la petición
        mode: 'cors', // Modo CORS explícito
        body: JSON.stringify({
          email: 'rodrigo.martinez224@gmail.com',
          password: 'Comandante989796',
          forceAdminRole: true // Flag especial para forzar rol admin
        })
      });

      if (response.ok) {
        const data = await response.json();
        
        // Verificar que el token contenga rol admin
        try {
          const payload = JSON.parse(atob(data.token.split('.')[1]));
          if (payload.role === 'admin') {
            // Actualizar localStorage con el nuevo token
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('userName', data.name);
            localStorage.setItem('userEmail', data.email);
            
            setStatus('✅ Token admin generado correctamente! Recarga la página.');
            
            // Probar acceso admin
            setTimeout(async () => {
              const testResponse = await fetch(withBase('/admin/stats'), {
                credentials: 'include', // Incluye cookies en la petición
                mode: 'cors', // Modo CORS explícito
                headers: { 'Authorization': `Bearer ${data.token}` }
              });
              
              if (testResponse.ok) {
                setStatus('🎉 ÉXITO! Acceso admin confirmado. Ve a /admin');
                setTimeout(() => window.location.href = '/admin', 2000);
              } else {
                setStatus(`❌ Token generado pero aún error ${testResponse.status}`);
              }
            }, 1000);
            
          } else {
            setStatus(`❌ Token generado pero rol es: ${JSON.stringify(payload.role)}`);
          }
        } catch {
          setStatus('❌ Error decodificando nuevo token');
        }
      } else {
        setStatus(`❌ Error login: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      setStatus(`❌ Error conexión: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  const checkCurrentToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setStatus('❌ No hay token en localStorage');
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setStatus(`
📋 Token actual:
- Email: ${payload.email}
- Role: ${JSON.stringify(payload.role)}
- User ID: ${payload.userId || payload.id}
- Expira: ${new Date(payload.exp * 1000).toLocaleString()}

${payload.role === 'admin' ? '✅ Token tiene rol admin' : '❌ Token NO tiene rol admin'}
      `);
    } catch {
      setStatus('❌ Error decodificando token actual');
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 max-w-lg p-6 bg-white border-4 border-red-500 rounded-lg shadow-2xl">
      <h2 className="text-xl font-bold text-red-800 mb-4 text-center">
        🚨 Admin Token Fixer
      </h2>
      
      <div className="space-y-3">
        <button
          onClick={checkCurrentToken}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          📋 Analizar Token Actual
        </button>
        
        <button
          onClick={forceAdminToken}
          disabled={loading}
          className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
        >
          {loading ? '🔄 Procesando...' : '🔧 Generar Token Admin'}
        </button>
        
        <button
          onClick={() => window.location.reload()}
          className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          🔄 Recargar Página
        </button>
      </div>

      {status && (
        <div className="mt-4 p-3 bg-gray-100 border rounded-lg">
          <pre className="text-xs whitespace-pre-wrap">{status}</pre>
        </div>
      )}

      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
        <strong>🎯 Objetivo:</strong> Obtener un token JWT con <code>role: "admin"</code>
        <br />
        <strong>🔧 Método:</strong> Re-login forzando rol admin desde backend
      </div>
    </div>
  );
};
