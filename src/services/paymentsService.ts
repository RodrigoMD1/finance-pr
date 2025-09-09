import { API_CONFIG } from '../config/api';

export interface PaymentRequest {
  subscriptionType: 'basic' | 'premium' | 'enterprise';
  amount: number;
  currency: 'ARS' | 'USD';
}

export interface PaymentResponse {
  paymentId: string;
  checkoutUrl: string;
  qrCode: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
}

export interface PaymentHistoryItem {
  id: string;
  userId: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  mercadoPagoId: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentHistoryResponse {
  payments: PaymentHistoryItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

class PaymentsService {
  private static instance: PaymentsService;
  private baseUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PAYMENTS.CREATE}`;

  constructor() {
    console.log('🏗️ PaymentsService initialized with baseUrl:', this.baseUrl);
  }

  static getInstance(): PaymentsService {
    if (!PaymentsService.instance) {
      PaymentsService.instance = new PaymentsService();
    }
    return PaymentsService.instance;
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  // Crear pago con MercadoPago
  async createPayment(paymentData: PaymentRequest): Promise<PaymentResponse> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PAYMENTS.CREATE}`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(paymentData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
      }

      const paymentInfo = await response.json();
      
      // Si el pago se creó correctamente, redirigir al checkout
      if (paymentInfo.checkoutUrl) {
        console.log('💳 Redirigiendo a MercadoPago:', paymentInfo.checkoutUrl);
      }

      return paymentInfo;
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
  }

  // Obtener historial de pagos
  async getPaymentHistory(page: number = 1, limit: number = 10, status?: string): Promise<PaymentHistoryResponse> {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(status && { status })
      });

      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PAYMENTS.HISTORY}?${queryParams}`, {
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting payment history:', error);
      throw error;
    }
  }

  // Redirigir al checkout de MercadoPago
  redirectToCheckout(checkoutUrl: string): void {
    try {
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Error redirecting to checkout:', error);
      // Fallback: abrir en nueva ventana
      window.open(checkoutUrl, '_blank');
    }
  }

  // Verificar estado de pago (puede ser útil para polling)
  async checkPaymentStatus(paymentId: string): Promise<{ status: string }> {
    try {
      // Este endpoint no está documentado pero podría ser útil
      const response = await fetch(`${API_CONFIG.BASE_URL}/payments/${paymentId}/status`, {
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error checking payment status:', error);
      throw error;
    }
  }
}

export const paymentsService = PaymentsService.getInstance();
