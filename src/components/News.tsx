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
    const apiKey = "d76c3a701981f986107bfbce75eb32dd";
    // Request para economía
    const businessUrl = `https://gnews.io/api/v4/top-headlines?category=business&lang=es&max=5&token=${apiKey}`;
    // Request para tecnología (donde suelen aparecer noticias de crypto)
    const techUrl = `https://gnews.io/api/v4/top-headlines?category=technology&lang=es&max=5&token=${apiKey}`;

    Promise.all([
      fetch(businessUrl).then(res => res.json()),
      fetch(techUrl).then(res => res.json())
    ]).then(([businessData, techData]) => {
      // Filtra solo noticias de crypto en tecnología
      const cryptoNews = (techData.articles || []).filter(
        (item: NewsItem) =>
          /crypto|bitcoin|ethereum|blockchain/i.test(item.title + " " + item.description)
      );
      setNews([...(businessData.articles || []), ...cryptoNews]);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="my-8 text-center">Cargando noticias...</div>;

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