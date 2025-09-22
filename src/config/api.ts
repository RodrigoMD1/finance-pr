import { API_BASE_URL } from '../services/api';

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/registro',
      CHECK_STATUS: '/auth/check-status',
      LOGOUT: '/auth/logout'
    },
    REPORTS: {
      DOWNLOAD: '/report/download'
    },
    PAYMENTS: {
      CREATE: '/payments/create',
      HISTORY: '/payments/history'
    },
    ASSETS: {
      BASE: '/assets',
      BY_ID: (id: string) => `/assets/${id}`
    },
    ADMIN: {
      STATS: '/admin/stats',
      USER_VERIFY: (id: string) => `/users/verify-email?userId=${id}`,
      USER_STATUS: (id: string) => `/admin/users/${id}/toggle-status`,
      USER_DELETE: (id: string) => `/admin/users/${id}`,
      USER_ROLES: (id: string) => `/admin/users/${id}/roles`,
      USER_SUBSCRIPTION: (id: string) => `/admin/users/${id}/subscription`
    }
  }
};

export default API_CONFIG;
