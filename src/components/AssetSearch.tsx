import React, { useState, useEffect, useCallback, useRef } from 'react';
import { realTimeDataService, AssetSearchResult } from '../services/realTimeDataService';

interface AssetSearchProps {
  onAssetSelect: (asset: AssetSearchResult & { price?: number }) => void;
  placeholder?: string;
}

export const AssetSearch: React.FC<AssetSearchProps> = ({ 
  onAssetSelect, 
  placeholder = "Buscar cripto o acción..." 
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<AssetSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const debounceRef = useRef<number | null>(null);

  // Función de búsqueda con debounce manual
  const searchAssets = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const searchResults = await realTimeDataService.searchAssets(searchQuery);
      setResults(searchResults);
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Limpiar timeout anterior
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Configurar nuevo timeout
    debounceRef.current = window.setTimeout(() => {
      searchAssets(query);
    }, 300);

    // Cleanup
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, searchAssets]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowResults(true);
    setSelectedIndex(-1);
  };

  const handleAssetSelect = async (asset: AssetSearchResult) => {
    setQuery('');
    setShowResults(false);
    setResults([]);
    
    try {
      // Obtener precio actual del activo
      const price = await realTimeDataService.getAssetPrice(
        asset.type === 'crypto' ? asset.id : asset.symbol, 
        asset.type
      );
      
      onAssetSelect({ ...asset, price: price || undefined });
    } catch (error) {
      console.error('Error getting asset price:', error);
      onAssetSelect(asset);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleAssetSelect(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowResults(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleBlur = () => {
    // Delay para permitir clicks en los resultados
    setTimeout(() => {
      setShowResults(false);
      setSelectedIndex(-1);
    }, 200);
  };

  const getAssetIcon = (asset: AssetSearchResult) => {
    if (asset.type === 'crypto') {
      return '₿'; // Bitcoin symbol for cryptos
    } else {
      return '📈'; // Chart symbol for stocks
    }
  };

  const getAssetTypeColor = (type: string) => {
    return type === 'crypto' ? 'text-orange-600' : 'text-blue-600';
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowResults(true)}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          autoComplete="off"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Resultados de búsqueda */}
      {showResults && (query.length >= 2) && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {loading && (
            <div className="px-4 py-3 text-center text-gray-500">
              <div className="inline-block w-4 h-4 mr-2 animate-spin border-2 border-blue-500 border-t-transparent rounded-full"></div>
              Buscando activos...
            </div>
          )}

          {!loading && results.length === 0 && query.length >= 2 && (
            <div className="px-4 py-3 text-center text-gray-500">
              No se encontraron activos para "{query}"
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="py-1">
              {results.map((asset, index) => (
                <button
                  key={`${asset.type}-${asset.id}`}
                  onClick={() => handleAssetSelect(asset)}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                    index === selectedIndex ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{getAssetIcon(asset)}</span>
                      <div>
                        <div className="font-medium text-gray-900">
                          {asset.name}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span className="font-mono">{asset.symbol}</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            asset.type === 'crypto' 
                              ? 'bg-orange-100 text-orange-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {asset.type === 'crypto' ? 'Crypto' : 'Acción'}
                          </span>
                          {asset.market && (
                            <span className="text-xs text-gray-400">
                              {asset.market}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${getAssetTypeColor(asset.type)}`}>
                        {asset.type === 'crypto' ? 'Criptomoneda' : 'Acción'}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Información adicional */}
          <div className="px-4 py-2 text-xs text-gray-400 border-t border-gray-100">
            💡 Usa las flechas ↑↓ para navegar, Enter para seleccionar
          </div>
        </div>
      )}
    </div>
  );
};
