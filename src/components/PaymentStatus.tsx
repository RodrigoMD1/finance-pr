import React from 'react';
import { FaCreditCard, FaCheck, FaTimes } from 'react-icons/fa';

export const PaymentSuccess: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <FaCheck className="text-3xl text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">¡Pago Exitoso!</h1>
          <p className="text-gray-600">
            Tu suscripción ha sido activada correctamente.
          </p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Detalles del Pago</h2>
          <div className="space-y-2 text-left">
            <div className="flex justify-between">
              <span className="text-gray-600">Plan:</span>
              <span className="font-medium">Plan Pro</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Precio:</span>
              <span className="font-medium">$5,990 ARS</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Duración:</span>
              <span className="font-medium">1 mes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estado:</span>
              <span className="text-green-600 font-medium">Activo</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <button 
            className="btn btn-primary w-full"
            onClick={() => window.location.href = '/finance'}
          >
            <FaCreditCard className="mr-2" />
            Ir a Mis Finanzas
          </button>
          <button 
            className="btn btn-outline w-full"
            onClick={() => window.location.href = '/subscriptions'}
          >
            Ver Mi Suscripción
          </button>
        </div>
      </div>
    </div>
  );
};

export const PaymentFailure: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <FaTimes className="text-3xl text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-red-600 mb-2">Pago Fallido</h1>
          <p className="text-gray-600">
            Hubo un problema al procesar tu pago. Por favor, inténtalo de nuevo.
          </p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">¿Qué pasó?</h2>
          <ul className="text-left space-y-2 text-gray-600">
            <li>• El pago pudo haber sido rechazado por tu banco</li>
            <li>• Verifique los datos de su tarjeta</li>
            <li>• Asegurate de tener fondos suficientes</li>
            <li>• Si el problema persiste, contacta con soporte</li>
          </ul>
        </div>
        
        <div className="space-y-3">
          <button 
            className="btn btn-primary w-full"
            onClick={() => window.location.href = '/subscriptions'}
          >
            Intentar de Nuevo
          </button>
          <button 
            className="btn btn-outline w-full"
            onClick={() => window.location.href = '/'}
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
};
