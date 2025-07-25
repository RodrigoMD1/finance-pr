import { SubscriptionPlan } from '../types/Subscription';

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Plan Gratuito',
    price: 0,
    currency: 'ARS',
    description: 'Perfecto para comenzar',
    features: [
      'Hasta 5 activos financieros',
      'Estadísticas básicas',
      'Acceso a noticias',
      'Soporte por email'
    ],
    maxAssets: 5,
    duration: 'monthly',
    color: 'bg-gray-100',
    icon: '🚀'
  },
  {
    id: 'basic',
    name: 'Plan Básico',
    price: 2990,
    currency: 'ARS',
    description: 'Para inversores ocasionales',
    features: [
      'Hasta 15 activos financieros',
      'Estadísticas avanzadas',
      'Alertas de precio',
      'Informes mensuales',
      'Soporte prioritario'
    ],
    maxAssets: 15,
    duration: 'monthly',
    color: 'bg-blue-50',
    icon: '📈'
  },
  {
    id: 'pro',
    name: 'Plan Pro',
    price: 5990,
    currency: 'ARS',
    description: 'Para inversores activos',
    features: [
      'Hasta 50 activos financieros',
      'Análisis técnico avanzado',
      'Alertas personalizadas',
      'Informes semanales',
      'API access',
      'Soporte 24/7'
    ],
    maxAssets: 50,
    duration: 'monthly',
    popular: true,
    color: 'bg-green-50',
    icon: '💎'
  },
  {
    id: 'premium',
    name: 'Plan Premium',
    price: 9990,
    currency: 'ARS',
    description: 'Para profesionales e instituciones',
    features: [
      'Activos ilimitados',
      'Análisis institucional',
      'Alertas en tiempo real',
      'Informes diarios',
      'API premium',
      'Gestor de cuenta dedicado',
      'Funciones de portfolio avanzadas'
    ],
    maxAssets: -1, // -1 significa ilimitado
    duration: 'monthly',
    color: 'bg-purple-50',
    icon: '👑'
  }
];

export const getFreePlan = (): SubscriptionPlan => SUBSCRIPTION_PLANS[0];

export const getPlanById = (planId: string): SubscriptionPlan | null => {
  return SUBSCRIPTION_PLANS.find(plan => plan.id === planId) || null;
};

export const getDefaultUserPlan = (): SubscriptionPlan => getFreePlan();
