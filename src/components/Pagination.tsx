import { FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onNextPage: () => void;
  onPrevPage: () => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  hasNextPage,
  hasPrevPage,
  onNextPage,
  onPrevPage,
}: PaginationProps) => {
  // Opciones para elementos por página
  const itemsPerPageOptions = [5, 10, 15, 20, 25, 50];

  // Calcular el rango de elementos mostrados
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generar números de página para mostrar
  const getPageNumbers = () => {
    const maxVisible = 5;
    const pages: (number | string)[] = [];
    
    if (totalPages <= maxVisible) {
      // Si hay pocas páginas, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Lógica para páginas con puntos suspensivos
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);
      
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push('...');
        }
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push('...');
        }
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  if (totalPages <= 1) {
    return null; // No mostrar paginación si hay 1 página o menos
  }

  return (
    <div className="flex flex-col items-center justify-between gap-4 px-4 py-3 bg-white border-t border-gray-200 sm:flex-row sm:px-6">
      {/* Información de elementos */}
      <div className="flex items-center gap-4 text-sm text-gray-700">
        <div>
          Mostrando <span className="font-medium">{startItem}</span> a{' '}
          <span className="font-medium">{endItem}</span> de{' '}
          <span className="font-medium">{totalItems}</span> activos
        </div>
        
        {/* Selector de elementos por página */}
        <div className="flex items-center gap-2">
          <label htmlFor="itemsPerPage" className="text-sm text-gray-700">
            Por página:
          </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Controles de navegación */}
      <div className="flex items-center gap-2">
        {/* Botón primera página */}
        <button
          onClick={() => onPageChange(1)}
          disabled={!hasPrevPage}
          className="p-2 text-gray-400 transition-colors rounded-md hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          title="Primera página"
        >
          <FaAngleDoubleLeft className="w-4 h-4" />
        </button>

        {/* Botón página anterior */}
        <button
          onClick={onPrevPage}
          disabled={!hasPrevPage}
          className="p-2 text-gray-400 transition-colors rounded-md hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          title="Página anterior"
        >
          <FaChevronLeft className="w-4 h-4" />
        </button>

        {/* Números de página */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' ? onPageChange(page) : undefined}
              disabled={typeof page === 'string'}
              className={`
                px-3 py-2 text-sm rounded-md transition-colors
                ${
                  page === currentPage
                    ? 'bg-blue-600 text-white'
                    : typeof page === 'string'
                    ? 'text-gray-400 cursor-default'
                    : 'text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Botón página siguiente */}
        <button
          onClick={onNextPage}
          disabled={!hasNextPage}
          className="p-2 text-gray-400 transition-colors rounded-md hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          title="Página siguiente"
        >
          <FaChevronRight className="w-4 h-4" />
        </button>

        {/* Botón última página */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={!hasNextPage}
          className="p-2 text-gray-400 transition-colors rounded-md hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          title="Última página"
        >
          <FaAngleDoubleRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
