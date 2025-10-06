import { useEffect, useState, useCallback } from "react";
import { FaNewspaper, FaSpinner, FaClock, FaExternalLinkAlt, FaExclamationTriangle, FaChartLine, FaBitcoin, FaDollarSign, FaUniversity, FaCheckCircle } from 'react-icons/fa';
import { withBase } from '../services/api';

type NewsItem = {
  title: string;
  url: string;
  publishedAt: string;
  source: { name: string };
  description: string;
  image?: string;
  country?: 'AR' | 'US';  // ← NUEVO
};

type TabType = 'all' | 'AR' | 'US';

// Función para obtener icono según la fuente
const getSourceIcon = (sourceName: string) => {
  const source = sourceName.toLowerCase();
  if (source.includes('cripto') || source.includes('bitcoin') || source.includes('infobae')) {
    return <FaBitcoin className="text-orange-500" />;
  } else if (source.includes('dólar') || source.includes('ambito') || source.includes('ámbito')) {
    return <FaDollarSign className="text-green-500" />;
  } else if (source.includes('banco') || source.includes('nación')) {
    return <FaUniversity className="text-blue-500" />;
  } else {
    return <FaChartLine className="text-industrial-copper" />;
  }
};

// Función para obtener badge de país con colores (MEJORADO)
const getCountryBadge = (country: string | undefined) => {
  if (country === 'AR') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-emerald-500 to-green-500 border-2 border-emerald-300 text-white shadow-lg shadow-emerald-500/40">
        🇦🇷 Argentina
      </span>
    );
  } else if (country === 'US') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-blue-500 to-cyan-500 border-2 border-blue-300 text-white shadow-lg shadow-blue-500/40">
        🇺🇸 USA
      </span>
    );
  }
  return null;
};

// Función para obtener gradiente de tarjeta según país (MEJORADO)
const getCardGradient = (country: string | undefined, isHero: boolean = false) => {
  if (isHero) {
    // Gradientes vibrantes y atractivos para la tarjeta hero
    if (country === 'AR') {
      return 'from-emerald-500/25 via-green-600/15 to-industrial-charcoal';
    } else if (country === 'US') {
      return 'from-blue-500/25 via-cyan-600/15 to-industrial-charcoal';
    }
    return 'from-amber-500/25 via-orange-600/15 to-industrial-charcoal';
  } else {
    // Gradientes más visibles para tarjetas secundarias
    if (country === 'AR') {
      return 'from-emerald-500/15 via-green-600/8 to-industrial-charcoal';
    } else if (country === 'US') {
      return 'from-blue-500/15 via-cyan-600/8 to-industrial-charcoal';
    }
    return 'from-amber-500/15 via-orange-600/8 to-industrial-charcoal';
  }
};

// Función para obtener color de borde según país (MEJORADO)
const getBorderColor = (country: string | undefined) => {
  if (country === 'AR') return 'border-emerald-500/30 hover:border-emerald-400/70 hover:shadow-emerald-500/20';
  if (country === 'US') return 'border-blue-500/30 hover:border-blue-400/70 hover:shadow-blue-500/20';
  return 'border-amber-500/30 hover:border-amber-400/70 hover:shadow-amber-500/20';
};

// Función para acortar descripción
const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

// Función para filtrar noticias irrelevantes (EXTREMADAMENTE LIGERA)
const isRelevantNews = (article: NewsItem): boolean => {
  const title = article.title.toLowerCase();
  
  // Solo filtrar si el título LITERALMENTE es sobre quiniela
  // Prácticamente no filtrar nada
  const veryIrrelevantKeywords = [
    'ganó la quiniela',
    'ganador de la quiniela',
    'resultado quiniela',
    'horóscopo de hoy'
  ];
  
  // Solo filtrar si contiene estas frases exactas
  return !veryIrrelevantKeywords.some(keyword => title.includes(keyword));
};

