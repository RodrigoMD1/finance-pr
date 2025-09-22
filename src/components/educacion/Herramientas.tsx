export default function Herramientas() {
  const calculadoras = [
    ['Interés Compuesto','VF = VP × (1 + r)^n','Ej: $1000 al 10% por 10 años = $2,594'],
    ['DCA (Dollar Cost Averaging)','Inversión Total / Precio Promedio','Ej: $100 mensuales en BTC por 2 años'],
    ['Riesgo por Operación','Capital × % Máximo de Riesgo','Ej: $10,000 × 2% = $200'],
    ['Diversificación (Regla 100 - Edad)','% RV = 100 - Edad','Ej: 30 años → 70% acciones, 30% bonos'],
  ];
  const libros = [
    ['El Inversor Inteligente','Benjamin Graham','Value investing'],
    ['Un Paseo Aleatorio por Wall Street','Burton Malkiel','Inversión pasiva'],
    ['Padre Rico, Padre Pobre','Robert Kiyosaki','Mentalidad financiera'],
    ['The Little Book of Common Sense Investing','John Bogle','Fondos índice'],
  ];
  const recursos = [
    ['Investopedia','Diccionario y tutoriales'],
    ['Yahoo Finance','Cotizaciones y noticias'],
    ['TradingView','Gráficos avanzados'],
    ['Morningstar','Análisis de fondos'],
    ['SEC.gov','Reportes oficiales'],
  ];
  return (
    <div className="space-y-6">
      <div className="p-6 bg-white rounded-xl shadow">
        <h2 className="text-2xl font-bold text-gray-900">🛠️ Herramientas</h2>
        <div className="p-4 mt-2 border rounded-lg">
          <div className="text-lg font-semibold text-gray-900">Calculadoras Esenciales</div>
          <div className="grid grid-cols-1 gap-3 mt-2 md:grid-cols-2">
            {calculadoras.map(([name,formula,ej]) => (
              <div key={name} className="p-3 bg-gray-50 rounded">
                <div className="text-sm font-bold text-gray-900">{name}</div>
                <div className="mt-1 text-sm text-gray-700">Fórmula: {formula}</div>
                <div className="mt-1 text-sm text-gray-600">{ej}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
          <div className="p-4 border rounded-lg">
            <div className="text-sm font-bold text-gray-900">📚 Libros Recomendados</div>
            <ul className="mt-2 space-y-1 text-sm text-gray-800 list-disc list-inside">
              {libros.map(([t,a,n]) => (<li key={t}><span className="font-semibold">{t}</span> — {a} ({n})</li>))}
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="text-sm font-bold text-gray-900">🌐 Recursos Online</div>
            <ul className="mt-2 space-y-1 text-sm text-gray-800 list-disc list-inside">
              {recursos.map(([n,d]) => (<li key={n}><span className="font-semibold">{n}</span>: {d}</li>))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
