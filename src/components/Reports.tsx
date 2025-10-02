import { FaFileAlt, FaDownload, FaChartPie, FaChartLine, FaCalendarAlt, FaSpinner, FaCheckCircle, FaClock, FaLock, FaSignInAlt } from 'react-icons/fa';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { reportsService } from '../services/reportsService';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

type ReportType = 'portfolio' | 'performance' | 'transactions';
type ReportPeriod = 'daily' | 'weekly' | 'monthly' | 'yearly';

function DownloadReportButton({ type, period, onDownloaded }: { type: ReportType; period: ReportPeriod; onDownloaded: (info: { type: ReportType; period: ReportPeriod; date: string }) => void }) {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            await reportsService.downloadCurrentUserReport(type, period);
            toast.success('Reporte descargado exitosamente');
            onDownloaded({ type, period, date: new Date().toISOString() });
        } catch (error) {
            console.error('Error downloading report:', error);
            toast.error('No se pudo descargar el reporte');
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <button
            className="flex items-center justify-center w-full gap-2 py-3 text-lg font-semibold industrial-button"
            onClick={handleDownload}
            disabled={isDownloading}
        >
            {isDownloading ? (
                <>
                    <FaSpinner className="animate-spin" />
                    Descargando...
                </>
            ) : (
                <>
                    <FaDownload />
                    Descargar Reporte PDF
                </>
            )}
        </button>
    );
}

