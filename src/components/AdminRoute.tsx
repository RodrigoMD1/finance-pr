import { ReactNode } from 'react';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { FaUserShield, FaLock } from 'react-icons/fa';

interface AdminRouteProps {
  children: ReactNode;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { canAccessAdmin } = useAdminAuth();

  if (!canAccessAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
          <div className="mb-6">
            <FaLock className="mx-auto text-6xl text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Acceso Restringido
            </h2>
            <p className="text-gray-600">
              No tienes permisos para acceder al panel administrativo.
            </p>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <FaUserShield className="text-yellow-600 mr-3" />
              <div className="text-left">
                <h3 className="text-sm font-medium text-yellow-800">
                  Se requieren permisos de administrador
                </h3>
                <p className="text-xs text-yellow-700 mt-1">
                  Contacta al administrador del sistema para obtener acceso.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => window.history.back()}
            className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Volver atrás
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
