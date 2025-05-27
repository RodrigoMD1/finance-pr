import { ControlPanel } from "./ControlPanel";

import { PortfolioItem } from "../types/PortfolioItem";

type FinanceTableProps = {
  items: PortfolioItem[];
  onDeleteItem: (id: number) => void;
  onAddItem: (item: Omit<PortfolioItem, 'id'>) => void;
};

export const FinanceTable = ({ items, onDeleteItem, onAddItem }: FinanceTableProps) => {
  return (
    <div className="overflow-x-auto">
      <ControlPanel onAddItem={onAddItem} />
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Precio de Compra</th>
            <th>Fecha y Hora de Compra</th>
            <th>Tipo de Activo</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center text-gray-500">
                No hay datos para mostrar.
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={item.id}>
                <td>{item.nombre}</td>
                <td>
                  {Number(item.cantidad).toLocaleString('es-AR')}
                </td>
                <td>
                  ${Number(item.precio).toLocaleString('es-AR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td>
                  {new Date(item.fechaCompra).toLocaleString('es-AR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </td>
                <td>{item.tipoActivo}</td>
                <td>
                  ${(item.cantidad * item.precio).toLocaleString('es-AR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-xs"
                    onClick={() => onDeleteItem(item.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};