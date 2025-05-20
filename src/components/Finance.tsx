import { useEffect, useState } from 'react';
import { FinanceTable } from './FinanceTable';

type PortfolioItem = {
  id: number;
  nombre: string;
  cantidad: number;
  precio: number;
  tipoActivo: string;
};

export const Finance = () => {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      if (!userId || !token) return;
      const res = await fetch(`https://proyecto-inversiones.onrender.com/api/portfolio/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        // Verifica si data es un array antes de mapear
        if (Array.isArray(data)) {
          const mapped = data.map((item: {
            id: number;
            name: string;
            quantity: number;
            purchase_price: number;
            type: string;
          }) => ({
            id: item.id,
            nombre: item.name,
            cantidad: item.quantity,
            precio: item.purchase_price,
            tipoActivo: item.type,
          }));
          setPortfolio(mapped);
        } else if (data) {
          // Si es un solo objeto
          const mapped = [{
            id: data.id,
            nombre: data.name,
            cantidad: data.quantity,
            precio: data.purchase_price,
            tipoActivo: data.type,
          }];
          setPortfolio(mapped);
        } else {
          setPortfolio([]);
        }
      }
    };
    fetchPortfolio();
  }, []);

  const handleDeleteItem = async (id: number) => {
    const token = localStorage.getItem('token');
    await fetch(`https://proyecto-inversiones.onrender.com/api/portfolio/item/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    setPortfolio(portfolio.filter(item => item.id !== id));
  };

  return (
    <FinanceTable items={portfolio} onDeleteItem={handleDeleteItem} />
  );
};