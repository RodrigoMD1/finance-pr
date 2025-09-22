import { useEffect, useState, useCallback } from 'react';
import { FinanceTable } from './FinanceTable';
import { PortfolioItem } from "../types/PortfolioItem";
import { fetchWithAuth } from '../utils/auth';
import { useSubscriptionLimits } from '../hooks/useSubscriptionLimits';
import { SubscriptionBanner } from './SubscriptionBanner';
import { FaChartLine, FaWallet, FaChartBar, FaDollarSign } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { withBase } from '../services/api';

export const Finance = () => {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const { usage, checkAssetLimit, refreshUsage } = useSubscriptionLimits();

  const mapAssetType = (tipo: string | undefined): string => {
    const t = (tipo || '').toLowerCase();
    if (t.includes('acción') || t === 'accion' || t === 'stock' || t === 'acciones') return 'stock';
    if (t.includes('cripto') || t === 'crypto' || t === 'criptomoneda') return 'crypto';
    if (t.includes('bono') || t === 'bond' || t === 'renta fija') return 'bond';
    return 'stock';
  };

  const fetchPortfolio = useCallback(async () => {
      try {
        const res = await fetchWithAuth(withBase(`/portfolio`));
        let finalRes = res;
        if (!res.ok) {
          // Fallback: intentar endpoint alternativo por usuario
          const userId = localStorage.getItem('userId');
          if (userId) {
            try {
              const alt = await fetchWithAuth(withBase(`/portfolio/user/${userId}`));
              if (alt.ok) {
                finalRes = alt;
              } else {
                finalRes = res; // mantener original para manejo de errores
              }
            } catch {
              // mantener res
            }
          }
        }

        if (!finalRes.ok) {
          try {
            const text = await finalRes.text();
            const msg = text || `Error ${finalRes.status} al cargar portfolio`;
            if (finalRes.status === 401) {
              toast.error('Sesión expirada. Inicia sesión nuevamente.');
            } else if (finalRes.status === 403) {
              // Diagnóstico extra: verificar estado de usuario
              const userId = localStorage.getItem('userId');
              const token = localStorage.getItem('token');
              let extra = '';
              if (userId && token) {
                try {
                  const ures = await fetch(withBase(`/users/${userId}`), { headers: { Authorization: `Bearer ${token}` } });
                  if (ures.ok) {
                    const u = await ures.json();
                    if (u.emailVerified === false) extra = ' Email no verificado.';
                    if (u.isActive === false) extra += ' Usuario inactivo.';
                    if (u.roles && Array.isArray(u.roles) && !u.roles.includes('user')) extra += ' Rol insuficiente.';
                  }
                } catch {
                  // ignore
                }
              }
              toast.error(`Acceso denegado (403) al portfolio. Verifica permisos/suscripción.${extra ? ' ' + extra : ''}`);
            } else {
              toast.error(msg);
            }
            console.error('Portfolio fetch error:', finalRes.status, msg);
          } catch {
            // ignore parse issues
          }
          setPortfolio([]);
          return;
        }

        const data = await finalRes.json();
        const list = Array.isArray(data) ? data : (Array.isArray(data?.items) ? data.items : []);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mapped = list.map((item: any) => {
          // Soportar estructura con asset anidado o campos planos
          const asset = item.asset || {};
          return {
            id: item.id,
            nombre: item.name || asset.name || item.assetName || 'Activo',
            ticker: item.ticker || asset.symbol || item.symbol || '',
            cantidad: item.quantity ?? item.cantidad ?? 0,
            precio: item.purchasePrice ?? item.purchase_price ?? item.precio ?? 0,
            tipoActivo: item.type || asset.type || item.tipoActivo || 'Otro',
            fechaCompra: item.purchaseDate || item.purchase_date || new Date().toISOString(),
          } as PortfolioItem;
        });
        setPortfolio(mapped);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        setPortfolio([]);
      }
    }, []);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  const handleDeleteItem = async (id: number) => {
    try {
      const res = await fetchWithAuth(withBase(`/portfolio/item/${id}`), {
        method: 'DELETE'
      });
      if (res.ok) {
        setPortfolio(portfolio.filter(item => item.id !== id));
      } else {
        const text = await res.text();
        toast.error(text || `No se pudo eliminar el activo (status ${res.status})`);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Error al eliminar el activo');
    }
  };

  const handleAddItem = async (item: Omit<PortfolioItem, 'id'>) => {
    // Verificar límites de suscripción antes de agregar
    const canAdd = await checkAssetLimit();
    if (!canAdd) {
      return; // No continuar si se alcanzó el límite
    }

    const purchaseDate = item.fechaCompra || new Date().toISOString();

    try {
      // 1) Buscar asset por símbolo
      let assetId: string | null = null;
      if (item.ticker) {
        const searchRes = await fetchWithAuth(withBase(`/assets?symbol=${encodeURIComponent(item.ticker)}`));
        if (searchRes.ok) {
          const assets = await searchRes.json();
          if (Array.isArray(assets) && assets.length > 0) {
            assetId = assets[0].id;
          }
        } else if (searchRes.status === 401) {
          toast.error('Sesión expirada. Inicia sesión nuevamente.');
          return;
        } else if (searchRes.status === 403) {
          toast.error('Acceso denegado al consultar assets (403).');
          return;
        }
      }

      // 2) Si no existe, crear asset mínimo
      if (!assetId) {
        const createRes = await fetchWithAuth(withBase('/assets'), {
          method: 'POST',
          body: JSON.stringify({
            symbol: item.ticker || item.nombre.substring(0, 5).toUpperCase(),
            name: item.nombre,
            type: mapAssetType(item.tipoActivo),
            price: item.precio || 0,
            currency: 'USD'
          })
        });
        if (createRes.ok) {
          const created = await createRes.json();
          assetId = created.id;
        } else {
          const text = await createRes.text();
          throw new Error(text || 'No se pudo crear el asset');
        }
      }

      // 3) Agregar al portfolio
      const res = await fetchWithAuth(withBase('/portfolio'), {
        method: 'POST',
        body: JSON.stringify({
          assetId,
          quantity: item.cantidad,
          purchasePrice: item.precio,
          purchaseDate,
        }),
      });

      if (res.ok) {
        toast.success('Activo agregado exitosamente');
        // Recargar lista para reflejar datos del backend
        await fetchPortfolio();
        refreshUsage();
      } else {
        const text = await res.text();
        if (res.status === 401) {
          toast.error('Sesión expirada. Inicia sesión nuevamente.');
        } else if (res.status === 403) {
          toast.error('Acceso denegado (403) para agregar al portfolio.');
        } else {
          toast.error(text || 'Error al agregar el activo');
        }
      }
    } catch (error) {
      console.error('Error adding item:', error);
      toast.error(error instanceof Error ? error.message : 'Error al agregar el activo');
    }
  };

  // Calcular estadísticas del portafolio
  const totalValue = portfolio.reduce((sum, item) => sum + (item.cantidad * item.precio), 0);
  const totalAssets = portfolio.length;
  const assetTypes = [...new Set(portfolio.map(item => item.tipoActivo))].length;

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-industrial-charcoal via-industrial-iron to-industrial-charcoal">
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
          <div className="mt-4 flex justify-center md:justify-end">
            <Link
              to="/stadistics"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-orange-500 text-white hover:bg-orange-600 transition-colors shadow-lg"
            >
              <FaChartBar />
              Ver estadísticas
            </Link>
          </div>
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