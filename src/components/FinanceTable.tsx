import { ControlPanel } from "./ControlPanel";
import { PortfolioItem } from "../types/PortfolioItem";
import { BitcoinPrice } from "./BitcoinPrice";
import { Pagination } from "./Pagination";
import { usePagination } from "../hooks/usePagination";

type FinanceTableProps = {
  items: PortfolioItem[];
  onDeleteItem: (id: number) => void;
  onAddItem: (item: Omit<PortfolioItem, 'id'>) => void;
};

export const FinanceTable = ({ items, onDeleteItem, onAddItem }: FinanceTableProps) => {
  // Configuración de paginación
  const {
    currentItems,
    currentPage,
    totalPages,
    totalItems,
    goToPage,
    nextPage,
    prevPage,
    hasNextPage,
    hasPrevPage,
    setItemsPerPage,
    itemsPerPage,
  } = usePagination({
    data: items,
    itemsPerPage: 10, // Mostrar 10 activos por página por defecto
  });
  return (
    <div className="max-w-5xl p-6 m-5 mx-auto overflow-x-auto shadow-lg bg-base-200 rounded-xl" style={{ fontFamily: "Inter, Roboto, Arial, sans-serif" }}>
      {/* Panel de control arriba */}
      <div className="mb-4">
        <ControlPanel onAddItem={onAddItem} />
      </div>
      {/* Precio de Bitcoin entre el formulario y la tabla */}
      <div className="flex justify-start mb-4">
        <BitcoinPrice />
      </div>
      <div className="p-4 bg-white rounded-lg shadow">
        {/* Header con información de paginación cuando hay elementos */}
        {items.length > 0 && (
          <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
            <div>
              Total de activos: <span className="font-semibold text-blue-600">{items.length}</span>
            </div>
            {totalPages > 1 && (
              <div>
                Página {currentPage} de {totalPages}
              </div>
            )}
          </div>
        )}
        
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-xs font-bold tracking-wider text-left text-gray-700 uppercase">Nombre</th>
              <th className="px-4 py-2 text-xs font-bold tracking-wider text-left text-gray-700 uppercase">Cantidad</th>
              <th className="px-4 py-2 text-xs font-bold tracking-wider text-left text-gray-700 uppercase">Precio de Compra</th>
              <th className="px-4 py-2 text-xs font-bold tracking-wider text-left text-gray-700 uppercase">Fecha y Hora de Compra</th>
              <th className="px-4 py-2 text-xs font-bold tracking-wider text-left text-gray-700 uppercase">Tipo de Activo</th>
              <th className="px-4 py-2 text-xs font-bold tracking-wider text-left text-gray-700 uppercase">Total</th>
              <th className="px-4 py-2 text-xs font-bold tracking-wider text-center text-gray-700 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-6 text-lg font-medium text-center text-gray-400">
                  {items.length === 0 ? 'No hay datos para mostrar.' : 'No hay resultados en esta página.'}
                </td>
              </tr>
            ) : (
              currentItems.map((item) => (
                <tr key={item.id} className="transition-colors hover:bg-gray-50">
                  <td className="px-4 py-2 font-semibold text-black">{item.nombre}</td>
                  <td className="px-4 py-2 text-black">{Number(item.cantidad).toLocaleString('es-AR')}</td>
                  <td className="px-4 py-2 text-black">
                    ${Number(item.precio).toLocaleString('es-AR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-4 py-2 text-black">
                    {new Date(item.fechaCompra).toLocaleString('es-AR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="px-4 py-2 text-black">{item.tipoActivo}</td>
                  <td className="px-4 py-2 font-semibold text-green-700">
                    ${(item.cantidad * item.precio).toLocaleString('es-AR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      className="px-3 py-1 text-xs font-semibold text-white transition-colors bg-red-500 rounded shadow hover:bg-red-600"
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
        
        {/* Componente de paginación */}
        {items.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={goToPage}
            onItemsPerPageChange={setItemsPerPage}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            onNextPage={nextPage}
            onPrevPage={prevPage}
          />
        )}
      </div>
    </div>
  );
};