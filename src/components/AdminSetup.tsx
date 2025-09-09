import { useState } from 'react';
import { FaUserShield, FaDatabase, FaCode, FaExclamationTriangle } from 'react-icons/fa';

export const AdminSetup = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const sqlQuery = `
-- Script para crear el primer usuario administrador
-- Ejecuta este script en tu base de datos PostgreSQL

-- 1. Crear un usuario normal primero (si no existe)
INSERT INTO users (email, name, password, "emailVerified", "isActive", roles, "createdAt", "updatedAt") 
VALUES (
  'admin@finance-pr.com',
  'Administrador del Sistema',
  '$2b$10$hashedPasswordHere', -- Reemplaza con el hash real de la contraseña
  true,
  true,
  '{"admin", "user"}',
  NOW(),
  NOW()
) 
ON CONFLICT (email) DO NOTHING;

-- 2. Actualizar roles de un usuario existente a administrador
UPDATE users 
SET roles = '{"admin", "user"}',
    "updatedAt" = NOW()
WHERE email = 'tu-email@ejemplo.com'; -- Reemplaza con tu email

-- 3. Verificar que el usuario tiene permisos de admin
SELECT id, email, name, roles, "emailVerified", "isActive" 
FROM users 
WHERE 'admin' = ANY(roles);
  `.trim();

  const backendEndpoints = `
// Endpoints del backend que debes tener implementados:

1. GET /api/admin/stats
   - Estadísticas del sistema

2. GET /api/admin/users
   - Lista de todos los usuarios

3. GET /api/admin/users/:userId
   - Detalles de un usuario específico

4. PATCH /api/admin/users/:userId/subscription
   - Cambiar plan de suscripción
   - Body: { "plan": "FREE" | "PREMIUM" }

5. POST /api/admin/users/:userId/verify-email
   - Verificar email manualmente

6. PATCH /api/admin/users/:userId/toggle-status
   - Activar/desactivar usuario

7. DELETE /api/admin/users/:userId
   - Eliminar usuario completamente

8. PATCH /api/admin/users/:userId/roles
   - Cambiar roles del usuario
   - Body: { "roles": ["admin", "user"] }
  `.trim();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <FaUserShield className="mx-auto text-6xl text-blue-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Configuración del Panel Administrativo
          </h1>
          <p className="text-gray-600">
            Guía para configurar el primer usuario administrador
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 ${
                    step < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaDatabase className="text-blue-600" />
                Paso 1: Configurar Base de Datos
              </h2>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <FaExclamationTriangle className="text-yellow-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold text-yellow-800">Importante</h3>
                    <p className="text-yellow-700 text-sm">
                      Asegúrate de tener acceso a tu base de datos PostgreSQL antes de continuar.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Script SQL para crear el primer administrador:
                  </h3>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm whitespace-pre-wrap">{sqlQuery}</pre>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Instrucciones:</h4>
                  <ol className="list-decimal list-inside text-blue-700 space-y-1">
                    <li>Conecta a tu base de datos PostgreSQL</li>
                    <li>Reemplaza <code>'tu-email@ejemplo.com'</code> con tu email real</li>
                    <li>Ejecuta el script SQL</li>
                    <li>Verifica que el usuario fue creado correctamente</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaCode className="text-green-600" />
                Paso 2: Verificar Backend
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Endpoints requeridos en tu backend:
                  </h3>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm whitespace-pre-wrap">{backendEndpoints}</pre>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Verificación:</h4>
                  <ul className="list-disc list-inside text-green-700 space-y-1">
                    <li>Todos los endpoints deben estar implementados</li>
                    <li>AdminGuard debe proteger todas las rutas</li>
                    <li>JWT Bearer Token debe ser requerido</li>
                    <li>Solo usuarios con rol 'admin' pueden acceder</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaUserShield className="text-purple-600" />
                Paso 3: ¡Panel Listo!
              </h2>
              
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">
                    ✅ Configuración Completa
                  </h3>
                  <p className="text-green-700 mb-4">
                    El panel administrativo está completamente configurado y listo para usar.
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-green-800">Funcionalidades disponibles:</h4>
                    <ul className="list-disc list-inside text-green-700 space-y-1">
                      <li>📊 Dashboard con estadísticas del sistema</li>
                      <li>👥 Gestión completa de usuarios</li>
                      <li>⭐ Cambio de planes de suscripción</li>
                      <li>✅ Verificación manual de emails</li>
                      <li>🔄 Activar/desactivar usuarios</li>
                      <li>👑 Promoción a administrador</li>
                      <li>🗑️ Eliminación segura de usuarios</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Acceso al Panel:</h4>
                  <p className="text-blue-700">
                    Una vez logueado con tu cuenta de administrador, podrás acceder al panel 
                    desde el menú principal donde aparecerá "Panel Admin" en color dorado.
                  </p>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => window.location.href = '/'}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Ir al Login
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Anterior
            </button>
            
            <button
              onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
              disabled={currentStep === 3}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
