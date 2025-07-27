import { useState, useMemo } from 'react';

interface UsePaginationProps<T> {
  data: T[];
  itemsPerPage: number;
}

interface UsePaginationReturn<T> {
  currentItems: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  setItemsPerPage: (items: number) => void;
  itemsPerPage: number;
}

export const usePagination = <T,>({ 
  data, 
  itemsPerPage: initialItemsPerPage 
}: UsePaginationProps<T>): UsePaginationReturn<T> => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPageState] = useState(initialItemsPerPage);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  const goToPage = (page: number) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  const setItemsPerPage = (items: number) => {
    setItemsPerPageState(items);
    // Ajustar la página actual si es necesario
    const newTotalPages = Math.ceil(totalItems / items);
    if (currentPage > newTotalPages) {
      setCurrentPage(Math.max(1, newTotalPages));
    }
  };

  // Reset to first page when data changes significantly
  const resetToFirstPage = () => setCurrentPage(1);

  // Effect to reset page when data length changes significantly
  useState(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      resetToFirstPage();
    }
  });

  return {
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
  };
};
