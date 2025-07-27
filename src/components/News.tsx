import { useEffect, useState } from "react";
import { newsService, NewsArticle } from "../services/newsService";
import toast from 'react-hot-toast';

export const News = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'crypto' | 'stocks'>('all');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchNews = async (category: 'all' | 'crypto' | 'stocks' = 'all') => {
    try {
      setLoading(true);
      const newsCategory = category === 'all' ? 'general' : category;
      const response = await newsService.getNewsByCategory(newsCategory as 'crypto' | 'stocks' | 'economy' | 'general');
      
      if (response.status === 'ok') {
        setNews(response.articles);
        setLastUpdated(new Date());
        
        if (response.message) {
          toast(response.message, { icon: 'ℹ️' });
        }
      } else {
        toast.error('Error al cargar noticias');
        setNews([]);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      toast.error('Error de conexión al obtener noticias');
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (category: 'all' | 'crypto' | 'stocks') => {
    setSelectedCategory(category);
  };

  const handleRefresh = () => {
    fetchNews(selectedCategory);
    toast.success('Noticias actualizadas');
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'crypto': return '₿';
      case 'stocks': return '📈';
      case 'general': return '📰';
      default: return '💼';
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'crypto': return 'text-orange-600 bg-orange-100';
      case 'stocks': return 'text-blue-600 bg-blue-100'; 
      case 'general': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Hace menos de 1 hora';
    } else if (diffInHours < 24) {
      return `Hace ${Math.floor(diffInHours)} horas`;
    } else {
      return date.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto my-8">
        <div className="flex items-center justify-center py-12">
          <div className="inline-block w-8 h-8 mr-3 animate-spin border-4 border-blue-500 border-t-transparent rounded-full"></div>
          <span className="text-lg text-gray-600">Cargando noticias financieras...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-8 px-4">
      {/* Header con filtros */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            📰 Noticias Financieras
          </h2>
          <button
            onClick={handleRefresh}
            className="flex items-center px-4 py-2 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Actualizar
          </button>
        </div>

        {/* Filtros de categoría */}
        <div className="flex space-x-2 mb-4">
          {([
            { key: 'all' as const, label: '🌍 Todas', desc: 'Todas las noticias' },
            { key: 'crypto' as const, label: '₿ Crypto', desc: 'Criptomonedas' },
            { key: 'stocks' as const, label: '📈 Acciones', desc: 'Mercado de valores' }
          ]).map((filter) => (
            <button
              key={filter.key}
              onClick={() => handleCategoryChange(filter.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === filter.key
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title={filter.desc}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Información de actualización */}
        {lastUpdated && (
          <div className="text-sm text-gray-500">
            Última actualización: {lastUpdated.toLocaleTimeString('es-ES')}
          </div>
        )}
      </div>

      {/* Lista de noticias */}
      {news.length === 0 ? (
        <div className="p-8 text-center bg-gray-50 rounded-xl">
          <div className="text-6xl mb-4">📰</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No hay noticias disponibles
          </h3>
          <p className="text-gray-500 mb-4">
            No se pudieron cargar noticias en este momento. Inténtalo más tarde.
          </p>
          <button
            onClick={handleRefresh}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Reintentar
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {news.map((article, index) => (
            <article key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
              <div className="p-6">
                {/* Categoría y fuente */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(article.category)}`}>
                      {getCategoryIcon(article.category)} {article.category === 'crypto' ? 'Crypto' : article.category === 'stocks' ? 'Acciones' : 'General'}
                    </span>
                    <span className="text-sm text-gray-500">
                      {article.source.name}
                    </span>
                  </div>
                  <time className="text-sm text-gray-400">
                    {formatDate(article.publishedAt)}
                  </time>
                </div>

                {/* Título */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 transition-colors"
                  >
                    {article.title}
                  </a>
                </h3>

                {/* Descripción */}
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {article.description}
                </p>

                {/* Acciones */}
                <div className="flex items-center justify-between">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    Leer más
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  
                  <div className="flex items-center space-x-2 text-gray-400">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" title="Compartir">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Footer informativo */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg text-center">
        <p className="text-sm text-blue-700">
          💡 <strong>Fuentes:</strong> CoinDesk, Yahoo Finance, Reddit Finance
        </p>
        <p className="text-xs text-blue-600 mt-1">
          Las noticias se actualizan automáticamente cada 5 minutos
        </p>
      </div>
    </div>
  );
};