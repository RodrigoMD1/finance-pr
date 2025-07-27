import { PortfolioItem } from '../types/PortfolioItem';
import { fetchWithAuth } from '../utils/auth';
import { buildApiUrl, shouldUseLocalFallback } from '../config/api';
import { localSubscriptionService } from './localSubscriptionService';
import toast from 'react-hot-toast';

interface PortfolioService {
  getPortfolio(userId: string): Promise<PortfolioItem[]>;
  addItem(item: Omit<PortfolioItem, 'id'>, userId: string): Promise<PortfolioItem>;
  deleteItem(id: string): Promise<boolean>;
}

class LocalPortfolioService implements PortfolioService {
  private getStorageKey = (userId: string) => `portfolio_${userId}`;

  async getPortfolio(userId: string): Promise<PortfolioItem[]> {
    try {
      // Intentar obtener datos del usuario específico primero
      const userSpecific = localStorage.getItem(this.getStorageKey(userId));
      if (userSpecific) {
        const parsed = JSON.parse(userSpecific);
        return Array.isArray(parsed) ? parsed : [];
      }

      // Fallback: intentar obtener datos generales del portfolio
      const general = localStorage.getItem('portfolio');
      if (general) {
        const parsed = JSON.parse(general);
        const portfolio = Array.isArray(parsed) ? parsed : [];
        
        // Migrar datos generales a específicos del usuario
        if (portfolio.length > 0) {
          localStorage.setItem(this.getStorageKey(userId), JSON.stringify(portfolio));
          // Limpiar datos generales después de migrar
          localStorage.removeItem('portfolio');
        }
        
        return portfolio;
      }

      return [];
    } catch (error) {
      console.error('Error loading portfolio:', error);
      return [];
    }
  }

  async addItem(item: Omit<PortfolioItem, 'id'>, userId: string): Promise<PortfolioItem> {
    // Verificar límites de suscripción localmente
    const canAdd = await localSubscriptionService.canAddAsset();
    if (!canAdd) {
      throw new Error('Límite de activos alcanzado para tu plan actual');
    }

    const newItem: PortfolioItem = {
      ...item,
      id: Date.now(), // Usar timestamp como ID numérico
    };

    const portfolio = await this.getPortfolio(userId);
    const updatedPortfolio = [...portfolio, newItem];
    
    localStorage.setItem(this.getStorageKey(userId), JSON.stringify(updatedPortfolio));
    
    return newItem;
  }

  async deleteItem(id: string): Promise<boolean> {
    const userId = localStorage.getItem('userId');
    if (!userId) return false;

    const portfolio = await this.getPortfolio(userId);
    const numericId = typeof id === 'string' ? parseInt(id) : id;
    const updatedPortfolio = portfolio.filter(item => item.id !== numericId);
    
    localStorage.setItem(this.getStorageKey(userId), JSON.stringify(updatedPortfolio));
    
    return true;
  }
}

