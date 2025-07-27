/**
 * Servicio para gestionar la persistencia y sincronización de datos del usuario
 * Resuelve problemas de consistencia entre diferentes componentes
 */

export class DataService {
  private static instance: DataService;

  static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  /**
   * Inicializa y sincroniza todos los datos del usuario
   */
  async initializeUserData(userId: string): Promise<void> {
    try {
      // 1. Migrar datos generales a específicos del usuario si existen
      await this.migrateGeneralData(userId);
      
      // 2. Asegurar que la suscripción esté correctamente inicializada
      await this.ensureSubscriptionExists(userId);
      
      // 3. Validar consistencia de datos
      await this.validateDataConsistency(userId);
      
      console.log('User data initialized successfully for:', userId);
    } catch (error) {
      console.error('Error initializing user data:', error);
    }
  }

  /**
   * Migra datos generales del localStorage a datos específicos del usuario
   */
  private async migrateGeneralData(userId: string): Promise<void> {
    const userPortfolioKey = `portfolio_${userId}`;
    
    // Verificar si ya existen datos específicos del usuario
    const existingUserData = localStorage.getItem(userPortfolioKey);
    if (existingUserData) {
      return; // Ya migrado
    }

    // Migrar datos generales si existen
    const generalPortfolio = localStorage.getItem('portfolio');
    if (generalPortfolio) {
      try {
        const portfolio = JSON.parse(generalPortfolio);
        if (Array.isArray(portfolio) && portfolio.length > 0) {
          localStorage.setItem(userPortfolioKey, JSON.stringify(portfolio));
          console.log(`Migrated ${portfolio.length} portfolio items for user ${userId}`);
        }
      } catch (error) {
        console.error('Error migrating portfolio data:', error);
      }
    }
  }

  /**
   * Asegura que la suscripción del usuario esté correctamente configurada
   */
  private async ensureSubscriptionExists(userId: string): Promise<void> {
    const subscriptionKey = 'userSubscription';
    const existingSubscription = localStorage.getItem(subscriptionKey);
    
    if (!existingSubscription) {
      // Crear suscripción gratuita por defecto
      const freePlan = {
        id: 'free',
        name: 'Plan Gratuito',
        description: 'Plan básico gratuito',
        price: 0,
        maxAssets: 5,
        features: ['Hasta 5 activos', 'Estadísticas básicas']
      };

      const subscription = {
        id: `free-${userId}`,
        userId,
        planId: 'free',
        plan: freePlan,
        status: 'active',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 año
        autoRenew: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      localStorage.setItem(subscriptionKey, JSON.stringify(subscription));
      console.log('Created default free subscription for user:', userId);
    } else {
      // Validar y actualizar suscripción existente
      try {
        const subscription = JSON.parse(existingSubscription);
        if (subscription.userId !== userId) {
          // La suscripción es de otro usuario, actualizar userId
          subscription.userId = userId;
          subscription.updatedAt = new Date().toISOString();
          localStorage.setItem(subscriptionKey, JSON.stringify(subscription));
          console.log('Updated subscription userId:', userId);
        }
      } catch (error) {
        console.error('Error validating subscription:', error);
      }
    }
  }

  /**
   * Valida la consistencia entre todos los datos del usuario
   */
  private async validateDataConsistency(userId: string): Promise<void> {
    try {
      // Obtener portfolio y suscripción
      const portfolioKey = `portfolio_${userId}`;
      const portfolioData = localStorage.getItem(portfolioKey);
      const subscriptionData = localStorage.getItem('userSubscription');

      if (portfolioData && subscriptionData) {
        const portfolio = JSON.parse(portfolioData);
        const subscription = JSON.parse(subscriptionData);

        // Verificar que el portfolio no exceda los límites de la suscripción
        if (Array.isArray(portfolio) && subscription.plan?.maxAssets !== -1) {
          const maxAssets = subscription.plan?.maxAssets || 5;
          if (portfolio.length > maxAssets) {
            console.warn(`Portfolio has ${portfolio.length} assets but plan allows ${maxAssets}`);
            // Opcionalmente, truncar el portfolio o sugerir upgrade
          }
        }
      }
    } catch (error) {
      console.error('Error validating data consistency:', error);
    }
  }

  /**
   * Limpia datos obsoletos o corruptos
   */
  async cleanupObsoleteData(): Promise<void> {
    try {
      // Limpiar datos generales después de migración
      const userId = localStorage.getItem('userId');
      if (userId) {
        const userPortfolioKey = `portfolio_${userId}`;
        const userPortfolio = localStorage.getItem(userPortfolioKey);
        
        if (userPortfolio) {
          // Si hay datos específicos del usuario, limpiar datos generales
          localStorage.removeItem('portfolio');
          console.log('Cleaned up general portfolio data');
        }
      }
    } catch (error) {
      console.error('Error cleaning up data:', error);
    }
  }

  /**
   * Obtiene un resumen del estado actual de los datos del usuario
   */
  async getDataSummary(userId: string): Promise<{
    portfolioItems: number;
    subscriptionPlan: string;
    dataIntegrity: boolean;
  }> {
    try {
      const portfolioKey = `portfolio_${userId}`;
      const portfolioData = localStorage.getItem(portfolioKey);
      const subscriptionData = localStorage.getItem('userSubscription');

      const portfolio = portfolioData ? JSON.parse(portfolioData) : [];
      const subscription = subscriptionData ? JSON.parse(subscriptionData) : null;

      return {
        portfolioItems: Array.isArray(portfolio) ? portfolio.length : 0,
        subscriptionPlan: subscription?.plan?.name || 'Unknown',
        dataIntegrity: !!(portfolioData && subscriptionData)
      };
    } catch (error) {
      console.error('Error getting data summary:', error);
      return {
        portfolioItems: 0,
        subscriptionPlan: 'Error',
        dataIntegrity: false
      };
    }
  }
}

export const dataService = DataService.getInstance();
