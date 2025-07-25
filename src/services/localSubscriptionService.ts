import { SubscriptionPlan, UserSubscription, SubscriptionUsage, PaymentHistory } from '../types/Subscription';
import { SUBSCRIPTION_PLANS, getFreePlan } from '../data/subscriptionPlans';
import toast from 'react-hot-toast';

class LocalSubscriptionService {
  private readonly STORAGE_KEYS = {
    SUBSCRIPTION: 'userSubscription',
    PAYMENT_HISTORY: 'paymentHistory'
  };

  // Obtener todos los planes disponibles
  getAvailablePlans(): SubscriptionPlan[] {
    return SUBSCRIPTION_PLANS;
  }

  // Obtener suscripción actual del usuario (desde localStorage)
  async getCurrentSubscription(): Promise<UserSubscription | null> {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEYS.SUBSCRIPTION);
      if (stored) {
        const subscription = JSON.parse(stored);
        // Verificar si la suscripción ha expirado
        if (new Date(subscription.endDate) > new Date()) {
          return subscription;
        } else {
          // Suscripción expirada, cambiar a plan gratuito
          return this.createFreeSubscription();
        }
      }
      return this.createFreeSubscription();
    } catch (error) {
      console.error('Error getting subscription:', error);
      return this.createFreeSubscription();
    }
  }

  // Crear suscripción gratuita por defecto
  private createFreeSubscription(): UserSubscription {
    const freePlan = getFreePlan();
    const now = new Date();
    const subscription: UserSubscription = {
      id: 'free-default',
      userId: localStorage.getItem('userId') || '',
      planId: freePlan.id,
      plan: freePlan,
      status: 'active',
      startDate: now,
      endDate: new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()),
      autoRenew: false,
      createdAt: now,
      updatedAt: now
    };
    
    localStorage.setItem(this.STORAGE_KEYS.SUBSCRIPTION, JSON.stringify(subscription));
    return subscription;
  }

  // Obtener uso actual de la suscripción
  async getSubscriptionUsage(): Promise<SubscriptionUsage> {
    try {
      const subscription = await this.getCurrentSubscription();
      const currentAssets = await this.getCurrentAssetsCount();
      
      if (!subscription) {
        const freePlan = getFreePlan();
        return {
          userId: localStorage.getItem('userId') || '',
          currentAssets,
          maxAssets: freePlan.maxAssets,
          plan: freePlan,
          canAddAsset: currentAssets < freePlan.maxAssets,
          assetsRemaining: freePlan.maxAssets - currentAssets
        };
      }

      const canAddAsset = subscription.plan.maxAssets === -1 || currentAssets < subscription.plan.maxAssets;
      const assetsRemaining = subscription.plan.maxAssets === -1 ? 999 : subscription.plan.maxAssets - currentAssets;

      return {
        userId: subscription.userId,
        currentAssets,
        maxAssets: subscription.plan.maxAssets,
        plan: subscription.plan,
        canAddAsset,
        assetsRemaining: Math.max(0, assetsRemaining)
      };
    } catch (error) {
      console.error('Error getting subscription usage:', error);
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

      // También verificar si hay datos del usuario actual
      const userId = localStorage.getItem('userId');
      if (userId) {
        // Simular conteo de activos basado en portfolio del usuario
        const userPortfolioKey = `portfolio_${userId}`;
        const userPortfolio = localStorage.getItem(userPortfolioKey);
        if (userPortfolio) {
          const portfolio = JSON.parse(userPortfolio);
          return Array.isArray(portfolio) ? portfolio.length : 0;
        }
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

  // Simular creación de pago (versión demo)
  async createPayment(planId: string): Promise<{ success: boolean; message: string }> {
    try {
      const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
      if (!plan) {
        throw new Error('Plan no encontrado');
      }

      // Simular delay de procesamiento
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (plan.id === 'free') {
        // Activar plan gratuito inmediatamente
        await this.activateSubscription(plan);
        return {
          success: true,
          message: 'Plan gratuito activado'
        };
      }

      // Para planes pagos, simular pago exitoso
      const shouldSucceed = Math.random() > 0.2; // 80% de éxito simulado

      if (shouldSucceed) {
        await this.activateSubscription(plan);
        
        // Guardar en historial de pagos
        this.savePaymentHistory({
          id: Date.now().toString(),
          planId: plan.id,
          planName: plan.name,
          amount: plan.price,
          currency: plan.currency,
          status: 'completed',
          date: new Date(),
          method: 'Demo Payment'
        });

        return {
          success: true,
          message: `¡${plan.name} activado exitosamente!`
        };
      } else {
        return {
          success: false,
          message: 'Error en el procesamiento del pago (simulado)'
        };
      }
    } catch (error) {
      console.error('Error creating payment:', error);
      return {
        success: false,
        message: 'Error al procesar el pago'
      };
    }
  }

  // Activar suscripción
  private async activateSubscription(plan: SubscriptionPlan): Promise<void> {
    const now = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + (plan.duration === 'yearly' ? 12 : 1));

    const subscription: UserSubscription = {
      id: `sub_${Date.now()}`,
      userId: localStorage.getItem('userId') || '',
      planId: plan.id,
      plan: plan,
      status: 'active',
      startDate: now,
      endDate: endDate,
      autoRenew: true,
      createdAt: now,
      updatedAt: now
    };

    localStorage.setItem(this.STORAGE_KEYS.SUBSCRIPTION, JSON.stringify(subscription));
    toast.success(`¡${plan.name} activado exitosamente!`);
  }

  // Guardar historial de pagos
  private savePaymentHistory(payment: PaymentHistory): void {
    try {
      const history = this.getPaymentHistory();
      history.unshift(payment);
      localStorage.setItem(this.STORAGE_KEYS.PAYMENT_HISTORY, JSON.stringify(history));
    } catch (error) {
      console.error('Error saving payment history:', error);
    }
  }

  // Obtener historial de pagos
  getPaymentHistory(): PaymentHistory[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEYS.PAYMENT_HISTORY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error getting payment history:', error);
      return [];
    }
  }

  // Cancelar suscripción
  async cancelSubscription(): Promise<boolean> {
    try {
      const subscription = await this.getCurrentSubscription();
      if (subscription && subscription.plan.id !== 'free') {
        // Cambiar a plan gratuito
        const freeSubscription = this.createFreeSubscription();
        localStorage.setItem(this.STORAGE_KEYS.SUBSCRIPTION, JSON.stringify(freeSubscription));
        toast.success('Suscripción cancelada. Has vuelto al plan gratuito.');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error canceling subscription:', error);
      return false;
    }
  }

  // Limpiar datos (para testing)
  clearAllData(): void {
    localStorage.removeItem(this.STORAGE_KEYS.SUBSCRIPTION);
    localStorage.removeItem(this.STORAGE_KEYS.PAYMENT_HISTORY);
    toast.success('Datos de suscripción limpiados');
  }
}

export const localSubscriptionService = new LocalSubscriptionService();
