import { ControlPanel } from "./ControlPanel";
import { PortfolioItem } from "../types/PortfolioItem";
import { BitcoinPrice } from "./BitcoinPrice";
import { FaTrash, FaCoins, FaCalendar, FaTag, FaDollarSign } from 'react-icons/fa';

type FinanceTableProps = {
  items: PortfolioItem[];
  onDeleteItem: (id: number) => void;
  onAddItem: (item: Omit<PortfolioItem, 'id'>) => void;
};

export const FinanceTable = ({ items, onDeleteItem, onAddItem }: FinanceTableProps) => {
  return (
    <div className="p-6">
      {/* Panel de control arriba */}
      <div className="mb-6">
        <ControlPanel onAddItem={onAddItem} />
      </div>

      {/* Precio de Bitcoin */}
      <div className="flex justify-start mb-6">
        <BitcoinPrice />
      </div>

      {/* Tabla responsiva */}
      <div className="overflow-hidden">
        {items.length === 0 ? (
          <div className="py-16 text-center">
            <FaCoins className="mx-auto mb-4 text-6xl text-industrial-steel/50" />
            <h3 className="mb-2 text-xl font-semibold text-industrial-white">
              No hay activos en tu portafolio
            </h3>
            <p className="text-industrial-steel">
              Comienza agregando tu primer activo financiero
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-industrial-copper/20">
                  <th className="px-3 py-4 text-sm font-semibold tracking-wider text-left uppercase text-industrial-white">
                    Activo
                  </th>
                  <th className="px-3 py-4 text-sm font-semibold tracking-wider text-left uppercase text-industrial-white">
                    Cantidad
                  </th>
                  <th className="px-3 py-4 text-sm font-semibold tracking-wider text-left uppercase text-industrial-white">
                    Precio de Compra
                  </th>
                  <th className="px-3 py-4 text-sm font-semibold tracking-wider text-left uppercase text-industrial-white">
                    Fecha de Compra
                  </th>
                  <th className="px-3 py-4 text-sm font-semibold tracking-wider text-left uppercase text-industrial-white">
                    Tipo
                  </th>
                  <th className="px-3 py-4 text-sm font-semibold tracking-wider text-left uppercase text-industrial-white">
                    Total
                  </th>
                  <th className="px-3 py-4 text-sm font-semibold tracking-wider text-center text-white uppercase">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-industrial-copper/10">
                {items.map((item, index) => (
                  <tr 
                    key={item.id} 
                    className={`transition-all duration-200 hover:bg-industrial-copper/10 ${
                      index % 2 === 0 ? 'bg-industrial-iron/20' : 'bg-transparent'
                    }`}
                  >
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-industrial-copper to-industrial-copper/70">
                          <span className="text-sm font-bold text-white">
                            {item.ticker ? item.ticker.substring(0, 2).toUpperCase() : item.nombre.substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-industrial-white">
                            {item.nombre}
                          </p>
                          {item.ticker && (
                            <p className="text-sm text-industrial-steel">
                              {item.ticker}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4 font-medium text-industrial-white">
                      {Number(item.cantidad).toLocaleString('es-AR')}
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-1 font-medium text-industrial-white">
                        <FaDollarSign className="text-sm text-industrial-copper" />
                        {Number(item.precio).toLocaleString('es-AR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-2 text-industrial-steel">
                        <FaCalendar className="text-sm text-industrial-copper" />
                        <span className="text-sm">
                          {new Date(item.fechaCompra).toLocaleString('es-AR', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-2">
                        <FaTag className="text-sm text-industrial-copper" />
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-industrial-copper/20 text-industrial-white">
                          {item.tipoActivo}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-4">
                      <div className="text-lg font-bold text-green-400">
                        ${(item.cantidad * item.precio).toLocaleString('es-AR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                    </td>
                    <td className="px-3 py-4 text-center">
                      <button
                        onClick={() => onDeleteItem(item.id)}
                        className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-white transition-colors duration-200 bg-red-600 rounded-lg shadow-lg hover:bg-red-700 hover:shadow-xl"
                      >
                        <FaTrash className="text-xs" />
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};