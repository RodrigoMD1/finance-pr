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

  useEffect(() => {
    const fetchStats = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (!userId || !token) return;
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

  // Traer rendimiento histórico cuando cambia la fecha
  useEffect(() => {
    const fetchPerformance = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (!userId || !token) return;
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

  // Traer evolución histórica para el gráfico de líneas
  useEffect(() => {
    const fetchHistory = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (!userId || !token) return;
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

  // Datos para el gráfico de torta
  const pieData = stats?.totalStats?.distribution
    ? Object.entries(stats.totalStats.distribution).map(([type, percent]) => ({
        name: type,
        value: percent as number,
      }))
    : [];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CFE', '#FF6699'];

  if (loading) return <div className="p-8 text-center">Cargando estadísticas...</div>;
  if (!stats) return <div className="p-8 text-center text-red-500">No se pudieron cargar las estadísticas.</div>;

  return (
    <div className="p-8">
      <h2 className="mb-4 text-2xl font-bold">Estadísticas de tu Portfolio</h2>
      <div className="mb-4">
        <strong>Valor total:</strong> ${stats.totalStats?.totalValue
          ? stats.totalStats.totalValue.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          : "0,00"}
      </div>
      <div className="mb-4">
        <strong>Precio promedio ponderado:</strong> ${stats.totalStats?.weightedAveragePrice
          ? stats.totalStats.weightedAveragePrice.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          : "0,00"}
      </div>

      {/* Gráfico de torta para distribución por tipo */}
      <div className="mb-8">
        <h3 className="mb-2 font-semibold">Distribución visual por tipo de activo</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
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

      {/* Gráfico de líneas para evolución histórica */}
      <div className="mb-8">
        <h3 className="mb-2 font-semibold">Evolución del valor del portfolio</h3>
        <div className="flex items-center mb-2">
          <label>Desde: </label>
          <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="px-2 mx-2 border rounded" />
          <label>Hasta: </label>
          <input type="date" value={to} onChange={e => setTo(e.target.value)} className="px-2 mx-2 border rounded" />
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-4">
        <strong>Distribución por tipo:</strong>
        <ul>
          {stats.totalStats?.distribution &&
            Object.entries(stats.totalStats.distribution).map(([type, percent]) => (
              <li key={type}>{type}: {(percent as number).toFixed(2)}%</li>
            ))}
        </ul>
      </div>
      <div className="mb-4">
        <strong>Activo con mayor valor:</strong>
        {stats.topAsset ? (
          <div>
            {stats.topAsset.name} (${stats.topAsset.totalValue
              ? stats.topAsset.totalValue.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
              : "0,00"})
          </div>
        ) : (
          <div>No hay activos.</div>
        )}
      </div>

      {/* Informe de rendimiento histórico */}
      <div className="mb-4">
        <strong>Rendimiento por activo al {date}:</strong>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="px-2 ml-2 border rounded"
        />
        <ul>
          {performance.map(item => (
            <li key={item.id}>
              {item.name || item.nombre} ({item.ticker}) [{item.tipo}]:&nbsp;
              {item.rendimiento !== null
                ? <span style={{ color: item.rendimiento >= 0 ? "green" : "red" }}>
                  {item.rendimiento.toFixed(2)}%
                </span>
                : "Sin datos"}
              {item.priceOnDate && (
                <> (Precio en fecha: ${item.priceOnDate.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})</>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <strong>Ranking de activos por valor:</strong>
        <ol>
          {stats.rankedAssets && stats.rankedAssets.map((item: any, idx: number) => (
            <li key={item.id}>
              #{idx + 1} {item.name || item.nombre} ({item.ticker}): ${item.totalValue
                ? item.totalValue.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                : "0,00"}
            </li>
          ))}
        </ol>
      </div>

      <div className="mb-4">
        <strong>Resumen por tipo de activo:</strong>
        <ul>
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