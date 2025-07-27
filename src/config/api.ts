// Configuración de entorno para URLs de API
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'https://proyecto-inversiones.onrender.com/api',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      VERIFY_EMAIL: '/auth/verify-email',
      REFRESH: '/auth/refresh',
      PROFILE: '/auth/profile',
    },
    PORTFOLIO: {
      BASE: '/portfolio',
      USER: (userId: string) => `/portfolio/user/${userId}`,
      ITEM: (id: string) => `/portfolio/item/${id}`,
      STATISTICS: (userId: string) => `/portfolio/statistics/${userId}`,
      PERFORMANCE: (userId: string) => `/portfolio/performance/${userId}`,
      HISTORY: (userId: string) => `/portfolio/history/${userId}`,
      CURRENT_PERFORMANCE: (userId: string) => `/portfolio/current-performance/${userId}`,
    },
    SUBSCRIPTION: {
      PLANS: '/subscription/plans',
      CURRENT: '/subscription/current',
      CREATE_PAYMENT: '/subscription/create-payment',
      CANCEL: '/subscription/cancel',
      USAGE: '/subscription/usage',
    },
  },
};

// Función helper para construir URLs completas
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Configuración de desarrollo para fallback local
export const DEV_CONFIG = {
  USE_LOCAL_FALLBACK: import.meta.env.DEV && import.meta.env.VITE_USE_LOCAL_FALLBACK === 'true',
  MOCK_USER_ID: 'dev-user-123',
  MOCK_TOKEN: 'dev-token-' + Date.now(),
};

// Helper para verificar si debemos usar el servicio local
export const shouldUseLocalFallback = (): boolean => {
  return DEV_CONFIG.USE_LOCAL_FALLBACK;
};
