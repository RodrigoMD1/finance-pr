import { useEffect, useState } from "react";
import { FaNewspaper, FaSpinner, FaClock, FaExternalLinkAlt, FaGlobe } from 'react-icons/fa';

type NewsItem = {
  title: string;
  url: string;
  publishedAt: string;
  source: { name: string };
  description: string;
};

export const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Datos de prueba temporales
    const testNews = [
      {
        title: "Bitcoin alcanza nuevo máximo histórico en 2025",
        url: "#",
        publishedAt: new Date().toISOString(),
        source: { name: "CryptoNews" },
        description: "El precio del Bitcoin ha superado todas las expectativas este año, alcanzando niveles récord y confirmando su posición como reserva de valor digital."
      },
      {
        title: "Nuevas regulaciones para criptomonedas en Argentina", 
        url: "#",
        publishedAt: new Date(Date.now() - 3600000).toISOString(),
        source: { name: "Financial Times" },
        description: "El gobierno argentino anuncia nuevas medidas regulatorias para el mercado de criptomonedas, buscando mayor transparencia y protección al inversor."
      },
      {
        title: "Mercados emergentes muestran signos de recuperación",
        url: "#",
        publishedAt: new Date(Date.now() - 7200000).toISOString(),
        source: { name: "Bloomberg" },
        description: "Los mercados emergentes continúan su tendencia alcista tras las recientes decisiones de política monetaria de los bancos centrales."
      },
      {
        title: "Tesla reporta ganancias excepcionales en Q4 2024",
        url: "#",
        publishedAt: new Date(Date.now() - 10800000).toISOString(),
        source: { name: "Reuters" },
        description: "La compañía de Elon Musk supera las expectativas del mercado con un crecimiento del 45% en entrega de vehículos eléctricos."
      }
    ];

    // Simular carga y mostrar datos de prueba
    setTimeout(() => {
      setNews(testNews);
      setLoading(false);
    }, 1000);

    // Código original comentado para debug
    /*
    fetch("https://proyecto-inversiones.onrender.com/api/news")
      .then(res => {
        console.log('Response status:', res.status);
        return res.json();
      })
      .then(data => {
        console.log('Data received:', data);
        setNews(data.articles || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching news:', error);
        setLoading(false);
      });
    */
  }, []);

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
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-industrial-white mb-4">
            <FaNewspaper className="inline mr-3 text-industrial-copper" />
            Noticias Financieras
          </h1>
          <p className="text-industrial-steel text-lg max-w-2xl mx-auto">
            Mantente al día con las últimas noticias de economía, criptomonedas y mercados financieros
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {news.map((item, idx) => (
            <article key={idx} className="glass-effect rounded-xl border border-industrial-copper/20 overflow-hidden hover:border-industrial-copper/40 transition-all duration-300 group">
              <div className="p-6">
                {/* Source and Date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FaGlobe className="text-industrial-copper text-sm" />
                    <span className="text-sm font-medium text-industrial-copper">
                      {item.source.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-industrial-steel text-sm">
                    <FaClock className="text-xs" />
                    {new Date(item.publishedAt).toLocaleString('es-AR', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-industrial-white mb-3 group-hover:text-industrial-copper transition-colors duration-200">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-industrial-steel text-sm mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Read More Link */}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-industrial-copper hover:text-industrial-white font-medium text-sm transition-colors duration-200"
                >
                  Leer artículo completo
                  <FaExternalLinkAlt className="text-xs" />
                </a>
              </div>

              {/* Bottom Border Effect */}
              <div className="h-1 bg-gradient-to-r from-transparent via-industrial-copper to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
            </article>
          ))}
        </div>

        {/* Load More Section */}
        <div className="text-center mt-12">
          <div className="glass-effect p-6 rounded-xl border border-industrial-copper/20 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-industrial-white mb-2">
              ¿Buscas más noticias?
            </h3>
            <p className="text-industrial-steel text-sm mb-4">
              Las noticias se actualizan automáticamente cada 15 minutos
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="industrial-button py-2 px-4 text-sm font-medium"
            >
              Actualizar noticias
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};