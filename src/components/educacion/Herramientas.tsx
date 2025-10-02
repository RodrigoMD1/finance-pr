import { FaTools, FaCalculator, FaBook, FaGlobe, FaMobileAlt, FaChartLine } from 'react-icons/fa';

export default function Herramientas() {
  const plataformasArgentina = [
    {
      nombre: 'IOL Invertir Online',
      tipo: 'Broker completo',
      comision: '0.5-1% + impuestos',
      productos: 'Acciones locales, CEDEARs, bonos, FCI',
      pros: 'Pionero en Argentina, plataforma completa',
      contras: 'Comisiones medias',
      web: 'invertironline.com'
    },
    {
      nombre: 'Bull Market Brokers',
      tipo: 'Broker completo',
      comision: '0.5% + impuestos',
      productos: 'Acciones, CEDEARs, bonos, opciones, futuros',
      pros: 'Plataforma avanzada, bajas comisiones',
      contras: 'Interfaz menos intuitiva',
      web: 'bullmarketbrokers.com'
    },
    {
      nombre: 'Balanz',
      tipo: 'Broker + FCI',
      comision: '0.5% + impuestos',
      productos: 'Acciones, CEDEARs, bonos, FCI propios',
      pros: 'App moderna, research propio',
      contras: 'Menos productos que otros',
      web: 'balanz.com'
    },
    {
      nombre: 'PPI (Portfolio Personal)',
      tipo: 'Broker premium',
      comision: 'Variable según volumen',
      productos: 'Acciones, CEDEARs, bonos, opciones',
      pros: 'Research de calidad, atención personalizada',
      contras: 'Requiere mínimo de capital',
      web: 'portfoliopersonal.com'
    },
    {
      nombre: 'Cocos Capital',
      tipo: 'Broker digital',
      comision: 'Baja',
      productos: 'CEDEARs, FCI, crypto',
      pros: 'App muy simple, sin mínimo',
      contras: 'Menos productos tradicionales',
      web: 'cocos.capital'
    }
  ];

  const plataformasInternacionales = [
    {
      nombre: 'Interactive Brokers',
      region: '🌎 Global',
      acceso: 'Directo desde Argentina',
      productos: 'Acciones, ETFs, opciones, futuros, forex, bonos (135 mercados)',
      comision: 'Muy baja ($0.005/acción)',
      minimo: 'USD 0 (recomendado $2,000+)',
      pros: 'El más completo, comisiones bajísimas',
      contras: 'Interfaz compleja para principiantes'
    },
    {
      nombre: 'TD Ameritrade',
      region: '🇺🇸 USA',
      acceso: 'Con pasaporte extranjero',
      productos: 'Acciones USA, ETFs, opciones',
      comision: '$0 en acciones/ETFs',
      minimo: 'USD 0',
      pros: 'Plataforma ThinkOrSwim excelente',
      contras: 'No acepta todos los países'
    },
    {
      nombre: 'Binance',
      region: '🌎 Global',
      acceso: 'Directo',
      productos: 'Criptomonedas (350+), staking, futures',
      comision: '0.1% (menos con BNB)',
      minimo: 'USD 10',
      pros: 'Mayor exchange del mundo, liquidez alta',
      contras: 'Solo crypto, regulación incierta'
    }
  ];

  const herramientasAnalisis = [
    {
      nombre: 'TradingView',
      categoria: 'Gráficos',
      precio: 'Gratis / $12.95+/mes',
      features: ['Gráficos avanzados', 'Indicadores técnicos', 'Alertas', 'Social trading'],
      ideal: 'Análisis técnico profesional',
      url: 'tradingview.com'
    },
    {
      nombre: 'Yahoo Finance',
      categoria: 'Cotizaciones',
      precio: 'Gratis',
      features: ['Precios en tiempo real', 'Estados financieros', 'Noticias', 'Screener'],
      ideal: 'Consulta rápida de precios',
      url: 'finance.yahoo.com'
    },
    {
      nombre: 'Morningstar',
      categoria: 'Análisis fondos',
      precio: 'Gratis / Premium',
      features: ['Rating de fondos', 'Análisis profesional', 'X-Ray de portafolio'],
      ideal: 'Evaluar fondos mutuos y ETFs',
      url: 'morningstar.com'
    },
    {
      nombre: 'Finviz',
      categoria: 'Screener',
      precio: 'Gratis / $39.50/mes',
      features: ['Filtros avanzados', 'Mapas de calor', 'Backtesting', 'Alertas'],
      ideal: 'Encontrar oportunidades de inversión',
      url: 'finviz.com'
    },
    {
      nombre: 'Simply Wall St',
      categoria: 'Visualización',
      precio: 'Gratis / $10+/mes',
      features: ['Visualización de fundamentales', 'Análisis automático', 'Comparativas'],
      ideal: 'Análisis fundamental visual',
      url: 'simplywall.st'
    },
    {
      nombre: 'Portfolio Visualizer',
      categoria: 'Backtesting',
      precio: 'Gratis',
      features: ['Backtest de estrategias', 'Optimización', 'Asset allocation'],
      ideal: 'Testear estrategias históricamente',
      url: 'portfoliovisualizer.com'
    }
  ];

  const calculadorasEsenciales = [
    {
      nombre: 'Interés Compuesto',
      formula: 'VF = VP × (1 + r)^n',
      variables: ['VP = Valor presente', 'r = tasa de interés', 'n = períodos'],
      ejemplo: '$1,000 al 10% anual por 20 años = $6,727',
      uso: 'Proyectar crecimiento de inversiones',
      online: 'calculator.net/investment-calculator.html'
    },
    {
      nombre: 'Dollar Cost Averaging',
      formula: 'Precio promedio = Σ(Inversión) / Σ(Acciones compradas)',
      variables: ['Inversión fija periódica', 'Precio variable'],
      ejemplo: '$100 mensuales en BTC por 2 años → precio promedio suavizado',
      uso: 'Calcular costo promedio con aportes regulares',
      online: 'dcacalculator.io'
    },
    {
      nombre: 'Regla del 72',
      formula: 'Años para duplicar = 72 / tasa de retorno',
      variables: ['Tasa de retorno anual'],
      ejemplo: 'Al 10% anual → duplicas en 7.2 años; al 7% → 10.3 años',
      uso: 'Estimación rápida de duplicación de capital',
      online: 'Cálculo mental'
    },
    {
      nombre: '4% Rule (FIRE)',
      formula: 'Capital necesario = Gastos anuales × 25',
      variables: ['Gastos anuales deseados'],
      ejemplo: 'Gastas $20,000/año → necesitas $500,000 para retirarte',
      uso: 'Calcular cuánto necesitas para independencia financiera',
      online: 'firecalc.com'
    },
    {
      nombre: 'Sharpe Ratio',
      formula: 'Sharpe = (Retorno - Tasa libre riesgo) / Volatilidad',
      variables: ['Retorno del portafolio', 'Tasa libre de riesgo', 'Desviación estándar'],
      ejemplo: 'Sharpe > 1 es bueno, > 2 es excelente',
      uso: 'Medir retorno ajustado por riesgo',
      online: 'portfoliovisualizer.com'
    }
  ];

  const librosRecomendados = [
    {
      titulo: 'El Inversor Inteligente',
      autor: 'Benjamin Graham',
      categoria: 'Value Investing',
      nivel: 'Intermedio',
      descripcion: 'La biblia del value investing. Comprar acciones con descuento sobre valor intrínseco.',
      keyTakeaway: 'Margen de seguridad y análisis fundamental'
    },
    {
      titulo: 'Un Paseo Aleatorio por Wall Street',
      autor: 'Burton Malkiel',
      categoria: 'Inversión Pasiva',
      nivel: 'Principiante',
      descripcion: 'Argumenta que batir al mercado es casi imposible. Mejor invertir en índices.',
      keyTakeaway: 'Buy & hold de fondos índice de bajo costo'
    },
    {
      titulo: 'Padre Rico, Padre Pobre',
      autor: 'Robert Kiyosaki',
      categoria: 'Mentalidad',
      nivel: 'Principiante',
      descripcion: 'Cambia tu mentalidad sobre el dinero. Activos vs pasivos.',
      keyTakeaway: 'Compra activos que generen ingresos pasivos'
    },
    {
      titulo: 'The Little Book of Common Sense Investing',
      autor: 'John Bogle',
      categoria: 'Fondos Índice',
      nivel: 'Principiante',
      descripcion: 'Fundador de Vanguard explica por qué los fondos índice son superiores.',
      keyTakeaway: 'Costos bajos + largo plazo = éxito'
    },
    {
      titulo: 'Thinking, Fast and Slow',
      autor: 'Daniel Kahneman',
      categoria: 'Psicología',
      nivel: 'Intermedio',
      descripcion: 'Nobel de economía explica sesgos cognitivos que afectan decisiones.',
      keyTakeaway: 'Conoce tus sesgos para tomar mejores decisiones'
    },
    {
      titulo: 'The Intelligent Asset Allocator',
      autor: 'William Bernstein',
      categoria: 'Asset Allocation',
      nivel: 'Avanzado',
      descripcion: 'Cómo construir portafolios eficientes basados en teoría moderna.',
      keyTakeaway: 'Diversificación y rebalanceo sistemático'
    }
  ];

  const recursosOnline = [
    {
      categoria: '📰 Noticias Financieras',
      recursos: [
        { nombre: 'Bloomberg', desc: 'Noticias financieras en tiempo real', url: 'bloomberg.com' },
        { nombre: 'Reuters', desc: 'Cobertura global de mercados', url: 'reuters.com' },
        { nombre: 'Financial Times', desc: 'Análisis profundo y opinion', url: 'ft.com' },
        { nombre: 'Ámbito Financiero', desc: 'Argentina - Economía y finanzas', url: 'ambito.com' },
        { nombre: 'El Cronista', desc: 'Argentina - Mercados locales', url: 'cronista.com' }
      ]
    },
    {
      categoria: '🎓 Educación',
      recursos: [
        { nombre: 'Investopedia', desc: 'Diccionario y tutoriales completos', url: 'investopedia.com' },
        { nombre: 'Khan Academy', desc: 'Cursos gratis de finanzas', url: 'khanacademy.org' },
        { nombre: 'Coursera', desc: 'Cursos universitarios online', url: 'coursera.org' },
        { nombre: 'edX', desc: 'Cursos MIT, Harvard, etc.', url: 'edx.org' }
      ]
    },
    {
      categoria: '🎙️ Podcasts',
      recursos: [
        { nombre: 'Invest Like the Best', desc: 'Entrevistas con top inversores', url: 'Spotify/Apple' },
        { nombre: 'The Indicator', desc: 'Economía explicada simple (NPR)', url: 'Spotify/Apple' },
        { nombre: 'Animal Spirits', desc: 'Mercados y comportamiento', url: 'Spotify/Apple' },
        { nombre: 'Economía Para Todos', desc: 'Argentina - Contexto local', url: 'Spotify' }
      ]
    },
    {
      categoria: '📺 YouTube',
      recursos: [
        { nombre: 'Ben Felix', desc: 'Inversión basada en evidencia', url: '@BenFelixCSI' },
        { nombre: 'The Plain Bagel', desc: 'Finanzas personales explicado', url: '@ThePlainBagel' },
        { nombre: 'Graham Stephan', desc: 'Finanzas personales y bienes raíces', url: '@GrahamStephan' },
        { nombre: 'Inversor Global', desc: 'Argentina - Mercados locales', url: '@InversorGlobal' }
      ]
    }
  ];

  const appsMoviles = [
    {
      nombre: 'Personal Capital',
      tipo: 'Gestor de portafolio',
      plataforma: 'iOS/Android',
      precio: 'Gratis',
      features: 'Trackeo automático de inversiones, net worth, planificación retiro'
    },
    {
      nombre: 'Mint',
      tipo: 'Finanzas personales',
      plataforma: 'iOS/Android',
      precio: 'Gratis',
      features: 'Presupuesto, tracking gastos, alertas, inversiones'
    },
    {
      nombre: 'Yahoo Finance',
      tipo: 'Cotizaciones',
      plataforma: 'iOS/Android',
      precio: 'Gratis',
      features: 'Watchlists, noticias, alertas de precios, screener'
    },
    {
      nombre: 'TradingView',
      tipo: 'Gráficos',
      plataforma: 'iOS/Android',
      precio: 'Gratis/Premium',
      features: 'Charts profesionales, alertas, screener, social'
    },
    {
      nombre: 'Seeking Alpha',
      tipo: 'Research',
      plataforma: 'iOS/Android',
      precio: 'Gratis/Premium',
      features: 'Análisis de acciones, transcripciones earnings, noticias'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <FaTools className="text-3xl text-orange-600" />
          <div>
            <h2 className="text-3xl font-bold text-gray-900">🛠️ Herramientas y Recursos</h2>
            <p className="text-gray-700">Las mejores herramientas para potenciar tus inversiones</p>
          </div>
        </div>
        
        <div className="p-4 mt-4 bg-white/80 backdrop-blur rounded-lg border-l-4 border-orange-500">
          <p className="text-sm text-gray-800">
            <strong className="text-orange-600">🚀 Pro Tip:</strong> No necesitas todas las herramientas. 
            Empieza con 2-3 básicas (broker + plataforma de análisis + app de tracking) y expande según necesites.
          </p>
        </div>
      </div>

      {/* Brokers Argentina */}
      <div className="p-6 bg-white rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FaChartLine className="text-blue-600" />
          🇦🇷 Brokers en Argentina
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {plataformasArgentina.map((broker) => (
            <div key={broker.nombre} className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{broker.nombre}</h4>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">{broker.tipo}</span>
                </div>
                <a href={`https://${broker.web}`} target="_blank" rel="noopener noreferrer" 
                   className="text-xs text-blue-600 hover:underline">
                  {broker.web}
                </a>
              </div>
              
              <div className="space-y-2 text-sm">
                <div>
                  <strong className="text-gray-700">💰 Comisión:</strong>
                  <span className="text-gray-900 ml-2">{broker.comision}</span>
                </div>
                <div>
                  <strong className="text-gray-700">📦 Productos:</strong>
                  <p className="text-gray-800 mt-1">{broker.productos}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="p-2 bg-emerald-50 rounded">
                    <strong className="text-emerald-800 text-xs">✅ Pros:</strong>
                    <p className="text-gray-700 text-xs mt-1">{broker.pros}</p>
                  </div>
                  <div className="p-2 bg-rose-50 rounded">
                    <strong className="text-rose-800 text-xs">❌ Contras:</strong>
                    <p className="text-gray-700 text-xs mt-1">{broker.contras}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Brokers Internacionales */}
      <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FaGlobe className="text-purple-600" />
          🌎 Brokers Internacionales
        </h3>
        
        <div className="space-y-4">
          {plataformasInternacionales.map((broker) => (
            <div key={broker.nombre} className="p-5 bg-white rounded-xl shadow border border-purple-200">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-xl font-bold text-gray-900">{broker.nombre}</h4>
                    <span className="text-sm">{broker.region}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <strong className="text-purple-700">🔑 Acceso:</strong>
                      <span className="text-gray-800 ml-2">{broker.acceso}</span>
                    </div>
                    <div>
                      <strong className="text-purple-700">💰 Comisión:</strong>
                      <span className="text-gray-800 ml-2">{broker.comision}</span>
                    </div>
                    <div>
                      <strong className="text-purple-700">💵 Mínimo:</strong>
                      <span className="text-gray-800 ml-2">{broker.minimo}</span>
                    </div>
                    <div>
                      <strong className="text-purple-700">📦 Productos:</strong>
                      <span className="text-gray-800 ml-2">{broker.productos}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="p-2 bg-emerald-50 rounded text-xs">
                      <strong className="text-emerald-800">✅ {broker.pros}</strong>
                    </div>
                    <div className="p-2 bg-rose-50 rounded text-xs">
                      <strong className="text-rose-800">❌ {broker.contras}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Herramientas de Análisis */}
      <div className="p-6 bg-white rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FaChartLine className="text-emerald-600" />
          Herramientas de Análisis
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {herramientasAnalisis.map((herramienta) => (
            <div key={herramienta.nombre} className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg border border-emerald-200 hover:shadow-md transition-shadow">
              <div className="mb-3">
                <h4 className="font-bold text-gray-900 text-lg">{herramienta.nombre}</h4>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full">{herramienta.categoria}</span>
                  <span className="text-xs text-gray-600">{herramienta.precio}</span>
                </div>
              </div>
              
              <ul className="space-y-1 text-sm text-gray-700 mb-3">
                {herramienta.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="text-xs text-gray-600 border-t pt-2">
                <strong>Ideal para:</strong> {herramienta.ideal}
              </div>
              
              <a href={`https://${herramienta.url}`} target="_blank" rel="noopener noreferrer"
                 className="text-xs text-blue-600 hover:underline mt-2 inline-block">
                {herramienta.url} →
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Calculadoras */}
      <div className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FaCalculator className="text-indigo-600" />
          Calculadoras Esenciales
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {calculadorasEsenciales.map((calc) => (
            <div key={calc.nombre} className="p-5 bg-white rounded-xl shadow border border-indigo-200">
              <h4 className="font-bold text-indigo-900 text-lg mb-3">{calc.nombre}</h4>
              
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-gray-50 rounded">
                  <strong className="text-gray-700">📐 Fórmula:</strong>
                  <code className="block mt-1 text-gray-900 font-mono text-xs bg-white p-2 rounded">{calc.formula}</code>
                </div>
                
                <div>
                  <strong className="text-gray-700">📊 Variables:</strong>
                  <ul className="mt-1 space-y-1 text-gray-600">
                    {calc.variables.map((v, idx) => (
                      <li key={idx}>• {v}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="p-3 bg-amber-50 rounded">
                  <strong className="text-amber-800">💡 Ejemplo:</strong>
                  <p className="text-gray-800 mt-1">{calc.ejemplo}</p>
                </div>
                
                <div className="p-3 bg-blue-50 rounded">
                  <strong className="text-blue-800">🎯 Uso:</strong>
                  <p className="text-gray-800 mt-1">{calc.uso}</p>
                </div>
                
                <div className="text-xs text-gray-600">
                  <strong>🔗 Online:</strong> {calc.online}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Libros */}
      <div className="p-6 bg-white rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FaBook className="text-amber-600" />
          📚 Libros Recomendados
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {librosRecomendados.map((libro) => (
            <div key={libro.titulo} className="p-5 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border border-amber-200 hover:shadow-lg transition-shadow">
              <div className="mb-3">
                <h4 className="font-bold text-gray-900 text-lg">{libro.titulo}</h4>
                <p className="text-sm text-gray-700 mt-1">por {libro.autor}</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full">{libro.categoria}</span>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Nivel: {libro.nivel}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-700 mb-3">{libro.descripcion}</p>
              
              <div className="p-3 bg-white rounded border-l-2 border-amber-500">
                <strong className="text-amber-800 text-xs">🔑 Key Takeaway:</strong>
                <p className="text-gray-800 text-sm mt-1">{libro.keyTakeaway}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recursos Online */}
      <div className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FaGlobe className="text-teal-600" />
          🌐 Recursos Online
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recursosOnline.map((categoria) => (
            <div key={categoria.categoria} className="p-5 bg-white rounded-xl shadow">
              <h4 className="font-bold text-teal-900 text-lg mb-3">{categoria.categoria}</h4>
              <div className="space-y-2">
                {categoria.recursos.map((recurso) => (
                  <div key={recurso.nombre} className="p-3 bg-teal-50 rounded hover:bg-teal-100 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{recurso.nombre}</div>
                        <div className="text-sm text-gray-600 mt-1">{recurso.desc}</div>
                      </div>
                      <span className="text-xs text-blue-600 hover:underline ml-2">{recurso.url}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Apps Móviles */}
      <div className="p-6 bg-white rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FaMobileAlt className="text-purple-600" />
          📱 Apps Móviles
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {appsMoviles.map((app) => (
            <div key={app.nombre} className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
              <div className="mb-3">
                <h4 className="font-bold text-gray-900">{app.nombre}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">{app.tipo}</span>
                  <span className="text-xs text-gray-600">{app.plataforma}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-700 mb-2">{app.features}</p>
              
              <div className="text-xs font-semibold text-purple-700">
                {app.precio}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
