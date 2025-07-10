import { useEffect, useState } from 'react';
import { checkTokenAndLogout } from '../utils/auth';

export const useAuthCheck = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      
      if (token && checkTokenAndLogout()) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      
      setIsLoading(false);
    };

    // Verificar inmediatamente
    checkAuth();

    // Verificar cada 30 segundos
    const interval = setInterval(checkAuth, 30000);

    // Verificar cuando la página vuelve a tener foco
    const handleFocus = () => checkAuth();
    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  return { isAuthenticated, isLoading };
};