export function Reports() {
    // Verificar autenticación primero
    const isAuthenticated = !!localStorage.getItem('token');
    
    const [type, setType] = useState<ReportType>('portfolio');
    const [period, setPeriod] = useState<ReportPeriod>('monthly');
    const [recent, setRecent] = useState<Array<{ type: ReportType; period: ReportPeriod; date: string }>>([]);

    const reportFeatures = [
        {
            icon: FaChartPie,
            title: "Análisis de Portafolio",
            description: "Distribución detallada de tus activos por tipo y valor"
        },
        {
            icon: FaChartLine,
            title: "Rendimiento",
            description: "Análisis de ganancias y pérdidas de tus inversiones"
        },
        {
            icon: FaCalendarAlt,
            title: "Historial Temporal",
            description: "Evolución de tu portafolio a lo largo del tiempo"
        }
    ];

    const previewData = useMemo(() => {
            const base = [
                { date: '2025-01', total: 100 },
                { date: '2025-02', total: 105 },
                { date: '2025-03', total: 102 },
                { date: '2025-04', total: 110 },
                { date: '2025-05', total: 115 },
                { date: '2025-06', total: 118 }
            ];
            if (type === 'performance') return base.map((d, i) => ({ ...d, total: d.total + (i % 2 === 0 ? 4 : -2) }));
            if (type === 'transactions') return base.map((d, i) => ({ ...d, total: d.total + (i * 3) % 7 }));
            return base;
        }, [type]);

        const addRecent = (info: { type: ReportType; period: ReportPeriod; date: string }) => {
            setRecent(prev => [info, ...prev].slice(0, 5));
        };

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
                            Para acceder a los informes de tu portafolio, necesitas iniciar sesión en tu cuenta.
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

            return (
            <div className="min-h-screen text-white bg-gray-900">
                            <div className="container px-4 py-8 mx-auto">
                {/* Header */}
                <div className="mb-12 text-center">
                                            <h1 className="mb-4 text-4xl font-bold text-white force-white">
                                                    <FaFileAlt className="inline mr-3 text-orange-500" />
                        Informes y Reportes
                    </h1>
                                            <p className="max-w-2xl mx-auto text-lg text-white/80">
                        Genera reportes detallados de tu portafolio de inversiones con análisis completo de rendimiento y distribución de activos
                    </p>
                </div>

                                {/* Controles */}
                                                    <div className="p-4 mb-8 border border-gray-700 md:p-6 rounded-xl bg-gray-800/80 backdrop-blur">
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                                                <div className="mb-2 text-sm text-white/70">Tipo de reporte</div>
                                            <div className="flex flex-wrap gap-2">
                                                {([
                                                    { key: 'portfolio', label: 'Portafolio' },
                                                    { key: 'performance', label: 'Rendimiento' },
                                                    { key: 'transactions', label: 'Transacciones' }
                                                ] as const).map(opt => (
                                                    <button
                                                        key={opt.key}
                                                        onClick={() => setType(opt.key)}
                                                                            className={`px-3 py-1.5 rounded-md border text-sm ${type === opt.key ? 'bg-orange-600 text-white border-orange-600' : 'bg-gray-800 text-white/80 border-gray-700 hover:bg-gray-700'}`}
                                                    >
                                                        {opt.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                                                <div className="mb-2 text-sm text-white/70">Periodo</div>
                                            <div className="flex flex-wrap gap-2">
                                                {([
                                                    { key: 'daily', label: 'Diario' },
                                                    { key: 'weekly', label: 'Semanal' },
                                                    { key: 'monthly', label: 'Mensual' },
                                                    { key: 'yearly', label: 'Anual' }
                                                ] as const).map(opt => (
                                                    <button
                                                        key={opt.key}
                                                        onClick={() => setPeriod(opt.key)}
                                                                            className={`px-3 py-1.5 rounded-md border text-sm ${period === opt.key ? 'bg-orange-600 text-white border-orange-600' : 'bg-gray-800 text-white/80 border-gray-700 hover:bg-gray-700'}`}
                                                    >
                                                        {opt.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Características del reporte */}
                <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-3">
                    {reportFeatures.map((feature, index) => (
                        <div key={index} className="p-6 text-center border border-gray-700 rounded-xl bg-gray-800/80 backdrop-blur">
                            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-br from-orange-500 to-orange-400">
                                <feature.icon className="text-2xl text-white" />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-white force-white">
                                <feature.icon className="inline mr-2 text-orange-500" />
                                {feature.title}
                            </h3>
                            <p className="text-sm text-white/70">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                                {/* Panel principal de descarga + vista previa */}
                                <div className="max-w-5xl mx-auto">
                                    <div className="p-6 border border-gray-700 md:p-8 rounded-2xl bg-gray-800/80 backdrop-blur">
                        <div className="mb-8 text-center">
                                            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full shadow-lg bg-gradient-to-br from-orange-500 to-orange-400">
                                <FaFileAlt className="text-3xl text-white" />
                            </div>
                                            <h2 className="mb-4 text-2xl font-bold text-white force-white">
                                                <FaFileAlt className="inline mr-2 text-orange-500" />
                                                Generar Reporte Completo
                            </h2>
                                            <p className="mb-6 text-white/80">
                                Descarga un informe detallado en PDF con el análisis completo de tu portafolio, 
                                incluyendo gráficos, estadísticas y recomendaciones personalizadas.
                            </p>
                        </div>

                                                <div className="grid items-start grid-cols-1 gap-6 lg:grid-cols-5">
                                                                                                            <div className="lg:col-span-3">
                                                                                                                <div className="p-4 bg-gray-800 border border-gray-700 rounded-xl">
                                                                                                                    <div className="flex items-center justify-between mb-2">
                                                                                                                        <div className="font-semibold text-white">Vista previa</div>
                                                                                                                        <div className="text-xs text-white/70">Tipo: {type} • Periodo: {period}</div>
                                                            </div>
                                                            <div className="h-56">
                                                                <ResponsiveContainer width="100%" height="100%">
                                                                    <LineChart data={previewData} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                                                                                                                                <CartesianGrid strokeDasharray="3 3" stroke="#2e2e2e" />
                                                                                                                                <XAxis dataKey="date" stroke="#c9c9c9" tick={{ fontSize: 12 }} />
                                                                                                                                <YAxis stroke="#c9c9c9" tick={{ fontSize: 12 }} />
                                                                        <Tooltip wrapperStyle={{ fontSize: 12 }} />
                                                                        <Line type="monotone" dataKey="total" stroke="#d97706" strokeWidth={2} dot={false} />
                                                                    </LineChart>
                                                                </ResponsiveContainer>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-4 lg:col-span-2">
                                                        <DownloadReportButton type={type} period={period} onDownloaded={addRecent} />
                                                                                                                <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
                                                                                                                    <h4 className="mb-2 text-sm font-semibold text-white force-white">
                                                            <FaFileAlt className="inline mr-2 text-orange-500" />
                                                            El reporte incluye:
                                                        </h4>
                                                                                                                    <ul className="space-y-1 text-sm text-white/80">
                                                                <li>• Resumen ejecutivo de tu portafolio</li>
                                                                <li>• Análisis de diversificación por tipo de activo</li>
                                                                <li>• Rendimiento histórico y proyecciones</li>
                                                                <li>• Recomendaciones de optimización</li>
                                                                <li>• Gráficos y visualizaciones detalladas</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Descargas recientes */}
                                                                        <div className="mt-8">
                                                                            <h3 className="flex items-center gap-2 mb-3 font-semibold text-white force-white"><FaClock className="text-orange-500"/> Descargas recientes</h3>
                                                    {recent.length === 0 ? (
                                                                                <div className="text-sm text-white/70">Aún no descargaste reportes en esta sesión.</div>
                                                    ) : (
                                                                                <ul className="divide-y divide-gray-700">
                                                            {recent.map((r, idx) => (
                                                                <li key={idx} className="flex items-center justify-between py-2 text-sm">
                                                                                            <div className="flex items-center gap-2 text-white/70">
                                                                                                    <FaCheckCircle className="text-orange-500" />
                                                                                                <span className="font-medium text-white capitalize">{r.type}</span>
                                                                        <span>•</span>
                                                                        <span className="capitalize">{r.period}</span>
                                                                    </div>
                                                                                            <span className="text-white/70">{new Date(r.date).toLocaleString('es-AR')}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                    </div>
                </div>
            </div>
        </div>
    );
}