// Archivo: src/services/realSubscriptionService.ts
// Este reemplazará al localSubscriptionService cuando esté listo

import { SubscriptionPlan, UserSubscription, SubscriptionUsage, PaymentHistory } from '../types/Subscription';
import { SUBSCRIPTION_PLANS, getFreePlan, getPlanById } from '../data/subscriptionPlans';
import { API_BASE_URL } from './api';
import toast from 'react-hot-toast';

// API_BASE_URL centralizado en services/api.ts

class RealSubscriptionService {
  private getHeaders(): HeadersInit {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  // Obtener/crear preapproval_plan_id desde el backend
  async getPreapprovalPlanId(): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/payments/preapproval-plan/id`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) {
      throw new Error('No se pudo obtener el preapproval_plan_id');
    }
    const data = await response.json();
    return data.id || data.preapproval_plan_id || data.preapprovalPlanId;
  }

  // Autorizar suscripción recurrente con card_token_id
  async authorizePreapproval(preapprovalPlanId: string, cardTokenId: string): Promise<{ status: string }>
  {
    const response = await fetch(`${API_BASE_URL}/payments/preapproval/authorize`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ preapproval_plan_id: preapprovalPlanId, card_token_id: cardTokenId })
    });
    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(text || 'No se pudo autorizar la suscripción');
    }
    return response.json();
  }

  // Cancelar suscripción recurrente (preapproval)
  async cancelPreapproval(): Promise<boolean> {
    const response = await fetch(`${API_BASE_URL}/payments/preapproval/cancel`, {
      method: 'POST',
      headers: this.getHeaders(),
    });
    return response.ok;
  }

  // Obtener todos los planes disponibles
  getAvailablePlans(): SubscriptionPlan[] {
    return SUBSCRIPTION_PLANS;
  }

  // Obtener suscripción actual del usuario
  async getCurrentSubscription(): Promise<UserSubscription | null> {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Sin token, retornar plan free sin hacer petición
        const free = getFreePlan();
        const now = new Date();
        return {
          id: 'free-default',
          userId: localStorage.getItem('userId') || '',
          planId: free.id,
          plan: free,
          status: 'active',
          startDate: now,
          endDate: new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()),
          autoRenew: false,
          createdAt: now,
          updatedAt: now
        } as UserSubscription;
      }

      const response = await fetch(`${API_BASE_URL}/subscriptions/current`, {
        headers: this.getHeaders()
      });

      if (!response.ok) {
        if (response.status === 401) {
          // No autenticado, no mostrar error
          console.warn('Usuario no autenticado');
          return null;
        }
        if (response.status === 404) {
          // Usuario sin suscripción: free
          const free = getFreePlan();
          const now = new Date();
          return {
            id: 'free-default',
            userId: localStorage.getItem('userId') || '',
            planId: free.id,
            plan: free,
            status: 'active',
            startDate: now,
            endDate: new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()),
            autoRenew: false,
            createdAt: now,
            updatedAt: now
          } as UserSubscription;
        }
        throw new Error('Error al obtener suscripción');
      }

      const raw = await response.json();
      // Backend puede devolver { id, type, status, startDate, endDate, ... }
      const backendType: string = (raw.type || raw.planId || '').toString().toLowerCase();
      const mapType = (t: string): string => {
        if (t === 'basic') return 'basic';
        if (t === 'pro') return 'pro';
        if (t === 'premium' || t === 'enterprise') return 'premium';
        if (t === 'free') return 'free';
        return 'free';
      };
      const planId = mapType(backendType);
      const plan = getPlanById(planId) || getFreePlan();

      return {
        id: raw.id || `sub_${Date.now()}`,
        userId: raw.userId || localStorage.getItem('userId') || '',
        planId: plan.id,
        plan,
  status: (typeof raw.status === 'string' ? raw.status : 'active'),
        startDate: raw.startDate ? new Date(raw.startDate) : new Date(),
        endDate: raw.endDate ? new Date(raw.endDate) : new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()),
        autoRenew: raw.autoRenew ?? true,
        createdAt: raw.createdAt ? new Date(raw.createdAt) : new Date(),
        updatedAt: raw.updatedAt ? new Date(raw.updatedAt) : new Date()
      } as UserSubscription;
    } catch (error) {
      console.error('Error fetching subscription:', error);
      toast.error('Error al cargar suscripción');
      // fallback a free
      const free = getFreePlan();
      const now = new Date();
      return {
        id: 'free-default',
        userId: localStorage.getItem('userId') || '',
        planId: free.id,
        plan: free,
        status: 'active',
        startDate: now,
        endDate: new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()),
        autoRenew: false,
        createdAt: now,
        updatedAt: now
      } as UserSubscription;
    }
  }

  // Obtener uso actual de la suscripción
  async getSubscriptionUsage(): Promise<SubscriptionUsage> {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Sin token, retornar uso free sin hacer petición
        const plan = getFreePlan();
        return {
          userId: localStorage.getItem('userId') || '',
          currentAssets: 0,
          maxAssets: plan.maxAssets,
          plan,
          canAddAsset: true,
          assetsRemaining: plan.maxAssets === -1 ? 999 : plan.maxAssets
        } as SubscriptionUsage;
      }

      const response = await fetch(`${API_BASE_URL}/subscriptions/usage`, {
        headers: this.getHeaders()
      });

      // Conseguir el plan actual para mapear límites/nombre
      const current = await this.getCurrentSubscription();
      const plan = current?.plan || getFreePlan();

      if (!response.ok) {
        if (response.status === 401) {
          // No autenticado, no hacer más peticiones
          console.warn('Usuario no autenticado');
          return {
            userId: localStorage.getItem('userId') || '',
            currentAssets: 0,
            maxAssets: plan.maxAssets,
            plan,
            canAddAsset: true,
            assetsRemaining: plan.maxAssets === -1 ? 999 : plan.maxAssets
          } as SubscriptionUsage;
        }
        
        // Mapear a partir del plan si la API no responde
        const currentAssets = await this.estimateCurrentAssets();
        const canAddAsset = plan.maxAssets === -1 || currentAssets < plan.maxAssets;
        return {
          userId: localStorage.getItem('userId') || '',
          currentAssets,
          maxAssets: plan.maxAssets,
          plan,
          canAddAsset,
          assetsRemaining: plan.maxAssets === -1 ? 999 : Math.max(0, plan.maxAssets - currentAssets)
        } as SubscriptionUsage;
      }

      const raw = await response.json();
      // La API puede devolver { currentUsage, limit, ... } o { currentAssets, maxAssets }
      const currentAssets: number = raw.currentAssets ?? raw.currentUsage ?? 0;
      const maxAssetsFromApi: number | undefined = raw.maxAssets ?? raw.limit;
      const maxAssets = typeof maxAssetsFromApi === 'number' ? maxAssetsFromApi : plan.maxAssets;
      const canAddAsset = maxAssets === -1 || currentAssets < maxAssets;
      return {
        userId: localStorage.getItem('userId') || '',
        currentAssets,
        maxAssets,
        plan,
        canAddAsset,
        assetsRemaining: maxAssets === -1 ? 999 : Math.max(0, maxAssets - currentAssets)
      } as SubscriptionUsage;
    } catch (error) {
      console.error('Error fetching subscription usage:', error);
      // Fallback a plan gratuito + conteo estimado
      const plan = getFreePlan();
      const currentAssets = await this.estimateCurrentAssets();
      return {
        userId: localStorage.getItem('userId') || '',
        currentAssets,
        maxAssets: plan.maxAssets,
        plan,
        canAddAsset: plan.maxAssets === -1 || currentAssets < plan.maxAssets,
        assetsRemaining: plan.maxAssets === -1 ? 999 : Math.max(0, plan.maxAssets - currentAssets)
      } as SubscriptionUsage;
    }
  }

  private async estimateCurrentAssets(): Promise<number> {
    try {
      // Intentar llamar a /portfolio y contar
      const res = await fetch(`${API_BASE_URL}/portfolio`, { headers: this.getHeaders() });
      if (res.ok) {
        const data = await res.json();
        return Array.isArray(data) ? data.length : (Array.isArray(data?.items) ? data.items.length : 0);
      }
    } catch {
      // ignore
    }
    return 0;
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

      const successUrl = `${window.location.origin}/payment/success`;
      const failureUrl = `${window.location.origin}/payment/failure`;
      const pendingUrl = `${window.location.origin}/payment/failure?status=pending`;

      const response = await fetch(`${API_BASE_URL}/payments/create`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          planId,
          userId,
          email: userEmail,
          firstName: userName?.split(' ')[0] || 'Usuario',
          lastName: userName?.split(' ').slice(1).join(' ') || '',
          successUrl,
          failureUrl,
          pendingUrl
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
        // Redirigir en la misma pestaña para asegurar retorno a /payment/success|failure
        window.location.href = result.init_point;
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
