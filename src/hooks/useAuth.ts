import { useState, useEffect, useCallback } from 'react';
import { isTokenExpired } from '../utils/auth';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
}

// Event listener personalizado para manejar cambios de autenticación
const AUTH_EVENT = 'authStateChanged';

// Función para disparar evento de cambio de autenticación
const triggerAuthChange = () => {
  window.dispatchEvent(new Event(AUTH_EVENT));
};

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
  });

  // Función para verificar el estado de autenticación
  const checkAuthStatus = useCallback(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    const userRole = localStorage.getItem('userRole');

    if (token && !isTokenExpired(token) && userId && userName && userEmail) {
      setAuthState({
        isAuthenticated: true,
        isLoading: false,
        user: {
          id: userId,
          name: userName,
          email: userEmail,
          role: userRole || 'user',
        },
      });
    } else {
      // Si el token expiró, limpiar localStorage
      if (token && isTokenExpired(token)) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRole');
      }
      
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
      });
    }
  }, []);

  // Función para hacer login
  const login = useCallback((userData: {
    token: string;
    id: string;
    name: string;
    email: string;
    role: string;
  }) => {
    // Guardar datos en localStorage
    localStorage.setItem('token', userData.token);
    localStorage.setItem('userId', userData.id);
    localStorage.setItem('userName', userData.name);
    localStorage.setItem('userEmail', userData.email);
    localStorage.setItem('userRole', userData.role);

    // Actualizar estado inmediatamente
    setAuthState({
      isAuthenticated: true,
      isLoading: false,
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
      },
    });

    // Disparar eventos para que otros componentes se actualicen
    triggerAuthChange();
    window.dispatchEvent(new Event('userLoggedIn'));
  }, []);

  // Función para hacer logout
  const logout = useCallback(() => {
    // Limpiar localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');

    // Actualizar estado inmediatamente
    setAuthState({
      isAuthenticated: false,
      isLoading: false,
      user: null,
    });

    // Disparar evento para que otros componentes se actualicen
    triggerAuthChange();
  }, []);

  useEffect(() => {
    // Verificar estado inicial
    checkAuthStatus();

    // Escuchar cambios en el evento personalizado
    const handleAuthChange = () => {
      checkAuthStatus();
    };

    window.addEventListener(AUTH_EVENT, handleAuthChange);

    // Escuchar cambios en localStorage (útil para múltiples pestañas)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token' || e.key === 'userId') {
        checkAuthStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Verificar cuando la página vuelve a tener foco
    const handleFocus = () => {
      checkAuthStatus();
    };

    window.addEventListener('focus', handleFocus);

    // Cleanup
    return () => {
      window.removeEventListener(AUTH_EVENT, handleAuthChange);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [checkAuthStatus]);

  return {
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    user: authState.user,
    login,
    logout,
    checkAuthStatus,
  };
};
