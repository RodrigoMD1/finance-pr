import { FaFileAlt, FaDownload, FaChartPie, FaChartLine, FaCalendarAlt, FaSpinner } from 'react-icons/fa';
import { useState } from 'react';
import toast from 'react-hot-toast';

function DownloadReportButton() {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("https://proyecto-inversiones.onrender.com/api/report/download", {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            if (res.ok) {
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "reporte.pdf";
                a.click();
                window.URL.revokeObjectURL(url);
                toast.success('Reporte descargado exitosamente');
            } else {
                toast.error('Error al descargar el reporte');
            }
        } catch (error) {
            console.error('Error downloading report:', error);
            toast.error('Error de conexión al descargar el reporte');
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <button 
            className="industrial-button w-full py-3 flex items-center justify-center gap-2 text-lg font-semibold"
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-industrial-charcoal via-industrial-iron to-industrial-charcoal">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-industrial-white mb-4">
                        <FaFileAlt className="inline mr-3 text-industrial-copper" />
                        Informes y Reportes
                    </h1>
                    <p className="text-industrial-steel text-lg max-w-2xl mx-auto">
                        Genera reportes detallados de tu portafolio de inversiones con análisis completo de rendimiento y distribución de activos
                    </p>
                </div>

                {/* Características del reporte */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {reportFeatures.map((feature, index) => (
                        <div key={index} className="glass-effect p-6 rounded-xl border border-industrial-copper/20 text-center">
                            <div className="bg-gradient-to-br from-industrial-copper to-industrial-copper/70 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <feature.icon className="text-white text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-industrial-white mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-industrial-steel text-sm">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Panel principal de descarga */}
                <div className="max-w-2xl mx-auto">
                    <div className="glass-effect p-8 rounded-2xl border border-industrial-copper/20">
                        <div className="text-center mb-8">
                            <div className="bg-gradient-to-br from-industrial-copper to-industrial-copper/70 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                <FaFileAlt className="text-white text-3xl" />
                            </div>
                            <h2 className="text-2xl font-bold text-industrial-white mb-4">
                                Generar Reporte Completo
                            </h2>
                            <p className="text-industrial-steel mb-6">
                                Descarga un informe detallado en PDF con el análisis completo de tu portafolio, 
                                incluyendo gráficos, estadísticas y recomendaciones personalizadas.
                            </p>
                        </div>

                        <DownloadReportButton />

                        <div className="mt-6 p-4 bg-industrial-iron/20 rounded-lg border border-industrial-copper/10">
                            <h4 className="text-sm font-semibold text-industrial-white mb-2">
                                El reporte incluye:
                            </h4>
                            <ul className="text-sm text-industrial-steel space-y-1">
                                <li>• Resumen ejecutivo de tu portafolio</li>
                                <li>• Análisis de diversificación por tipo de activo</li>
                                <li>• Rendimiento histórico y proyecciones</li>
                                <li>• Recomendaciones de optimización</li>
                                <li>• Gráficos y visualizaciones detalladas</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}