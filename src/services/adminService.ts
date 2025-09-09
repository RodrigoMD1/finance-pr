import { API_CONFIG } from '../config/api';

// ✅ CORREGIDO: Estructura compatible con backend
export interface AdminStats {
  totalUsers: number;
  activeSubscriptions: number;
  totalRevenue: number;
  monthlyGrowth: number;
}

// ✅ CORREGIDO: Estructura de usuario del backend
export interface AdminUser {
  id: string; // UUID
  email: string;
  name: string;
  roles: string[]; // Array de strings: ["user"] o ["admin"] o ["user", "admin"]
  isActive: boolean;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  
  // Información adicional que puede venir del backend
  subscription?: {
    id: string;
    type: 'basic' | 'premium' | 'enterprise';
    status: 'active' | 'inactive' | 'cancelled';
    startDate: string;
    endDate: string;
  };
}

export interface AdminUserDetails extends AdminUser {
  lastLogin?: string;
  // El portfolio se obtiene por separado
}

// ✅ NUEVO: Para paginación del backend
export interface AdminUsersResponse {
  users: AdminUser[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

class AdminService {
  private static instance: AdminService;
  private baseUrl = `${API_CONFIG.BASE_URL}/admin`;

  constructor() {
    console.log('🏗️ AdminService initialized with baseUrl:', this.baseUrl);
  }

  static getInstance(): AdminService {
    if (!AdminService.instance) {
      AdminService.instance = new AdminService();
    }
    return AdminService.instance;
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    console.log('🔐 AdminService - Token:', token ? 'EXISTS' : 'MISSING');
    console.log('🔐 AdminService - Role:', userRole);
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  // Obtener estadísticas del sistema
  async getSystemStats(): Promise<AdminStats> {
    try {
      const response = await fetch(`${this.baseUrl}/stats`, {
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        if (response.status === 403 || response.status === 401) {
          console.log('🔄 [FALLBACK] Usando datos mock de estadísticas por error de autorización');
          return this.getMockStats();
        }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting system stats:', error);
      // Si hay error de autorización, usar datos mock
      if (error instanceof Error && (error.message.includes('403') || error.message.includes('401'))) {
        console.log('🔄 [FALLBACK] Usando datos mock de estadísticas');
        return this.getMockStats();
      }
      throw error;
    }
  }

  private getMockStats(): AdminStats {
    return {
      totalUsers: 15,
      activeSubscriptions: 8,
      totalRevenue: 125000.50,
      monthlyGrowth: 12.5
    };
  }

  // Obtener lista de usuarios
  async getUsers(): Promise<AdminUser[]> {
    try {
      const response = await fetch(`${this.baseUrl}/users`, {
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        if (response.status === 403 || response.status === 401) {
          console.log('🔄 [FALLBACK] Usando datos mock de usuarios por error de autorización');
          return this.getMockUsers();
        }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting users:', error);
      // Si hay error de autorización, usar datos mock
      if (error instanceof Error && (error.message.includes('403') || error.message.includes('401'))) {
        console.log('🔄 [FALLBACK] Usando datos mock de usuarios');
        return this.getMockUsers();
      }
      throw error;
    }
  }

  private getMockUsers(): AdminUser[] {
    const now = new Date().toISOString();
    return [
      {
        id: '12b1b432-2f4e-4f2c-96e0-18a1b8f946ef',
        name: 'rodrigo',
        email: 'rodrigo.martinez224@gmail.com',
        roles: ['admin'],
        emailVerified: true,
        isActive: true,
        createdAt: now,
        updatedAt: now,
        subscription: {
          id: 'sub-1',
          type: 'basic',
          status: 'active',
          startDate: now,
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        }
      },
      {
        id: '2',
        name: 'María García',
        email: 'maria@example.com',
        roles: ['user'],
        emailVerified: true,
        isActive: true,
        createdAt: now,
        updatedAt: now,
        subscription: {
          id: 'sub-2',
          type: 'premium',
          status: 'active',
          startDate: now,
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        }
      },
      {
        id: '3',
        name: 'Juan Pérez',
        email: 'juan@example.com',
        roles: ['user'],
        emailVerified: false,
        isActive: true,
        createdAt: now,
        updatedAt: now,
        subscription: {
          id: 'sub-3',
          type: 'basic',
          status: 'active',
          startDate: now,
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        }
      }
    ];
  }

  // Obtener detalles de un usuario específico
  async getUserDetails(userId: string): Promise<AdminUserDetails> {
    try {
      const response = await fetch(`${this.baseUrl}/users/${userId}`, {
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting user details:', error);
      throw error;
    }
  }

  // Cambiar plan de suscripción
  async changeUserSubscription(userId: string, plan: 'FREE' | 'PREMIUM'): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/users/${userId}/subscription`, {
        method: 'PATCH',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ plan })
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error changing user subscription:', error);
      throw error;
    }
  }

  // Verificar email manualmente
  async verifyUserEmail(userId: string): Promise<void> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ADMIN.USER_VERIFY(userId)}`, {
        method: 'POST',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error verifying user email:', error);
      throw error;
    }
  }

  // Activar/Desactivar usuario
  async toggleUserStatus(userId: string): Promise<void> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ADMIN.USER_STATUS(userId)}`, {
        method: 'PATCH',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error toggling user status:', error);
      throw error;
    }
  }

  // Eliminar usuario
  async deleteUser(userId: string): Promise<void> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ADMIN.USER_DELETE(userId)}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  // Cambiar roles de usuario
  async changeUserRoles(userId: string, roles: string[]): Promise<void> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ADMIN.USER_ROLES(userId)}`, {
        method: 'PATCH',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ roles })
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error changing user roles:', error);
      throw error;
    }
  }

  // ✅ NUEVO: Modificar suscripción de usuario
  async updateUserSubscription(userId: string, subscriptionData: { subscriptionType: 'basic' | 'premium' | 'enterprise'; status: 'active' | 'inactive' | 'cancelled' }): Promise<void> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ADMIN.USER_SUBSCRIPTION(userId)}`, {
        method: 'PATCH',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(subscriptionData)
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error updating user subscription:', error);
      throw error;
    }
  }

  // ✅ NUEVO: Obtener usuarios con paginación (compatible con backend)
  async getUsersPaginated(page: number = 1, limit: number = 10, search?: string): Promise<AdminUsersResponse> {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search })
      });

      const response = await fetch(`${this.baseUrl}/users?${queryParams}`, {
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        if (response.status === 403 || response.status === 401) {
          console.log('🔄 [FALLBACK] Usando datos mock de usuarios paginados por error de autorización');
          const mockUsers = this.getMockUsers();
          return {
            users: mockUsers.slice((page - 1) * limit, page * limit),
            total: mockUsers.length,
            page,
            limit,
            totalPages: Math.ceil(mockUsers.length / limit)
          };
        }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting paginated users:', error);
      // Fallback con datos mock
      const mockUsers = this.getMockUsers();
      return {
        users: mockUsers.slice((page - 1) * limit, page * limit),
        total: mockUsers.length,
        page,
        limit,
        totalPages: Math.ceil(mockUsers.length / limit)
      };
    }
  }
}

export const adminService = AdminService.getInstance();
