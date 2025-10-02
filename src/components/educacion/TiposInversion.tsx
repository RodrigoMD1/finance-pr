import { FaShieldAlt, FaRocket, FaBitcoin, FaHome, FaCertificate, FaChartBar, FaGlobe, FaInfoCircle } from 'react-icons/fa';

export default function TiposInversion() {
  const rentaFija = [
    {
      name: 'Bonos del Gobierno',
      risk: 'Bajo',
      ret: '3-6%',
      desc: 'Emitidos por gobiernos nacionales o provinciales',
      pro: 'Máxima seguridad',
      con: 'Baja rentabilidad',
      ideal: 'Conservadores, jubilados'
    },
    {
      name: 'Bonos Corporativos',
      risk: 'Medio',
      ret: '4-8%',
      desc: 'Emitidos por empresas para financiarse',
      pro: 'Mejor rendimiento que bonos públicos',
      con: 'Riesgo de default corporativo',
      ideal: 'Moderados con análisis'
    },
    {
      name: 'Plazo Fijo',
      risk: 'Muy Bajo',
      ret: '2-5%',
      desc: 'Depósito bancario a término fijo',
      pro: 'Garantizado por el banco',
      con: 'No supera inflación generalmente',
      ideal: 'Fondo de emergencia'
    },
    {
      name: 'Fondos de Inversión RF',
      risk: 'Bajo',
      ret: '3-7%',
      desc: 'Cartera diversificada de bonos',
      pro: 'Gestión profesional',
      con: 'Comisiones de administración',
      ideal: 'Principiantes conservadores'
    },
  ];
  
  const rentaVariable = [
    {
      name: 'Acciones Individuales',
      risk: 'Alto',
      ret: 'Variable',
      desc: 'Participación en propiedad de empresas',
      pro: 'Alto potencial de ganancia',
      con: 'Requiere análisis constante',
      ideal: 'Experimentados con tiempo'
    },
    {
      name: 'ETFs',
      risk: 'Medio-Alto',
      ret: '8-12%',
      desc: 'Fondos que replican índices',
      pro: 'Diversificación automática',
      con: 'Depende del mercado general',
      ideal: 'Mayoría de inversores'
    },
    {
      name: 'Fondos Mutuos',
      risk: 'Medio',
      ret: '6-10%',
      desc: 'Gestión activa profesional',
      pro: 'Experiencia del gestor',
      con: 'Comisiones más altas',
      ideal: 'Sin tiempo para analizar'
    },
    {
      name: 'REITs',
      risk: 'Medio',
      ret: '7-9%',
      desc: 'Inversión en bienes raíces',
      pro: 'Dividendos regulares',
      con: 'Sensible a tasas de interés',
      ideal: 'Buscan ingreso pasivo'
    },
  ];
  
  const alternativas = [
    {
      name: 'Criptomonedas',
      icon: <FaBitcoin className="text-orange-500" />,
      risk: 'Muy Alto',
      ret: 'Extremadamente Variable',
      desc: 'Activos digitales descentralizados como Bitcoin, Ethereum',
      pro: 'Potencial de ganancias exponenciales, 24/7, global',
      con: 'Volatilidad extrema, regulación incierta, riesgo técnico',
      tip: 'Solo invierte lo que estés dispuesto a perder. Máximo 5-10% del portafolio.'
    },
    {
      name: 'Bienes Raíces',
      icon: <FaHome className="text-blue-600" />,
      risk: 'Medio',
      ret: '5-12%',
      desc: 'Propiedades físicas para renta o apreciación',
      pro: 'Activo tangible, ingresos pasivos por alquiler',
      con: 'Baja liquidez, requiere capital alto, mantenimiento',
      tip: 'Considera empezar con REITs antes de comprar propiedades directamente.'
    },
    {
      name: 'Commodities',
      icon: <FaCertificate className="text-amber-600" />,
      risk: 'Alto',
      ret: 'Variable',
      desc: 'Materias primas: oro, petróleo, soja, etc.',
      pro: 'Cobertura contra inflación',
      con: 'No genera dividendos, alta volatilidad',
      tip: 'Oro es refugio seguro en crisis. Petróleo muy volátil.'
    },
    {
      name: 'P2P Lending',
      icon: <FaGlobe className="text-teal-600" />,
      risk: 'Medio-Alto',
      ret: '6-15%',
      desc: 'Préstamos entre particulares o a PYMEs',
      pro: 'Rendimientos atractivos, ayudas a emprendedores',
      con: 'Riesgo de impago, menor regulación',
      tip: 'Diversifica en muchos préstamos pequeños, no uno grande.'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <FaChartBar className="text-3xl text-purple-600" />
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Tipos de Inversión</h2>
            <p className="text-gray-700">Conoce las diferentes opciones para hacer crecer tu dinero</p>
          </div>
        </div>
        
        <div className="p-4 mt-4 bg-white/80 backdrop-blur rounded-lg border-l-4 border-purple-500">
          <p className="text-sm text-gray-800">
            <strong className="text-purple-600">📊 Importante:</strong> La mejor combinación de inversiones depende de tu edad, 
            objetivos, tolerancia al riesgo y horizonte temporal. No existe una fórmula única para todos.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Renta Fija */}
        <div className="p-6 bg-white rounded-xl shadow-lg border-t-4 border-emerald-500">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <FaShieldAlt className="text-3xl text-emerald-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">Renta Fija</div>
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700">Predecible</span>
              </div>
            </div>
          </div>
          <p className="mb-4 text-gray-700">
            Rendimientos más estables y conocidos. Ideal para preservar capital y generar ingresos constantes.
          </p>
          <div className="space-y-3">
            {rentaFija.map((item) => (
              <div key={item.name} className="p-4 bg-gradient-to-r from-gray-50 to-emerald-50 rounded-lg border border-emerald-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-gray-900">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-[10px] font-semibold rounded-full ${
                      item.risk==='Muy Bajo'?'bg-slate-100 text-slate-700':
                      item.risk==='Bajo'?'bg-blue-50 text-blue-700':
                      'bg-amber-50 text-amber-700'
                    }`}>
                      Riesgo: {item.risk}
                    </span>
                    <span className="px-2 py-1 text-[10px] font-semibold rounded-full bg-emerald-100 text-emerald-800">~{item.ret}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{item.desc}</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-white rounded">
                    <div className="font-semibold text-emerald-700 mb-1">✅ Pro</div>
                    <p className="text-gray-700">{item.pro}</p>
                  </div>
                  <div className="p-2 bg-white rounded">
                    <div className="font-semibold text-rose-700 mb-1">⚠️ Contra</div>
                    <p className="text-gray-700">{item.con}</p>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  <strong>Ideal para:</strong> {item.ideal}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Renta Variable */}
        <div className="p-6 bg-white rounded-xl shadow-lg border-t-4 border-orange-500">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <FaRocket className="text-3xl text-orange-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">Renta Variable</div>
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-orange-50 text-orange-700">Crecimiento</span>
              </div>
            </div>
          </div>
          <p className="mb-4 text-gray-700">
            Mayor potencial de crecimiento con más volatilidad. Para inversores con horizonte de largo plazo.
          </p>
          <div className="space-y-3">
            {rentaVariable.map((item) => (
              <div key={item.name} className="p-4 bg-gradient-to-r from-gray-50 to-orange-50 rounded-lg border border-orange-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-gray-900">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-[10px] font-semibold rounded-full ${
                      /Alto/.test(item.risk)?'bg-rose-50 text-rose-700':'bg-amber-50 text-amber-700'
                    }`}>
                      Riesgo: {item.risk}
                    </span>
                    <span className="px-2 py-1 text-[10px] font-semibold rounded-full bg-orange-100 text-orange-800">~{item.ret}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{item.desc}</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-white rounded">
                    <div className="font-semibold text-emerald-700 mb-1">✅ Pro</div>
                    <p className="text-gray-700">{item.pro}</p>
                  </div>
                  <div className="p-2 bg-white rounded">
                    <div className="font-semibold text-rose-700 mb-1">⚠️ Contra</div>
                    <p className="text-gray-700">{item.con}</p>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  <strong>Ideal para:</strong> {item.ideal}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inversiones Alternativas */}
      <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <FaInfoCircle className="text-3xl text-indigo-600" />
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Inversiones Alternativas</h3>
            <p className="text-sm text-gray-700">Opciones más avanzadas para diversificar tu portafolio</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {alternativas.map((item) => (
            <div key={item.name} className="p-5 bg-white rounded-xl shadow hover:shadow-lg transition-shadow border border-indigo-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-4xl">{item.icon}</div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900">{item.name}</h4>
                  <div className="flex gap-2 mt-1">
                    <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-rose-100 text-rose-700">
                      Riesgo: {item.risk}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-indigo-100 text-indigo-700">
                      {item.ret}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-700 mb-3">{item.desc}</p>
              
              <div className="space-y-2 mb-3">
                <div className="p-2 bg-emerald-50 rounded text-xs">
                  <strong className="text-emerald-800">✅ Ventajas:</strong>
                  <p className="text-gray-700 mt-1">{item.pro}</p>
                </div>
                <div className="p-2 bg-rose-50 rounded text-xs">
                  <strong className="text-rose-800">❌ Desventajas:</strong>
                  <p className="text-gray-700 mt-1">{item.con}</p>
                </div>
              </div>
              
              <div className="p-3 bg-amber-50 rounded-lg border-l-2 border-amber-400">
                <div className="text-xs font-semibold text-amber-800 mb-1">💡 CONSEJO</div>
                <p className="text-xs text-gray-800">{item.tip}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
