import { FaGlobeAmericas, FaChartLine, FaDollarSign, FaUniversity, FaNewspaper, FaExclamationTriangle, FaLightbulb, FaCalendarAlt } from 'react-icons/fa';

export default function Mercados() {
  const indicadores = [
    {
      icon: <FaChartLine className="text-blue-600" />,
      nombre: 'Inflación',
      desc: 'Aumento generalizado de precios. Reduce poder adquisitivo.',
      impacto: 'Alta inflación → bonos pierden valor, acciones pueden proteger',
      argentina: 'Argentina históricamente alta (30-100%+). Invertir en dólares o activos reales.',
      tip: 'Objetivo Banco Central: 2-3% anual. Arriba de 5% es preocupante.'
    },
    {
      icon: <FaDollarSign className="text-green-600" />,
      nombre: 'PIB (Producto Interno Bruto)',
      desc: 'Valor total de bienes y servicios producidos en un país.',
      impacto: 'PIB creciendo → economía saludable → bolsa sube. PIB cayendo → recesión.',
      argentina: 'PIB volátil. Ciclos de crecimiento y crisis cada 5-10 años.',
      tip: 'Crecimiento sostenido >3% es bueno. Negativo 2+ trimestres = recesión.'
    },
    {
      icon: <FaUniversity className="text-purple-600" />,
      nombre: 'Tasa de Interés',
      desc: 'Precio del dinero. Lo que cobran los bancos por prestar.',
      impacto: 'Tasas altas → menos inversión → bolsa baja. Tasas bajas → más inversión.',
      argentina: 'BCRA usa tasas altas para controlar inflación (40-70%+).',
      tip: 'Fed (USA) es clave global. Subida de tasas afecta mercados emergentes.'
    },
    {
      icon: <FaDollarSign className="text-amber-600" />,
      nombre: 'Tipo de Cambio',
      desc: 'Valor de una moneda respecto a otra (ej: USD/ARS).',
      impacto: 'Dólar fuerte → exportadores ganan, importadores pierden.',
      argentina: 'Dólar blue, MEP, CCL. Brecha cambiaria puede ser 50-100%.',
      tip: 'Dolarizar parte del portafolio protege contra devaluación.'
    },
    {
      icon: <FaExclamationTriangle className="text-red-600" />,
      nombre: 'Déficit Fiscal',
      desc: 'Cuando el Estado gasta más de lo que recauda.',
      impacto: 'Déficit alto → emisión monetaria → inflación → devaluación.',
      argentina: 'Históricamente alto (4-8% del PIB). Causa inflación crónica.',
      tip: 'Déficit <3% es manejable. >5% es preocupante.'
    },
    {
      icon: <FaExclamationTriangle className="text-orange-600" />,
      nombre: 'Riesgo País',
      desc: 'Probabilidad de que un país no pague su deuda (medido en puntos básicos).',
      impacto: 'Alto riesgo → difícil conseguir financiamiento → menor inversión.',
      argentina: 'Históricamente alto (800-2000+ puntos). Refleja desconfianza.',
      tip: '<300 es bueno. >1000 es muy riesgoso. Afecta bonos argentinos.'
    }
  ];

  const ciclosEconomicos = [
    {
      fase: 'Expansión',
      caracteristicas: ['PIB creciendo', 'Empleo alto', 'Confianza alta', 'Consumo aumenta'],
      estrategia: 'Aumentar exposición a acciones, reducir bonos',
      duracion: '3-5 años típicamente'
    },
    {
      fase: 'Pico',
      caracteristicas: ['Economía al máximo', 'Inflación subiendo', 'Tasas subiendo', 'Euforia en mercados'],
      estrategia: 'Tomar ganancias, aumentar efectivo y bonos',
      duracion: '3-6 meses'
    },
    {
      fase: 'Recesión',
      caracteristicas: ['PIB cayendo', 'Desempleo subiendo', 'Consumo baja', 'Pesimismo'],
      estrategia: 'Acumular posiciones defensivas, bonos de calidad',
      duracion: '6-18 meses'
    },
    {
      fase: 'Recuperación',
      caracteristicas: ['PIB vuelve a crecer', 'Tasas bajas', 'Optimismo vuelve', 'Oportunidades'],
      estrategia: 'Comprar acciones baratas, posición agresiva',
      duracion: '6-12 meses'
    }
  ];

  const mercadosGlobales = [
    {
      region: '🇺🇸 Estados Unidos',
      indices: 'S&P 500, Nasdaq, Dow Jones',
      caracteristicas: 'Mayor mercado del mundo, innovación tech, estabilidad',
      horario: '9:30-16:00 EST (10:30-17:00 ARG)',
      acceso: 'CEDEARs, ETFs globales, brokers internacionales'
    },
    {
      region: '🇪🇺 Europa',
      indices: 'FTSE 100, DAX, CAC 40, Euro Stoxx 50',
      caracteristicas: 'Empresas establecidas, dividendos altos, regulación fuerte',
      horario: '9:00-17:30 CET (5:00-13:30 ARG)',
      acceso: 'ETFs europeos, ADRs'
    },
    {
      region: '🇨🇳 Asia',
      indices: 'Nikkei 225, Hang Seng, Shanghai Composite',
      caracteristicas: 'Alto crecimiento, mercados emergentes, tecnología',
      horario: '9:00-15:00 hora local (22:00-4:00 ARG)',
      acceso: 'ETFs asiáticos'
    },
    {
      region: '🇦🇷 Argentina',
      indices: 'Merval, S&P Merval',
      caracteristicas: 'Alta volatilidad, riesgo político, commodities',
      horario: '11:00-17:00 ARG',
      acceso: 'Broker local: IOL, Bull Market, Balanz'
    }
  ];

  const eventosImportantes = [
    {
      tipo: 'Reuniones de Bancos Centrales',
      cuando: 'Fed: 8 veces/año, BCE: mensual, BCRA: mensual',
      impacto: '🔴 ALTO - Decisiones sobre tasas de interés',
      preparacion: 'Revisar proyecciones 2 semanas antes'
    },
    {
      tipo: 'Reportes de Ganancias',
      cuando: 'Trimestral (earnings season)',
      impacto: '🟡 MEDIO - Afecta precio de acciones individuales',
      preparacion: 'Seguir calendario de earnings'
    },
    {
      tipo: 'Datos de Empleo (NFP)',
      cuando: 'Primer viernes de cada mes (USA)',
      impacto: '🔴 ALTO - Indica salud económica',
      preparacion: 'Evitar operar 1 hora antes/después'
    },
    {
      tipo: 'Elecciones',
      cuando: 'Variable según país',
      impacto: '🔴 ALTO - Cambia políticas económicas',
      preparacion: 'Reducir posiciones 1 mes antes'
    },
    {
      tipo: 'Datos de Inflación (CPI/IPC)',
      cuando: 'Mensual',
      impacto: '🟡 MEDIO-ALTO - Afecta tasas y bonos',
      preparacion: 'Seguir pronósticos de analistas'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <FaGlobeAmericas className="text-3xl text-blue-600" />
          <div>
            <h2 className="text-3xl font-bold text-gray-900">🌐 Mercados y Economía</h2>
            <p className="text-gray-700">Entiende el contexto macro para tomar mejores decisiones</p>
          </div>
        </div>
        
        <div className="p-4 mt-4 bg-white/80 backdrop-blur rounded-lg border-l-4 border-blue-500">
          <p className="text-sm text-gray-800">
            <strong className="text-blue-600">🌍 Contexto Global:</strong> Los mercados financieros no operan en vacío. 
            Factores macroeconómicos, decisiones políticas y eventos internacionales impactan directamente tu portafolio.
          </p>
        </div>
      </div>

      {/* Indicadores Macroeconómicos */}
      <div className="p-6 bg-white rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FaChartLine className="text-blue-600" />
          Indicadores Macroeconómicos Clave
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {indicadores.map((ind) => (
            <div key={ind.nombre} className="p-5 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-blue-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-3xl">{ind.icon}</div>
                <h4 className="text-lg font-bold text-gray-900">{ind.nombre}</h4>
              </div>
              
              <div className="space-y-2 text-sm">
                <div>
                  <strong className="text-gray-700">📖 Definición:</strong>
                  <p className="text-gray-600 mt-1">{ind.desc}</p>
                </div>
                
                <div className="p-2 bg-blue-50 rounded">
                  <strong className="text-blue-800">💥 Impacto:</strong>
                  <p className="text-gray-700 mt-1">{ind.impacto}</p>
                </div>
                
                <div className="p-2 bg-amber-50 rounded">
                  <strong className="text-amber-800">🇦🇷 En Argentina:</strong>
                  <p className="text-gray-700 mt-1">{ind.argentina}</p>
                </div>
                
                <div className="p-2 bg-emerald-50 rounded border-l-2 border-emerald-400">
                  <strong className="text-emerald-800">💡 Tip:</strong>
                  <p className="text-gray-700 mt-1">{ind.tip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ciclos Económicos */}
      <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FaCalendarAlt className="text-purple-600" />
          Ciclos Económicos y Estrategias
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ciclosEconomicos.map((ciclo) => (
            <div key={ciclo.fase} className="p-5 bg-white rounded-xl shadow border border-purple-100">
              <div className="text-center mb-3">
                <h4 className="text-xl font-bold text-purple-700">{ciclo.fase}</h4>
                <span className="text-xs text-gray-600">Duración típica: {ciclo.duracion}</span>
              </div>
              
              <div className="space-y-3 text-sm">
                <div>
                  <strong className="text-gray-800">📊 Características:</strong>
                  <ul className="mt-1 space-y-1 text-gray-700">
                    {ciclo.caracteristicas.map((car, idx) => (
                      <li key={idx}>• {car}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="p-3 bg-emerald-50 rounded-lg border-l-2 border-emerald-500">
                  <strong className="text-emerald-800">🎯 Estrategia:</strong>
                  <p className="text-gray-700 mt-1">{ciclo.estrategia}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-4 bg-white rounded-lg border-l-4 border-purple-500">
          <p className="text-sm text-gray-800">
            <strong className="text-purple-700">📌 Recuerda:</strong> Los ciclos económicos son inevitables. 
            El inversor inteligente ajusta su estrategia según la fase, pero mantiene disciplina y no intenta hacer "market timing" perfecto.
          </p>
        </div>
      </div>

      {/* Mercados Globales */}
      <div className="p-6 bg-white rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FaGlobeAmericas className="text-indigo-600" />
          Principales Mercados Globales
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mercadosGlobales.map((mercado) => (
            <div key={mercado.region} className="p-5 bg-gradient-to-br from-gray-50 to-indigo-50 rounded-xl border border-indigo-100">
              <h4 className="text-xl font-bold text-gray-900 mb-3">{mercado.region}</h4>
              
              <div className="space-y-2 text-sm">
                <div>
                  <strong className="text-indigo-700">📊 Índices principales:</strong>
                  <p className="text-gray-700 mt-1">{mercado.indices}</p>
                </div>
                
                <div>
                  <strong className="text-indigo-700">✨ Características:</strong>
                  <p className="text-gray-700 mt-1">{mercado.caracteristicas}</p>
                </div>
                
                <div className="p-2 bg-amber-50 rounded">
                  <strong className="text-amber-800">🕐 Horario:</strong>
                  <p className="text-gray-700 mt-1">{mercado.horario}</p>
                </div>
                
                <div className="p-2 bg-emerald-50 rounded">
                  <strong className="text-emerald-800">🔑 Acceso desde ARG:</strong>
                  <p className="text-gray-700 mt-1">{mercado.acceso}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Eventos Importantes */}
      <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FaNewspaper className="text-orange-600" />
          Calendario de Eventos Importantes
        </h3>
        
        <div className="space-y-3">
          {eventosImportantes.map((evento) => (
            <div key={evento.tipo} className="p-4 bg-white rounded-lg shadow border-l-4 border-orange-500">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-lg">{evento.tipo}</h4>
                  <p className="text-sm text-gray-600 mt-1">{evento.cuando}</p>
                </div>
                
                <div className="flex flex-col gap-2">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                    {evento.impacto}
                  </span>
                  <div className="text-sm text-gray-700">
                    <strong>📋</strong> {evento.preparacion}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-4 bg-white rounded-lg border-l-4 border-red-500">
          <p className="text-sm text-gray-800">
            <strong className="text-red-700">⚠️ Advertencia:</strong> Durante eventos de alto impacto, la volatilidad aumenta. 
            Evita tomar decisiones impulsivas. Si no estás seguro, mejor esperar a que pase el evento y analizar con calma.
          </p>
        </div>
      </div>

      {/* Recursos para Seguir */}
      <div className="p-6 bg-white rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FaLightbulb className="text-yellow-500" />
          ¿Dónde Seguir la Info Macro?
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-bold text-blue-900 mb-2">📰 Noticias</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Bloomberg</li>
              <li>• Reuters</li>
              <li>• Financial Times</li>
              <li>• Ámbito Financiero (ARG)</li>
              <li>• El Cronista (ARG)</li>
            </ul>
          </div>
          
          <div className="p-4 bg-emerald-50 rounded-lg">
            <h4 className="font-bold text-emerald-900 mb-2">📊 Datos Económicos</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Trading Economics</li>
              <li>• FRED (Fed St. Louis)</li>
              <li>• INDEC (ARG)</li>
              <li>• Banco Central (BCRA)</li>
              <li>• IMF World Economic Outlook</li>
            </ul>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-bold text-purple-900 mb-2">🎓 Análisis</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Economática</li>
              <li>• IAMC (ARG)</li>
              <li>• Portfolio Personal</li>
              <li>• Consultoras locales</li>
              <li>• Twitter: economistas</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
