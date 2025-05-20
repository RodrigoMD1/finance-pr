import  { useEffect, useState } from 'react';
import { ControlPanel } from './ControlPanel';
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

  // Recuperar datos desde localStorage al cargar la página
  useEffect(() => {
    const stored = localStorage.getItem('portfolio');
    if (stored) {
      console.log('Datos recuperados de localStorage:', stored); // Depuración
      setPortfolio(JSON.parse(stored));
    } else {
      console.log('No se encontraron datos en localStorage'); // Depuración
    }
  }, []);

  // Guardar los datos en localStorage cada vez que cambie el estado del portafolio
  useEffect(() => {
    if (portfolio.length > 0) {
      console.log('Guardando en localStorage:', portfolio); // Depuración
      localStorage.setItem('portfolio', JSON.stringify(portfolio));
    }
  }, [portfolio]);

  // Función para agregar un ítem al portafolio
  const handleAddItem = (item: PortfolioItem) => {
    console.log('Agregando item:', item); // Depuración
    setPortfolio((prev) => {
      const updatedPortfolio = [...prev, item];
      return updatedPortfolio;
    });
  };

  // Función para eliminar un ítem del portafolio
  const handleDeleteItem = (id: number) => {
    setPortfolio((prev) => {
      const updatedPortfolio = prev.filter((item) => item.id !== id);
      return updatedPortfolio;
    });
  };

  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-bold">Mi Portafolio</h2>
      <ControlPanel onAddItem={handleAddItem} />
      <FinanceTable
        items={portfolio}
        onDeleteItem={handleDeleteItem}
      />
    </div>
  );
};