class RemotePortfolioService implements PortfolioService {
  async getPortfolio(userId: string): Promise<PortfolioItem[]> {
    try {
      const res = await fetchWithAuth(buildApiUrl(`/portfolio/user/${userId}`));
      
      if (res.ok) {
        const data = await res.json();
        return data.map((item: {
          id: number;
          name: string;
          ticker: string;
          quantity: number;
          purchase_price: number;
          type: string;
          purchase_date?: string;
        }) => ({
          id: item.id,
          nombre: item.name,
          ticker: item.ticker,
          cantidad: item.quantity,
          precio: item.purchase_price,
          tipoActivo: item.type,
          fechaCompra: item.purchase_date || new Date().toISOString(),
        }));
      } else {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching portfolio from backend:', error);
      throw error;
    }
  }

  async addItem(item: Omit<PortfolioItem, 'id'>, userId: string): Promise<PortfolioItem> {
    const purchaseDate = item.fechaCompra || new Date().toISOString();

    try {
      const res = await fetchWithAuth(buildApiUrl('/portfolio'), {
        method: 'POST',
        body: JSON.stringify({
          name: item.nombre,
          ticker: item.ticker,
          description: item.nombre,
          quantity: item.cantidad,
          purchase_price: item.precio,
          type: item.tipoActivo,
          user_id: userId,
          purchase_date: purchaseDate,
        }),
      });

      if (res.ok) {
        const newItem = await res.json();
        return {
          id: newItem.id,
          nombre: newItem.name,
          ticker: newItem.ticker,
          cantidad: newItem.quantity,
          precio: newItem.purchase_price,
          tipoActivo: newItem.type,
          fechaCompra: newItem.purchase_date || new Date().toISOString(),
        };
      } else if (res.status === 403) {
        const errorData = await res.json().catch(() => ({ message: 'Límite de activos alcanzado' }));
        throw new Error(errorData.message || 'No tienes permisos para agregar más activos. Verifica tu plan de suscripción.');
      } else if (res.status === 401) {
        throw new Error('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
      } else {
        const errorData = await res.json().catch(() => ({ message: 'Error desconocido' }));
        throw new Error(errorData.message || 'Error del servidor');
      }
    } catch (error) {
      console.error('Error adding item to backend:', error);
      throw error;
    }
  }

  async deleteItem(id: string): Promise<boolean> {
    try {
      const res = await fetchWithAuth(buildApiUrl(`/portfolio/item/${id}`), {
        method: 'DELETE',
      });

      if (res.ok) {
        return true;
      } else if (res.status === 403) {
        throw new Error('No tienes permisos para eliminar este activo.');
      } else if (res.status === 401) {
        throw new Error('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
      } else if (res.status === 404) {
        throw new Error('El activo no fue encontrado.');
      } else {
        const errorData = await res.json().catch(() => ({ message: 'Error desconocido' }));
        throw new Error(errorData.message || 'Error del servidor');
      }
    } catch (error) {
      console.error('Error deleting item from backend:', error);
      throw error;
    }
  }
}

// Servicio híbrido que decide cuál usar
class HybridPortfolioService implements PortfolioService {
  private localService = new LocalPortfolioService();
  private remoteService = new RemotePortfolioService();

  private async tryRemoteWithFallback<T>(
    remoteOperation: () => Promise<T>,
    localOperation: () => Promise<T>,
    operationName: string
  ): Promise<T> {
    // Si está configurado para usar solo local, usar local
    if (shouldUseLocalFallback()) {
      console.log(`🔧 [DEV] Usando servicio local para ${operationName}`);
      return await localOperation();
    }

    try {
      // Intentar operación remota primero
      const result = await remoteOperation();
      console.log(`✅ [REMOTE] ${operationName} exitoso`);
      return result;
    } catch (error) {
      console.warn(`⚠️ [REMOTE] Error en ${operationName}:`, error);
      
      // Si hay problemas de conectividad, usar servicio local
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      if (errorMessage.includes('fetch') || 
          errorMessage.includes('CORS') || 
          errorMessage.includes('Network') ||
          errorMessage.includes('Failed to fetch')) {
        
        console.log(`🔄 [FALLBACK] Usando servicio local para ${operationName}`);
        toast.success('Usando modo offline temporal', { duration: 3000 });
        return await localOperation();
      }
      
      // Para otros errores (403, 401, etc.), propagar el error
      throw error;
    }
  }

  async getPortfolio(userId: string): Promise<PortfolioItem[]> {
    return this.tryRemoteWithFallback(
      () => this.remoteService.getPortfolio(userId),
      () => this.localService.getPortfolio(userId),
      'obtener portfolio'
    );
  }

  async addItem(item: Omit<PortfolioItem, 'id'>, userId: string): Promise<PortfolioItem> {
    return this.tryRemoteWithFallback(
      () => this.remoteService.addItem(item, userId),
      () => this.localService.addItem(item, userId),
      'agregar activo'
    );
  }

  async deleteItem(id: string): Promise<boolean> {
    // Para delete, no hacer fallback automático ya que podría causar inconsistencias
    if (shouldUseLocalFallback()) {
      return this.localService.deleteItem(id);
    }
    
    return this.remoteService.deleteItem(id);
  }
}

export const portfolioService = new HybridPortfolioService();
