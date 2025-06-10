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
    fetch("https://proyecto-inversiones.onrender.com/api/news")
      .then(res => res.json())
      .then(data => {
        setNews(data.articles || []);
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