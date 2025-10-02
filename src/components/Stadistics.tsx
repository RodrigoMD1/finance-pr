/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { withBase } from '../services/api';
import { Link } from 'react-router-dom';
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
import { FaChartPie, FaInfoCircle, FaArrowUp, FaArrowDown, FaMedal, FaLock, FaSignInAlt } from 'react-icons/fa';
import { RiStockLine, RiBankLine, RiMoneyDollarCircleLine, RiBitCoinLine, RiPieChart2Line, RiFundsLine } from 'react-icons/ri';
import financeBg from '../assets/img/finance55.jpg';

const FONT_FAMILY = "Inter, Roboto, Arial, sans-serif";
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CFE', '#FF6699'];

export const Stadistics = () => {
  // Verificar autenticación primero
  const isAuthenticated = !!localStorage.getItem('token');
  
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [performance, setPerformance] = useState<any[]>([]);
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));

  const [history, setHistory] = useState<any[]>([]);
  const [from, setFrom] = useState<string>(() => {
    const d = new Date();
    d.setMonth(d.getMonth() - 1);
    return d.toISOString().slice(0, 10);
  });
  const [to, setTo] = useState<string>(new Date().toISOString().slice(0, 10));

  const [currentPerformance, setCurrentPerformance] = useState<any[]>([]);

  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
  const [fallbackTotals, setFallbackTotals] = useState<{ totalValue: number; weightedAvg: number }>({ totalValue: 0, weightedAvg: 0 });

  const formatARS = (n: number) => n.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const toISO = (d: Date) => d.toISOString().slice(0, 10);

  const setQuickRange = (preset: '7d'|'1m'|'3m'|'YTD'|'1y'|'Max') => {
    const end = new Date();
    let start = new Date();
    switch (preset) {
      case '7d': start.setDate(end.getDate() - 7); break;
      case '1m': start.setMonth(end.getMonth() - 1); break;
      case '3m': start.setMonth(end.getMonth() - 3); break;
      case 'YTD': start = new Date(end.getFullYear(), 0, 1); break;
      case '1y': start.setFullYear(end.getFullYear() - 1); break;
      case 'Max': start = new Date(2000, 0, 1); break;
    }
    setFrom(toISO(start));
    setTo(toISO(end));
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    
    const fetchStats = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (!userId || userId === "undefined" || !token) {
        setLoading(false);
        return;
      }
      const res = await fetch(withBase(`/portfolio/statistics/${userId}`), {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      } else {
        setStats(null);
      }
      setLoading(false);
    };
    fetchStats();
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;
    
    const fetchPerformance = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (!userId || userId === "undefined" || !token) return;
      const res = await fetch(
        withBase(`/portfolio/performance/${userId}?date=${date}`),
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.ok) {
        const data = await res.json();
        setPerformance(data);
      }
    };
    fetchPerformance();
  }, [date, isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;
    
    const fetchHistory = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (!userId || userId === "undefined" || !token) return;
      const res = await fetch(
        withBase(`/portfolio/performance/${userId}?from=${from}&to=${to}`),
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.ok) {
        const raw = await res.json();
        let arr: any[] = [];
        if (Array.isArray(raw)) {
          arr = raw;
        } else if (raw && typeof raw === 'object') {
          if (Array.isArray(raw.history)) arr = raw.history;
          else if (Array.isArray(raw.data)) arr = raw.data;
          else if (Array.isArray(raw.items)) arr = raw.items;
          else {
            const entries = Object.entries(raw);
            if (entries.every(([k, v]) => typeof k === 'string' && (typeof v === 'number' || typeof v === 'string'))) {
              arr = entries.map(([k, v]) => ({ date: k, total: Number(v) }));
            }
          }
        }
        const parsed = arr.map((d: any) => ({
          date: d.date || d.fecha || d.day || d.dia || d.timestamp || '',
          total: Number(d.totalValue ?? d.total ?? d.value ?? d.amount ?? d.valor ?? 0)
        })).filter((p: any) => p.date);
        const fromDate = new Date(from);
        const toPlus1 = new Date(to);
        toPlus1.setDate(toPlus1.getDate() + 1);
        const filtered = parsed.filter((d: any) => {
          const dt = new Date(d.date);
          return !isNaN(dt.getTime()) && dt >= fromDate && dt < toPlus1;
        });
        setHistory(filtered);
      } else {
        setHistory([]);
      }
    };
    fetchHistory();
  }, [from, to, isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;
    
    const fetchCurrentPerformance = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (!userId || userId === "undefined" || !token) return;
      const res = await fetch(
        withBase(`/portfolio/current-performance/${userId}`),
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.ok) {
        const data = await res.json();
        setCurrentPerformance(data);
      }
    };
    fetchCurrentPerformance();
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;
    
    const fetchPortfolio = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await fetch(withBase(`/portfolio`), { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) {
        const data = await res.json();
        const list = Array.isArray(data) ? data : (Array.isArray(data?.items) ? data.items : []);
        setPortfolioItems(list);
      } else {
        setPortfolioItems([]);
      }
    };
    fetchPortfolio();
  }, [isAuthenticated]);

  useEffect(() => {
    if (!portfolioItems || portfolioItems.length === 0) {
      setFallbackTotals({ totalValue: 0, weightedAvg: 0 });
      return;
    }
    const priceByTicker = new Map<string, number>();
    currentPerformance.forEach((p: any) => {
      const t = p.ticker || p.symbol || p.sigla;
      const cp = p.currentPrice ?? p.price ?? p.precioActual;
      if (t && typeof cp === 'number') priceByTicker.set(String(t).toUpperCase(), Number(cp));
    });
    let sumQty = 0;
    let sumCost = 0;
    let sumCurrentValue = 0;
    portfolioItems.forEach((it: any) => {
      const qty = Number(it.quantity ?? it.cantidad ?? 0);
      const buy = Number(it.purchasePrice ?? it.purchase_price ?? it.precio ?? 0);
      const ticker = (it.ticker || it.symbol || it.asset?.symbol || '').toString().toUpperCase();
      const current = (ticker && priceByTicker.has(ticker)) ? Number(priceByTicker.get(ticker)) : NaN;
      sumQty += qty;
      sumCost += qty * buy;
      sumCurrentValue += qty * (isNaN(current) ? buy : current);
    });
    const weightedAvg = sumQty > 0 ? (sumCost / sumQty) : 0;
    setFallbackTotals({ totalValue: sumCurrentValue, weightedAvg });
  }, [portfolioItems, currentPerformance]);

  const rawDistribution: Record<string, number> | null =
    (stats?.assetAllocation && typeof stats.assetAllocation === 'object') ? stats.assetAllocation :
    (stats?.totalStats?.distribution && typeof stats.totalStats.distribution === 'object') ? stats.totalStats.distribution :
    (stats?.distribution && typeof stats.distribution === 'object') ? stats.distribution :
    null;

  const pieData = rawDistribution
    ? Object.entries(rawDistribution).map(([type, percent]) => ({ name: String(type), value: Number(percent as number) }))
    : [];

  const getTypeIcon = (type: string) => {
    const t = type.toLowerCase();
    if (/(accion|acciones|stock)/.test(t)) return <RiStockLine className="text-blue-600" />;
    if (/(bono|bond|fixed)/.test(t)) return <RiBankLine className="text-emerald-600" />;
    if (/(cripto|crypto|btc|bitcoin)/.test(t)) return <RiBitCoinLine className="text-amber-600" />;
    if (/(efectivo|cash|usd|dolar|dólar)/.test(t)) return <RiMoneyDollarCircleLine className="text-teal-600" />;
    if (/(fondo|fund|etf)/.test(t)) return <RiFundsLine className="text-purple-600" />;
    return <RiPieChart2Line className="text-orange-600" />;
  };
  const normalizePercent = (val?: number) => {
    if (val === undefined || val === null || isNaN(Number(val))) return 0;
    let p = Number(val);
    if (p <= 1) p = p * 100;
    return Math.max(0, Math.min(100, p));
  };

  const rankedAssets: any[] = Array.isArray(stats?.rankedAssets) ? stats.rankedAssets : [];
  const maxRankValue = rankedAssets.reduce((m, it) => Math.max(m, Number(it.totalValue || 0)), 0) || 1;

  // Si no está autenticado, mostrar mensaje de login
  if (!isAuthenticated) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="max-w-md mx-auto text-center">
          <div className="p-8 bg-white rounded-lg shadow-lg">
            <FaLock className="mx-auto mb-4 text-6xl text-gray-400" />
            <h2 className="mb-4 text-2xl font-bold text-gray-800">
              Acceso Restringido
            </h2>
            <p className="mb-6 text-gray-600">
              Para acceder a las estadísticas de tu portafolio, necesitas iniciar sesión en tu cuenta.
            </p>
            <div className="space-y-3">
              <Link 
                to="/login" 
                className="flex items-center justify-center w-full px-6 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                <FaSignInAlt className="mr-2" />
                Iniciar Sesión
              </Link>
              <Link 
                to="/register" 
                className="flex items-center justify-center w-full px-6 py-3 text-blue-600 transition-colors border border-blue-600 rounded-lg hover:bg-blue-50"
              >
                Crear Cuenta
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) return (
    <div className="max-w-5xl p-6 mx-auto rounded-xl" style={{ fontFamily: FONT_FAMILY }}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="h-40 bg-gray-100 rounded-lg animate-pulse" />
        <div className="h-40 bg-gray-100 rounded-lg animate-pulse" />
      </div>
      <div className="h-64 mt-6 bg-gray-100 rounded-lg animate-pulse" />
    </div>
  );
  if (!stats) return <div className="p-8 text-center text-red-500" style={{ fontFamily: FONT_FAMILY }}>No se pudieron cargar las estadísticas.</div>;

  return (
    <div className="max-w-6xl p-6 mx-auto shadow-lg bg-base-200 rounded-xl text-[16px] md:text-[18px]" style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.01em' }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="flex items-center gap-3 text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
          <FaChartPie className="text-orange-500" />
          <span className="text-white">Estadísticas de tu Portfolio</span>
        </h2>
        <div className="items-center hidden gap-2 text-sm text-gray-300 md:flex">
          <FaInfoCircle /> Datos en tiempo real cuando hay disponibilidad
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-2">
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow">
          <div className="mb-2 text-xl font-semibold text-gray-900">Valor total</div>
          <div className="text-4xl font-extrabold tracking-tight text-green-700">
            ${(() => {
              const v = (typeof stats?.totalValue === 'number' && stats.totalValue > 0) ? Number(stats.totalValue) : Number(fallbackTotals.totalValue);
              return formatARS(v);
            })()}
            {(!(typeof stats?.totalValue === 'number' && stats.totalValue > 0) && fallbackTotals.totalValue > 0) && (
              <span className="ml-2 text-sm px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 align-middle">Estimado</span>
            )}
          </div>
          <div className="mt-4 text-xl font-semibold text-gray-900">Precio promedio ponderado</div>
          <div className="text-3xl font-bold tracking-tight text-blue-700">
            ${(() => {
              const v = (typeof stats?.weightedAveragePrice === 'number' && stats.weightedAveragePrice > 0) ? Number(stats.weightedAveragePrice) : Number(fallbackTotals.weightedAvg);
              return formatARS(v);
            })()}
            {(!(typeof stats?.weightedAveragePrice === 'number' && stats.weightedAveragePrice > 0) && fallbackTotals.weightedAvg > 0) && (
              <span className="ml-2 text-sm px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 align-middle">Estimado</span>
            )}
          </div>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="mb-2 text-xl font-semibold text-center text-black">Distribución por tipo de activo</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}>
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip wrapperStyle={{ fontSize: 14 }} />
              <Legend wrapperStyle={{ fontSize: 14 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="p-6 mb-8 bg-white rounded-lg shadow">
        <h3 className="mb-2 text-xl font-semibold text-black">Evolución del valor del portfolio</h3>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="flex items-center gap-1 text-sm">
            <button onClick={() => setQuickRange('7d')} className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">7d</button>
            <button onClick={() => setQuickRange('1m')} className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">1m</button>
            <button onClick={() => setQuickRange('3m')} className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">3m</button>
            <button onClick={() => setQuickRange('YTD')} className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">YTD</button>
            <button onClick={() => setQuickRange('1y')} className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">1y</button>
            <button onClick={() => setQuickRange('Max')} className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">Max</button>
          </div>
          <label className="font-medium text-black">Desde:</label>
          <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="px-2 text-sm font-medium text-black border rounded" />
          <label className="font-medium text-black">Hasta:</label>
          <input type="date" value={to} onChange={e => setTo(e.target.value)} className="px-2 text-sm font-medium text-black border rounded" />
        </div>
        {history && history.length > 0 ? (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={history} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" stroke="#222" tick={{ fontSize: 14 }} />
              <YAxis stroke="#222" tick={{ fontSize: 14 }} />
              <Tooltip wrapperStyle={{ fontSize: 14 }} />
              <Line type="monotone" dataKey="total" stroke="#f97316" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[220px] flex items-center justify-center text-base text-gray-500 border border-dashed rounded">Sin datos para el rango seleccionado</div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-2">
        <div className="p-6 bg-white rounded-lg shadow">
          <strong className="block mb-4 text-xl text-black">Distribución por tipo</strong>
          {rawDistribution ? (
            <div className="space-y-3">
              {Object.entries(rawDistribution)
                .sort((a, b) => Number(b[1] as number) - Number(a[1] as number))
                .map(([type, percent]) => {
                  const pct = normalizePercent(Number(percent as number));
                  const count = (stats?.summaryByType && (stats.summaryByType as any)[type]?.count) as number | undefined;
                  return (
                    <div key={type} className="p-3 border rounded-lg bg-white/90">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="text-lg">{getTypeIcon(type)}</div>
                          <span className="text-base font-semibold text-black">{type}</span>
                          {typeof count === 'number' && (
                            <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700">{count} activos</span>
                          )}
                        </div>
                        <span className="px-2 py-0.5 text-sm rounded-full bg-blue-50 text-blue-700 font-medium">{pct.toFixed(1)}%</span>
                      </div>
                      <div className="w-full h-2 mt-2 overflow-hidden bg-gray-100 rounded">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="text-base text-gray-600">Sin datos de distribución.</div>
          )}
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <strong className="block mb-4 text-xl text-black">Activo con mayor valor</strong>
          {stats?.topAsset ? (() => {
            const t = stats.topAsset;
            const total = Number(t.totalValue || 0);
            const grand = typeof stats?.totalValue === 'number' && stats.totalValue > 0 ? Number(stats.totalValue) : undefined;
            const share = grand ? Math.min(100, Math.max(0, (total / grand) * 100)) : undefined;
            const curr = currentPerformance.find((p: any) => (p.ticker || '').toUpperCase() === (t.ticker || '').toUpperCase());
            const currPerf = typeof curr?.rendimiento === 'number' ? curr.rendimiento : null;
            const pos = currPerf !== null && currPerf >= 0;
            return (
              <div className="p-4 border rounded-lg bg-white/90">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center text-sm font-bold text-white rounded-full w-9 h-9 bg-gradient-to-br from-slate-500 to-slate-700">
                      {(t.ticker || t.name || '?').toString().substring(0,1).toUpperCase()}
                    </div>
                    <div className="text-2xl">{getTypeIcon(t.tipo || t.type || '')}</div>
                    <div>
                      <div className="text-lg font-semibold text-black">{t.name || t.nombre}</div>
                      <div className="text-sm text-gray-600">({t.ticker || '—'}) {t.tipo ? `[${t.tipo}]` : ''}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-black">${formatARS(total)}</div>
                    {currPerf !== null && (
                      <div className={`mt-1 inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full font-semibold ${pos ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                        {pos ? <FaArrowUp /> : <FaArrowDown />}
                        {currPerf.toFixed(2)}%
                      </div>
                    )}
                  </div>
                </div>
                {share !== undefined && (
                  <>
                    <div className="flex items-center justify-between mb-1 text-sm text-gray-600">
                      <span>Participación en portfolio</span>
                      <span className="px-2 py-0.5 text-xs rounded-full bg-amber-50 text-amber-700 font-medium">{share.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-2 overflow-hidden bg-gray-100 rounded">
                      <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500" style={{ width: `${share}%` }} />
                    </div>
                  </>
                )}
              </div>
            );
          })() : (
            <div className="text-base text-gray-600">No hay activos.</div>
          )}
        </div>
      </div>

      <div className="p-6 mb-8 bg-white rounded-lg shadow">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <strong className="text-xl text-black">Rendimiento por activo al {date}:</strong>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} className="px-2 text-sm font-medium text-black border rounded" />
        </div>
        <ul className="text-base text-black divide-y">
          {performance.map(item => (
            <li key={item.id} className="flex flex-wrap items-center gap-2 py-2">
              <span className="font-semibold">{item.name || item.nombre}</span>
              <span className="text-sm text-gray-700">({item.ticker}) [{item.tipo}]</span>
              {item.rendimiento !== null ? (
                <span style={{ color: item.rendimiento >= 0 ? 'green' : 'red' }} className="font-bold">{item.rendimiento.toFixed(2)}%</span>
              ) : (
                <span className="text-gray-400">Sin datos</span>
              )}
              {item.priceOnDate && (
                <span className="text-sm text-gray-700">(Precio en fecha: ${item.priceOnDate.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="p-6 mb-8 bg-white rounded-lg shadow">
        <strong className="block mb-2 text-xl text-black">Rendimiento actual por activo</strong>
        {currentPerformance && currentPerformance.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {currentPerformance.map((item: any) => {
              const perf = typeof item.rendimiento === 'number' ? item.rendimiento : null;
              const pos = perf !== null && perf >= 0;
              const bar = Math.min(100, Math.max(0, perf !== null ? Math.abs(perf) : 0));
              return (
                <div key={item.id || `${item.ticker}-${item.name}`} className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="text-xl">{getTypeIcon(item.tipo || '')}</div>
                      <div>
                        <div className="text-lg font-semibold text-black">{item.name || item.nombre}</div>
                        <div className="text-sm text-gray-600">({item.ticker}) [{item.tipo}]</div>
                      </div>
                    </div>
                    <div className={`px-2 py-0.5 text-sm rounded-full font-semibold ${perf === null ? 'bg-gray-100 text-gray-500' : pos ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                      {perf === null ? 'Sin datos' : (
                        <span className="inline-flex items-center gap-1">{pos ? <FaArrowUp /> : <FaArrowDown />}{perf.toFixed(2)}%</span>
                      )}
                    </div>
                  </div>
                  {item.currentPrice && (
                    <div className="mb-2 text-sm text-gray-700">Precio actual: ${item.currentPrice.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  )}
                  {perf !== null && (
                    <div className="w-full h-2 overflow-hidden bg-gray-100 rounded">
                      <div className={`h-full ${pos ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ width: `${bar}%` }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-base text-gray-600">Sin datos de rendimiento actual.</div>
        )}
      </div>

      <div className="p-6 mb-8 bg-white rounded-lg shadow">
        <strong className="block mb-4 text-xl text-black">Ranking de activos por valor</strong>
        {rankedAssets && rankedAssets.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {rankedAssets.map((item: any, idx: number) => {
              const total = Number(item.totalValue || 0);
              const pct = Math.min(100, Math.max(0, (total / maxRankValue) * 100));
              const isTop3 = idx < 3;
              return (
                <div key={item.id || `${item.ticker}-${idx}`} className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center text-sm font-bold text-white rounded-full w-7 h-7" style={{ background: isTop3 ? '#f59e0b' : '#94a3b8' }}>{idx + 1}</div>
                      <div>
                        <div className="inline-flex items-center gap-2 text-lg font-semibold text-black">
                          {item.name || item.nombre}
                          {isTop3 && <FaMedal className="text-amber-500" />}
                        </div>
                        <div className="text-sm text-gray-600">({item.ticker})</div>
                      </div>
                    </div>
                    <div className="text-base font-semibold text-black">${formatARS(total)}</div>
                  </div>
                  <div className="w-full h-2 overflow-hidden bg-gray-100 rounded">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-base text-gray-600">Sin datos de ranking.</div>
        )}
      </div>

      <div className="relative p-6 overflow-hidden bg-white rounded-lg shadow">
        <img src={financeBg} alt="bg" className="absolute inset-0 object-cover w-full h-full pointer-events-none select-none opacity-5" />
        <div className="relative">
          <strong className="block mb-4 text-xl text-black">Resumen por tipo de activo</strong>
          {stats?.summaryByType ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {Object.entries(stats.summaryByType).map(([type, summary]: any) => {
                const pct = rawDistribution ? normalizePercent(Number((rawDistribution as any)[type])) : undefined;
                return (
                  <div key={type} className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-md bg-white/90">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="text-xl">{getTypeIcon(type)}</div>
                        <span className="text-lg font-semibold text-black">{type}</span>
                      </div>
                      {pct !== undefined && (
                        <span className="px-2 py-0.5 text-sm rounded-full bg-orange-50 text-orange-700 font-medium">{pct.toFixed(1)}%</span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-base">
                      <div className="text-gray-700">Valor total</div>
                      <div className="font-semibold text-right text-black">${summary?.totalValue !== undefined ? formatARS(Number(summary.totalValue)) : '—'}</div>
                      {summary?.count !== undefined && (<>
                        <div className="text-gray-700">Cantidad</div>
                        <div className="text-right text-black">{summary.count}</div>
                      </>)}
                      {summary?.averagePrice !== undefined && (<>
                        <div className="text-gray-700">Precio promedio</div>
                        <div className="text-right text-black">${formatARS(Number(summary.averagePrice))}</div>
                      </>)}
                    </div>
                    {pct !== undefined && (
                      <div className="w-full h-2 mt-3 overflow-hidden bg-gray-100 rounded">
                        <div className="h-full bg-gradient-to-r from-orange-400 to-amber-500" style={{ width: `${pct}%` }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : stats?.assetAllocation ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {Object.entries(stats.assetAllocation).map(([type, percent]) => {
                const pct = normalizePercent(Number(percent as number));
                return (
                  <div key={type} className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-md bg-white/90">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="text-xl">{getTypeIcon(type)}</div>
                        <span className="text-lg font-semibold text-black">{type}</span>
                      </div>
                      <span className="px-2 py-0.5 text-sm rounded-full bg-orange-50 text-orange-700 font-medium">{pct.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-2 overflow-hidden bg-gray-100 rounded">
                      <div className="h-full bg-gradient-to-r from-orange-400 to-amber-500" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-base text-gray-600">Sin datos de resumen por tipo.</div>
          )}
        </div>
      </div>
    </div>
  );
};