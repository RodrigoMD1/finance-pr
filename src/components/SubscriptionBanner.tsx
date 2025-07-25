import React from 'react';
import { FaCrown, FaLock, FaArrowUp } from 'react-icons/fa';
import { SubscriptionUsage } from '../types/Subscription';
import { Link } from 'react-router-dom';

interface SubscriptionBannerProps {
  usage: SubscriptionUsage;
}

export const SubscriptionBanner: React.FC<SubscriptionBannerProps> = ({ usage }) => {
  const isNearLimit = usage.maxAssets !== -1 && usage.assetsRemaining <= 2;
  const isAtLimit = usage.maxAssets !== -1 && usage.assetsRemaining <= 0;

  if (usage.plan.id === 'premium') {
    return (
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaCrown className="text-2xl" />
            <div>
              <h3 className="font-bold">Plan Premium Activo</h3>
              <p className="text-sm opacity-90">Tienes acceso completo a todas las funciones</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold">∞</div>
            <div className="text-xs">Activos ilimitados</div>
          </div>
        </div>
      </div>
    );
  }

  if (isAtLimit) {
    return (
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 rounded-lg mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaLock className="text-2xl" />
            <div>
              <h3 className="font-bold">¡Límite Alcanzado!</h3>
              <p className="text-sm opacity-90">Has usado todos tus activos disponibles</p>
            </div>
          </div>
          <Link to="/subscriptions" className="btn btn-sm bg-white text-red-500 hover:bg-gray-100">
            <FaArrowUp className="mr-1" />
            Actualizar Plan
          </Link>
        </div>
      </div>
    );
  }

  if (isNearLimit) {
    return (
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-4 rounded-lg mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">⚠️</div>
            <div>
              <h3 className="font-bold">Cerca del Límite</h3>
              <p className="text-sm opacity-90">Te quedan solo {usage.assetsRemaining} activos</p>
            </div>
          </div>
          <Link to="/subscriptions" className="btn btn-sm bg-white text-orange-500 hover:bg-gray-100">
            <FaArrowUp className="mr-1" />
            Ver Planes
          </Link>
        </div>
      </div>
    );
  }

  // Plan gratuito o básico con espacio disponible
  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4 rounded-lg mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl">📊</div>
          <div>
            <h3 className="font-bold">{usage.plan.name}</h3>
            <p className="text-sm opacity-90">
              {usage.currentAssets} de {usage.maxAssets} activos utilizados
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold">{usage.assetsRemaining}</div>
          <div className="text-xs">Disponibles</div>
        </div>
      </div>
      
      {/* Barra de progreso */}
      <div className="mt-3">
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-white h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${(usage.currentAssets / usage.maxAssets) * 100}%` 
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
