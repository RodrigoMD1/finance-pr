/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

// Puedes cambiar por la fuente que prefieras, por ejemplo 'Inter', 'Roboto', etc.
const FONT_FAMILY = "Inter, Roboto, Arial, sans-serif";
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CFE', '#FF6699'];

export const Stadistics = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Estado para rendimiento histórico
  const [performance, setPerformance] = useState<any[]>([]);
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10)); // YYYY-MM-DD

  // Estado para evolución histórica
  const [history, setHistory] = useState<any[]>([]);
  const [from, setFrom] = useState<string>(() => {
    const d = new Date();
    d.setMonth(d.getMonth() - 1); // Último mes por defecto
    return d.toISOString().slice(0, 10);
  });
  const [to, setTo] = useState<string>(new Date().toISOString().slice(0, 10));

  // Estado para rendimiento actual
  const [currentPerformance, setCurrentPerformance] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (!userId || userId === "undefined" || !token) return;
      const res = await fetch(`https://proyecto-inversiones.onrender.com/api/portfolio/statistics/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
      setLoading(false);
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const fetchPerformance = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (!userId || userId === "undefined" || !token) return;
      const res = await fetch(
        `https://proyecto-inversiones.onrender.com/api/portfolio/performance/${userId}?date=${date}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.ok) {
        const data = await res.json();
        setPerformance(data);
      }
    };
    fetchPerformance();
  }, [date]);

  useEffect(() => {
    const fetchHistory = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (!userId || userId === "undefined" || !token) return;
      const res = await fetch(
        `https://proyecto-inversiones.onrender.com/api/portfolio/history/${userId}?from=${from}&to=${to}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.ok) {
        const data = await res.json();
        setHistory(data);
      }
    };
    fetchHistory();
  }, [from, to]);

  useEffect(() => {
    const fetchCurrentPerformance = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (!userId || userId === "undefined" || !token) return;
      const res = await fetch(
        `https://proyecto-inversiones.onrender.com/api/portfolio/current-performance/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.ok) {
        const data = await res.json();
        setCurrentPerformance(data);
      }
    };
    fetchCurrentPerformance();
  }, []);

  const pieData = stats?.totalStats?.distribution
    ? Object.entries(stats.totalStats.distribution).map(([type, percent]) => ({
      name: type,
      value: percent as number,
    }))
    : [];

  if (loading) return <div className="p-8 text-center text-black" style={{ fontFamily: FONT_FAMILY }}>Cargando estadísticas...</div>;
  if (!stats) return <div className="p-8 text-center text-red-500" style={{ fontFamily: FONT_FAMILY }}>No se pudieron cargar las estadísticas.</div>;

  return (
    <div
      className="max-w-5xl p-6 mx-auto shadow-lg bg-base-200 rounded-xl"
      style={{ fontFamily: FONT_FAMILY, letterSpacing: "0.01em" }}
    >
      <h2 className="mb-6 text-3xl font-extrabold leading-tight tracking-tight text-center text-white">
        Estadísticas de tu Portfolio
      </h2>
      <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-2">
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow">
          <div className="mb-2 text-lg font-semibold text-gray-900">Valor total</div>
          <div className="text-3xl font-extrabold tracking-tight text-green-700">
            ${stats.totalStats?.totalValue
              ? stats.totalStats.totalValue.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
              : "0,00"}
          </div>
          <div className="mt-4 text-lg font-semibold text-gray-900">Precio promedio ponderado</div>
          <div className="text-2xl font-bold tracking-tight text-blue-700">
            ${stats.totalStats?.weightedAveragePrice
              ? stats.totalStats.weightedAveragePrice.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
              : "0,00"}
          </div>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="mb-2 text-lg font-semibold text-center text-black">Distribución por tipo de activo</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
              >
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="p-6 mb-8 bg-white rounded-lg shadow">
        <h3 className="mb-2 text-lg font-semibold text-black">Evolución del valor del portfolio</h3>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <label className="font-medium text-black">Desde:</label>
          <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="px-2 font-medium text-black border rounded" />
          <label className="font-medium text-black">Hasta:</label>
          <input type="date" value={to} onChange={e => setTo(e.target.value)} className="px-2 font-medium text-black border rounded" />
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#222" />
            <YAxis stroke="#222" />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-2">
        <div className="p-6 bg-white rounded-lg shadow">
          <strong className="block mb-2 text-lg text-black">Distribución por tipo:</strong>
          <ul className="space-y-1 text-base text-black">
            {stats.totalStats?.distribution &&
              Object.entries(stats.totalStats.distribution).map(([type, percent]) => (
                <li key={type} className="flex justify-between">
                  <span>{type}:</span>
                  <span className="font-semibold">{(percent as number).toFixed(2)}%</span>
                </li>
              ))}
          </ul>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <strong className="block mb-2 text-lg text-black">Activo con mayor valor:</strong>
          {stats.topAsset ? (
            <div className="text-lg font-semibold text-black">
              {stats.topAsset.name} (${stats.topAsset.totalValue
                ? stats.topAsset.totalValue.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                : "0,00"})
            </div>
          ) : (
            <div className="text-black">No hay activos.</div>
          )}
        </div>
      </div>

      <div className="p-6 mb-8 bg-white rounded-lg shadow">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <strong className="text-lg text-black">Rendimiento por activo al {date}:</strong>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="px-2 font-medium text-black border rounded"
          />
        </div>
        <ul className="text-base text-black divide-y">
          {performance.map(item => (
            <li key={item.id} className="flex flex-wrap items-center gap-2 py-2">
              <span className="font-semibold">{item.name || item.nombre}</span>
              <span className="text-xs text-gray-700">({item.ticker}) [{item.tipo}]</span>
              {item.rendimiento !== null
                ? <span style={{ color: item.rendimiento >= 0 ? "green" : "red" }} className="font-bold">
                    {item.rendimiento.toFixed(2)}%
                  </span>
                : <span className="text-gray-400">Sin datos</span>}
              {item.priceOnDate && (
                <span className="text-xs text-gray-700">
                  (Precio en fecha: ${item.priceOnDate.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="p-6 mb-8 bg-white rounded-lg shadow">
        <strong className="block mb-2 text-lg text-black">Rendimiento actual por activo:</strong>
        <ul className="text-base text-black divide-y">
          {currentPerformance.map(item => (
            <li key={item.id} className="flex flex-wrap items-center gap-2 py-2">
              <span className="font-semibold">{item.name || item.nombre}</span>
              <span className="text-xs text-gray-700">({item.ticker}) [{item.tipo}]</span>
              {item.rendimiento !== null
                ? <span style={{ color: item.rendimiento >= 0 ? "green" : "red" }} className="font-bold">
                    {item.rendimiento.toFixed(2)}%
                  </span>
                : <span className="text-gray-400">Sin datos</span>}
              {item.currentPrice && (
                <span className="text-xs text-gray-700">
                  (Precio actual: ${item.currentPrice.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="p-6 mb-8 bg-white rounded-lg shadow">
        <strong className="block mb-2 text-lg text-black">Ranking de activos por valor:</strong>
        <ol className="ml-6 space-y-1 text-base text-black list-decimal">
          {stats.rankedAssets && stats.rankedAssets.map((item: any, idx: number) => (
            <li key={item.id}>
              <span className="font-semibold">#{idx + 1} {item.name || item.nombre}</span> ({item.ticker}): ${item.totalValue
                ? item.totalValue.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                : "0,00"}
            </li>
          ))}
        </ol>
      </div>

      <div className="p-6 bg-white rounded-lg shadow">
        <strong className="block mb-2 text-lg text-black">Resumen por tipo de activo:</strong>
        <ul className="space-y-1 text-base text-black">
          {stats.summaryByType && Object.entries(stats.summaryByType).map(([type, summary]: any) => (
            <li key={type}>
              <b>{type}</b>: Valor total ${summary.totalValue.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })},
              Cantidad: {summary.count},
              Precio promedio: ${summary.averagePrice.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};