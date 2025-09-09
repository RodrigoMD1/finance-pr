import { useState } from 'react';
import { FaEye, FaEyeSlash, FaCopy } from 'react-icons/fa';

interface TokenData {
  success?: boolean;
  token?: string;
  payload?: Record<string, unknown>;
  email?: string;
  role?: string;
  userId?: string;
  exp?: string;
  isExpired?: boolean;
  error?: string;
}

export const QuickFix = () => {
  const [showToken, setShowToken] = useState(false);
  const [tokenData, setTokenData] = useState<TokenData | null>(null);

  const analyzeCurrentToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setTokenData({ error: 'No hay token en localStorage' });
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setTokenData({
        success: true,
        token: token,
        payload: payload,
        email: payload.email,
        role: payload.role,
        userId: payload.userId || payload.id,
        exp: new Date(payload.exp * 1000).toLocaleString(),
        isExpired: payload.exp < Math.floor(Date.now() / 1000)
      });
    } catch {
      setTokenData({ error: 'Token malformado' });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copiado al portapapeles');
  };

  const forceLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const testAdminEndpoint = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:3000/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include', // Incluye cookies en la petición
        mode: 'cors' // Modo CORS explícito
      });

      console.log('Admin endpoint test:', response.status, response.statusText);
      if (response.ok) {
        const data = await response.json();
        console.log('Admin data:', data);
        alert('✅ Acceso admin exitoso! Ver consola para detalles.');
      } else {
        alert(`❌ Error ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error testing admin:', error);
      alert('❌ Error de conexión');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md p-4 bg-yellow-100 border-2 border-yellow-400 rounded-lg shadow-xl">
      <h3 className="font-bold text-yellow-800 mb-3">🔧 Quick Fix - Debug Admin</h3>
      
      <div className="space-y-2">
        <button
          onClick={analyzeCurrentToken}
          className="w-full px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          📋 Analizar Token Actual
        </button>

        <button
          onClick={testAdminEndpoint}
          className="w-full px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
        >
          🧪 Probar Endpoint Admin
        </button>

        <button
          onClick={forceLogout}
          className="w-full px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
        >
          🚪 Logout y Renovar Token
        </button>
      </div>

      {tokenData && (
        <div className="mt-4 p-3 bg-white rounded border text-xs">
          {tokenData.error ? (
            <div className="text-red-600">❌ {tokenData.error}</div>
          ) : (
            <div className="space-y-2">
              <div><strong>Email:</strong> {tokenData.email}</div>
              <div><strong>Role:</strong> <span className="font-mono bg-gray-100 px-1">{JSON.stringify(tokenData.role)}</span></div>
              <div><strong>User ID:</strong> {tokenData.userId}</div>
              <div><strong>Expira:</strong> {tokenData.exp}</div>
              <div><strong>Estado:</strong> {tokenData.isExpired ? '❌ Expirado' : '✅ Válido'}</div>
              
              <div className="border-t pt-2">
                <button
                  onClick={() => setShowToken(!showToken)}
                  className="flex items-center gap-1 text-blue-600 hover:underline"
                >
                  {showToken ? <FaEyeSlash /> : <FaEye />}
                  {showToken ? 'Ocultar' : 'Mostrar'} Token Completo
                </button>
                
                {showToken && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">Token JWT:</span>
                      <button
                        onClick={() => copyToClipboard(tokenData.token || '')}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaCopy />
                      </button>
                    </div>
                    <textarea
                      value={tokenData.token}
                      readOnly
                      className="w-full h-20 p-2 text-xs bg-gray-50 border rounded font-mono"
                    />
                    
                    <div className="mt-2">
                      <strong>Payload decodificado:</strong>
                      <pre className="mt-1 p-2 bg-gray-50 border rounded overflow-x-auto">
                        {JSON.stringify(tokenData.payload, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs">
        <strong>🎯 Objetivo:</strong> Tu cuenta debe tener <code>role: "admin"</code> en el token JWT.
        <br />
        <strong>👉 Si el rol no es "admin":</strong> El backend no está enviando el rol correcto.
      </div>
    </div>
  );
};
