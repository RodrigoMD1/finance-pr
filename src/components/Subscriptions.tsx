import React, { useState, useEffect } from 'react';
import { FaCheck, FaCrown, FaRocket, FaChartLine, FaGem, FaSpinner, FaCreditCard, FaTimes, FaLock, FaSignInAlt } from 'react-icons/fa';
import { realSubscriptionService } from '../services/realSubscriptionService';
import { SubscriptionPlan, UserSubscription, SubscriptionUsage } from '../types/Subscription';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export const Subscriptions: React.FC = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState<UserSubscription | null>(null);
  const [usage, setUsage] = useState<SubscriptionUsage | null>(null);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState<string | null>(null);
  
  // Verificar autenticación
  const isAuthenticated = !!localStorage.getItem('token');
  const userName = localStorage.getItem('userName');

  useEffect(() => {
    if (isAuthenticated) {
      loadSubscriptionData();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const loadSubscriptionData = async () => {
    try {
      setLoading(true);
      const [availablePlans, subscription, usageData] = await Promise.all([
  realSubscriptionService.getAvailablePlans(),
  realSubscriptionService.getCurrentSubscription(),
  realSubscriptionService.getSubscriptionUsage()
      ]);

      setPlans(availablePlans);
      setCurrentSubscription(subscription);
      setUsage(usageData);
    } catch (error) {
      console.error('Error loading subscription data:', error);
      toast.error('Error al cargar información de suscripciones');
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (plan: SubscriptionPlan) => {
    if (plan.id === 'free') {
      toast.success('Ya tienes acceso al plan gratuito');
      return;
    }

    if (currentSubscription?.plan.id === plan.id) {
      toast.success('Ya tienes este plan activo');
      return;
    }

    try {
      setProcessingPayment(plan.id);
      
  const paymentResponse = await realSubscriptionService.createPayment(plan.id);
      
      if (paymentResponse.success) {
        toast.success(paymentResponse.message);
        await loadSubscriptionData(); // Recargar datos
      } else {
        toast.error(paymentResponse.message);
      }
      
    } catch (error) {
      console.error('Error creating payment:', error);
      toast.error('Error al procesar el pago. Inténtalo de nuevo.');
    } finally {
      setProcessingPayment(null);
    }
  };

  const handleCancelSubscription = async () => {
    if (!currentSubscription || currentSubscription.plan.id === 'free') {
      return;
    }

    const confirmed = window.confirm('¿Estás seguro de que quieres cancelar tu suscripción?');
    if (!confirmed) return;

    try {
  const success = await realSubscriptionService.cancelSubscription();
      if (success) {
        toast.success('Suscripción cancelada exitosamente');
        await loadSubscriptionData();
      } else {
        toast.error('Error al cancelar la suscripción');
      }
    } catch (error) {
      console.error('Error canceling subscription:', error);
      toast.error('Error al cancelar la suscripción');
    }
  };

  const getPlanIcon = (icon: string) => {
    switch (icon) {
      case '🚀': return <FaRocket className="text-2xl" />;
      case '📈': return <FaChartLine className="text-2xl" />;
      case '💎': return <FaGem className="text-2xl" />;
      case '👑': return <FaCrown className="text-2xl" />;
      default: return <FaRocket className="text-2xl" />;
    }
  };

  const formatPrice = (price: number, currency: string) => {
    if (price === 0) return 'Gratis';
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: currency === 'ARS' ? 'ARS' : 'USD'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FaSpinner className="mx-auto mb-4 text-4xl animate-spin text-primary" />
          <p className="text-lg">Cargando planes de suscripción...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, mostrar mensaje de login
  if (!isAuthenticated) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="max-w-md mx-auto text-center">
          <div className="p-8 bg-white rounded-lg shadow-lg">
            <FaLock className="mx-auto mb-4 text-6xl text-gray-400" />
            <h2 className="mb-4 text-2xl font-bold text-gray-800">
              Acceso Restringido
            </h2>
            <p className="mb-6 text-gray-600">
              Para acceder a los planes de suscripción, necesitas iniciar sesión en tu cuenta.
            </p>
            <div className="space-y-3">
              <Link 
                to="/login" 
                className="flex items-center justify-center w-full px-6 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                <FaSignInAlt className="mr-2" />
                Iniciar Sesión
              </Link>
              <Link 
                to="/register" 
                className="flex items-center justify-center w-full px-6 py-3 text-blue-600 transition-colors border border-blue-600 rounded-lg hover:bg-blue-50"
              >
                Crear Cuenta
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Header */}
      <div className="mb-12 text-center">
        {userName && (
          <div className="mb-2 text-lg text-gray-600">
            ¡Hola, {userName}! 👋
          </div>
        )}
        <h1 className="mb-4 text-4xl font-bold">Planes de Suscripción</h1>
        <p className="text-xl text-gray-600">
          Elige el plan perfecto para tus necesidades de inversión
        </p>
        
        {/* Botón de desarrollo eliminado en modo real */}
      </div>

      {/* Current Subscription Status */}
      {currentSubscription && usage && (
        <div className="p-6 mb-8 border border-gray-200 card bg-base-100">
          <div className="card-body">
            <h2 className="text-2xl font-bold card-title">Tu Plan Actual</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="stat">
                <div className="stat-title">Plan Activo</div>
                <div className="stat-value text-primary">{currentSubscription.plan.name}</div>
                <div className="stat-desc">
                  Estado: <span className="capitalize">{currentSubscription.status}</span>
                </div>
              </div>
              <div className="stat">
                <div className="stat-title">Activos Utilizados</div>
                <div className="stat-value">{usage.currentAssets} / {usage.maxAssets === -1 ? '∞' : usage.maxAssets}</div>
                <div className="stat-desc">
                  {usage.maxAssets === -1 ? 'Ilimitados' : `${usage.assetsRemaining} disponibles`}
                </div>
              </div>
              <div className="stat">
                <div className="stat-title">Renovación</div>
                <div className="stat-value text-sm">
                  {new Date(currentSubscription.endDate).toLocaleDateString()}
                </div>
                <div className="stat-desc">
                  {currentSubscription.autoRenew ? 'Automática' : 'Manual'}
                </div>
              </div>
            </div>
            {currentSubscription.plan.id !== 'free' && (
              <div className="mt-4 card-actions">
                <button 
                  className="btn btn-error btn-sm"
                  onClick={handleCancelSubscription}
                >
                  <FaTimes className="mr-2" />
                  Cancelar Suscripción
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <div 
            key={plan.id}
            className={`card ${plan.popular ? 'border-2 border-primary' : 'border border-gray-200'} bg-base-100 shadow-xl relative`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 px-3 py-1 text-xs font-bold text-white transform translate-x-2 -translate-y-2 bg-primary rounded-full">
                Más Popular
              </div>
            )}
            
            <div className="card-body">
              <div className="flex items-center mb-4">
                <div className="mr-3 text-primary">
                  {getPlanIcon(plan.icon)}
                </div>
                <h3 className="text-xl font-bold card-title">{plan.name}</h3>
              </div>
              
              <div className="mb-4">
                <div className="text-3xl font-bold text-primary">
                  {formatPrice(plan.price, plan.currency)}
                </div>
                <div className="text-sm text-gray-500">
                  {plan.price > 0 ? `/${plan.duration === 'monthly' ? 'mes' : 'año'}` : ''}
                </div>
              </div>
              
              <p className="mb-6 text-gray-600">{plan.description}</p>
              
              <div className="mb-6">
                <h4 className="mb-3 font-semibold">Características:</h4>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <FaCheck className="mr-2 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-auto card-actions">
                {currentSubscription?.plan.id === plan.id ? (
                  <button className="w-full btn btn-success" disabled>
                    <FaCheck className="mr-2" />
                    Plan Actual
                  </button>
                ) : (
                  <button 
                    className={`btn w-full ${plan.popular ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => handleSubscribe(plan)}
                    disabled={processingPayment === plan.id}
                  >
                    {processingPayment === plan.id ? (
                      <>
                        <FaSpinner className="mr-2 animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      <>
                        <FaCreditCard className="mr-2" />
                        {plan.price === 0 ? 'Activar' : 'Suscribirse'}
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="mb-8 text-3xl font-bold text-center">Preguntas Frecuentes</h2>
        <div className="max-w-3xl mx-auto">
          <div className="join join-vertical w-full">
            <div className="collapse collapse-arrow join-item border border-base-300">
              <input type="radio" name="faq-accordion" defaultChecked />
              <div className="collapse-title text-xl font-medium">
                ¿Puedo cambiar mi plan en cualquier momento?
              </div>
              <div className="collapse-content">
                <p>Sí, puedes actualizar o degradar tu plan en cualquier momento. Los cambios se aplicarán inmediatamente y se ajustará la facturación proporcionalmente.</p>
              </div>
            </div>
            
            <div className="collapse collapse-arrow join-item border border-base-300">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-xl font-medium">
                ¿Qué sucede si cancelo mi suscripción?
              </div>
              <div className="collapse-content">
                <p>Si cancelas tu suscripción, mantendrás acceso a las funciones premium hasta el final del período de facturación actual. Después, tu cuenta volverá automáticamente al plan gratuito.</p>
              </div>
            </div>
            
            <div className="collapse collapse-arrow join-item border border-base-300">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-xl font-medium">
                ¿Cómo funciona el límite de activos?
              </div>
              <div className="collapse-content">
                <p>Cada plan tiene un límite máximo de activos financieros que puedes agregar a tu portfolio. Si alcanzas el límite, necesitarás actualizar tu plan o eliminar algunos activos existentes para agregar nuevos.</p>
              </div>
            </div>
            
            <div className="collapse collapse-arrow join-item border border-base-300">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-xl font-medium">
                ¿Hay garantía de devolución de dinero?
              </div>
              <div className="collapse-content">
                <p>Ofrecemos una garantía de devolución del 100% durante los primeros 30 días de tu suscripción. Si no estás satisfecho, contacta nuestro soporte para obtener un reembolso completo.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
