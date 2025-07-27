import { useEffect, useState } from 'react';
import { FinanceTable } from './FinanceTable';
import { PortfolioItem } from "../types/PortfolioItem";
import { portfolioService } from '../services/portfolioService';
import { useSubscriptionLimits } from '../hooks/useSubscriptionLimits';
import { useDataSync } from '../hooks/useDataSync';
import { SubscriptionBanner } from './SubscriptionBanner';
import toast from 'react-hot-toast';

export const Finance = () => {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const { usage, checkAssetLimit, refreshUsage } = useSubscriptionLimits();
  
  // Sincronizar datos del usuario al cargar el componente
  useDataSync();

  useEffect(() => {
    const fetchPortfolio = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) return;
      
      try {
        const portfolio = await portfolioService.getPortfolio(userId);
        // Ordenar por ID descendente para que el último agregado aparezca primero
        const sortedPortfolio = portfolio.sort((a, b) => (b.id || 0) - (a.id || 0));
        setPortfolio(sortedPortfolio);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        toast.error('Error al cargar el portfolio');
        setPortfolio([]);
      }
    };
    fetchPortfolio();
  }, []);

  const handleDeleteItem = async (id: number) => {
    try {
      const success = await portfolioService.deleteItem(id.toString());
      if (success) {
        setPortfolio(portfolio.filter(item => item.id !== id));
        refreshUsage();
        toast.success('Activo eliminado exitosamente');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error al eliminar el activo';
      toast.error(errorMessage);
    }
  };

  const handleAddItem = async (item: Omit<PortfolioItem, 'id'>) => {
    // Verificar límites de suscripción antes de agregar
    const canAdd = await checkAssetLimit();
    if (!canAdd) {
      return; // No continuar si se alcanzó el límite
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error('Usuario no identificado');
      return;
    }

    try {
      const newItem = await portfolioService.addItem(item, userId);
      // Agregar el nuevo elemento al principio de la lista
      setPortfolio(prev => [newItem, ...prev]);
      
      // Actualizar el uso de la suscripción después de agregar exitosamente
      refreshUsage();
      toast.success('Activo agregado exitosamente');
    } catch (error) {
      console.error('Error adding item:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error al agregar el activo';
      toast.error(errorMessage, { duration: 6000 });
    }
  };

  return (
    <div>
      {/* Banner de suscripción */}
      {usage && <SubscriptionBanner usage={usage} />}
      
      <FinanceTable
        items={portfolio}
        onDeleteItem={handleDeleteItem}
        onAddItem={handleAddItem}
      />
    </div>
  );
};