import { useEffect, useState } from "react";

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
        source: { name: "Test News" },
        description: "El precio del Bitcoin ha superado todas las expectativas este año, alcanzando niveles récord."
      },
      {
        title: "Nuevas regulaciones para criptomonedas en Argentina", 
        url: "#",
        publishedAt: new Date().toISOString(),
        source: { name: "Financial Times" },
        description: "El gobierno argentino anuncia nuevas medidas regulatorias para el mercado de criptomonedas."
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

  if (loading) return <div className="my-8 text-center">Cargando noticias...</div>;

  if (news.length === 0) {
    return (
      <div className="max-w-3xl mx-auto my-8">
        <h2 className="mb-6 text-2xl font-bold text-blue-700">Noticias de Economía y Criptomonedas</h2>
        <div className="p-6 text-center bg-gray-100 rounded-lg">
          <p className="text-gray-600">No se encontraron noticias en este momento.</p>
          <p className="text-sm text-gray-500 mt-2">Por favor, revisa la consola del navegador para más detalles.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-8">
      <h2 className="mb-6 text-2xl font-bold text-blue-700">Noticias de Economía y Criptomonedas</h2>
      <ul className="space-y-6">
        {news.map((item, idx) => (
          <li key={idx} className="p-4 bg-white shadow rounded-xl">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-700 hover:underline"
            >
              {item.title}
            </a>
            <div className="text-xs text-gray-500">
              {item.source.name} · {new Date(item.publishedAt).toLocaleString()}
            </div>
            <div className="mt-2 text-gray-700">{item.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};