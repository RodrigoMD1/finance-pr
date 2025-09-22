export default function Analisis() {
  const ratios = [
    ['P/E', 'Precio/Ganancias, ideal < 15-20 para value'],
    ['P/B', 'Precio/Valor Libro, ideal < 1.5 conservador'],
    ['ROE', '> 15% excelente'],
    ['Debt/Equity', '< 0.5 conservador'],
    ['Current Ratio', '> 1.5 saludable'],
    ['Revenue Growth', '> 10% fuerte'],
  ];
  const indicadores = [
    ['Medias Móviles (SMA/EMA)', 'Detectar tendencia'],
    ['RSI', '> 70 sobrecompra, < 30 sobreventa'],
    ['MACD', 'Cruces como señales'],
    ['Bandas de Bollinger', 'Volatilidad y breakouts'],
    ['Volumen', 'Confirmar movimientos'],
    ['Fibonacci', 'Soportes y resistencias'],
  ];
  const onchain = [
    ['Market Cap','Capitalización total'],['TVL','Total Value Locked'],['Active Addresses','Direcciones activas'],['Hash Rate','Poder de minería (BTC)'],['Staking Ratio','% en staking'],['Dev Activity','Actividad GitHub']
  ];
  const herramientas = [
    ['Yahoo Finance','Estados financieros (gratis)'],
    ['Morningstar','Análisis profesional (freemium)'],
    ['SEC Edgar','Reportes oficiales (gratis)'],
    ['Finviz','Screener (freemium)'],
    ['Simply Wall St','Visualización (freemium)'],
    ['TradingView','Gráficos avanzados (freemium)'],
    ['MetaTrader 5','Plataforma trading (gratis)'],
    ['Investing.com','Noticias y gráficos (freemium)'],
  ];
  return (
    <div className="space-y-6">
      <div className="p-6 bg-white rounded-xl shadow">
        <h2 className="text-2xl font-bold text-gray-900">📊 Análisis</h2>
        <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2">
          <div className="p-4 border rounded-lg">
            <div className="text-lg font-semibold text-gray-900">Análisis Fundamental</div>
            <p className="mt-1 text-sm text-gray-700">Evalúa el valor intrínseco mediante estados financieros y negocio.</p>
            <ul className="mt-2 text-sm text-gray-800 list-disc list-inside">
              {ratios.map(([k,v]) => (<li key={k}><span className="font-semibold">{k}</span>: {v}</li>))}
            </ul>
            <ol className="mt-3 pl-4 list-decimal text-sm text-gray-700">
              <li>Revisar ingresos, balance y flujo de caja</li>
              <li>Calcular ratios clave</li>
              <li>Analizar industria y competencia</li>
              <li>Evaluar management y gobierno</li>
              <li>Proyectar flujos de caja</li>
              <li>Estimar valor intrínseco</li>
            </ol>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="text-lg font-semibold text-gray-900">Análisis Técnico</div>
            <p className="mt-1 text-sm text-gray-700">Estudia precio y volumen para anticipar movimientos.</p>
            <ul className="mt-2 text-sm text-gray-800 list-disc list-inside">
              {indicadores.map(([k,v]) => (<li key={k}><span className="font-semibold">{k}</span>: {v}</li>))}
            </ul>
            <div className="mt-2 text-sm text-gray-700">Patrones: Triángulos, HCH, Doble Techo/Piso, Bandera, Copa y Asa.</div>
          </div>
        </div>

        <div className="p-4 mt-4 border rounded-lg">
          <div className="text-lg font-semibold text-gray-900">Análisis en Criptomonedas</div>
          <div className="grid grid-cols-1 gap-4 mt-2 md:grid-cols-2">
            <div>
              <div className="text-sm font-semibold text-gray-900">Métricas On-Chain</div>
              <ul className="mt-1 text-sm text-gray-800 list-disc list-inside">
                {onchain.map(([k,v]) => (<li key={k}><span className="font-semibold">{k}</span>: {v}</li>))}
              </ul>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">Fundamentales Crypto</div>
              <ul className="mt-1 text-sm text-gray-800 list-disc list-inside">
                {['Caso de uso','Tokenomics','Roadmap','Partnerships','Comunidad','Riesgo regulatorio'].map(k => (<li key={k}>{k}</li>))}
              </ul>
            </div>
          </div>
          <div className="mt-2 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded p-2">Tip: En crypto, combina técnico + on-chain + fundamentales. El sentimiento (Fear & Greed) importa mucho.</div>
        </div>

        <div className="p-4 mt-4 border rounded-lg">
          <div className="text-lg font-semibold text-gray-900">🛠️ Herramientas Recomendadas</div>
          <div className="grid grid-cols-1 gap-2 mt-2 md:grid-cols-2">
            {herramientas.map(([name,desc]) => (
              <div key={name} className="p-2 bg-gray-50 rounded text-sm text-gray-800 flex items-center justify-between">
                <span className="font-medium">{name}</span>
                <span className="text-gray-600">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
