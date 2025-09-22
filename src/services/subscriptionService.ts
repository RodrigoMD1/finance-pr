import { SubscriptionPlan, UserSubscription, PaymentRequest, PaymentResponse, SubscriptionUsage } from '../types/Subscription';
import { SUBSCRIPTION_PLANS, getFreePlan } from '../data/subscriptionPlans';
import { API_BASE_URL } from './api';

class SubscriptionService {
  private getHeaders(): HeadersInit {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  // Obtener todos los planes disponibles
  getAvailablePlans(): SubscriptionPlan[] {
    return SUBSCRIPTION_PLANS;
  }

  // Obtener suscripción actual del usuario
  async getCurrentSubscription(): Promise<UserSubscription | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/subscriptions/current`, {
        headers: this.getHeaders()
      });

      if (!response.ok) {
        if (response.status === 404) {
          // Usuario no tiene suscripción, devolver plan gratuito
          return this.createFreeSubscription();
        }
        throw new Error('Error al obtener suscripción');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching subscription:', error);
      // En caso de error, devolver plan gratuito
      return this.createFreeSubscription();
    }
  }

  // Crear suscripción gratuita por defecto
  private createFreeSubscription(): UserSubscription {
    const freePlan = getFreePlan();
    const now = new Date();
    return {
      id: 'free-default',
      userId: localStorage.getItem('userId') || '',
      planId: freePlan.id,
      plan: freePlan,
      status: 'active',
      startDate: now,
      endDate: new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()), // 1 año
      autoRenew: false,
      createdAt: now,
      updatedAt: now
    };
  }

  // Obtener uso actual de la suscripción
  async getSubscriptionUsage(): Promise<SubscriptionUsage> {
    try {
      const response = await fetch(`${API_BASE_URL}/subscriptions/usage`, {
        headers: this.getHeaders()
      });

      if (!response.ok) {
        // Si no hay información, usar valores por defecto del plan gratuito
        const freePlan = getFreePlan();
        const currentAssets = await this.getCurrentAssetsCount();
        return {
          userId: localStorage.getItem('userId') || '',
          currentAssets,
          maxAssets: freePlan.maxAssets,
          plan: freePlan,
          canAddAsset: currentAssets < freePlan.maxAssets,
          assetsRemaining: freePlan.maxAssets - currentAssets
        };
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching subscription usage:', error);
      const freePlan = getFreePlan();
      const currentAssets = await this.getCurrentAssetsCount();
      return {
        userId: localStorage.getItem('userId') || '',
        currentAssets,
        maxAssets: freePlan.maxAssets,
        plan: freePlan,
        canAddAsset: currentAssets < freePlan.maxAssets,
        assetsRemaining: freePlan.maxAssets - currentAssets
      };
    }
  }

  // Obtener cantidad actual de activos del usuario
  private async getCurrentAssetsCount(): Promise<number> {
    try {
      const portfolioData = localStorage.getItem('portfolio');
      if (portfolioData) {
        const portfolio = JSON.parse(portfolioData);
        return Array.isArray(portfolio) ? portfolio.length : 0;
      }
      return 0;
    } catch (error) {
      console.error('Error getting assets count:', error);
      return 0;
    }
  }

  // Verificar si el usuario puede agregar un nuevo activo
  async canAddAsset(): Promise<boolean> {
    const usage = await this.getSubscriptionUsage();
    return usage.canAddAsset;
  }

  // Crear pago con MercadoPago
  async createPayment(paymentRequest: PaymentRequest): Promise<PaymentResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/payments/create`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(paymentRequest)
      });

      if (!response.ok) {
        throw new Error('Error al crear el pago');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
  }

  // Verificar estado del pago
  async checkPaymentStatus(paymentId: string): Promise<{ status: string; subscription?: UserSubscription }> {
    try {
      const response = await fetch(`${API_BASE_URL}/payments/status/${paymentId}`, {
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error('Error al verificar estado del pago');
      }

      return await response.json();
    } catch (error) {
      console.error('Error checking payment status:', error);
      throw error;
    }
  }

  // Cancelar suscripción
  async cancelSubscription(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/subscriptions/cancel`, {
        method: 'POST',
        headers: this.getHeaders()
      });

      return response.ok;
    } catch (error) {
      console.error('Error canceling subscription:', error);
      return false;
    }
  }

  // Actualizar método de pago
  async updatePaymentMethod(paymentMethodId: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/subscriptions/payment-method`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify({ paymentMethodId })
      });

      return response.ok;
    } catch (error) {
      console.error('Error updating payment method:', error);
      return false;
    }
  }

  // Reactivar suscripción
  async reactivateSubscription(planId: string): Promise<PaymentResponse> {
    const userId = localStorage.getItem('userId') || '';
    const userEmail = localStorage.getItem('userEmail') || '';
    
    return this.createPayment({
      planId,
      userId,
      email: userEmail
    });
  }
}

export const subscriptionService = new SubscriptionService();
