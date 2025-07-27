import { useEffect, useState } from "react";
import { realTimeDataService } from "../services/realTimeDataService";

interface CryptoPrice {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h?: number;
}

export const BitcoinPrice = () => {
    const [cryptos, setCryptos] = useState<CryptoPrice[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                setLoading(true);
                
                // Obtener precios de las principales criptos
                const mainCryptos = ['bitcoin', 'ethereum', 'binancecoin'];
                const prices = await realTimeDataService.getMultipleCryptoPrices(mainCryptos);
                
                // Obtener datos adicionales si es necesario
                const cryptoData: CryptoPrice[] = [
                    {
                        id: 'bitcoin',
                        name: 'Bitcoin',
                        symbol: 'BTC',
                        price: prices.bitcoin || 0
                    },
                    {
                        id: 'ethereum',
                        name: 'Ethereum', 
                        symbol: 'ETH',
                        price: prices.ethereum || 0
                    },
                    {
                        id: 'binancecoin',
                        name: 'Binance Coin',
                        symbol: 'BNB', 
                        price: prices.binancecoin || 0
                    }
                ].filter(crypto => crypto.price > 0);
                
                setCryptos(cryptoData);
            } catch (error) {
                console.error('Error fetching crypto prices:', error);
                // Fallback data
                setCryptos([
                    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', price: 43000 }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchPrices(); // Cargar inmediatamente
        const interval = setInterval(fetchPrices, 30000); // Actualizar cada 30 segundos

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="p-4 text-center bg-gray-50 rounded-lg">
                <div className="inline-block w-4 h-4 mr-2 animate-spin border-2 border-blue-500 border-t-transparent rounded-full"></div>
                Cargando precios de criptomonedas...
            </div>
        );
    }

    return (
        <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-700">
                    📊 Precios en Tiempo Real
                </h3>
                <span className="px-2 py-1 text-xs text-green-700 bg-green-100 rounded-full">
                    🔄 Actualizado
                </span>
            </div>
            
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {cryptos.map((crypto) => (
                    <div 
                        key={crypto.id}
                        className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-100"
                    >
                        <div className="flex items-center space-x-2">
                            <span className="text-lg">
                                {crypto.symbol === 'BTC' ? '₿' : 
                                 crypto.symbol === 'ETH' ? 'Ξ' : '🪙'}
                            </span>
                            <div>
                                <div className="font-medium text-gray-900 text-sm">
                                    {crypto.symbol}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {crypto.name}
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="font-bold text-green-600">
                                ${crypto.price.toLocaleString('es-AR', { 
                                    minimumFractionDigits: 2, 
                                    maximumFractionDigits: 2 
                                })}
                            </div>
                            <div className="text-xs text-gray-400">USD</div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-3 text-xs text-center text-gray-500">
                💡 Los precios se actualizan automáticamente cada 30 segundos
            </div>
        </div>
    );
};