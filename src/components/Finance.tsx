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
      const res = await fetch(`https://proyecto-inversiones.onrender.com/api/portfolio/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const mapped = data.map((item: any) => ({
            id: item.id,
            nombre: item.name,
            cantidad: item.quantity,
            precio: item.purchase_price,
            tipoActivo: item.type,
          }));
          setPortfolio(mapped);
        } else if (data && data.id) {
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
    const res = await fetch(`https://proyecto-inversiones.onrender.com/api/portfolio/item/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      setPortfolio(portfolio.filter(item => item.id !== id));
    }
  };

  // Handler para agregar un nuevo ítem al portfolio (POST al backend)
  const handleAddItem = async (item: Omit<PortfolioItem, 'id'>) => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if (!userId || !token) return;

    const res = await fetch('https://proyecto-inversiones.onrender.com/api/portfolio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: item.nombre,
        description: item.nombre, // O pide el campo en el formulario y pásalo aquí
        quantity: item.cantidad,
        purchase_price: item.precio,
        type: item.tipoActivo,
        user_id: userId
      }),
    });

    if (res.ok) {
      const newItem = await res.json();
      setPortfolio(prev => [
        ...prev,
        {
          id: newItem.id,
          nombre: newItem.name,
          cantidad: newItem.quantity,
          precio: newItem.purchase_price,
          tipoActivo: newItem.type,
        }
      ]);
    }
  };

  return (
    <FinanceTable
      items={portfolio}
      onDeleteItem={handleDeleteItem}
      onAddItem={handleAddItem}
    />
  );
};