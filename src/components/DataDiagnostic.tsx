import React, { useState, useEffect } from 'react';
import { dataService } from '../services/dataService';

/**
 * Componente para diagnosticar y resolver problemas de sincronización de datos
 */
const DataDiagnostic: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [dataSummary, setDataSummary] = useState<{
    portfolioItems: number;
    subscriptionPlan: string;
    dataIntegrity: boolean;
  } | null>(null);
  const [keysFound, setKeysFound] = useState<string[]>([]);
  
  // Verificar si hay problemas de datos al cargar
  useEffect(() => {
    const checkForIssues = async () => {
      const currentUserId = localStorage.getItem('userId');
      setUserId(currentUserId);
      
      if (currentUserId) {
        // Obtener resumen de datos
        const summary = await dataService.getDataSummary(currentUserId);
        setDataSummary(summary);
        
        // Mostrar panel de diagnóstico si hay problemas
        if (!summary.dataIntegrity || summary.portfolioItems === 0) {
          setIsVisible(true);
        }
        
        // Buscar todas las claves relacionadas con el portfolio
        const allKeys: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && (key.includes('portfolio') || key.includes('backup'))) {
            allKeys.push(key);
          }
        }
        setKeysFound(allKeys);
      }
    };
    
    checkForIssues();
  }, []);
  
  // Si no hay problemas o el usuario cerró el panel, no mostrar nada
  if (!isVisible) {
    return null;
  }
  
  // Función para intentar recuperar datos
  const handleRecoveryAttempt = async () => {
    if (!userId) return;
    
    try {
      // Intentar restaurar datos usando todas las estrategias
      await dataService.initializeUserData(userId);
      
      // Verificar si se recuperaron datos
      const summary = await dataService.getDataSummary(userId);
      setDataSummary(summary);
      
      if (summary.portfolioItems > 0) {
        alert('¡Datos recuperados exitosamente!');
        // Disparar evento para que otros componentes se actualicen
        window.dispatchEvent(new CustomEvent('refreshUserData'));
      } else {
        alert('No se pudieron recuperar datos automáticamente');
      }
    } catch (error) {
      console.error('Error en recuperación:', error);
      alert('Error al intentar recuperar datos');
    }
  };

  // Función para forzar la reconstrucción de datos
  const handleDataRebuild = () => {
    if (!userId) return;
    
    // Buscar cualquier clave de backup o portfolio para este usuario
    const portfolioData: PortfolioItem[] = [];
    
    keysFound.forEach(key => {
      try {
        const data = localStorage.getItem(key);
        if (data) {
          const parsed = JSON.parse(data);
          if (Array.isArray(parsed) && parsed.length > 0) {
            // Añadir al conjunto total de datos
            portfolioData.push(...parsed);
          }
        }
      } catch (e) {
        console.error(`Error procesando clave ${key}:`, e);
      }
    });
    
    // Eliminar duplicados por ticker
    const uniqueItems = portfolioData.reduce((acc, current) => {
      const tickerKey = current.ticker || current.asset?.symbol || '';
      if (!acc.find(item => (item.ticker || item.asset?.symbol) === tickerKey)) {
        acc.push(current);
      }
      return acc;
    }, [] as PortfolioItem[]);
    
    // Guardar conjunto reconstruido
    if (uniqueItems.length > 0) {
      localStorage.setItem(`portfolio_${userId}`, JSON.stringify(uniqueItems));
      alert(`Reconstruidos ${uniqueItems.length} activos de ${portfolioData.length} encontrados.`);
      
      // Refrescar datos
      window.dispatchEvent(new CustomEvent('refreshUserData'));
      setIsVisible(false);
    } else {
      alert('No se encontraron datos para reconstruir.');
    }
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Diagnóstico de Datos</h2>
        
        <div className="mb-4 text-sm">
          <p className="mb-2">Se ha detectado un posible problema con sus datos.</p>
          
          {dataSummary && (
            <div className="bg-gray-700 p-3 rounded mb-3">
              <p>Activos en portfolio: <span className="font-bold">{dataSummary.portfolioItems}</span></p>
              <p>Plan actual: <span className="font-bold">{dataSummary.subscriptionPlan}</span></p>
              <p>Integridad de datos: <span className={`font-bold ${dataSummary.dataIntegrity ? 'text-green-400' : 'text-red-400'}`}>
                {dataSummary.dataIntegrity ? 'OK' : 'Problema detectado'}
              </span></p>
            </div>
          )}
          
          {keysFound.length > 0 && (
            <div className="bg-gray-700 p-3 rounded mb-3">
              <p className="mb-2">Claves encontradas:</p>
              <ul className="text-xs">
                {keysFound.map((key) => (
                  <li key={key} className="mb-1">• {key}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="flex flex-col gap-3">
          <button 
            onClick={handleRecoveryAttempt}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Intentar Recuperación Automática
          </button>
          
          <button 
            onClick={handleDataRebuild}
            className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded"
          >
            Reconstruir Datos
          </button>
          
          <button 
            onClick={() => setIsVisible(false)}
            className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataDiagnostic;

// Tipo para PortfolioItem (simplificado)
interface PortfolioItem {
  id?: string;
  ticker?: string;
  nombre?: string;
  quantity: number;
  purchasePrice: number;
  tipoActivo?: string;
  asset?: {
    symbol?: string;
    name?: string;
    type?: string;
  };
}
