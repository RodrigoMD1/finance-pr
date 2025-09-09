import { useState, useEffect } from 'react';
import { dataService } from '../services/dataService';

/**
 * Componente invisible que se encarga de sincronizar datos del usuario
 * y proporciona un botón de sincronización manual cuando es necesario
 */
const DataSynchronizer: React.FC = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [showSyncButton, setShowSyncButton] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);

  // Sincronizar datos cuando el componente se monta o cuando se desconecta/reconecta
  useEffect(() => {
    const checkConnection = async () => {
      // Verificar conectividad
      const isOnline = navigator.onLine;
      setShowSyncButton(!isOnline);
      
      // Si estamos online, intentar sincronizar
      if (isOnline) {
        await handleSync(true); // Sincronización silenciosa en segundo plano
      }
    };
    
    // Comprobar al inicio
    checkConnection();
    
    // Configurar listeners para cambios de conectividad
    const handleOnline = () => {
      setShowSyncButton(false);
      handleSync(true);
    };
    
    const handleOffline = () => {
      setShowSyncButton(true);
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Función para sincronizar datos
  const handleSync = async (silent = false) => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;
    
    if (!silent) {
      setIsSyncing(true);
      setSyncError(null);
    }
    
    try {
      await dataService.initializeUserData(userId);
      
      // Disparar evento personalizado para notificar a otros componentes
      const event = new CustomEvent('dataSync', { 
        detail: { success: true, timestamp: new Date() }
      });
      window.dispatchEvent(event);
      
    } catch (error) {
      setSyncError('Error al sincronizar. Inténtelo de nuevo.');
      
      // Disparar evento de error
      const event = new CustomEvent('dataSyncError', { 
        detail: { timestamp: new Date() }
      });
      window.dispatchEvent(event);
    } finally {
      if (!silent) {
        setIsSyncing(false);
      }
    }
  };

  // Si no necesitamos mostrar nada, devolvemos null (componente invisible)
  if (!showSyncButton && !isSyncing && !syncError) {
    return null;
  }

  // Estilos para el botón de sincronización
  const buttonStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: syncError ? '#f44336' : '#4caf50',
    color: 'white',
    padding: '10px 15px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    zIndex: 9999,
  };

  return (
    <button 
      style={buttonStyle}
      onClick={() => handleSync()}
      disabled={isSyncing}
    >
      {isSyncing ? (
        <>
          <SyncIcon spin /> Sincronizando...
        </>
      ) : syncError ? (
        <>
          <ErrorIcon /> Reintentar sincronización
        </>
      ) : (
        <>
          <SyncIcon /> Sincronizar datos
        </>
      )}
    </button>
  );
};

// Iconos SVG simples
const SyncIcon: React.FC<{spin?: boolean}> = ({spin}) => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    style={spin ? {animation: 'spin 2s linear infinite'} : {}}
  >
    <path 
      fill="currentColor" 
      d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0021 12c0-4.96-4.04-9-9-9zm0 18c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 003 12c0 4.96 4.04 9 9 9v3l4-4-4-4v3z"
    />
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </svg>
);

const ErrorIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path 
      fill="currentColor" 
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
    />
  </svg>
);

export default DataSynchronizer;
