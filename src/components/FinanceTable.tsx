// src/components/FinanceTable.tsx
import React from 'react';

type PortfolioItem = {
  id: number;
  nombre: string;
  cantidad: number;
  precio: number;
  tipoActivo: string;
};

type FinanceTableProps = {
  items: PortfolioItem[];
  onDeleteItem: (id: number) => void;
};

export const FinanceTable = ({ items, onDeleteItem }: FinanceTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* Header */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Tipo de Activo</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.nombre}</td>
              <td>{item.cantidad}</td>
              <td>{item.precio}</td>
              <td>{item.tipoActivo}</td>
              <td>{(item.cantidad * item.precio).toFixed(2)}</td>
              <td>
                <button 
                  className="btn btn-danger btn-xs"
                  onClick={() => onDeleteItem(item.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