// Función para calcular score de relevancia (más ligera)
const getNewsRelevance = (article: NewsItem): number => {
  const title = article.title.toLowerCase();
  
  let score = 0;
  
  // Solo palabras clave MUY relevantes para priorizar
  const highPriorityKeywords = [
    'dólar', 'dolar', 'inflación', 'inflacion',
    'bcra', 'merval', 'bitcoin', 'fed'
  ];
  
  highPriorityKeywords.forEach(keyword => {
    if (title.includes(keyword)) score += 3;
  });
  
  return score;
};

// Función para ordenar noticias (mantiene casi todas)
const sortNewsByRelevance = (articles: NewsItem[]): NewsItem[] => {
  return articles
    .filter(isRelevantNews)  // Filtro MUY ligero ahora
    .sort((a, b) => {
      const scoreA = getNewsRelevance(a);
      const scoreB = getNewsRelevance(b);
      
      // Si tienen diferentes scores, ordenar por score
      if (scoreA !== scoreB) {
        return scoreB - scoreA;
      }
      
      // Si tienen el mismo score, ordenar por fecha (más recientes primero)
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
};

export const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [allNews, setAllNews] = useState<NewsItem[]>([]);  // ← NUEVO: Cache de todas las noticias
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('all');  // ← NUEVO
  const [totalByCountry, setTotalByCountry] = useState({ argentina: 0, usa: 0 });  // ← NUEVO
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());  // ← Para mostrar última actualización
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);  // ← Notificación de actualización

  // Datos de fallback en caso de error de API
  const fallbackNews: NewsItem[] = [
    {
      title: "Dólar blue hoy: cotización y tendencias del mercado paralelo",
      url: "https://www.ambito.com/contenidos/dolar.html",
      publishedAt: new Date().toISOString(),
      source: { name: "Ámbito Financiero" },
      description: "Seguimiento del tipo de cambio del dólar paralelo y su impacto en la economía argentina. Análisis de la brecha cambiaria y perspectivas del mercado."
    },
    {
      title: "Merval: el índice líder de la bolsa argentina cierra con tendencia alcista", 
      url: "https://www.cronista.com/finanzas-mercados/merval/",
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      source: { name: "El Cronista" },
      description: "El índice Merval registra movimientos significativos impulsado por acciones bancarias y empresas ligadas al dólar. Análisis del mercado bursátil local."
    },
    {
      title: "Bitcoin supera expectativas: análisis del mercado cripto 2025",
      url: "https://www.infobae.com/economia/criptomonedas/",
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      source: { name: "Infobae" },
      description: "Las criptomonedas continúan ganando adopción en Argentina como alternativa de inversión y reserva de valor frente a la inflación."
    },
    {
      title: "Tasas de plazo fijo: bancos actualizan rendimientos para ahorristas",
      url: "https://www.lanacion.com.ar/economia/",
      publishedAt: new Date(Date.now() - 10800000).toISOString(),
      source: { name: "La Nación" },
      description: "Comparativa de tasas de interés en plazos fijos tradicionales y UVA. Análisis de las mejores opciones para proteger el ahorro."
    },
    {
      title: "Inversiones: estrategias para diversificar tu cartera en el mercado argentino",
      url: "https://www.cronista.com/finanzas-mercados/",
      publishedAt: new Date(Date.now() - 14400000).toISOString(),
      source: { name: "El Cronista" },
      description: "Expertos analizan las mejores alternativas de inversión: bonos, acciones, CEDEARs y fondos comunes de inversión para diferentes perfiles de riesgo."
    },
    {
      title: "Reservas del Banco Central: evolución y perspectivas económicas",
      url: "https://www.ambito.com/economia/",
      publishedAt: new Date(Date.now() - 18000000).toISOString(),
      source: { name: "Ámbito Financiero" },
      description: "Seguimiento de las reservas internacionales del BCRA y su impacto en la estabilidad cambiaria y las perspectivas macroeconómicas del país."
    }
  ];

  // Función para cargar noticias (reutilizable)
  const fetchNews = useCallback(async (showNotification = false) => {
    const token = localStorage.getItem('token');
    
    try {
      // Limitar a 100 noticias para mejor rendimiento
      const apiUrl = withBase('/news?limit=100');
        
        const response = await fetch(apiUrl, { 
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          } 
        });
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Guardar todas las noticias y contadores
        if (data.articles && Array.isArray(data.articles) && data.articles.length > 0) {
          setAllNews(data.articles);
          const sorted = sortNewsByRelevance(data.articles);
          console.log(`✅ Noticias cargadas del backend - Total: ${data.articles.length}/${data.total || 'N/A'}`);
          console.log(`📊 Por país - AR: ${data.articles.filter((n: NewsItem) => n.country === 'AR').length}, US: ${data.articles.filter((n: NewsItem) => n.country === 'US').length}`);
          console.log(`🎯 Después del filtro de relevancia: ${sorted.length} noticias mostradas`);
          setNews(sorted);
          setApiError(false);
          
          // Guardar contadores si vienen del backend
          if (data.byCountry) {
            setTotalByCountry({
              argentina: data.byCountry.argentina || 0,
              usa: data.byCountry.usa || 0
            });
          }
        } else if (Array.isArray(data) && data.length > 0) {
          // Caso alternativo: la API podría devolver el array directamente
          setAllNews(data);
          const sorted = sortNewsByRelevance(data);
          console.log(`✅ Noticias cargadas (formato alternativo) - Total: ${data.length}, Mostradas: ${sorted.length}`);
          setNews(sorted);
          setApiError(false);
          
          // Calcular contadores manualmente
          const arCount = data.filter((n: NewsItem) => n.country === 'AR').length;
          const usCount = data.filter((n: NewsItem) => n.country === 'US').length;
          setTotalByCountry({ argentina: arCount, usa: usCount });
        } else {
          // El backend responde pero no tiene noticias, usar fallback
          setAllNews(fallbackNews);
          const sorted = sortNewsByRelevance(fallbackNews);
          console.log(`Usando fallback - Total: ${fallbackNews.length}, Después de filtro: ${sorted.length}`);
          setNews(sorted);
          setApiError(true);
          setErrorMessage('El servicio de noticias está temporalmente no disponible. Mostrando contenido de ejemplo.');
        }
        
      } catch (error) {
        console.error('Error al obtener noticias:', error);
        setApiError(true);
        
        if (error instanceof TypeError && error.message.includes('fetch')) {
          setErrorMessage('No se pudo conectar con el servidor. Por favor, intenta más tarde.');
        } else if (error instanceof Error) {
          setErrorMessage('Error al cargar noticias. Por favor, intenta más tarde.');
        } else {
          setErrorMessage('Error desconocido al cargar noticias.');
        }
        
        // Usar noticias de fallback
        setAllNews(fallbackNews);
        setNews(sortNewsByRelevance(fallbackNews));  // Aplicar filtro de relevancia
      } finally {
        setLoading(false);
      }
      
      // Actualizar timestamp y mostrar notificación si es una recarga
      setLastUpdate(new Date());
      if (showNotification) {
        setShowUpdateNotification(true);
        setTimeout(() => setShowUpdateNotification(false), 3000); // Ocultar después de 3 segundos
      }
    }, [fallbackNews]); // useCallback con fallbackNews

  // useEffect para carga inicial
  useEffect(() => {
    fetchNews(false); // Carga inicial sin notificación
  }, [fetchNews]);

  // useEffect para recarga automática cada 10 minutos
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('🔄 Actualizando noticias automáticamente...');
      fetchNews(true); // Recarga con notificación
    }, 10 * 60 * 1000); // 10 minutos en milisegundos

    return () => clearInterval(interval); // Limpiar intervalo al desmontar
  }, [fetchNews]);

  // Debug: Log cuando cambia el estado de news
  useEffect(() => {
    if (news.length > 0) {
      console.log(`🎨 Tab "${activeTab}" - Mostrando ${news.length} noticias (Hero: 1, Secundarias: ${news.slice(1, 5).length}, Grid: ${news.slice(5).length})`);
    }
  }, [news, activeTab]);

  // Función para cambiar de tab
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    
    if (tab === 'all') {
      const sorted = sortNewsByRelevance(allNews);
      console.log(`🔄 Tab "Todas" - ${sorted.length} noticias`);
      setNews(sorted);
    } else if (tab === 'AR') {
      const filtered = allNews.filter(n => n.country === 'AR');
      const sorted = sortNewsByRelevance(filtered);
      console.log(`🇦🇷 Tab "Argentina" - ${sorted.length} noticias`);
      setNews(sorted);
    } else if (tab === 'US') {
      const filtered = allNews.filter(n => n.country === 'US');
      const sorted = sortNewsByRelevance(filtered);
      console.log(`🇺🇸 Tab "USA" - ${sorted.length} noticias`);
      setNews(sorted);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-industrial-charcoal via-industrial-iron to-industrial-charcoal">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <FaSpinner className="animate-spin text-6xl text-industrial-copper mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-industrial-white mb-2">
                Cargando noticias financieras...
              </h3>
              <p className="text-industrial-steel">
                Obteniendo las últimas actualizaciones del mercado
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-industrial-charcoal via-industrial-iron to-industrial-charcoal">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <FaNewspaper className="mx-auto text-6xl text-industrial-steel/50 mb-4" />
            <h3 className="text-xl font-semibold text-industrial-white mb-2">
              No hay noticias disponibles
            </h3>
            <p className="text-industrial-steel">
              No se encontraron noticias en este momento. Por favor, revisa la consola del navegador para más detalles.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-industrial-charcoal via-industrial-iron to-industrial-charcoal">
      <div className="container mx-auto px-4 py-8">
        {/* Notificación de actualización */}
        {showUpdateNotification && (
          <div className="fixed top-20 right-4 z-50 animate-fade-in">
            <div className="glass-effect rounded-lg px-4 py-3 border border-emerald-500/50 bg-emerald-500/10 shadow-lg">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-emerald-400 text-lg" />
                <span className="text-emerald-300 font-semibold text-sm">
                  Noticias actualizadas
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-industrial-white mb-4">
            <FaNewspaper className="inline mr-3 text-industrial-copper" />
            Noticias Financieras
          </h1>
          <p className="text-industrial-steel text-lg max-w-2xl mx-auto">
            Mantente al día con las últimas noticias de economía, criptomonedas y mercados financieros
            <span className="block text-xs text-gray-500 mt-2">
              🔄 Actualización automática cada 10 minutos • Última actualización: {lastUpdate.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </p>
        </div>

        {/* Tabs de Países */}
        <div className="flex justify-center mb-8">
          <div className="glass-effect rounded-xl p-1.5 inline-flex gap-2 border border-industrial-copper/20">
            {/* Tab Todas */}
            <button
              onClick={() => handleTabChange('all')}
              className={`
                px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center gap-2
                ${activeTab === 'all' 
                  ? 'bg-industrial-copper text-industrial-charcoal shadow-lg shadow-industrial-copper/30' 
                  : 'text-industrial-steel hover:text-industrial-white hover:bg-industrial-iron/50'
                }
              `}
            >
              🌍 Todas
              {totalByCountry.argentina + totalByCountry.usa > 0 && (
                <span className={`
                  px-2 py-0.5 rounded-full text-xs font-bold
                  ${activeTab === 'all' ? 'bg-industrial-charcoal/30' : 'bg-industrial-copper/20'}
                `}>
                  {totalByCountry.argentina + totalByCountry.usa}
                </span>
              )}
            </button>

            {/* Tab Argentina */}
            <button
              onClick={() => handleTabChange('AR')}
              className={`
                px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center gap-2
                ${activeTab === 'AR' 
                  ? 'bg-industrial-copper text-industrial-charcoal shadow-lg shadow-industrial-copper/30' 
                  : 'text-industrial-steel hover:text-industrial-white hover:bg-industrial-iron/50'
                }
              `}
            >
              🇦🇷 Argentina
              {totalByCountry.argentina > 0 && (
                <span className={`
                  px-2 py-0.5 rounded-full text-xs font-bold
                  ${activeTab === 'AR' ? 'bg-industrial-charcoal/30' : 'bg-industrial-copper/20'}
                `}>
                  {totalByCountry.argentina}
                </span>
              )}
            </button>

            {/* Tab USA */}
            <button
              onClick={() => handleTabChange('US')}
              className={`
                px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center gap-2
                ${activeTab === 'US' 
                  ? 'bg-industrial-copper text-industrial-charcoal shadow-lg shadow-industrial-copper/30' 
                  : 'text-industrial-steel hover:text-industrial-white hover:bg-industrial-iron/50'
                }
              `}
            >
              🇺🇸 USA
              {totalByCountry.usa > 0 && (
                <span className={`
                  px-2 py-0.5 rounded-full text-xs font-bold
                  ${activeTab === 'US' ? 'bg-industrial-charcoal/30' : 'bg-industrial-copper/20'}
                `}>
                  {totalByCountry.usa}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Banner informativo si está usando fallback */}
        {apiError && (
          <div className="mb-8 max-w-4xl mx-auto">
            <div className="glass-effect border border-blue-500/30 rounded-xl p-4 bg-blue-500/10">
              <div className="flex items-start gap-3">
                <FaExclamationTriangle className="text-blue-400 text-xl mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-blue-400 font-semibold mb-1">
                    Mostrando contenido de ejemplo
                  </h3>
                  <p className="text-industrial-steel text-sm">
                    {errorMessage}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* News Grid - Layout Mejorado */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Primera noticia destacada (más grande) */}
          {news[0] && (
            <article className={`lg:col-span-2 lg:row-span-2 glass-effect rounded-2xl border ${getBorderColor(news[0].country)} overflow-hidden transition-all duration-500 group cursor-pointer shadow-2xl hover:shadow-3xl hover:scale-[1.02] animate-fade-in`}>
              <a href={news[0].url} target="_blank" rel="noopener noreferrer" className="block h-full">
                {/* Imagen o gradiente de fondo */}
                <div className={`relative h-64 lg:h-80 bg-gradient-to-br ${getCardGradient(news[0].country, true)} overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-industrial-charcoal/90 via-industrial-charcoal/50 to-transparent" />
                  
                  {/* Badge de país - Nuevo */}
                  <div className="absolute top-4 right-4">
                    {getCountryBadge(news[0].country)}
                  </div>
                  
                  {/* Badge de fuente */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 glass-effect px-3 py-1.5 rounded-full border border-industrial-copper/30">
                    {getSourceIcon(news[0].source.name)}
                    <span className="text-xs font-semibold text-industrial-white">
                      {news[0].source.name}
                    </span>
                  </div>

                  {/* Contenido superpuesto */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2 className={`text-2xl lg:text-3xl font-bold text-white mb-3 transition-all duration-300 line-clamp-3 ${news[0].country === 'AR' ? 'group-hover:text-emerald-400' : 'group-hover:text-cyan-400'} drop-shadow-2xl`}>
                      {news[0].title}
                    </h2>
                    <p className="text-black text-sm mb-4 line-clamp-2">
                      {news[0].description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-black text-xs">
                        <FaClock />
                        {new Date(news[0].publishedAt).toLocaleString('es-AR', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                      <div className={`flex items-center gap-2 text-sm font-bold transition-all duration-300 ${news[0].country === 'AR' ? 'text-emerald-400 group-hover:text-emerald-300' : 'text-cyan-400 group-hover:text-cyan-300'}`}>
                        Leer más
                        <FaExternalLinkAlt className="text-xs" />
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </article>
          )}

          {/* Noticias secundarias (más pequeñas) */}
          {news.slice(1, 5).map((item, idx) => (
            <article key={idx + 1} className={`glass-effect rounded-xl border ${getBorderColor(item.country)} overflow-hidden transition-all duration-500 group cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 animate-fade-in`} style={{animationDelay: `${idx * 100}ms`}}>
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                <div className={`relative h-32 bg-gradient-to-br ${getCardGradient(item.country, false)}`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-industrial-charcoal/80 via-industrial-charcoal/40 to-transparent" />
                  
                  {/* Badge de país - esquina superior derecha */}
                  <div className="absolute top-2 right-2 scale-75 origin-top-right">
                    {getCountryBadge(item.country)}
                  </div>
                  
                  {/* Icono de fuente */}
                  <div className="absolute top-3 left-3 text-2xl opacity-30">
                    {getSourceIcon(item.source.name)}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <div className={`text-xs font-bold mb-1 transition-colors duration-300 ${item.country === 'AR' ? 'text-emerald-400 group-hover:text-emerald-300' : 'text-cyan-400 group-hover:text-cyan-300'}`}>
                      {item.source.name}
                    </div>
                    <h3 className={`text-sm font-bold text-white transition-all duration-300 line-clamp-2 ${item.country === 'AR' ? 'group-hover:text-emerald-300' : 'group-hover:text-cyan-300'}`}>
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-black text-xs mb-3 line-clamp-2">
                    {truncateText(item.description, 100)}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-black text-xs">
                      <FaClock className="text-[10px]" />
                      {new Date(item.publishedAt).toLocaleString('es-AR', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                    <FaExternalLinkAlt className={`text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 ${item.country === 'AR' ? 'text-emerald-400' : 'text-cyan-400'}`} />
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>

        {/* Lista de noticias restantes */}
        {news.length > 5 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 animate-fade-in">
              <FaNewspaper className="text-amber-400" />
              Más Noticias
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {news.slice(5).map((item, idx) => (
                <article key={idx + 5} className={`glass-effect rounded-lg border ${getBorderColor(item.country)} p-4 transition-all duration-500 group cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1 animate-fade-in`} style={{animationDelay: `${idx * 50}ms`}}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="block">
                    {/* Header con fuente, icono y badge de país */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="text-lg">
                          {getSourceIcon(item.source.name)}
                        </div>
                        <span className={`text-xs font-bold transition-colors duration-300 ${item.country === 'AR' ? 'text-emerald-400 group-hover:text-emerald-300' : 'text-cyan-400 group-hover:text-cyan-300'}`}>
                          {item.source.name}
                        </span>
                      </div>
                      <div className="scale-75 origin-top-right">
                        {getCountryBadge(item.country)}
                      </div>
                    </div>

                    {/* Título */}
                    <h3 className={`text-sm font-bold text-white mb-2 transition-all duration-300 line-clamp-3 ${item.country === 'AR' ? 'group-hover:text-emerald-300' : 'group-hover:text-cyan-300'}`}>
                      {item.title}
                    </h3>

                    {/* Fecha y link */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-black">
                        <FaClock className="text-[10px]" />
                        {new Date(item.publishedAt).toLocaleString('es-AR', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                      <FaExternalLinkAlt className={`text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 ${item.country === 'AR' ? 'text-emerald-400' : 'text-cyan-400'}`} />
                    </div>
                  </a>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Footer Section */}
        <div className="text-center mt-12">
          <div className="glass-effect p-6 rounded-xl border border-industrial-copper/20 max-w-md mx-auto">
            <FaNewspaper className="text-4xl text-industrial-copper mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-industrial-white mb-2">
              Noticias actualizadas
            </h3>
            <p className="text-industrial-steel text-sm mb-4">
              Las noticias se actualizan automáticamente para mantenerte informado sobre los últimos movimientos del mercado
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="industrial-button py-2 px-6 text-sm font-medium"
            >
              Actualizar ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};