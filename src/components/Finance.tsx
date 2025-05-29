import { useEffect, useState } from 'react';
import { FinanceTable } from './FinanceTable';
import { PortfolioItem } from "../types/PortfolioItem";

// Función global de logout
function logout() {
  localStorage.clear();
  window.location.reload();
}

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
      if (res.status === 401 || res.status === 403) {
        logout();
        return;
      }
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const mapped = data.map((item: any) => ({
            id: item.id,
            nombre: item.name,
            ticker: item.ticker, // <-- Agregado
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
            ticker: data.ticker, // <-- Agregado
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
    };
    fetchPortfolio();
  }, []);

  const handleDeleteItem = async (id: number) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`https://proyecto-inversiones.onrender.com/api/portfolio/item/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.status === 401 || res.status === 403) {
      logout();
      return;
    }
    if (res.ok) {
      setPortfolio(portfolio.filter(item => item.id !== id));
    }
  };

  const handleAddItem = async (item: Omit<PortfolioItem, 'id'>) => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if (!userId || !token) return;
    const purchaseDate = item.fechaCompra || new Date().toISOString();

    const res = await fetch('https://proyecto-inversiones.onrender.com/api/portfolio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: item.nombre,
        ticker: item.ticker, // <-- Agregado
        description: item.nombre,
        quantity: item.cantidad,
        purchase_price: item.precio,
        type: item.tipoActivo,
        user_id: userId,
        purchase_date: purchaseDate,
      }),
    });

    if (res.status === 401 || res.status === 403) {
      logout();
      return;
    }

    if (res.ok) {
      const newItem = await res.json();
      setPortfolio(prev => [
        ...prev,
        {
          id: newItem.id,
          nombre: newItem.name,
          ticker: newItem.ticker, // <-- Agregado
          cantidad: newItem.quantity,
          precio: newItem.purchase_price,
          tipoActivo: newItem.type,
          fechaCompra: newItem.purchase_date || new Date().toISOString(),
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