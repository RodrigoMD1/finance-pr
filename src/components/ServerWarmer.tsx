import { useEffect, useState } from 'react';
import { API_CONFIG } from '../config/api';

export const ServerWarmer = () => {
  const [status, setStatus] = useState<'idle' | 'warming' | 'ready' | 'error'>('idle');
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    const warmUpServer = async () => {
      // Solo hacer warm-up una vez por sesión
      if (sessionStorage.getItem('serverWarmed')) {
        setStatus('ready');
        return;
      }

      setStatus('warming');
      const startTime = Date.now();

      try {
        // Hacer una request simple para despertar el servidor
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.LOGIN}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include', // Incluye cookies en la petición
          mode: 'cors', // Modo CORS explícito
          body: JSON.stringify({ email: 'warmup@warmup.com', password: 'warmup' }),
          signal: AbortSignal.timeout(30000) // 30 segundos para warm-up
        });

        const warmDuration = Date.now() - startTime;
        setDuration(warmDuration);

        // Cualquier respuesta (incluso 400) significa que el servidor está despierto
        if (response.status === 400 || response.status === 401 || response.status === 200) {
          setStatus('ready');
          sessionStorage.setItem('serverWarmed', 'true');
          console.log(`🔥 Servidor listo en ${warmDuration}ms`);
        } else {
          setStatus('error');
          console.warn(`⚠️ Servidor respondió con ${response.status} en ${warmDuration}ms`);
        }
      } catch (error) {
        const warmDuration = Date.now() - startTime;
        setDuration(warmDuration);
        setStatus('error');
        console.error('❌ Error warming up server:', error);
      }
    };

    warmUpServer();
  }, []);

  if (status === 'idle' || status === 'ready') {
    return null; // No mostrar nada cuando está listo
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-3 bg-blue-600 text-white text-center">
      {status === 'warming' && (
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
          <span>Activando servidor... {duration > 0 && `(${Math.floor(duration / 1000)}s)`}</span>
        </div>
      )}
      
      {status === 'error' && (
        <div className="flex items-center justify-center gap-2">
          <span>⚠️ Servidor tardó en responder ({Math.floor(duration / 1000)}s). Los próximos logins serán más rápidos.</span>
        </div>
      )}
    </div>
  );
};
