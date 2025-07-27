import { useEffect } from 'react';
import { dataService } from '../services/dataService';

/**
 * Hook para inicializar y mantener sincronizados los datos del usuario
 * Se debe usar en componentes principales que requieren datos consistentes
 */
export const useDataSync = () => {
  useEffect(() => {
    const initializeData = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      
      if (userId && token) {
        await dataService.initializeUserData(userId);
        await dataService.cleanupObsoleteData();
      }
    };

    // Inicializar datos al montar el componente
    initializeData();

    // Escuchar cambios en el localStorage para reinicializar cuando sea necesario
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'userId' || event.key === 'token') {
        initializeData();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Escuchar evento personalizado de login
    const handleLogin = () => {
      setTimeout(initializeData, 100); // Small delay to ensure storage is updated
    };

    window.addEventListener('userLoggedIn', handleLogin);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userLoggedIn', handleLogin);
    };
  }, []);
};
