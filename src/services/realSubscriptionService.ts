// Archivo: src/services/realSubscriptionService.ts
// Este reemplazará al localSubscriptionService cuando esté listo

import { SubscriptionPlan, UserSubscription, SubscriptionUsage, PaymentHistory } from '../types/Subscription';
import { SUBSCRIPTION_PLANS } from '../data/subscriptionPlans';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class RealSubscriptionService {
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
        throw new Error('Error al obtener suscripción');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching subscription:', error);
      toast.error('Error al cargar suscripción');
      return null;
    }
  }

  // Obtener uso actual de la suscripción
  async getSubscriptionUsage(): Promise<SubscriptionUsage> {
    try {
      const response = await fetch(`${API_BASE_URL}/subscriptions/usage`, {
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error('Error al obtener uso de suscripción');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching subscription usage:', error);
      toast.error('Error al cargar límites');
      throw error;
    }
  }

  // Verificar si el usuario puede agregar un nuevo activo
  async canAddAsset(): Promise<boolean> {
    try {
      const usage = await this.getSubscriptionUsage();
      return usage.canAddAsset;
    } catch (error) {
      console.error('Error checking asset limit:', error);
      return false;
    }
  }

  // Crear pago con MercadoPago (usando el backend real)
  async createPayment(planId: string): Promise<{ success: boolean; message: string; init_point?: string }> {
    try {
      const userId = localStorage.getItem('userId');
      const userEmail = localStorage.getItem('userEmail');
      const userName = localStorage.getItem('userName');

      if (!userId || !userEmail) {
        throw new Error('Usuario no autenticado');
      }

      const response = await fetch(`${API_BASE_URL}/payments/create`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          planId,
          userId,
          email: userEmail,
          firstName: userName?.split(' ')[0] || 'Usuario',
          lastName: userName?.split(' ').slice(1).join(' ') || ''
        })
      });

      if (!response.ok) {
        throw new Error('Error al crear el pago');
      }

      const result = await response.json();
      
      if (planId === 'free') {
        return {
          success: true,
          message: 'Plan gratuito activado'
        };
      }

      // Para planes pagos, redirigir a MercadoPago
      if (result.init_point) {
        window.open(result.init_point, '_blank');
        return {
          success: true,
          message: 'Redirigiendo a MercadoPago...',
          init_point: result.init_point
        };
      }

      return {
        success: true,
        message: 'Pago procesado exitosamente'
      };

    } catch (error) {
      console.error('Error creating payment:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error al procesar el pago'
      };
    }
  }

  // Cancelar suscripción
  async cancelSubscription(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/subscriptions/cancel`, {
        method: 'POST',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error('Error al cancelar suscripción');
      }

      toast.success('Suscripción cancelada exitosamente');
      return true;
    } catch (error) {
      console.error('Error canceling subscription:', error);
      toast.error('Error al cancelar suscripción');
      return false;
    }
  }

  // Obtener historial de pagos
  async getPaymentHistory(): Promise<PaymentHistory[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/payments/history`, {
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error('Error al obtener historial');
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting payment history:', error);
      return [];
    }
  }
}

export const realSubscriptionService = new RealSubscriptionService();
