import { useState, useEffect } from 'react';
import { 
  FaUsers, 
  FaUserCheck, 
  FaCrown, 
  FaChartBar, 
  FaSync, 
  FaSearch,
  FaUserShield,
  FaUserTimes,
  FaTrash,
  FaEdit,
  FaToggleOn,
  FaToggleOff,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle
} from 'react-icons/fa';
import { adminService, AdminStats, AdminUser } from '../services/adminService';
import { AuthDiagnostic } from './AuthDiagnostic';
import { AuthDiagnosticPanel } from './AuthDiagnosticPanel'; // ✅ AGREGADO
import { RoleChanger } from './RoleChanger';
import toast from 'react-hot-toast';

export const AdminPanel = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Filtrar usuarios según el término de búsqueda
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.roles.some(role => role.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Cargar datos iniciales
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [statsData, usersData] = await Promise.all([
        adminService.getSystemStats(),
        adminService.getUsers()
      ]);
      setStats(statsData);
      setUsers(usersData);
    } catch (error) {
      console.error('Error loading admin data:', error);
      toast.error('Error al cargar los datos administrativos');
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    try {
      setRefreshing(true);
      await loadData();
      toast.success('Datos actualizados correctamente');
    } catch {
      toast.error('Error al actualizar datos');
    } finally {
      setRefreshing(false);
    }
  };

  const handleChangeSubscription = async (userId: string, newPlan: 'FREE' | 'PREMIUM') => {
    try {
      setActionLoading(`subscription-${userId}`);
      await adminService.changeUserSubscription(userId, newPlan);
      toast.success(`Plan cambiado a ${newPlan} exitosamente`);
      await loadData(); // Recargar datos
    } catch (error) {
      console.error('Error changing subscription:', error);
      toast.error('Error al cambiar el plan de suscripción');
    } finally {
      setActionLoading(null);
    }
  };

  const handleVerifyEmail = async (userId: string) => {
    try {
      setActionLoading(`verify-${userId}`);
      await adminService.verifyUserEmail(userId);
      toast.success('Email verificado correctamente');
      await loadData();
    } catch (error) {
      console.error('Error verifying email:', error);
      toast.error('Error al verificar email');
    } finally {
      setActionLoading(null);
    }
  };

  const handleToggleStatus = async (userId: string) => {
    try {
      setActionLoading(`status-${userId}`);
      await adminService.toggleUserStatus(userId);
      toast.success('Estado del usuario actualizado');
      await loadData();
    } catch (error) {
      console.error('Error toggling user status:', error);
      toast.error('Error al cambiar estado del usuario');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!window.confirm(`¿Estás seguro de eliminar al usuario ${userName}? Esta acción no se puede deshacer.`)) {
      return;
    }

    try {
      setActionLoading(`delete-${userId}`);
      await adminService.deleteUser(userId);
      toast.success('Usuario eliminado correctamente');
      await loadData();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error al eliminar usuario');
    } finally {
      setActionLoading(null);
    }
  };

  const handlePromoteToAdmin = async (userId: string, currentRoles: string[]) => {
    const newRoles = currentRoles.includes('admin') 
      ? currentRoles.filter(role => role !== 'admin')
      : [...currentRoles, 'admin'];

    try {
      setActionLoading(`roles-${userId}`);
      await adminService.changeUserRoles(userId, newRoles);
      toast.success(newRoles.includes('admin') ? 'Usuario promovido a administrador' : 'Permisos de administrador removidos');
      await loadData();
    } catch (error) {
      console.error('Error changing user roles:', error);
      toast.error('Error al cambiar roles del usuario');
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-8 h-8 mx-auto mb-4 border-4 border-blue-700 rounded-full border-t-transparent animate-spin"></div>
          <p className="text-gray-600">Cargando panel administrativo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Panel de Diagnóstico Flotante */}
      <AuthDiagnosticPanel />
      
      {/* Componente de Diagnóstico (Temporal) */}
      <div className="mb-6">
        <AuthDiagnostic />
      </div>

      {/* Componente para Cambiar Rol (Temporal) */}
      <div className="mb-6">
        <RoleChanger />
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel Administrativo</h1>
          <p className="text-gray-600">Gestiona usuarios y estadísticas del sistema</p>
        </div>
        <button
          onClick={refreshData}
          disabled={refreshing}
          className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <FaSync className={refreshing ? 'animate-spin' : ''} />
          Actualizar
        </button>
      </div>

      {/* Estadísticas */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total de Usuarios"
            value={stats.totalUsers}
            icon={<FaUsers />}
            color="blue"
          />
          <StatCard
            title="Usuarios Verificados"
            value={stats.totalUsers || 0}
            icon={<FaUserCheck />}
            color="green"
          />
          <StatCard
            title="Usuarios Premium"
            value={stats.activeSubscriptions || 0}
            icon={<FaCrown />}
            color="yellow"
          />
          <StatCard
            title="Total de Assets"
            value={100}
            icon={<FaChartBar />}
            color="purple"
          />
          <StatCard
            title="Suscripciones Activas"
            value={stats.activeSubscriptions}
            icon={<FaUserShield />}
            color="indigo"
          />
          <StatCard
            title="Usuarios FREE"
            value={stats.totalUsers - stats.activeSubscriptions || 0}
            icon={<FaUsers />}
            color="gray"
          />
        </div>
      )}

      {/* Búsqueda y filtros */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar usuarios
            </label>
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, email o rol..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Lista de usuarios */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Usuarios ({filteredUsers.length})
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assets
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  actionLoading={actionLoading}
                  onChangeSubscription={handleChangeSubscription}
                  onVerifyEmail={handleVerifyEmail}
                  onToggleStatus={handleToggleStatus}
                  onDeleteUser={handleDeleteUser}
                  onPromoteToAdmin={handlePromoteToAdmin}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Componente para tarjetas de estadísticas
interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'yellow' | 'purple' | 'indigo' | 'gray';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-500 text-blue-100',
    green: 'bg-green-500 text-green-100',
    yellow: 'bg-yellow-500 text-yellow-100',
    purple: 'bg-purple-500 text-purple-100',
    indigo: 'bg-indigo-500 text-indigo-100',
    gray: 'bg-gray-500 text-gray-100'
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${colorClasses[color]}`}>
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

// Componente para filas de usuarios
interface UserRowProps {
  user: AdminUser;
  actionLoading: string | null;
  onChangeSubscription: (userId: string, plan: 'FREE' | 'PREMIUM') => void;
  onVerifyEmail: (userId: string) => void;
  onToggleStatus: (userId: string) => void;
  onDeleteUser: (userId: string, userName: string) => void;
  onPromoteToAdmin: (userId: string, roles: string[]) => void;
}

const UserRow: React.FC<UserRowProps> = ({
  user,
  actionLoading,
  onChangeSubscription,
  onVerifyEmail,
  onToggleStatus,
  onDeleteUser,
  onPromoteToAdmin
}) => {
  const isAdmin = user.roles.includes('admin');
  const currentPlan = user.subscription?.type || 'FREE';

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
              {user.name}
              {isAdmin && <FaUserShield className="text-yellow-500" title="Administrador" />}
            </div>
            <div className="text-sm text-gray-500">{user.email}</div>
            <div className="flex items-center gap-2 mt-1">
              {user.emailVerified ? (
                <span className="inline-flex items-center gap-1 text-xs text-green-600">
                  <FaCheckCircle />
                  Verificado
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs text-red-600">
                  <FaTimesCircle />
                  Sin verificar
                </span>
              )}
              {!user.isActive && (
                <span className="inline-flex items-center gap-1 text-xs text-orange-600">
                  <FaExclamationTriangle />
                  Inactivo
                </span>
              )}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            currentPlan === 'premium' 
              ? 'bg-yellow-100 text-yellow-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {currentPlan}
          </span>
          {currentPlan === 'premium' && <FaCrown className="text-yellow-500" />}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Límite: 10 assets
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${
          user.isActive 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {user.isActive ? <FaToggleOn /> : <FaToggleOff />}
          {user.isActive ? 'Activo' : 'Inactivo'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        0 / 10
        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
          <div 
            className="bg-blue-600 h-2 rounded-full" 
            style={{ 
              width: '0%'
            }}
          ></div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex items-center gap-1">
          {/* Cambiar plan */}
          <button
            onClick={() => onChangeSubscription(user.id, currentPlan === 'FREE' ? 'PREMIUM' : 'FREE')}
            disabled={actionLoading === `subscription-${user.id}`}
            className="text-blue-600 hover:text-blue-900 p-1 rounded"
            title={`Cambiar a ${currentPlan === 'FREE' ? 'PREMIUM' : 'FREE'}`}
          >
            {actionLoading === `subscription-${user.id}` ? (
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <FaEdit />
            )}
          </button>

          {/* Verificar email */}
          {!user.emailVerified && (
            <button
              onClick={() => onVerifyEmail(user.id)}
              disabled={actionLoading === `verify-${user.id}`}
              className="text-green-600 hover:text-green-900 p-1 rounded"
              title="Verificar email"
            >
              {actionLoading === `verify-${user.id}` ? (
                <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <FaCheckCircle />
              )}
            </button>
          )}

          {/* Toggle status */}
          <button
            onClick={() => onToggleStatus(user.id)}
            disabled={actionLoading === `status-${user.id}`}
            className={`${user.isActive ? 'text-orange-600 hover:text-orange-900' : 'text-green-600 hover:text-green-900'} p-1 rounded`}
            title={user.isActive ? 'Desactivar usuario' : 'Activar usuario'}
          >
            {actionLoading === `status-${user.id}` ? (
              <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              user.isActive ? <FaUserTimes /> : <FaUserCheck />
            )}
          </button>

          {/* Promote/demote admin */}
          <button
            onClick={() => onPromoteToAdmin(user.id, user.roles)}
            disabled={actionLoading === `roles-${user.id}`}
            className={`${isAdmin ? 'text-orange-600 hover:text-orange-900' : 'text-purple-600 hover:text-purple-900'} p-1 rounded`}
            title={isAdmin ? 'Remover admin' : 'Promover a admin'}
          >
            {actionLoading === `roles-${user.id}` ? (
              <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <FaUserShield />
            )}
          </button>

          {/* Delete user */}
          {!isAdmin && (
            <button
              onClick={() => onDeleteUser(user.id, user.name)}
              disabled={actionLoading === `delete-${user.id}`}
              className="text-red-600 hover:text-red-900 p-1 rounded"
              title="Eliminar usuario"
            >
              {actionLoading === `delete-${user.id}` ? (
                <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <FaTrash />
              )}
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};
