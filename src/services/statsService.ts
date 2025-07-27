import { PortfolioItem } from '../types/PortfolioItem';

// Interfaz para estadísticas del portfolio
interface PortfolioStats {
  totalStats: {
    totalValue: number;
    totalAssets: number;
    distribution: Record<string, number>;
  };
  topAsset: {
    name: string;
    value: number;
    ticker: string;
  } | null;
}

// Interfaz para datos históricos
interface HistoryDataPoint {
  date: string;
  total: number;
}

// Interfaz para datos de rendimiento
interface PerformanceDataPoint {
  name: string;
  value: number;
  change: number;
}

class LocalStatsService {
  private getPortfolioFromStorage(userId: string): PortfolioItem[] {
    const stored = localStorage.getItem(`portfolio_${userId}`);
    return stored ? JSON.parse(stored) : [];
  }

  // Generar estadísticas básicas del portfolio
  generateStats(userId: string): PortfolioStats {
    const portfolio = this.getPortfolioFromStorage(userId);
    
    if (portfolio.length === 0) {
      return {
        totalStats: {
          totalValue: 0,
          totalAssets: 0,
          distribution: {}
        },
        topAsset: null
      };
    }

    // Calcular valor total
    const totalValue = portfolio.reduce((sum, item) => sum + (item.cantidad * item.precio), 0);
    
    // Calcular distribución por tipo
    const distribution: Record<string, number> = {};
    const typeValues: Record<string, number> = {};
    
    portfolio.forEach(item => {
      const value = item.cantidad * item.precio;
      if (!typeValues[item.tipoActivo]) {
        typeValues[item.tipoActivo] = 0;
      }
      typeValues[item.tipoActivo] += value;
    });

    // Convertir a porcentajes
    Object.entries(typeValues).forEach(([type, value]) => {
      distribution[type] = (value / totalValue) * 100;
    });

    // Encontrar activo con mayor valor
    const topAsset = portfolio.reduce((max, item) => {
      const itemValue = item.cantidad * item.precio;
      const maxValue = max ? max.cantidad * max.precio : 0;
      return itemValue > maxValue ? item : max;
    }, portfolio[0]);

    return {
      totalStats: {
        totalValue,
        totalAssets: portfolio.length,
        distribution
      },
      topAsset: topAsset ? {
        name: topAsset.nombre,
        value: topAsset.cantidad * topAsset.precio,
        ticker: topAsset.ticker
      } : null
    };
  }

  // Generar datos históricos simulados basados en el portfolio actual
  generateHistoryData(userId: string, fromDate: string, toDate: string): HistoryDataPoint[] {
    const portfolio = this.getPortfolioFromStorage(userId);
    const currentValue = portfolio.reduce((sum, item) => sum + (item.cantidad * item.precio), 0);
    
    if (currentValue === 0) {
      return [];
    }

    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);
    const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
    
    const historyData: HistoryDataPoint[] = [];
    
    // Generar puntos de datos para cada día
    for (let i = 0; i <= daysDiff; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      
      // Simular variación del valor del portfolio (±15% del valor actual)
      const variation = 0.85 + (Math.sin((i / daysDiff) * Math.PI * 2) * 0.1) + (Math.random() * 0.1);
      const value = Math.round(currentValue * variation);
      
      historyData.push({
        date: date.toISOString().split('T')[0],
        total: value
      });
    }
    
    // Asegurar que el último punto sea el valor actual
    if (historyData.length > 0) {
      historyData[historyData.length - 1].total = currentValue;
    }
    
    return historyData;
  }

  // Generar datos de rendimiento por fecha
  generatePerformanceData(userId: string, _date: string): PerformanceDataPoint[] {
    const portfolio = this.getPortfolioFromStorage(userId);
    
    return portfolio.map(item => {
      const currentValue = item.cantidad * item.precio;
      // Simular cambio de precio (±5%)
      const change = (Math.random() - 0.5) * 10; // Entre -5% y +5%
      
      return {
        name: item.nombre,
        value: currentValue,
        change: change
      };
    });
  }

  // Generar rendimiento actual
  generateCurrentPerformance(userId: string): PerformanceDataPoint[] {
    const portfolio = this.getPortfolioFromStorage(userId);
    
    return portfolio.map(item => {
      const currentValue = item.cantidad * item.precio;
      // Simular rendimiento desde la compra (variación realista)
      const simulatedChange = Math.random() * 20 - 10; // Entre -10% y +10%
      
      return {
        name: item.nombre,
        value: currentValue,
        change: simulatedChange
      };
    });
  }
}

// Servicio híbrido que usa datos locales cuando el backend no está disponible
class HybridStatsService {
  private localService = new LocalStatsService();

  async getStats(userId: string): Promise<PortfolioStats> {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token');

      const response = await fetch(`https://proyecto-inversiones.onrender.com/api/portfolio/statistics/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      console.warn('Using local stats service:', error);
      return this.localService.generateStats(userId);
    }
  }

  async getHistory(userId: string, fromDate: string, toDate: string): Promise<HistoryDataPoint[]> {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token');

      const response = await fetch(`https://proyecto-inversiones.onrender.com/api/portfolio/history/${userId}?from=${fromDate}&to=${toDate}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        // Si el backend devuelve datos vacíos, usar datos locales
        if (!data || data.length === 0) {
          return this.localService.generateHistoryData(userId, fromDate, toDate);
        }
        return data;
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      console.warn('Using local history service:', error);
      return this.localService.generateHistoryData(userId, fromDate, toDate);
    }
  }

  async getPerformance(userId: string, date: string): Promise<PerformanceDataPoint[]> {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token');

      const response = await fetch(`https://proyecto-inversiones.onrender.com/api/portfolio/performance/${userId}?date=${date}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        if (!data || data.length === 0) {
          return this.localService.generatePerformanceData(userId, date);
        }
        return data;
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      console.warn('Using local performance service:', error);
      return this.localService.generatePerformanceData(userId, date);
    }
  }

  async getCurrentPerformance(userId: string): Promise<PerformanceDataPoint[]> {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token');

      const response = await fetch(`https://proyecto-inversiones.onrender.com/api/portfolio/current-performance/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        if (!data || data.length === 0) {
          return this.localService.generateCurrentPerformance(userId);
        }
        return data;
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      console.warn('Using local current performance service:', error);
      return this.localService.generateCurrentPerformance(userId);
    }
  }
}

export const statsService = new HybridStatsService();
