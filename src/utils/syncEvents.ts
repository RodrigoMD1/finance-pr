/**
 * Script para gestionar eventos de sincronización de datos
 */

// Definir eventos personalizados para sincronización de datos
interface DataSyncEventDetail {
  success: boolean;
  timestamp: Date;
  source?: string;
}

interface DataSyncErrorEventDetail {
  error: unknown;
  timestamp: Date;
  source?: string;
}

// Definir tipos para los eventos personalizados
declare global {
  interface WindowEventMap {
    'dataSync': CustomEvent<DataSyncEventDetail>;
    'dataSyncError': CustomEvent<DataSyncErrorEventDetail>;
    'refreshUserData': CustomEvent;
    'userLoggedIn': CustomEvent;
    'userLoggedOut': CustomEvent;
  }
}

// Función para iniciar un evento de sincronización
export function requestDataSync(source = 'manual'): void {
  window.dispatchEvent(new CustomEvent('refreshUserData', {
    detail: { source, timestamp: new Date() }
  }));
}

// Función para disparar el evento de login
export function notifyUserLogin(userId: string): void {
  window.dispatchEvent(new CustomEvent('userLoggedIn', {
    detail: { userId, timestamp: new Date() }
  }));
  
  // También solicitar sincronización
  setTimeout(() => {
    requestDataSync('login');
  }, 500);
}

// Función para disparar el evento de logout
export function notifyUserLogout(userId: string): void {
  window.dispatchEvent(new CustomEvent('userLoggedOut', {
    detail: { userId, timestamp: new Date() }
  }));
}
