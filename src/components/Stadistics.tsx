// ...existing code...
import { useEffect, useState } from "react";

export const Stadistics = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // NUEVO: Estado para rendimiento histórico
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [performance, setPerformance] = useState<any[]>([]);
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10)); // YYYY-MM-DD

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

  // NUEVO: Traer rendimiento histórico cuando cambia la fecha
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

      {/* NUEVO: Informe de rendimiento histórico */}
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
      {/* Puedes mostrar más detalles si lo deseas */}
    </div>
  );
};