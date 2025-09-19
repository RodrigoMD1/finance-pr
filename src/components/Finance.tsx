import { useEffect, useState } from 'react';
import { FinanceTable } from './FinanceTable';
import { PortfolioItem } from "../types/PortfolioItem";
import { fetchWithAuth } from '../utils/auth';
import { useSubscriptionLimits } from '../hooks/useSubscriptionLimits';
import { SubscriptionBanner } from './SubscriptionBanner';
import { FaChartLine, FaWallet, FaChartBar, FaDollarSign } from 'react-icons/fa';
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

  // Calcular estadísticas del portafolio
  const totalValue = portfolio.reduce((sum, item) => sum + (item.cantidad * item.precio), 0);
  const totalAssets = portfolio.length;
  const assetTypes = [...new Set(portfolio.map(item => item.tipoActivo))].length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-industrial-charcoal via-industrial-iron to-industrial-charcoal">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-industrial-white mb-4">
            <FaChartLine className="inline mr-3 text-industrial-copper" />
            Panel Financiero
          </h1>
          <p className="text-industrial-steel text-lg">
            Gestiona tu portafolio de inversiones de manera inteligente
          </p>
        </div>

        {/* Banner de suscripción */}
        {usage && (
          <div className="mb-8">
            <SubscriptionBanner usage={usage} />
          </div>
        )}

        {/* Estadísticas del portafolio */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-effect p-6 rounded-xl border border-industrial-copper/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-industrial-steel text-sm font-medium">Valor Total</p>
                <p className="text-2xl font-bold text-industrial-white">
                  ${totalValue.toLocaleString('es-AR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="bg-gradient-to-br from-industrial-copper to-industrial-copper/70 p-3 rounded-lg">
                <FaDollarSign className="text-white text-xl" />
              </div>
            </div>
          </div>

          <div className="glass-effect p-6 rounded-xl border border-industrial-copper/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-industrial-steel text-sm font-medium">Total de Activos</p>
                <p className="text-2xl font-bold text-industrial-white">{totalAssets}</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-lg">
                <FaWallet className="text-white text-xl" />
              </div>
            </div>
          </div>

          <div className="glass-effect p-6 rounded-xl border border-industrial-copper/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-industrial-steel text-sm font-medium">Tipos de Activos</p>
                <p className="text-2xl font-bold text-industrial-white">{assetTypes}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-lg">
                <FaChartBar className="text-white text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de finanzas */}
        <div className="glass-effect rounded-xl border border-industrial-copper/20 overflow-hidden">
          <FinanceTable
            items={portfolio}
            onDeleteItem={handleDeleteItem}
            onAddItem={handleAddItem}
          />
        </div>
      </div>
    </div>
  );
};