import { API_CONFIG } from '../config/api';

export interface ReportOptions {
  userId: string;
  type?: 'portfolio' | 'performance' | 'transactions';
  period?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

class ReportsService {
  private static instance: ReportsService;

  constructor() {
    console.log('🏗️ ReportsService initialized');
  }

  static getInstance(): ReportsService {
    if (!ReportsService.instance) {
      ReportsService.instance = new ReportsService();
    }
    return ReportsService.instance;
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Authorization': `Bearer ${token}`
    };
  }

  // Descargar reporte PDF
  async downloadReport(options: ReportOptions): Promise<void> {
    try {
      const queryParams = new URLSearchParams({
        userId: options.userId,
        type: options.type || 'portfolio',
        period: options.period || 'monthly'
      });

      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REPORTS.DOWNLOAD}?${queryParams}`, {
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      // Obtener el blob del PDF
      const blob = await response.blob();
      
      // Crear enlace de descarga
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `reporte-${options.type}-${options.period}-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      
      // Limpiar
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      console.log('📄 Reporte descargado exitosamente');
    } catch (error) {
      console.error('Error downloading report:', error);
      throw error;
    }
  }

  // Generar reporte para el usuario actual
  async downloadCurrentUserReport(type: 'portfolio' | 'performance' | 'transactions' = 'portfolio', period: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'monthly'): Promise<void> {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('Usuario no autenticado');
    }

    return this.downloadReport({ userId, type, period });
  }
}

export const reportsService = ReportsService.getInstance();
