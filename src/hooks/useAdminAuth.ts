import { useAuth } from './useAuth';

export const useAdminAuth = () => {
  const { user, isAuthenticated } = useAuth();
  
  // Verificar si el usuario tiene rol de admin
  const isAdmin = isAuthenticated && user && user.role && (
    // Si role es un string simple
    user.role === 'admin' || 
    // Si role es un string que contiene 'admin'
    (typeof user.role === 'string' && user.role.includes('admin')) ||
    // Si role es un array y contiene 'admin'
    (Array.isArray(user.role) && user.role.includes('admin')) ||
    // Si role es un string JSON que contiene un array
    (typeof user.role === 'string' && 
     user.role.startsWith('[') && 
     JSON.parse(user.role).includes('admin')) ||
    // Si role es un string con formato de array PostgreSQL "{admin,user}"
    (typeof user.role === 'string' && 
     user.role.startsWith('{') && 
     user.role.includes('admin'))
  );

  const canAccessAdmin = isAdmin;

  return {
    isAdmin: !!isAdmin,
    canAccessAdmin,
    user
  };
};
