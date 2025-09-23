import { useEffect, useState } from 'react';
import { authService, type AuthUser } from '../services/authService';
import { isTokenExpired } from '../utils/auth';

type MinimalUser = {
  id: string;
  email: string;
  name?: string;
  role?: string | string[];
};

export const useAuth = () => {
  const [user, setUser] = useState<MinimalUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const refreshFromStorage = () => {
    const token = localStorage.getItem('token');
    if (!token || isTokenExpired(token)) {
      setUser(null);
      setIsAuthenticated(false);
      return;
    }

    const current: AuthUser | null = authService.getCurrentUser();
    if (current) {
      const storedRole = localStorage.getItem('userRole');
      setUser({
        id: current.id,
        email: current.email,
        name: current.name,
        role: storedRole || current.roles || 'user'
      });
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    refreshFromStorage();

    const onAuthChanged = () => refreshFromStorage();
    const onFocus = () => refreshFromStorage();
    window.addEventListener('auth-changed', onAuthChanged as EventListener);
    window.addEventListener('focus', onFocus);

    return () => {
      window.removeEventListener('auth-changed', onAuthChanged as EventListener);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  return { user, isAuthenticated } as const;
};

export default useAuth;
