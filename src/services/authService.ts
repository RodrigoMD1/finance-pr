import { API_CONFIG } from '../config/api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthUser {
  id: string; // Será userId del JWT
  email: string;
  name: string;
  roles: string[];
  token: string;
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: string; // Backend envía role como string simple
  name: string;
  iat: number;
  exp: number;
}

class AuthService {
  private static instance: AuthService;

  constructor() {
    console.log('🏗️ AuthService initialized');
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // ✅ CORREGIDO: Login compatible con backend y configurado para CORS
  async login(credentials: LoginRequest): Promise<AuthUser> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.LOGIN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Incluye cookies en la petición
        mode: 'cors', // Modo CORS explícito
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al iniciar sesión');
      }

      const data = await response.json();

      // ✅ CORREGIDO: Backend envía 'userId', no 'id'
      const authUser: AuthUser = {
        id: data.userId, // ✅ Backend usa 'userId'
        email: data.email,
        name: data.name,
        roles: data.roles || [data.role] || ['user'], // ✅ Backend envía 'roles' array
        token: data.token
      };

      // Guardar en localStorage
      this.storeAuthData(authUser);

      return authUser;
    } catch (error) {
      console.error('Error in login:', error);
      throw error;
    }
  }

  // ✅ CORREGIDO: Registro compatible con backend y configurado para CORS
  async register(userData: RegisterRequest): Promise<AuthUser> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.REGISTER}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Incluye cookies en la petición
        mode: 'cors', // Modo CORS explícito
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al registrarse');
      }

      const data = await response.json();

      // ✅ CORREGIDO: Mismo mapeo que login
      const authUser: AuthUser = {
        id: data.userId,
        email: data.email,
        name: data.name,
        roles: data.roles || [data.role] || ['user'],
        token: data.token
      };

      // Guardar en localStorage
      this.storeAuthData(authUser);

      return authUser;
    } catch (error) {
      console.error('Error in register:', error);
      throw error;
    }
  }

  // ✅ NUEVO: Verificar estado de autenticación con backend
  async checkAuthStatus(): Promise<AuthUser | null> {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;

      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.CHECK_STATUS}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include', // Incluye cookies en la petición
        mode: 'cors' // Modo CORS explícito
      });

      if (!response.ok) {
        // Token inválido, limpiar localStorage
        this.clearAuthData();
        return null;
      }

      const data = await response.json();

      // Actualizar token si el backend envía uno nuevo
      if (data.token) {
        const authUser: AuthUser = {
          id: data.userId,
          email: data.email,
          name: data.name,
          roles: data.roles || [data.role] || ['user'],
          token: data.token
        };

        this.storeAuthData(authUser);
        return authUser;
      }

      // Si no hay token nuevo, usar datos existentes
      return this.getCurrentUser();
    } catch (error) {
      console.error('Error checking auth status:', error);
      this.clearAuthData();
      return null;
    }
  }

  // ✅ MEJORADO: Decodificar JWT correctamente
  decodeJWT(token: string): JWTPayload | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
        name: payload.name,
        iat: payload.iat,
        exp: payload.exp
      };
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  }

  // Verificar si token está expirado
  isTokenExpired(token: string): boolean {
    const payload = this.decodeJWT(token);
    if (!payload) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  }

  // Obtener usuario actual del localStorage
  getCurrentUser(): AuthUser | null {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    const userRole = localStorage.getItem('userRole');

    if (token && !this.isTokenExpired(token) && userId && userName && userEmail) {
      return {
        id: userId,
        name: userName,
        email: userEmail,
        roles: userRole ? [userRole] : ['user'],
        token
      };
    }

    return null;
  }

  // Guardar datos de autenticación
  private storeAuthData(authUser: AuthUser): void {
    localStorage.setItem('token', authUser.token);
    localStorage.setItem('userId', authUser.id);
    localStorage.setItem('userName', authUser.name);
    localStorage.setItem('userEmail', authUser.email);
    localStorage.setItem('userRole', authUser.roles[0] || 'user');
  }

  // Limpiar datos de autenticación
  private clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
  }

  // Logout mejorado con notificación al backend
  async logout(): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // Notificar al backend para invalidar el token
        await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.LOGOUT}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          mode: 'cors'
        }).catch(err => {
          // Si falla la petición al backend, solo logeamos el error pero seguimos con el logout local
          console.warn('Error notificando logout al backend:', err);
        });
      }
    } finally {
      // Siempre limpiamos los datos locales
      this.clearAuthData();
      window.location.href = '/login';
    }
  }

  // ✅ NUEVO: Verificar si usuario es admin
  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.roles.includes('admin') || false;
  }

  // ✅ NUEVO: Obtener headers de autorización
  getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }
}

export const authService = AuthService.getInstance();
