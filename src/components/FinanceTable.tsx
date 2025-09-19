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
      <div className="mb-6 flex justify-start">
        <BitcoinPrice />
      </div>

      {/* Tabla responsiva */}
      <div className="overflow-hidden">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <FaCoins className="mx-auto text-6xl text-industrial-steel/50 mb-4" />
            <h3 className="text-xl font-semibold text-industrial-white mb-2">
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
                  <th className="text-left py-4 px-3 text-sm font-semibold text-industrial-white uppercase tracking-wider">
                    Activo
                  </th>
                  <th className="text-left py-4 px-3 text-sm font-semibold text-industrial-white uppercase tracking-wider">
                    Cantidad
                  </th>
                  <th className="text-left py-4 px-3 text-sm font-semibold text-industrial-white uppercase tracking-wider">
                    Precio de Compra
                  </th>
                  <th className="text-left py-4 px-3 text-sm font-semibold text-industrial-white uppercase tracking-wider">
                    Fecha de Compra
                  </th>
                  <th className="text-left py-4 px-3 text-sm font-semibold text-industrial-white uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="text-left py-4 px-3 text-sm font-semibold text-industrial-white uppercase tracking-wider">
                    Total
                  </th>
                  <th className="text-center py-4 px-3 text-sm font-semibold text-industrial-white uppercase tracking-wider">
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
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-industrial-copper to-industrial-copper/70 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
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
                    <td className="py-4 px-3 text-industrial-white font-medium">
                      {Number(item.cantidad).toLocaleString('es-AR')}
                    </td>
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-1 text-industrial-white font-medium">
                        <FaDollarSign className="text-industrial-copper text-sm" />
                        {Number(item.precio).toLocaleString('es-AR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                    </td>
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-2 text-industrial-steel">
                        <FaCalendar className="text-industrial-copper text-sm" />
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
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-2">
                        <FaTag className="text-industrial-copper text-sm" />
                        <span className="px-2 py-1 bg-industrial-copper/20 text-industrial-white text-xs font-medium rounded-full">
                          {item.tipoActivo}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-3">
                      <div className="text-lg font-bold text-green-400">
                        ${(item.cantidad * item.precio).toLocaleString('es-AR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                    </td>
                    <td className="py-4 px-3 text-center">
                      <button
                        onClick={() => onDeleteItem(item.id)}
                        className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
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