import { useEffect, useState } from "react";

export const Stadistics = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
      {/* Puedes mostrar más detalles si lo deseas */}
    </div>
  );
};