/**
 * Servicio para obtener datos en tiempo real de criptomonedas y acciones
 * Integra múltiples APIs para máxima cobertura
 */

// Interfaces para los datos
export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  image?: string;
}

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  currency: string;
}

export interface AssetSearchResult {
  id: string;
  symbol: string;
  name: string;
  type: 'crypto' | 'stock';
  price?: number;
  market?: string;
}

class RealTimeDataService {
  private static instance: RealTimeDataService;
  
  // APIs configuration
  private readonly APIs = {
    COINGECKO: 'https://api.coingecko.com/api/v3',
    ALPHA_VANTAGE: 'https://www.alphavantage.co/query',
    YAHOO_FINANCE: 'https://query1.finance.yahoo.com/v8/finance/chart',
    TWELVE_DATA: 'https://api.twelvedata.com/v1'
  };

  // Cache para evitar llamadas excesivas
  private cache = new Map<string, { data: any; timestamp: number }>();
  private readonly CACHE_DURATION = 30000; // 30 segundos

  static getInstance(): RealTimeDataService {
    if (!RealTimeDataService.instance) {
      RealTimeDataService.instance = new RealTimeDataService();
    }
    return RealTimeDataService.instance;
  }

  /**
   * Obtiene lista de todas las criptomonedas disponibles
   */
  async getAllCryptos(): Promise<CryptoData[]> {
    const cacheKey = 'all_cryptos';
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    try {
      const response = await fetch(
        `${this.APIs.COINGECKO}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false`
      );
      
      if (!response.ok) throw new Error('Failed to fetch cryptos');
      
      const data = await response.json();
      this.setCache(cacheKey, data);
      return data;
    } catch (error) {
      console.warn('CoinGecko API failed, using fallback data');
      return this.getFallbackCryptos();
    }
  }

  /**
   * Busca criptomonedas por nombre o símbolo
   */
  async searchCryptos(query: string): Promise<AssetSearchResult[]> {
    try {
      const response = await fetch(
        `${this.APIs.COINGECKO}/search?query=${encodeURIComponent(query)}`
      );
      
      if (!response.ok) throw new Error('Search failed');
      
      const data = await response.json();
      
      return data.coins.slice(0, 20).map((coin: any) => ({
        id: coin.id,
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        type: 'crypto' as const,
        market: 'CoinGecko'
      }));
    } catch (error) {
      console.error('Crypto search failed:', error);
      return [];
    }
  }

