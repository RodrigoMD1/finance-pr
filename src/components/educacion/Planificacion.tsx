import { FaClipboardCheck, FaRoad, FaCalendarCheck, FaChartPie, FaExclamationCircle, FaCheckCircle, FaLightbulb, FaCalculator, FaShieldAlt } from 'react-icons/fa';

export default function Planificacion() {
  const perfiles = [
    {
      tipo: 'Conservador',
      icon: <FaShieldAlt className="text-blue-600" />,
      caracteristicas: ['Aversión al riesgo', 'Prioriza preservar capital', 'Horizonte corto-medio (1-5 años)', 'Poca tolerancia a volatilidad'],
      asignacion: { rf: '70-80%', rv: '15-25%', alt: '5%', efectivo: '5-10%' },
      productos: 'Plazo fijo, bonos gobierno, fondos money market, CEDEARs defensivos',
      retornoEsperado: '3-6% anual'
    },
    {
      tipo: 'Moderado',
      icon: <FaChartPie className="text-amber-600" />,
      caracteristicas: ['Balance riesgo-retorno', 'Acepta volatilidad moderada', 'Horizonte medio-largo (5-10 años)', 'Busca crecimiento con seguridad'],
      asignacion: { rf: '40-50%', rv: '40-50%', alt: '5-10%', efectivo: '5%' },
      productos: 'Mix bonos/acciones, ETFs diversificados, fondos balanceados, REITs',
      retornoEsperado: '6-10% anual'
    },
    {
      tipo: 'Agresivo',
      icon: <FaRoad className="text-red-600" />,
      caracteristicas: ['Alta tolerancia al riesgo', 'Busca máximo crecimiento', 'Horizonte largo (10+ años)', 'Acepta grandes fluctuaciones'],
      asignacion: { rf: '10-20%', rv: '60-70%', alt: '15-20%', efectivo: '5%' },
      productos: 'Acciones growth, ETFs emergentes, crypto, startups, opciones',
      retornoEsperado: '10-20%+ anual (alta variabilidad)'
    }
  ];

  const pasosPlan = [
    {
      numero: 1,
      titulo: 'Define tus Objetivos',
      desc: 'Específicos, medibles, alcanzables, relevantes y con plazo (SMART)',
      ejemplos: [
        '💰 Comprar casa en 5 años ($50,000 USD)',
        '🚗 Auto en 2 años ($15,000 USD)',
        '🏖️ Retiro en 30 años ($500,000 USD)',
        '🎓 Educación hijos en 10 años ($30,000 USD)'
      ],
      accion: 'Escribe 3-5 objetivos con monto y plazo'
    },
    {
      numero: 2,
      titulo: 'Evalúa tu Situación',
      desc: 'Conoce tu punto de partida financiero',
      componentes: [
        '📊 Ingresos mensuales netos',
        '💸 Gastos fijos y variables',
        '💰 Ahorro actual disponible',
        '🏦 Deudas (tarjetas, préstamos)',
        '📈 Inversiones existentes'
      ],
      accion: 'Calcula tu capacidad de ahorro mensual'
    },
    {
      numero: 3,
      titulo: 'Determina tu Perfil de Riesgo',
      desc: 'Test de tolerancia al riesgo',
      preguntas: [
        '¿Cuánto tiempo puedes mantener tu inversión?',
        '¿Podrías tolerar perder 20% en un mes?',
        '¿Priorizas crecer o no perder capital?',
        '¿Experiencia previa invirtiendo?'
      ],
      accion: 'Responde honestamente para conocer tu perfil'
    },
    {
      numero: 4,
      titulo: 'Crea tu Estrategia',
      desc: 'Plan de acción específico',
      elementos: [
        '🎯 Asset allocation según perfil',
        '💵 Monto inicial + aportes mensuales',
        '📅 Frecuencia de revisión (trimestral)',
        '📊 Estrategia de rebalanceo',
        '🚪 Condiciones de salida'
      ],
      accion: 'Documenta tu estrategia por escrito'
    },
    {
      numero: 5,
      titulo: 'Ejecuta y Monitorea',
      desc: 'Pon en marcha y ajusta',
      tareas: [
        '✅ Abrir cuentas de inversión necesarias',
        '✅ Hacer compras iniciales según plan',
        '✅ Configurar aportes automáticos',
        '✅ Revisar mensualmente',
        '✅ Rebalancear cada 6-12 meses'
      ],
      accion: 'Calendario de revisión y rebalanceo'
    }
  ];

  const checklistAntes = [
    { item: '🏦 Fondo de emergencia de 6 meses gastos', prioridad: 'CRÍTICO', razon: 'Evita vender inversiones en crisis' },
    { item: '💳 Pagar deudas de alto interés (+20%)', prioridad: 'CRÍTICO', razon: 'No tiene sentido ganar 10% si pagas 50%' },
    { item: '📚 Educación financiera básica', prioridad: 'ALTO', razon: 'No inviertas en lo que no entiendes' },
    { item: '🎯 Objetivos claros y por escrito', prioridad: 'ALTO', razon: 'Sin objetivo, cualquier resultado sirve' },
    { item: '🧠 Test de perfil de riesgo', prioridad: 'ALTO', razon: 'Alinear inversiones con tolerancia' },
    { item: '📄 Revisar comisiones y costos', prioridad: 'MEDIO', razon: 'Las comisiones erosionan retornos' },
    { item: '🏛️ Elegir broker/plataforma confiable', prioridad: 'ALTO', razon: 'Seguridad de tu capital' },
    { item: '⚖️ Entender implicancias fiscales', prioridad: 'MEDIO', razon: 'Optimizar impuestos legalmente' }
  ];

  const checklistDurante = [
    { freq: 'Mensual', tareas: ['Revisar rendimiento vs benchmark', 'Aportar según plan', 'Revisar noticias importantes'] },
    { freq: 'Trimestral', tareas: ['Análisis detallado de posiciones', 'Revisar si sigue alineado a objetivos', 'Ajustar aportes si cambió ingreso'] },
    { freq: 'Semestral', tareas: ['Rebalancear portafolio', 'Revisar asset allocation', 'Tomar ganancias/pérdidas fiscales'] },
    { freq: 'Anual', tareas: ['Evaluación completa del año', 'Ajustar estrategia si necesario', 'Declarar ganancias (AFIP)'] }
  ];

  const erroresComunes = [
    {
      error: '❌ No tener plan por escrito',
      consecuencia: 'Decisiones emocionales e inconsistentes',
      solucion: '✅ Documentar estrategia y consultarla antes de actuar'
    },
    {
      error: '❌ Invertir sin fondo de emergencia',
      consecuencia: 'Vender inversiones en el peor momento',
      solucion: '✅ 6 meses de gastos en efectivo/plazo fijo'
    },
    {
      error: '❌ Perseguir rendimientos pasados',
      consecuencia: 'Comprar caro después de subidas',
      solucion: '✅ Invertir basado en fundamentales, no en hype'
    },
    {
      error: '❌ No diversificar',
      consecuencia: 'Riesgo concentrado, volatilidad extrema',
      solucion: '✅ Mínimo 10-15 activos diferentes'
    },
    {
      error: '❌ Trading excesivo',
      consecuencia: 'Comisiones altas, impuestos, peor performance',
      solucion: '✅ Buy & hold, rebalancear solo 2-4 veces/año'
    },
    {
      error: '❌ Ignorar costos y comisiones',
      consecuencia: 'Erosión silenciosa de retornos',
      solucion: '✅ Buscar ETFs de bajo costo, minimizar trading'
    }
  ];

  const calculadorasUtiles = [
    {
      nombre: 'Interés Compuesto',
      formula: 'VF = VP × (1 + r)^n',
      ejemplo: '$1,000 al 10% anual por 20 años = $6,727',
      uso: 'Proyectar valor futuro de inversiones'
    },
    {
      nombre: 'Ahorro para Objetivo',
      formula: 'Aporte mensual = Objetivo / [(((1+r)^n - 1) / r)]',
      ejemplo: 'Para $50,000 en 5 años al 8%: $683/mes',
      uso: 'Calcular cuánto aportar mensualmente'
    },
    {
      nombre: 'Regla del 72',
      formula: 'Años para duplicar = 72 / tasa de retorno',
      ejemplo: 'Al 10% anual, duplicas en 7.2 años',
      uso: 'Estimación rápida de duplicación'
    },
    {
      nombre: '4% Rule (Retiro)',
      formula: 'Necesitas 25× gastos anuales',
      ejemplo: 'Gastas $20,000/año → necesitas $500,000',
      uso: 'Calcular capital necesario para retiro'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <FaClipboardCheck className="text-3xl text-teal-600" />
          <div>
            <h2 className="text-3xl font-bold text-gray-900">🧭 Planificación Financiera</h2>
            <p className="text-gray-700">Un plan sólido es la diferencia entre invertir y apostar</p>
          </div>
        </div>
        
        <div className="p-4 mt-4 bg-white/80 backdrop-blur rounded-lg border-l-4 border-teal-500">
          <p className="text-sm text-gray-800">
            <strong className="text-teal-600">💡 Clave del éxito:</strong> "Un objetivo sin un plan es solo un deseo." 
            La planificación te da disciplina, reduce emociones y aumenta tus probabilidades de éxito.
          </p>
        </div>
      </div>

      {/* Perfiles de Inversor */}
      <div className="p-6 bg-white rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FaChartPie className="text-purple-600" />
          Perfiles de Inversor
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {perfiles.map((perfil) => (
            <div key={perfil.tipo} className="p-5 bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl border-2 border-purple-200 hover:shadow-lg transition-shadow">
              <div className="text-center mb-4">
                <div className="text-5xl mb-2">{perfil.icon}</div>
                <h4 className="text-2xl font-bold text-gray-900">{perfil.tipo}</h4>
              </div>
              
              <div className="space-y-3 text-sm">
                <div>
                  <strong className="text-purple-800">🎯 Características:</strong>
                  <ul className="mt-1 space-y-1 text-gray-700">
                    {perfil.caracteristicas.map((car, idx) => (
                      <li key={idx}>• {car}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="p-3 bg-blue-50 rounded-lg">
                  <strong className="text-blue-800">📊 Asset Allocation:</strong>
                  <div className="mt-2 space-y-1 text-gray-700">
                    <div className="flex justify-between">
                      <span>Renta Fija:</span>
                      <span className="font-bold">{perfil.asignacion.rf}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Renta Variable:</span>
                      <span className="font-bold">{perfil.asignacion.rv}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Alternativas:</span>
                      <span className="font-bold">{perfil.asignacion.alt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Efectivo:</span>
                      <span className="font-bold">{perfil.asignacion.efectivo}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <strong className="text-emerald-800">💼 Productos:</strong>
                  <p className="text-gray-700 mt-1">{perfil.productos}</p>
                </div>
                
                <div className="p-2 bg-amber-50 rounded text-center">
                  <strong className="text-amber-800">📈 Retorno esperado:</strong>
                  <p className="text-gray-900 font-bold mt-1">{perfil.retornoEsperado}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pasos para crear tu plan */}
      <div className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FaRoad className="text-indigo-600" />
          5 Pasos para Crear tu Plan de Inversión
        </h3>
        
        <div className="space-y-4">
          {pasosPlan.map((paso) => (
            <div key={paso.numero} className="p-5 bg-white rounded-xl shadow border-l-4 border-indigo-500">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  {paso.numero}
                </div>
                
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{paso.titulo}</h4>
                  <p className="text-gray-700 mb-3">{paso.desc}</p>
                  
                  {paso.ejemplos && (
                    <div className="mb-3">
                      <strong className="text-indigo-800">Ejemplos:</strong>
                      <ul className="mt-1 space-y-1 text-sm text-gray-700">
                        {paso.ejemplos.map((ej, idx) => (
                          <li key={idx}>{ej}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {paso.componentes && (
                    <div className="mb-3">
                      <strong className="text-indigo-800">Componentes:</strong>
                      <ul className="mt-1 space-y-1 text-sm text-gray-700">
                        {paso.componentes.map((comp, idx) => (
                          <li key={idx}>{comp}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {paso.preguntas && (
                    <div className="mb-3">
                      <strong className="text-indigo-800">Preguntas clave:</strong>
                      <ul className="mt-1 space-y-1 text-sm text-gray-700">
                        {paso.preguntas.map((preg, idx) => (
                          <li key={idx}>• {preg}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {paso.elementos && (
                    <div className="mb-3">
                      <strong className="text-indigo-800">Elementos:</strong>
                      <ul className="mt-1 space-y-1 text-sm text-gray-700">
                        {paso.elementos.map((elem, idx) => (
                          <li key={idx}>{elem}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {paso.tareas && (
                    <div className="mb-3">
                      <strong className="text-indigo-800">Tareas:</strong>
                      <ul className="mt-1 space-y-1 text-sm text-gray-700">
                        {paso.tareas.map((tarea, idx) => (
                          <li key={idx}>{tarea}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="p-3 bg-emerald-50 rounded-lg border-l-2 border-emerald-500 mt-3">
                    <strong className="text-emerald-800">✅ Acción:</strong>
                    <p className="text-gray-800 mt-1">{paso.accion}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Checklists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Checklist Antes */}
        <div className="p-6 bg-white rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FaExclamationCircle className="text-red-600" />
            Checklist: Antes de Invertir
          </h3>
          
          <div className="space-y-3">
            {checklistAntes.map((check, idx) => (
              <div key={idx} className="p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-100">
                <div className="flex items-start gap-2">
                  <FaCheckCircle className={`text-xl mt-0.5 flex-shrink-0 ${
                    check.prioridad === 'CRÍTICO' ? 'text-red-600' : 
                    check.prioridad === 'ALTO' ? 'text-orange-600' : 'text-yellow-600'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-900">{check.item}</p>
                      <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                        check.prioridad === 'CRÍTICO' ? 'bg-red-100 text-red-800' : 
                        check.prioridad === 'ALTO' ? 'bg-orange-100 text-orange-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {check.prioridad}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{check.razon}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Checklist Durante */}
        <div className="p-6 bg-white rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FaCalendarCheck className="text-emerald-600" />
            Checklist: Durante la Inversión
          </h3>
          
          <div className="space-y-4">
            {checklistDurante.map((periodo) => (
              <div key={periodo.freq} className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
                <h4 className="font-bold text-emerald-900 text-lg mb-2">📅 {periodo.freq}</h4>
                <ul className="space-y-2">
                  {periodo.tareas.map((tarea, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-800">
                      <span className="text-emerald-600 font-bold">•</span>
                      {tarea}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Errores Comunes */}
      <div className="p-6 bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FaExclamationCircle className="text-rose-600" />
          Errores Comunes y Cómo Evitarlos
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {erroresComunes.map((item, idx) => (
            <div key={idx} className="p-4 bg-white rounded-lg shadow border-l-4 border-rose-500">
              <div className="space-y-2 text-sm">
                <p className="font-bold text-rose-700">{item.error}</p>
                <p className="text-gray-600"><strong>⚠️ Consecuencia:</strong> {item.consecuencia}</p>
                <p className="text-emerald-700"><strong>{item.solucion.split(' ')[0]}</strong> {item.solucion.substring(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calculadoras */}
      <div className="p-6 bg-white rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FaCalculator className="text-blue-600" />
          Calculadoras Útiles para Planificar
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {calculadorasUtiles.map((calc) => (
            <div key={calc.nombre} className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <h4 className="font-bold text-blue-900 text-lg mb-2">{calc.nombre}</h4>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-white rounded">
                  <strong className="text-gray-700">📐 Fórmula:</strong>
                  <code className="block mt-1 text-gray-900 font-mono text-xs">{calc.formula}</code>
                </div>
                <div className="p-2 bg-amber-50 rounded">
                  <strong className="text-amber-800">💡 Ejemplo:</strong>
                  <p className="text-gray-800 mt-1">{calc.ejemplo}</p>
                </div>
                <div>
                  <strong className="text-indigo-700">🎯 Uso:</strong>
                  <p className="text-gray-700 mt-1">{calc.uso}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Consejo Final */}
      <div className="p-6 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl shadow-lg border-l-4 border-yellow-500">
        <div className="flex items-start gap-4">
          <FaLightbulb className="text-4xl text-yellow-600 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">💎 Consejo de Oro</h3>
            <p className="text-gray-800 leading-relaxed">
              <strong>"El mejor momento para empezar fue hace 10 años. El segundo mejor momento es ahora."</strong> 
              <br/><br/>
              No necesitas ser experto para comenzar, pero sí necesitas comenzar para ser experto. Empieza con poco, 
              aprende en el camino, y ajusta tu plan conforme ganas experiencia. La consistencia vence al timing perfecto.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
