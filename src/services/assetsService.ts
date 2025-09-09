import { API_CONFIG } from '../config/api';

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  type: 'stock' | 'crypto' | 'bond';
  price: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAssetRequest {
  symbol: string;
  name: string;
  type: 'stock' | 'crypto' | 'bond';
  price: number;
  currency: string;
}

export interface AssetFilters {
  type?: 'stock' | 'crypto' | 'bond';
  symbol?: string;
  page?: number;
  limit?: number;
}

class AssetsService {
  private static instance: AssetsService;
  private baseUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ASSETS.BASE}`;

  constructor() {
    console.log('🏗️ AssetsService initialized with baseUrl:', this.baseUrl);
  }

  static getInstance(): AssetsService {
    if (!AssetsService.instance) {
      AssetsService.instance = new AssetsService();
    }
    return AssetsService.instance;
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  // Obtener todos los assets con filtros
  async getAssets(filters: AssetFilters = {}): Promise<Asset[]> {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.type) queryParams.append('type', filters.type);
      if (filters.symbol) queryParams.append('symbol', filters.symbol);
      if (filters.page) queryParams.append('page', filters.page.toString());
      if (filters.limit) queryParams.append('limit', filters.limit.toString());
      
      const url = `${this.baseUrl}${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      
      const response = await fetch(url, {
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting assets:', error);
      throw error;
    }
  }

  // Obtener asset por ID
  async getAssetById(id: string): Promise<Asset> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ASSETS.BY_ID(id)}`, {
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting asset by ID:', error);
      throw error;
    }
  }

  // Crear nuevo asset
  async createAsset(assetData: CreateAssetRequest): Promise<Asset> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(assetData)
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating asset:', error);
      throw error;
    }
  }

  // Actualizar asset
  async updateAsset(id: string, assetData: Partial<CreateAssetRequest>): Promise<Asset> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ASSETS.BY_ID(id)}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(assetData)
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating asset:', error);
      throw error;
    }
  }

  // Eliminar asset
  async deleteAsset(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ASSETS.BY_ID(id)}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return true;
    } catch (error) {
      console.error('Error deleting asset:', error);
      throw error;
    }
  }
}

export const assetsService = AssetsService.getInstance();
