import { useState } from 'react';
import { API_CONFIG } from '../config/api';

interface DiagnosticResult {
  step: string;
  status: 'success' | 'warning' | 'error';
  message: string;
  duration?: number;
  timestamp: string;
}

export const LoginDiagnostic = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<DiagnosticResult[]>([]);

  const runLoginDiagnostic = async () => {
    setIsRunning(true);
    setResults([]);
    
    const addResult = (step: string, status: 'success' | 'warning' | 'error', message: string, duration?: number) => {
      setResults(prev => [...prev, { step, status, message, duration, timestamp: new Date().toLocaleTimeString() }]);
    };

    try {
      // 1. Verificar conectividad básica
      addResult('Conectividad', 'warning', 'Verificando conexión a internet...');
      const connectivityStart = Date.now();
      
      try {
        await fetch('https://www.google.com', { mode: 'no-cors' });
        addResult('Conectividad', 'success', 'Conexión a internet OK', Date.now() - connectivityStart);
      } catch {
        addResult('Conectividad', 'error', 'Sin conexión a internet');
        setIsRunning(false);
        return;
      }

      // 2. Verificar backend disponibilidad
      addResult('Backend', 'warning', `Verificando backend: ${API_CONFIG.BASE_URL}`);
      const backendStart = Date.now();
      
      try {
        // ✅ USAR POST directo al login para verificar disponibilidad
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.LOGIN}`, { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include', // Incluye cookies en la petición
          mode: 'cors', // Modo CORS explícito
          body: JSON.stringify({ email: 'ping@test.com', password: 'ping' }), // Test ping
          signal: AbortSignal.timeout(10000) // 10 segundos timeout
        });
        
        const backendDuration = Date.now() - backendStart;
        if (response.status === 400 || response.status === 401) { // Login rechazado = servidor funciona
          addResult('Backend', 'success', `Backend disponible (${response.status})`, backendDuration);
        } else if (response.status === 404) {
          addResult('Backend', 'warning', `Endpoint no encontrado (${response.status})`, backendDuration);
        } else {
          addResult('Backend', 'warning', `Backend responde con status ${response.status}`, backendDuration);
        }
      } catch (error) {
        const backendDuration = Date.now() - backendStart;
        if ((error as Error).name === 'TimeoutError') {
          addResult('Backend', 'error', 'Backend no responde (timeout 10s)', backendDuration);
        } else {
          addResult('Backend', 'error', `Error de backend: ${(error as Error).message}`, backendDuration);
        }
      }

      // 3. Análisis específico de velocidad de login (ya hecho en paso 2)
      const totalDuration = Date.now() - backendStart;
      if (totalDuration < 500) {
        addResult('Velocidad Login', 'success', `Login muy rápido (${totalDuration}ms)`);
      } else if (totalDuration < 2000) {
        addResult('Velocidad Login', 'success', `Login rápido (${totalDuration}ms)`);
      } else if (totalDuration < 5000) {
        addResult('Velocidad Login', 'warning', `Login lento (${totalDuration}ms) - podría optimizarse`);
      } else {
        addResult('Velocidad Login', 'error', `Login muy lento (${totalDuration}ms) - problema de rendimiento`);
      }

      // 4. Verificar localStorage
      addResult('LocalStorage', 'warning', 'Verificando almacenamiento local...');
      try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        addResult('LocalStorage', 'success', 'LocalStorage funcionando correctamente');
      } catch {
        addResult('LocalStorage', 'error', 'LocalStorage no disponible');
      }

      // 5. Verificar estado actual de tokens
      const currentToken = localStorage.getItem('token');
      if (currentToken) {
        try {
          const payload = JSON.parse(atob(currentToken.split('.')[1]));
          const isExpired = payload.exp < Math.floor(Date.now() / 1000);
          if (isExpired) {
            addResult('Token Actual', 'warning', 'Token expirado en localStorage');
          } else {
            addResult('Token Actual', 'success', 'Token válido encontrado en localStorage');
          }
        } catch {
          addResult('Token Actual', 'error', 'Token malformado en localStorage');
        }
      } else {
        addResult('Token Actual', 'success', 'No hay token previo (normal para nuevo login)');
      }

      // 6. Análisis de rendimiento
      const totalResults = results.filter(r => r.duration);
      if (totalResults.length > 0) {
        const avgDuration = totalResults.reduce((sum, r) => sum + (r.duration || 0), 0) / totalResults.length;
        if (avgDuration > 5000) {
          addResult('Rendimiento', 'error', `Respuesta muy lenta (promedio: ${avgDuration.toFixed(0)}ms)`);
        } else if (avgDuration > 2000) {
          addResult('Rendimiento', 'warning', `Respuesta lenta (promedio: ${avgDuration.toFixed(0)}ms)`);
        } else {
          addResult('Rendimiento', 'success', `Rendimiento bueno (promedio: ${avgDuration.toFixed(0)}ms)`);
        }
      }

    } catch (error) {
      addResult('Error General', 'error', `Error inesperado: ${(error as Error).message}`);
    }
    
    setIsRunning(false);
  };

  return (
    <div className="fixed z-50 max-w-md p-4 overflow-y-auto bg-gray-100 border border-gray-400 rounded-lg shadow-lg top-4 left-4 max-h-96">
      <h3 className="mb-2 font-bold text-gray-800">🔍 Diagnóstico de Login</h3>
      
      <button
        onClick={runLoginDiagnostic}
        disabled={isRunning}
        className="px-3 py-1 mb-3 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {isRunning ? 'Ejecutando...' : 'Ejecutar Diagnóstico'}
      </button>

      <div className="space-y-1 text-xs">
        {results.map((result, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-gray-500">{result.timestamp}</span>
            <span className={`font-bold ${
              result.status === 'success' ? 'text-green-600' : 
              result.status === 'warning' ? 'text-yellow-600' : 
              'text-red-600'
            }`}>
              {result.status === 'success' ? '✅' : result.status === 'warning' ? '⚠️' : '❌'}
            </span>
            <span className="font-semibold">{result.step}:</span>
            <span>{result.message}</span>
            {result.duration && (
              <span className="text-gray-500">({result.duration}ms)</span>
            )}
          </div>
        ))}
      </div>

      {results.length > 0 && !isRunning && (
        <div className="p-2 mt-3 text-xs rounded bg-blue-50">
          <strong>Análisis de Resultados:</strong>
          <ul className="mt-1 ml-2">
            {results.some(r => r.duration && r.duration > 5000) && (
              <li>• ⚠️ Backend muy lento ({results.find(r => r.duration && r.duration > 5000)?.duration}ms). Posibles causas: Render.com dormido, DB lenta.</li>
            )}
            {results.some(r => r.duration && r.duration > 2000 && r.duration <= 5000) && (
              <li>• 🟡 Backend lento pero funcional. Normal para Render.com gratuito.</li>
            )}
            {results.some(r => r.duration && r.duration < 1000) && (
              <li>• ✅ Backend responde rápido. El problema no es el servidor.</li>
            )}
            {results.some(r => r.message.includes('CORS')) && (
              <li>• ❌ Problema de CORS. Backend debe permitir localhost:5174.</li>
            )}
            {results.some(r => r.message.includes('timeout')) && (
              <li>• ❌ Timeouts detectados. Servidor puede estar sobrecargado.</li>
            )}
            {results.some(r => r.message.includes('500')) && (
              <li>• ❌ Error interno del servidor. Revisar logs del backend.</li>
            )}
            {results.some(r => r.status === 'success' && r.step === 'Login Endpoint') && (
              <li>• ✅ Login funciona correctamente. Si tienes lentitud, es en el frontend.</li>
            )}
          </ul>
          
          <div className="p-1 mt-2 rounded bg-green-50">
            <strong>Conclusión:</strong>
            {results.some(r => r.step === 'Velocidad Login' && r.status === 'error') ? (
              <span className="text-red-600"> Login muy lento - optimizar backend o usar servidor más potente.</span>
            ) : results.some(r => r.step === 'Velocidad Login' && r.status === 'warning') ? (
              <span className="text-yellow-600"> Login algo lento - normal para servicios gratuitos.</span>
            ) : results.some(r => r.step === 'Velocidad Login' && r.status === 'success') ? (
              <span className="text-green-600"> Login rápido - rendimiento óptimo.</span>
            ) : (
              <span className="text-gray-600"> Ejecutar diagnóstico completo para evaluar.</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
