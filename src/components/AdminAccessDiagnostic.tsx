import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { API_CONFIG } from '../config/api';
import { FaUserShield, FaCrown, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

interface DiagnosticResult {
  step: string;
  status: 'success' | 'warning' | 'error';
  message: string;
  timestamp: string;
  jsonData?: string; // JSON ya convertido a string para evitar problemas de tipo
}

export const AdminAccessDiagnostic = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<DiagnosticResult[]>([]);
  const { user, isAuthenticated } = useAuth();
  const { isAdmin, canAccessAdmin } = useAdminAuth();

  const runAdminDiagnostic = async () => {
    setIsRunning(true);
    setResults([]);
    
    const addResult = (step: string, status: 'success' | 'warning' | 'error', message: string, data?: unknown) => {
      let jsonData: string | undefined = undefined;
      
      if (data && typeof data === 'object') {
        try {
          jsonData = JSON.stringify(data, null, 2);
        } catch {
          jsonData = String(data);
        }
      }
      
      setResults(prev => [...prev, { 
        step, 
        status, 
        message, 
        jsonData,
        timestamp: new Date().toLocaleTimeString() 
      }]);
    };

    try {
      // 1. Verificar autenticación básica
      addResult('Autenticación', isAuthenticated ? 'success' : 'error', 
        isAuthenticated ? 'Usuario autenticado' : 'Usuario NO autenticado');

      // 2. Mostrar datos del usuario actual
      if (user) {
        addResult('Usuario Actual', 'success', `Email: ${user.email}`, user);
        addResult('Rol en Token', 'success', `Rol: ${JSON.stringify(user.role)}`, user.role);
        addResult('ID Usuario', 'success', `ID: ${user.id}`, user.id);
      } else {
        addResult('Usuario Actual', 'error', 'No hay datos de usuario disponibles');
      }

      // 3. Verificar hook useAdminAuth
      addResult('Hook isAdmin', isAdmin ? 'success' : 'error', 
        `isAdmin: ${isAdmin}`, { isAdmin, canAccessAdmin });

      // 4. Verificar token JWT
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          addResult('Token JWT', 'success', 'Token decodificado correctamente', payload);
          addResult('Payload Role', 'success', `Rol en payload: ${JSON.stringify(payload.role)}`, payload.role);
          
          // Verificar expiración
          const isExpired = payload.exp < Math.floor(Date.now() / 1000);
          addResult('Token Válido', isExpired ? 'error' : 'success', 
            isExpired ? 'Token expirado' : 'Token válido');
        } catch {
          addResult('Token JWT', 'error', 'Error decodificando token');
        }
      } else {
        addResult('Token JWT', 'error', 'No hay token en localStorage');
      }

      // 5. Probar acceso a endpoint admin
      addResult('Endpoint Admin', 'warning', 'Probando acceso a /admin/stats...');
      try {
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ADMIN.STATS}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include', // Incluye cookies en la petición
          mode: 'cors', // Modo CORS explícito
          signal: AbortSignal.timeout(10000)
        });

        if (response.ok) {
          const data = await response.json();
          addResult('Endpoint Admin', 'success', 'Acceso admin confirmado', data);
        } else if (response.status === 403) {
          addResult('Endpoint Admin', 'error', `Acceso denegado (403) - Backend no reconoce rol admin`);
        } else if (response.status === 401) {
          addResult('Endpoint Admin', 'error', `No autorizado (401) - Token inválido`);
        } else {
          addResult('Endpoint Admin', 'warning', `Respuesta inesperada: ${response.status}`);
        }
      } catch (error) {
        addResult('Endpoint Admin', 'error', `Error de conexión: ${(error as Error).message}`);
      }

      // 6. Análisis final
      if (isAuthenticated && user?.email === 'rodrigo.martinez224@gmail.com') {
        if (isAdmin && canAccessAdmin) {
          addResult('Diagnóstico Final', 'success', '✅ Acceso admin CONFIRMADO - Puedes usar /admin');
        } else {
          addResult('Diagnóstico Final', 'error', '❌ Problema con detección de rol admin en frontend');
        }
      } else {
        addResult('Diagnóstico Final', 'warning', 'Usuario diferente o no autenticado');
      }

    } catch (error) {
      addResult('Error General', 'error', `Error inesperado: ${(error as Error).message}`);
    }
    
    setIsRunning(false);
  };

  return (
    <div className="fixed z-50 max-w-lg p-4 overflow-y-auto bg-white border-2 border-blue-500 rounded-lg shadow-xl top-4 right-4 max-h-96">
      <div className="flex items-center gap-2 mb-3">
        <FaUserShield className="text-blue-600" />
        <h3 className="font-bold text-gray-800">🔐 Diagnóstico Admin</h3>
        {isAdmin && <FaCrown className="text-yellow-500" />}
      </div>
      
      <div className="flex gap-2 mb-3">
        <button
          onClick={runAdminDiagnostic}
          disabled={isRunning}
          className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isRunning ? 'Ejecutando...' : 'Diagnosticar Admin'}
        </button>
        
        {canAccessAdmin && (
          <a 
            href="/admin" 
            className="px-3 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600"
          >
            Ir a Admin Panel
          </a>
        )}
      </div>

      <div className="space-y-1 text-xs">
        {results.map((result, index) => (
          <div key={index} className="p-2 border rounded bg-gray-50">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-gray-500">{result.timestamp}</span>
              <span className={`font-bold ${
                result.status === 'success' ? 'text-green-600' : 
                result.status === 'warning' ? 'text-yellow-600' : 
                'text-red-600'
              }`}>
                {result.status === 'success' ? '✅' : result.status === 'warning' ? '⚠️' : '❌'}
              </span>
              <span className="font-semibold">{result.step}:</span>
            </div>
            <div className="ml-4">
              <span>{result.message}</span>
              {result.jsonData && (
                <pre className="p-2 mt-1 overflow-x-auto text-xs bg-gray-100 rounded">
                  {result.jsonData}
                </pre>
              )}
            </div>
          </div>
        ))}
      </div>

      {results.length > 0 && !isRunning && (
        <div className="p-2 mt-3 text-xs rounded bg-blue-50">
          <strong>🎯 Resumen Rápido:</strong>
          <div className="mt-1">
            <div className="flex items-center gap-1">
              <span>Autenticado:</span>
              {isAuthenticated ? <FaCheckCircle className="text-green-500" /> : <FaTimesCircle className="text-red-500" />}
            </div>
            <div className="flex items-center gap-1">
              <span>Es Admin:</span>
              {isAdmin ? <FaCheckCircle className="text-green-500" /> : <FaTimesCircle className="text-red-500" />}
            </div>
            <div className="flex items-center gap-1">
              <span>Puede acceder:</span>
              {canAccessAdmin ? <FaCheckCircle className="text-green-500" /> : <FaTimesCircle className="text-red-500" />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