  /**
   * Obtiene precio actual de una criptomoneda
   */
  async getCryptoPrice(cryptoId: string): Promise<number | null> {
    const cacheKey = `crypto_price_${cryptoId}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    try {
      const response = await fetch(
        `${this.APIs.COINGECKO}/simple/price?ids=${cryptoId}&vs_currencies=usd`
      );
      
      if (!response.ok) throw new Error('Price fetch failed');
      
      const data = await response.json();
      const price = data[cryptoId]?.usd;
      
      if (price) {
        this.setCache(cacheKey, price);
        return price;
      }
      
      return null;
    } catch (error) {
      console.error(`Failed to get price for ${cryptoId}:`, error);
      return null;
    }
  }

  /**
   * Obtiene múltiples precios de criptos de una vez
   */
  async getMultipleCryptoPrices(cryptoIds: string[]): Promise<Record<string, number>> {
    try {
      const idsString = cryptoIds.join(',');
      const response = await fetch(
        `${this.APIs.COINGECKO}/simple/price?ids=${idsString}&vs_currencies=usd`
      );
      
      if (!response.ok) throw new Error('Bulk price fetch failed');
      
      const data = await response.json();
      const prices: Record<string, number> = {};
      
      for (const [id, priceData] of Object.entries(data)) {
        if (typeof priceData === 'object' && priceData !== null && 'usd' in priceData) {
          prices[id] = (priceData as any).usd;
        }
      }
      
      return prices;
    } catch (error) {
      console.error('Bulk crypto price fetch failed:', error);
      return {};
    }
  }

  /**
   * Busca acciones por símbolo o nombre
   */
  async searchStocks(query: string): Promise<AssetSearchResult[]> {
    try {
      // Usar API gratuita de búsqueda de acciones
      const response = await fetch(
        `https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(query)}&quotesCount=15&newsCount=0`
      );
      
      if (!response.ok) throw new Error('Stock search failed');
      
      const data = await response.json();
      
      return data.quotes.map((quote: any) => ({
        id: quote.symbol,
        symbol: quote.symbol,
        name: quote.longname || quote.shortname || quote.symbol,
        type: 'stock' as const,
        market: quote.exchange || 'Unknown'
      }));
    } catch (error) {
      console.warn('Yahoo Finance search failed, using fallback');
      return this.getFallbackStocks(query);
    }
  }

  /**
   * Obtiene precio actual de una acción
   */
  async getStockPrice(symbol: string): Promise<number | null> {
    const cacheKey = `stock_price_${symbol}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    try {
      // Intentar con Yahoo Finance primero
      const response = await fetch(
        `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`
      );
      
      if (!response.ok) throw new Error('Stock price fetch failed');
      
      const data = await response.json();
      const result = data.chart?.result?.[0];
      const price = result?.meta?.regularMarketPrice;
      
      if (price) {
        this.setCache(cacheKey, price);
        return price;
      }
      
      return null;
    } catch (error) {
      console.error(`Failed to get stock price for ${symbol}:`, error);
      return null;
    }
  }

  /**
   * Obtiene precios de múltiples acciones
   */
  async getMultipleStockPrices(symbols: string[]): Promise<Record<string, number>> {
    const prices: Record<string, number> = {};
    
    // Yahoo Finance permite múltiples símbolos separados por coma
    try {
      const symbolsString = symbols.join(',');
      const response = await fetch(
        `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbolsString}`
      );
      
      if (!response.ok) throw new Error('Bulk stock price fetch failed');
      
      const data = await response.json();
      const quotes = data.quoteResponse?.result || [];
      
      for (const quote of quotes) {
        if (quote.symbol && quote.regularMarketPrice) {
          prices[quote.symbol] = quote.regularMarketPrice;
        }
      }
    } catch (error) {
      console.error('Bulk stock price fetch failed:', error);
      
      // Fallback: obtener precios uno por uno
      for (const symbol of symbols) {
        const price = await this.getStockPrice(symbol);
        if (price) {
          prices[symbol] = price;
        }
      }
    }
    
    return prices;
  }

  /**
   * Búsqueda universal de activos (cryptos + stocks)
   */
  async searchAssets(query: string): Promise<AssetSearchResult[]> {
    const [cryptos, stocks] = await Promise.all([
      this.searchCryptos(query),
      this.searchStocks(query)
    ]);
    
    return [...cryptos, ...stocks].slice(0, 30); // Limitar a 30 resultados
  }

  /**
   * Obtiene precio de cualquier activo (crypto o stock)
   */
  async getAssetPrice(symbol: string, type: 'crypto' | 'stock'): Promise<number | null> {
    if (type === 'crypto') {
      return this.getCryptoPrice(symbol);
    } else {
      return this.getStockPrice(symbol);
    }
  }

  // Métodos de cache
  private getFromCache(key: string): any {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }
    return null;
  }

  private setCache(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  // Datos de fallback cuando las APIs fallan
  private getFallbackCryptos(): CryptoData[] {
    return [
      { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', current_price: 45000, market_cap: 0, price_change_percentage_24h: 0 },
      { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', current_price: 3000, market_cap: 0, price_change_percentage_24h: 0 },
      { id: 'binancecoin', symbol: 'BNB', name: 'Binance Coin', current_price: 300, market_cap: 0, price_change_percentage_24h: 0 },
      { id: 'cardano', symbol: 'ADA', name: 'Cardano', current_price: 0.5, market_cap: 0, price_change_percentage_24h: 0 },
      { id: 'solana', symbol: 'SOL', name: 'Solana', current_price: 100, market_cap: 0, price_change_percentage_24h: 0 }
    ];
  }

  private getFallbackStocks(query: string): AssetSearchResult[] {
    const fallbackStocks = [
      { id: 'AAPL', symbol: 'AAPL', name: 'Apple Inc.', type: 'stock' as const, market: 'NASDAQ' },
      { id: 'GOOGL', symbol: 'GOOGL', name: 'Alphabet Inc.', type: 'stock' as const, market: 'NASDAQ' },
      { id: 'MSFT', symbol: 'MSFT', name: 'Microsoft Corporation', type: 'stock' as const, market: 'NASDAQ' },
      { id: 'TSLA', symbol: 'TSLA', name: 'Tesla Inc.', type: 'stock' as const, market: 'NASDAQ' },
      { id: 'AMZN', symbol: 'AMZN', name: 'Amazon.com Inc.', type: 'stock' as const, market: 'NASDAQ' }
    ];
    
    return fallbackStocks.filter(stock => 
      stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
      stock.name.toLowerCase().includes(query.toLowerCase())
    );
  }
}

export const realTimeDataService = RealTimeDataService.getInstance();
