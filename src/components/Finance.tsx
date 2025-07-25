import { useEffect, useState } from 'react';
import { FinanceTable } from './FinanceTable';
import { PortfolioItem } from "../types/PortfolioItem";
import { fetchWithAuth } from '../utils/auth';
import { useSubscriptionLimits } from '../hooks/useSubscriptionLimits';
import { SubscriptionBanner } from './SubscriptionBanner';
import toast from 'react-hot-toast';

export const Finance = () => {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const { usage, checkAssetLimit, refreshUsage } = useSubscriptionLimits();

  useEffect(() => {
    const fetchPortfolio = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) return;
      
      try {
        const res = await fetchWithAuth(`https://proyecto-inversiones.onrender.com/api/portfolio/user/${userId}`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const mapped = data.map((item: any) => ({
              id: item.id,
              nombre: item.name,
              ticker: item.ticker,
              cantidad: item.quantity,
              precio: item.purchase_price,
              tipoActivo: item.type,
              fechaCompra: item.purchase_date || new Date().toISOString(),
            }));
            setPortfolio(mapped);
          } else if (data && data.id) {
            const mapped = [{
              id: data.id,
              nombre: data.name,
              ticker: data.ticker,
              cantidad: data.quantity,
              precio: data.purchase_price,
              tipoActivo: data.type,
              fechaCompra: data.purchase_date || new Date().toISOString(),
            }];
            setPortfolio(mapped);
          } else {
            setPortfolio([]);
          }
        }
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        setPortfolio([]);
      }
    };
    fetchPortfolio();
  }, []);

  const handleDeleteItem = async (id: number) => {
    try {
      const res = await fetchWithAuth(`https://proyecto-inversiones.onrender.com/api/portfolio/item/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setPortfolio(portfolio.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleAddItem = async (item: Omit<PortfolioItem, 'id'>) => {
    // Verificar límites de suscripción antes de agregar
    const canAdd = await checkAssetLimit();
    if (!canAdd) {
      return; // No continuar si se alcanzó el límite
    }

    const userId = localStorage.getItem('userId');
    if (!userId) return;
    const purchaseDate = item.fechaCompra || new Date().toISOString();

    try {
      const res = await fetchWithAuth('https://proyecto-inversiones.onrender.com/api/portfolio', {
        method: 'POST',
        body: JSON.stringify({
          name: item.nombre,
          ticker: item.ticker,
          description: item.nombre,
          quantity: item.cantidad,
          purchase_price: item.precio,
          type: item.tipoActivo,
          user_id: userId,
          purchase_date: purchaseDate,
        }),
      });

      if (res.ok) {
        const newItem = await res.json();
        setPortfolio(prev => [
          ...prev,
          {
            id: newItem.id,
            nombre: newItem.name,
            ticker: newItem.ticker,
            cantidad: newItem.quantity,
            precio: newItem.purchase_price,
            tipoActivo: newItem.type,
            fechaCompra: newItem.purchase_date || new Date().toISOString(),
          }
        ]);
        
        // Actualizar el uso de la suscripción después de agregar exitosamente
        refreshUsage();
        toast.success('Activo agregado exitosamente');
      }
    } catch (error) {
      console.error('Error adding item:', error);
      toast.error('Error al agregar el activo');
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