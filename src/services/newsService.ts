/**
 * Servicio de noticias financieras simplificado y funcional
 */

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: {
    name: string;
    url?: string;
  };
  imageUrl?: string;
  category?: 'crypto' | 'stocks' | 'economy' | 'general';
}

export interface NewsResponse {
  articles: NewsArticle[];
  totalResults?: number;
  status: 'ok' | 'error';
  message?: string;
}

class NewsService {
  private static instance: NewsService;
  private cache: Map<string, { data: NewsResponse; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

  private constructor() {}

  static getInstance(): NewsService {
    if (!NewsService.instance) {
      NewsService.instance = new NewsService();
    }
    return NewsService.instance;
  }

  /**
   * Obtiene noticias por categoría
   */
  async getNewsByCategory(category: 'crypto' | 'stocks' | 'economy' | 'general' = 'general'): Promise<NewsResponse> {
    const cacheKey = `news_${category}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }

    try {
      let articles: NewsArticle[] = [];

      switch (category) {
        case 'crypto': {
          articles = this.generateCryptoNews();
          break;
        }
        case 'stocks': {
          articles = this.generateStockNews();
          break;
        }
        case 'economy': {
          articles = this.generateEconomyNews();
          break;
        }
        case 'general': {
          const cryptoNews = this.generateCryptoNews().slice(0, 3);
          const stockNews = this.generateStockNews().slice(0, 3);
          const economyNews = this.generateEconomyNews().slice(0, 2);
          articles = [...cryptoNews, ...stockNews, ...economyNews];
          break;
        }
      }

      // Ordenar por fecha de publicación
      articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

      const response: NewsResponse = {
        articles: articles.slice(0, 20),
        totalResults: articles.length,
        status: 'ok'
      };

      // Guardar en cache
      this.cache.set(cacheKey, { data: response, timestamp: Date.now() });
      
      return response;
      
    } catch (error) {
      console.error(`Error obteniendo noticias de ${category}:`, error);
      return {
        articles: [],
        totalResults: 0,
        status: 'error',
        message: `Error al cargar noticias de ${category}`
      };
    }
  }

  /**
   * Genera noticias de criptomonedas
   */
  private generateCryptoNews(): NewsArticle[] {
    const cryptoData = [
      { name: 'Bitcoin', symbol: 'BTC', price: 43500, change: 2.3 },
      { name: 'Ethereum', symbol: 'ETH', price: 2650, change: 1.8 },
      { name: 'BNB', symbol: 'BNB', price: 245, change: -0.5 },
      { name: 'Solana', symbol: 'SOL', price: 98, change: 4.2 },
      { name: 'Cardano', symbol: 'ADA', price: 0.48, change: 1.1 },
      { name: 'XRP', symbol: 'XRP', price: 0.62, change: -1.2 },
      { name: 'Dogecoin', symbol: 'DOGE', price: 0.08, change: 3.5 },
      { name: 'Polygon', symbol: 'MATIC', price: 0.85, change: 2.1 }
    ];

    const now = Date.now();
    
    return cryptoData.map((crypto, index) => {
      const isPositive = crypto.change > 0;
      const changeAbs = Math.abs(crypto.change);
      
      let title = '';
      let description = '';
      
      if (changeAbs > 3) {
        title = `${crypto.name} registra ${isPositive ? 'ganancias' : 'pérdidas'} del ${changeAbs.toFixed(1)}% ${isPositive ? '📈' : '📉'}`;
        description = `${crypto.name} (${crypto.symbol}) muestra una ${isPositive ? 'fuerte subida' : 'notable caída'} del ${changeAbs.toFixed(2)}% en las últimas 24 horas, cotizando a $${crypto.price.toLocaleString()}.`;
      } else if (changeAbs > 1) {
        title = `${crypto.name} ${isPositive ? 'avanza' : 'retrocede'} ${changeAbs.toFixed(1)}% en sesión activa`;
        description = `Los traders siguen de cerca ${crypto.name} tras mostrar un ${isPositive ? 'repunte' : 'ajuste'} del ${changeAbs.toFixed(2)}%. El precio actual es de $${crypto.price.toLocaleString()}.`;
      } else {
        title = `${crypto.name} se consolida cerca de los $${crypto.price.toLocaleString()}`;
        description = `${crypto.name} mantiene estabilidad relativa con cambios menores del ${changeAbs.toFixed(2)}%. Los analistas observan posibles niveles de soporte y resistencia.`;
      }

      return {
        title,
        description,
        url: `https://www.coingecko.com/es/monedas/${crypto.symbol.toLowerCase()}`,
        publishedAt: new Date(now - index * 1800000).toISOString(),
        source: {
          name: 'Crypto Market Analysis',
          url: 'https://www.coingecko.com'
        },
        category: 'crypto' as const
      };
    });
  }

  /**
   * Genera noticias de acciones
   */
  private generateStockNews(): NewsArticle[] {
    const stockData = [
      { name: 'Apple Inc.', symbol: 'AAPL', price: 175, change: 1.2, sector: 'Tecnología' },
      { name: 'Alphabet Inc.', symbol: 'GOOGL', price: 142, change: 0.8, sector: 'Tecnología' },
      { name: 'Microsoft Corp.', symbol: 'MSFT', price: 378, change: 1.5, sector: 'Tecnología' },
      { name: 'Tesla Inc.', symbol: 'TSLA', price: 248, change: -2.1, sector: 'Automotriz' },
      { name: 'Amazon.com Inc.', symbol: 'AMZN', price: 156, change: 0.9, sector: 'E-commerce' },
      { name: 'Meta Platforms Inc.', symbol: 'META', price: 485, change: 2.3, sector: 'Redes Sociales' },
      { name: 'NVIDIA Corp.', symbol: 'NVDA', price: 875, change: 3.1, sector: 'Semiconductores' },
      { name: 'Netflix Inc.', symbol: 'NFLX', price: 485, change: -0.7, sector: 'Entretenimiento' }
    ];

    const now = Date.now();
    
    return stockData.map((stock, index) => {
      const isPositive = stock.change > 0;
      const changeAbs = Math.abs(stock.change);
      
      let title = '';
      let description = '';
      
      if (changeAbs > 2) {
        title = `${stock.name} ${isPositive ? 'dispara' : 'cae'} ${changeAbs.toFixed(1)}% en Wall Street ${isPositive ? '🚀' : '📉'}`;
        description = `Las acciones de ${stock.name}, líder del sector ${stock.sector}, registran un ${isPositive ? 'fuerte avance' : 'retroceso significativo'} del ${changeAbs.toFixed(2)}%. Los inversores evalúan el impacto en el sector.`;
      } else if (changeAbs > 0.5) {
        title = `${stock.name} muestra ${isPositive ? 'fortaleza' : 'debilidad'} con ${isPositive ? '+' : ''}${stock.change.toFixed(1)}%`;
        description = `${stock.name} cotiza con ${isPositive ? 'ganancias' : 'pérdidas'} del ${changeAbs.toFixed(2)}% en la sesión. Los analistas mantienen seguimiento del sector ${stock.sector}.`;
      } else {
        title = `${stock.name} mantiene estabilidad en sesión de trading`;
        description = `${stock.name} muestra movimientos contenidos con variación del ${stock.change.toFixed(2)}%. El sector ${stock.sector} presenta comportamiento mixto.`;
      }

      return {
        title,
        description,
        url: `https://finance.yahoo.com/quote/${stock.symbol}`,
        publishedAt: new Date(now - index * 2100000).toISOString(),
        source: {
          name: 'Wall Street Analysis',
          url: 'https://finance.yahoo.com'
        },
        category: 'stocks' as const
      };
    });
  }

  /**
   * Genera noticias económicas generales
   */
  private generateEconomyNews(): NewsArticle[] {
    const economicTopics = [
      {
        title: "Indicadores macroeconómicos sugieren crecimiento sostenido",
        description: "Los principales indicadores económicos globales muestran señales positivas, con mejoras en empleo y producción industrial en las principales economías."
      },
      {
        title: "Bancos centrales evalúan políticas monetarias ante nueva coyuntura",
        description: "Las autoridades monetarias globales analizan ajustes en sus políticas para mantener estabilidad de precios y crecimiento económico equilibrado."
      },
      {
        title: "Mercados emergentes atraen mayor flujo de inversiones",
        description: "Los mercados emergentes registran incremento en el interés de inversores institucionales, impulsados por fundamentales económicos mejorados."
      },
      {
        title: "Sector energético experimenta transformación hacia renovables",
        description: "La transición energética se acelera con nuevas inversiones en tecnologías limpias y reducción de dependencia de combustibles fósiles."
      },
      {
        title: "Inflación global muestra signos de moderación gradual",
        description: "Los datos recientes sugieren una desaceleración en las presiones inflacionarias, ofreciendo esperanzas de estabilización en los precios."
      },
      {
        title: "Comercio internacional se recupera tras incertidumbres previas",
        description: "Los flujos comerciales globales muestran recuperación, con incrementos en exportaciones e importaciones entre las principales economías."
      }
    ];

    const now = Date.now();
    
    return economicTopics.map((topic, index) => ({
      title: topic.title,
      description: topic.description,
      url: "https://finance.yahoo.com/news",
      publishedAt: new Date(now - index * 4800000).toISOString(),
      source: {
        name: 'Análisis Económico Global',
        url: 'https://finance.yahoo.com'
      },
      category: 'economy' as const
    }));
  }

  /**
   * Búsqueda de noticias por término
   */
  async searchNews(query: string, category?: string): Promise<NewsResponse> {
    try {
      const allCategories: ('crypto' | 'stocks' | 'economy' | 'general')[] = 
        category ? [category as 'crypto' | 'stocks' | 'economy' | 'general'] : ['crypto', 'stocks', 'economy', 'general'];

      const searchPromises = allCategories.map(cat => this.getNewsByCategory(cat));
      const results = await Promise.all(searchPromises);

      const allArticles = results.flatMap(result => result.articles);
      const filteredArticles = allArticles.filter(article =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.description.toLowerCase().includes(query.toLowerCase())
      );

      return {
        articles: filteredArticles.slice(0, 20),
        totalResults: filteredArticles.length,
        status: 'ok'
      };

    } catch (error) {
      console.error('Error en búsqueda de noticias:', error);
      return {
        articles: [],
        totalResults: 0,
        status: 'error',
        message: 'Error en la búsqueda'
      };
    }
  }

  /**
   * Limpia la cache de noticias
   */
  clearCache(): void {
    this.cache.clear();
  }
}

// Exportar instancia singleton
export const newsService = NewsService.getInstance();
export default newsService;
