import React, { useState } from 'react';

const FinancialEducation: React.FC = () => {
  const [activeTab, setActiveTab] = useState('basics');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📚 Educación Financiera
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Aprende los fundamentos de las inversiones, economía y finanzas personales. 
            Tu camino hacia la libertad financiera comienza aquí.
          </p>
        </div>

        {/* Navegación por pestañas */}
        <div className="flex flex-wrap justify-center mb-8 bg-white rounded-lg shadow-md p-2">
          {[
            { id: 'basics', label: '🏛️ Conceptos Básicos', icon: '📖' },
            { id: 'investments', label: '💰 Tipos de Inversión', icon: '📈' },
            { id: 'strategies', label: '🎯 Estrategias', icon: '🧠' },
            { id: 'psychology', label: '🧘 Psicología', icon: '💭' },
            { id: 'analysis', label: '📊 Análisis', icon: '🔍' },
            { id: 'markets', label: '🌍 Mercados', icon: '🏢' },
            { id: 'planning', label: '📋 Planificación', icon: '🎯' },
            { id: 'tools', label: '🔧 Herramientas', icon: '⚡' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 m-1 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Contenido de pestañas */}
        <div className="space-y-6">
          {/* CONCEPTOS BÁSICOS */}
          {activeTab === 'basics' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Definiciones Fundamentales */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="mr-3">📚</span>
                    Definiciones Fundamentales
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        term: "Inversión",
                        definition: "Colocar dinero en un activo esperando obtener ganancias futuras."
                      },
                      {
                        term: "Rentabilidad",
                        definition: "Porcentaje de ganancia o pérdida de una inversión en un período."
                      },
                      {
                        term: "Riesgo",
                        definition: "Probabilidad de perder dinero o no obtener el rendimiento esperado."
                      },
                      {
                        term: "Diversificación",
                        definition: "Distribuir inversiones en diferentes activos para reducir riesgo."
                      },
                      {
                        term: "Volatilidad",
                        definition: "Medida de cuánto varían los precios de un activo."
                      },
                      {
                        term: "Liquidez",
                        definition: "Facilidad para convertir un activo en dinero rápidamente."
                      }
                    ].map((item, index) => (
                      <div key={index} className="border-l-4 border-blue-400 pl-4 py-2">
                        <h4 className="font-semibold text-gray-800">{item.term}</h4>
                        <p className="text-gray-600 text-sm">{item.definition}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Indicadores Económicos */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="mr-3">📊</span>
                    Indicadores Económicos
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        term: "Inflación",
                        definition: "Aumento generalizado y sostenido de precios en la economía."
                      },
                      {
                        term: "PIB",
                        definition: "Producto Interno Bruto - valor total de bienes y servicios producidos."
                      },
                      {
                        term: "Tasa de Interés",
                        definition: "Precio del dinero - lo que cuesta pedir prestado o ganancia por ahorrar."
                      },
                      {
                        term: "Tipo de Cambio",
                        definition: "Valor de una moneda expresado en términos de otra moneda."
                      },
                      {
                        term: "Déficit Fiscal",
                        definition: "Cuando un gobierno gasta más de lo que recauda."
                      },
                      {
                        term: "Riesgo País",
                        definition: "Medida de la probabilidad de que un país no pague sus deudas."
                      }
                    ].map((item, index) => (
                      <div key={index} className="border-l-4 border-green-400 pl-4 py-2">
                        <h4 className="font-semibold text-gray-800">{item.term}</h4>
                        <p className="text-gray-600 text-sm">{item.definition}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Principios Básicos */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="mr-3">⚖️</span>
                  Principios Fundamentales de Inversión
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Relación Riesgo-Rentabilidad",
                      description: "A mayor rentabilidad esperada, mayor riesgo. No existe rentabilidad alta sin riesgo.",
                      icon: "📈"
                    },
                    {
                      title: "Horizonte Temporal",
                      description: "Las inversiones a largo plazo permiten asumir más riesgo y obtener mejores rendimientos.",
                      icon: "⏰"
                    },
                    {
                      title: "Interés Compuesto",
                      description: "Reinvertir las ganancias genera crecimiento exponencial del capital a largo plazo.",
                      icon: "🔄"
                    }
                  ].map((principle, index) => (
                    <div key={index} className="text-center p-4 border border-gray-200 rounded-lg">
                      <div className="text-4xl mb-3">{principle.icon}</div>
                      <h4 className="font-semibold text-gray-800 mb-2">{principle.title}</h4>
                      <p className="text-gray-600 text-sm">{principle.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TIPOS DE INVERSIÓN */}
          {activeTab === 'investments' && (
            <div className="space-y-6">
              {/* Renta Fija vs Renta Variable */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-2xl font-bold text-blue-600 mb-4 flex items-center">
                    <span className="mr-3">🏦</span>
                    Renta Fija
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Inversiones que ofrecen rendimientos predecibles y estables.
                  </p>
                  <div className="space-y-3">
                    {[
                      { name: "Bonos del Gobierno", risk: "Bajo", return: "3-6%" },
                      { name: "Bonos Corporativos", risk: "Medio", return: "4-8%" },
                      { name: "Plazo Fijo", risk: "Muy Bajo", return: "2-5%" },
                      { name: "Fondos de Inversión RF", risk: "Bajo", return: "3-7%" }
                    ].map((investment, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="font-medium">{investment.name}</span>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">Riesgo: {investment.risk}</div>
                          <div className="text-sm font-semibold text-blue-600">~{investment.return}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-2xl font-bold text-green-600 mb-4 flex items-center">
                    <span className="mr-3">📈</span>
                    Renta Variable
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Inversiones con rendimientos variables y mayor potencial de crecimiento.
                  </p>
                  <div className="space-y-3">
                    {[
                      { name: "Acciones Individuales", risk: "Alto", return: "Variable" },
                      { name: "ETFs", risk: "Medio-Alto", return: "8-12%" },
                      { name: "Fondos Mutuos", risk: "Medio", return: "6-10%" },
                      { name: "REITs", risk: "Medio", return: "7-9%" }
                    ].map((investment, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="font-medium">{investment.name}</span>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">Riesgo: {investment.risk}</div>
                          <div className="text-sm font-semibold text-green-600">~{investment.return}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Criptomonedas */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-orange-600 mb-4 flex items-center">
                  <span className="mr-3">₿</span>
                  Criptomonedas
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    {
                      category: "Bitcoin (BTC)",
                      description: "La primera y más establecida criptomoneda. Considerada 'oro digital'.",
                      risk: "Alto",
                      characteristics: ["Reserva de valor", "Adopción institucional", "Volatilidad alta"]
                    },
                    {
                      category: "Altcoins Establecidas",
                      description: "Ethereum, Cardano, Solana - proyectos con utilidad real y ecosistemas desarrollados.",
                      risk: "Muy Alto",
                      characteristics: ["Innovación tecnológica", "Casos de uso específicos", "Mayor volatilidad"]
                    },
                    {
                      category: "Tokens Emergentes",
                      description: "Proyectos nuevos con alto potencial pero también alto riesgo de pérdida total.",
                      risk: "Extremo",
                      characteristics: ["Potencial 100x", "Riesgo de pérdida total", "Investigación esencial"]
                    }
                  ].map((crypto, index) => (
                    <div key={index} className="p-4 border border-orange-200 rounded-lg">
                      <h4 className="font-semibold text-orange-700 mb-2">{crypto.category}</h4>
                      <p className="text-gray-600 text-sm mb-3">{crypto.description}</p>
                      <div className="mb-3">
                        <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded">
                          Riesgo: {crypto.risk}
                        </span>
                      </div>
                      <ul className="text-xs text-gray-500 space-y-1">
                        {crypto.characteristics.map((char, i) => (
                          <li key={i}>• {char}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comparación de Activos */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="mr-3">⚖️</span>
                  Comparación de Activos de Inversión
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4">Activo</th>
                        <th className="text-center py-3 px-4">Riesgo</th>
                        <th className="text-center py-3 px-4">Rentabilidad Anual</th>
                        <th className="text-center py-3 px-4">Liquidez</th>
                        <th className="text-center py-3 px-4">Horizonte Ideal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { asset: "Plazo Fijo", risk: "Muy Bajo", return: "2-5%", liquidity: "Baja", horizon: "Corto" },
                        { asset: "Bonos Gobierno", risk: "Bajo", return: "3-6%", liquidity: "Media", horizon: "Medio" },
                        { asset: "Acciones Blue Chips", risk: "Medio", return: "8-12%", liquidity: "Alta", horizon: "Largo" },
                        { asset: "ETFs", risk: "Medio", return: "6-10%", liquidity: "Alta", horizon: "Largo" },
                        { asset: "Bitcoin", risk: "Alto", return: "Variable", liquidity: "Alta", horizon: "Largo" },
                        { asset: "Altcoins", risk: "Muy Alto", return: "Variable", liquidity: "Media", horizon: "Especulativo" }
                      ].map((row, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{row.asset}</td>
                          <td className="py-3 px-4 text-center">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              row.risk === 'Muy Bajo' ? 'bg-green-100 text-green-800' :
                              row.risk === 'Bajo' ? 'bg-blue-100 text-blue-800' :
                              row.risk === 'Medio' ? 'bg-yellow-100 text-yellow-800' :
                              row.risk === 'Alto' ? 'bg-orange-100 text-orange-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {row.risk}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center font-medium">{row.return}</td>
                          <td className="py-3 px-4 text-center">{row.liquidity}</td>
                          <td className="py-3 px-4 text-center">{row.horizon}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ESTRATEGIAS */}
          {activeTab === 'strategies' && (
            <div className="space-y-6">
              {/* Estrategias de Inversión */}
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Dollar Cost Averaging (DCA)",
                    description: "Invertir una cantidad fija periódicamente, independiente del precio del mercado.",
                    icon: "📅",
                    pros: ["Reduce impacto de volatilidad", "Disciplina de inversión", "Fácil de implementar"],
                    cons: ["Puede perder oportunidades", "Requiere constancia"],
                    bestFor: "Inversores principiantes y conservadores"
                  },
                  {
                    title: "Buy and Hold",
                    description: "Comprar activos de calidad y mantenerlos a largo plazo sin importar fluctuaciones.",
                    icon: "🤝",
                    pros: ["Aprovecha crecimiento compuesto", "Bajos costos", "Menos estrés"],
                    cons: ["Requiere paciencia", "Puede ignorar cambios fundamentales"],
                    bestFor: "Inversores a largo plazo con tolerancia al riesgo"
                  },
                  {
                    title: "Diversificación por Sectores",
                    description: "Distribuir inversiones entre diferentes industrias y geografías.",
                    icon: "🌍",
                    pros: ["Reduce riesgo específico", "Aprovecha diferentes ciclos", "Protección ante crisis sectoriales"],
                    cons: ["Puede diluir grandes ganancias", "Requiere más investigación"],
                    bestFor: "Todos los tipos de inversores"
                  },
                  {
                    title: "Rebalanceo Periódico",
                    description: "Ajustar proporciones del portfolio periódicamente para mantener la asignación objetivo.",
                    icon: "⚖️",
                    pros: ["Mantiene perfil de riesgo", "Fuerza a vender caro y comprar barato", "Disciplina de inversión"],
                    cons: ["Costos de transacción", "Puede ir contra tendencias"],
                    bestFor: "Inversores con portfolios diversificados"
                  }
                ].map((strategy, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-3">{strategy.icon}</span>
                      <h3 className="text-xl font-bold text-gray-800">{strategy.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{strategy.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h5 className="font-semibold text-green-600 mb-2">✅ Ventajas:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {strategy.pros.map((pro, i) => (
                            <li key={i}>• {pro}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-red-600 mb-2">❌ Desventajas:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {strategy.cons.map((con, i) => (
                            <li key={i}>• {con}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h6 className="font-semibold text-blue-800 text-sm">Ideal para:</h6>
                      <p className="text-blue-600 text-sm">{strategy.bestFor}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Construcción de Portfolio */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="mr-3">🏗️</span>
                  Cómo Construir tu Portfolio
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      stage: "1. Definir Objetivos",
                      icon: "🎯",
                      tasks: [
                        "Establecer metas financieras",
                        "Definir horizonte temporal",
                        "Evaluar tolerancia al riesgo",
                        "Determinar capital disponible"
                      ]
                    },
                    {
                      stage: "2. Asignación de Activos",
                      icon: "📊",
                      tasks: [
                        "60-70% Renta Variable (jóvenes)",
                        "20-30% Renta Fija",
                        "5-10% Alternativos (crypto, commodities)",
                        "Mantener fondo de emergencia"
                      ]
                    },
                    {
                      stage: "3. Implementación",
                      icon: "🚀",
                      tasks: [
                        "Elegir instrumentos específicos",
                        "Abrir cuentas necesarias",
                        "Comenzar con DCA",
                        "Establecer calendario de rebalanceo"
                      ]
                    }
                  ].map((step, index) => (
                    <div key={index} className="text-center">
                      <div className="text-4xl mb-4">{step.icon}</div>
                      <h4 className="font-bold text-gray-800 mb-4">{step.stage}</h4>
                      <ul className="text-sm text-gray-600 space-y-2 text-left">
                        {step.tasks.map((task, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Perfiles de Riesgo */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="mr-3">🎭</span>
                  Perfiles de Inversor
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      profile: "Conservador",
                      color: "green",
                      characteristics: ["Preservar capital", "Ingresos estables", "Bajo riesgo"],
                      allocation: "80% Renta Fija, 20% Renta Variable",
                      timeframe: "1-3 años"
                    },
                    {
                      profile: "Moderado",
                      color: "blue",
                      characteristics: ["Balance riesgo-rentabilidad", "Crecimiento moderado", "Diversificación"],
                      allocation: "50% Renta Variable, 40% Renta Fija, 10% Alternativos",
                      timeframe: "3-7 años"
                    },
                    {
                      profile: "Agresivo",
                      color: "red",
                      characteristics: ["Máximo crecimiento", "Alta tolerancia al riesgo", "Largo plazo"],
                      allocation: "80% Renta Variable, 10% Renta Fija, 10% Alternativos",
                      timeframe: "7+ años"
                    }
                  ].map((profile, index) => (
                    <div key={index} className={`border-2 border-${profile.color}-200 rounded-xl p-6 bg-${profile.color}-50`}>
                      <h4 className={`text-xl font-bold text-${profile.color}-800 mb-4 text-center`}>
                        {profile.profile}
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-semibold text-gray-700 mb-2">Características:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {profile.characteristics.map((char, i) => (
                              <li key={i}>• {char}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-700 mb-2">Asignación Sugerida:</h5>
                          <p className="text-sm text-gray-600">{profile.allocation}</p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-700 mb-2">Horizonte:</h5>
                          <p className="text-sm text-gray-600">{profile.timeframe}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ANÁLISIS */}
          {activeTab === 'analysis' && (
            <div className="space-y-6">
              {/* Análisis Fundamental vs Técnico */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-2xl font-bold text-blue-600 mb-4 flex items-center">
                    <span className="mr-3">📊</span>
                    Análisis Fundamental
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Evalúa el valor intrínseco de una empresa analizando sus fundamentos financieros.
                  </p>
                  
                  <h4 className="font-bold text-gray-800 mb-3">📈 Métricas Clave:</h4>
                  <div className="space-y-3">
                    {[
                      { metric: "P/E Ratio", description: "Precio/Ganancias - Cuánto pagas por cada peso de ganancia", ideal: "< 15-20 para value" },
                      { metric: "P/B Ratio", description: "Precio/Valor Libro - Relación precio vs activos netos", ideal: "< 1.5 conservador" },
                      { metric: "ROE", description: "Return on Equity - Rentabilidad sobre patrimonio", ideal: "> 15% excelente" },
                      { metric: "Debt/Equity", description: "Deuda/Patrimonio - Nivel de endeudamiento", ideal: "< 0.5 conservador" },
                      { metric: "Current Ratio", description: "Activos/Pasivos Corrientes - Liquidez", ideal: "> 1.5 saludable" },
                      { metric: "Revenue Growth", description: "Crecimiento de ingresos año a año", ideal: "> 10% fuerte" }
                    ].map((item, index) => (
                      <div key={index} className="p-3 bg-blue-50 rounded-lg">
                        <div className="font-semibold text-blue-800">{item.metric}</div>
                        <div className="text-gray-700 text-sm">{item.description}</div>
                        <div className="text-green-600 text-xs font-medium">Ideal: {item.ideal}</div>
                      </div>
                    ))}
                  </div>

                  <h4 className="font-bold text-gray-800 mb-3 mt-6">🔍 Proceso de Análisis:</h4>
                  <ol className="text-sm text-gray-600 space-y-2">
                    <li><strong>1.</strong> Revisar estados financieros (ingresos, balance, flujo de caja)</li>
                    <li><strong>2.</strong> Calcular ratios financieros clave</li>
                    <li><strong>3.</strong> Analizar la industria y competencia</li>
                    <li><strong>4.</strong> Evaluar el management y gobierno corporativo</li>
                    <li><strong>5.</strong> Proyectar flujos de caja futuros</li>
                    <li><strong>6.</strong> Determinar valor intrínseco</li>
                  </ol>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-2xl font-bold text-green-600 mb-4 flex items-center">
                    <span className="mr-3">📉</span>
                    Análisis Técnico
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Estudia patrones de precios y volumen para predecir movimientos futuros.
                  </p>

                  <h4 className="font-bold text-gray-800 mb-3">📈 Indicadores Principales:</h4>
                  <div className="space-y-3">
                    {[
                      { indicator: "Medias Móviles", description: "SMA/EMA - Tendencia general del precio", use: "Detectar tendencias" },
                      { indicator: "RSI", description: "Relative Strength Index - Sobrecompra/sobreventa", use: "RSI > 70 sobrecmpra, < 30 sobreventa" },
                      { indicator: "MACD", description: "Convergencia/Divergencia de medias móviles", use: "Señales de compra/venta" },
                      { indicator: "Bandas de Bollinger", description: "Volatilidad y niveles de precio", use: "Identificar breakouts" },
                      { indicator: "Volumen", description: "Cantidad de acciones/tokens negociados", use: "Confirmar movimientos" },
                      { indicator: "Fibonacci", description: "Niveles de retroceso y extensión", use: "Soporte y resistencia" }
                    ].map((item, index) => (
                      <div key={index} className="p-3 bg-green-50 rounded-lg">
                        <div className="font-semibold text-green-800">{item.indicator}</div>
                        <div className="text-gray-700 text-sm">{item.description}</div>
                        <div className="text-blue-600 text-xs font-medium">Uso: {item.use}</div>
                      </div>
                    ))}
                  </div>

                  <h4 className="font-bold text-gray-800 mb-3 mt-6">🎯 Patrones Gráficos:</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {[
                      { pattern: "Triángulo", signal: "Continuación" },
                      { pattern: "Cabeza y Hombros", signal: "Reversión bajista" },
                      { pattern: "Doble Techo", signal: "Reversión bajista" },
                      { pattern: "Doble Piso", signal: "Reversión alcista" },
                      { pattern: "Bandera", signal: "Continuación" },
                      { pattern: "Copa y Asa", signal: "Continuación alcista" }
                    ].map((item, index) => (
                      <div key={index} className="p-2 bg-gray-100 rounded text-center">
                        <div className="font-medium">{item.pattern}</div>
                        <div className="text-xs text-gray-600">{item.signal}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Análisis de Criptomonedas */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-orange-600 mb-6 flex items-center">
                  <span className="mr-3">₿</span>
                  Análisis Específico para Criptomonedas
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-bold text-gray-800 mb-4">🔍 Métricas On-Chain</h4>
                    <div className="space-y-3">
                      {[
                        { metric: "Market Cap", description: "Capitalización de mercado total" },
                        { metric: "TVL", description: "Total Value Locked en DeFi" },
                        { metric: "Active Addresses", description: "Direcciones activas diarias" },
                        { metric: "Hash Rate", description: "Poder de minería (Bitcoin)" },
                        { metric: "Staking Ratio", description: "% de tokens en staking" },
                        { metric: "Dev Activity", description: "Actividad de desarrollo GitHub" }
                      ].map((item, index) => (
                        <div key={index} className="p-2 bg-orange-50 rounded">
                          <div className="font-medium text-orange-800 text-sm">{item.metric}</div>
                          <div className="text-gray-600 text-xs">{item.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-800 mb-4">🏗️ Fundamentales Crypto</h4>
                    <div className="space-y-3">
                      {[
                        { aspect: "Caso de Uso", description: "¿Qué problema resuelve?" },
                        { aspect: "Tokenomics", description: "Distribución y emisión" },
                        { aspect: "Roadmap", description: "Plan de desarrollo futuro" },
                        { aspect: "Partnerships", description: "Alianzas estratégicas" },
                        { aspect: "Community", description: "Tamaño y engagement" },
                        { aspect: "Regulation", description: "Riesgo regulatorio" }
                      ].map((item, index) => (
                        <div key={index} className="p-2 bg-blue-50 rounded">
                          <div className="font-medium text-blue-800 text-sm">{item.aspect}</div>
                          <div className="text-gray-600 text-xs">{item.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-800 mb-4">⚠️ Señales de Alerta</h4>
                    <div className="space-y-3">
                      {[
                        { signal: "Whale Movements", alert: "Grandes transferencias" },
                        { signal: "Exchange Inflows", alert: "Presión de venta" },
                        { signal: "FUD News", alert: "Noticias negativas" },
                        { signal: "Regulatory", alert: "Cambios regulatorios" },
                        { signal: "Technical Issues", alert: "Problemas de red" },
                        { signal: "Team Changes", alert: "Cambios en el equipo" }
                      ].map((item, index) => (
                        <div key={index} className="p-2 bg-red-50 rounded">
                          <div className="font-medium text-red-800 text-sm">{item.signal}</div>
                          <div className="text-gray-600 text-xs">{item.alert}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
                  <h5 className="font-bold text-yellow-800 mb-2">💡 Tip de Análisis Crypto:</h5>
                  <p className="text-yellow-700 text-sm">
                    Las criptomonedas son más volátiles que las acciones tradicionales. Combina análisis técnico 
                    con métricas on-chain y fundamentales del proyecto. El sentimiento del mercado (Fear & Greed Index) 
                    es especialmente importante en crypto.
                  </p>
                </div>
              </div>

              {/* Herramientas de Análisis */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-purple-600 mb-6 flex items-center">
                  <span className="mr-3">🛠️</span>
                  Herramientas de Análisis Recomendadas
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-gray-800 mb-4">📊 Análisis Fundamental</h4>
                    <div className="space-y-3">
                      {[
                        { tool: "Yahoo Finance", features: "Estados financieros gratuitos", price: "Gratis" },
                        { tool: "Morningstar", features: "Análisis profesional detallado", price: "Freemium" },
                        { tool: "SEC Edgar", features: "Reportes oficiales de empresas", price: "Gratis" },
                        { tool: "Finviz", features: "Screener de acciones avanzado", price: "Freemium" },
                        { tool: "Simply Wall St", features: "Visualización de datos financieros", price: "Freemium" }
                      ].map((item, index) => (
                        <div key={index} className="p-3 bg-purple-50 rounded-lg">
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-medium text-purple-800">{item.tool}</span>
                            <span className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded">{item.price}</span>
                          </div>
                          <div className="text-gray-600 text-sm">{item.features}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-800 mb-4">📈 Análisis Técnico</h4>
                    <div className="space-y-3">
                      {[
                        { tool: "TradingView", features: "Gráficos avanzados y comunidad", price: "Freemium" },
                        { tool: "MetaTrader 5", features: "Plataforma profesional de trading", price: "Gratis" },
                        { tool: "Coinigy", features: "Especializado en crypto", price: "Pago" },
                        { tool: "StockCharts", features: "Análisis técnico tradicional", price: "Freemium" },
                        { tool: "Investing.com", features: "Gráficos y noticias integradas", price: "Freemium" }
                      ].map((item, index) => (
                        <div key={index} className="p-3 bg-green-50 rounded-lg">
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-medium text-green-800">{item.tool}</span>
                            <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">{item.price}</span>
                          </div>
                          <div className="text-gray-600 text-sm">{item.features}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MERCADOS */}
          {activeTab === 'markets' && (
            <div className="space-y-6">
              {/* Sesgos Cognitivos */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="mr-3">🧠</span>
                  Sesgos Cognitivos en Inversiones
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      bias: "FOMO (Fear of Missing Out)",
                      description: "Miedo a perderse oportunidades de ganancia, lleva a comprar en máximos.",
                      solution: "Establecer reglas de entrada claras y respetarlas.",
                      example: "Comprar Bitcoin cuando está en máximos históricos por ver noticias."
                    },
                    {
                      bias: "Pérdida Aversión",
                      description: "El dolor de perder es mayor que el placer de ganar la misma cantidad.",
                      solution: "Establecer stop-loss y objetivos de ganancia desde el inicio.",
                      example: "Mantener acciones perdedoras esperando recuperación."
                    },
                    {
                      bias: "Confirmación",
                      description: "Buscar información que confirme nuestras creencias previas.",
                      solution: "Buscar activamente opiniones contrarias y análisis críticos.",
                      example: "Solo leer noticias positivas sobre una criptomoneda que posees."
                    },
                    {
                      bias: "Exceso de Confianza",
                      description: "Sobrestimar nuestras habilidades para predecir el mercado.",
                      solution: "Mantener humildad y diversificar las inversiones.",
                      example: "Hacer trading diario pensando que puedes ganar al mercado."
                    },
                    {
                      bias: "Anclaje",
                      description: "Dar demasiado peso a la primera información recibida.",
                      solution: "Evaluar múltiples fuentes y actualizar análisis regularmente.",
                      example: "Recordar el precio de compra y no vender con pérdida."
                    },
                    {
                      bias: "Efecto Manada",
                      description: "Seguir lo que hace la mayoría sin análisis propio.",
                      solution: "Desarrollar criterio propio y estrategia independiente.",
                      example: "Comprar GameStop porque 'todos en Reddit lo hacen'."
                    }
                  ].map((bias, index) => (
                    <div key={index} className="p-4 border border-red-200 rounded-lg bg-red-50">
                      <h4 className="font-bold text-red-800 mb-2">⚠️ {bias.bias}</h4>
                      <p className="text-gray-700 text-sm mb-3">{bias.description}</p>
                      <div className="mb-3">
                        <strong className="text-gray-800 text-sm">Ejemplo:</strong>
                        <p className="text-gray-600 text-sm italic">{bias.example}</p>
                      </div>
                      <div className="bg-green-100 p-2 rounded">
                        <strong className="text-green-800 text-sm">💡 Solución:</strong>
                        <p className="text-green-700 text-sm">{bias.solution}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reglas de Oro */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-2xl font-bold text-yellow-600 mb-4 flex items-center">
                    <span className="mr-3">👑</span>
                    Reglas de Oro
                  </h3>
                  <div className="space-y-4">
                    {[
                      "Nunca inviertas dinero que no puedes permitirte perder",
                      "La diversificación es la única comida gratis en finanzas",
                      "El tiempo en el mercado vence al timing del mercado",
                      "Mantén un fondo de emergencia de 6 meses de gastos",
                      "Edúcate antes de invertir en cualquier activo",
                      "Las emociones son el mayor enemigo del inversor",
                      "Si algo suena demasiado bueno para ser cierto, probablemente lo sea",
                      "Invierte regularmente, no trates de adivinar el momento perfecto"
                    ].map((rule, index) => (
                      <div key={index} className="flex items-start p-3 bg-yellow-50 rounded-lg">
                        <span className="text-yellow-600 mr-3 font-bold">{index + 1}.</span>
                        <span className="text-gray-700 text-sm">{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-2xl font-bold text-red-600 mb-4 flex items-center">
                    <span className="mr-3">🚫</span>
                    Errores Comunes
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        error: "Poner todos los huevos en una canasta",
                        impact: "Riesgo de pérdida total si falla una inversión"
                      },
                      {
                        error: "Comprar alto, vender bajo",
                        impact: "Opuesto a la estrategia correcta, pérdidas garantizadas"
                      },
                      {
                        error: "No tener plan de inversión",
                        impact: "Decisiones emocionales e inconsistentes"
                      },
                      {
                        error: "Perseguir rendimientos pasados",
                        impact: "Lo que funcionó ayer puede no funcionar mañana"
                      },
                      {
                        error: "Trading excesivo",
                        impact: "Altos costos de transacción que erosionan ganancias"
                      },
                      {
                        error: "No considerar la inflación",
                        impact: "Pérdida de poder adquisitivo real"
                      },
                      {
                        error: "Invertir sin entender",
                        impact: "Decisiones mal informadas y pérdidas evitables"
                      }
                    ].map((mistake, index) => (
                      <div key={index} className="p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
                        <h5 className="font-semibold text-red-800 text-sm">{mistake.error}</h5>
                        <p className="text-red-600 text-xs mt-1">{mistake.impact}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Plan de Acción Emocional */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="mr-3">🎯</span>
                  Plan de Acción para Controlar Emociones
                </h3>
                
                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    {
                      situation: "📈 Mercado en Alza",
                      emotion: "Euforia/FOMO",
                      action: "Mantener plan original",
                      reminder: "Los mercados son cíclicos"
                    },
                    {
                      situation: "📉 Mercado en Baja",
                      emotion: "Pánico/Miedo",
                      action: "Rebalancear o comprar más",
                      reminder: "Las crisis son oportunidades"
                    },
                    {
                      situation: "💰 Grandes Ganancias",
                      emotion: "Overconfidence",
                      action: "Tomar ganancias parciales",
                      reminder: "Nadie quiebra tomando ganancias"
                    },
                    {
                      situation: "📉 Grandes Pérdidas",
                      emotion: "Desesperación",
                      action: "Revisar fundamentales",
                      reminder: "Solo pierdes si vendes"
                    }
                  ].map((scenario, index) => (
                    <div key={index} className="text-center p-4 border border-gray-200 rounded-lg">
                      <div className="text-2xl mb-2">{scenario.situation}</div>
                      <div className="text-red-600 font-semibold text-sm mb-2">{scenario.emotion}</div>
                      <div className="text-green-600 font-semibold text-sm mb-2">{scenario.action}</div>
                      <div className="text-gray-500 text-xs italic">{scenario.reminder}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* HERRAMIENTAS */}
          {activeTab === 'tools' && (
            <div className="space-y-6">
              {/* Calculadoras Financieras */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="mr-3">🧮</span>
                  Calculadoras y Herramientas Esenciales
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      tool: "Calculadora de Interés Compuesto",
                      description: "Ve cómo crecen tus inversiones a largo plazo",
                      formula: "VF = VP × (1 + r)^n",
                      example: "$1000 al 10% anual por 10 años = $2,594"
                    },
                    {
                      tool: "Calculadora de DCA",
                      description: "Simula estrategia de inversión periódica",
                      formula: "Inversión Total / Precio Promedio",
                      example: "$100 mensuales en BTC durante 2 años"
                    },
                    {
                      tool: "Calculadora de Riesgo",
                      description: "Determina cuánto puedes permitirte arriesgar",
                      formula: "Capital × % Máximo de Riesgo",
                      example: "$10,000 × 2% = $200 máximo por operación"
                    },
                    {
                      tool: "Calculadora de Diversificación",
                      description: "Distribuye inversiones según perfil de riesgo",
                      formula: "100 - Edad = % en Renta Variable",
                      example: "30 años = 70% acciones, 30% bonos"
                    }
                  ].map((tool, index) => (
                    <div key={index} className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                      <h4 className="font-bold text-blue-800 mb-2">{tool.tool}</h4>
                      <p className="text-gray-700 text-sm mb-3">{tool.description}</p>
                      <div className="bg-white p-2 rounded mb-2">
                        <strong className="text-gray-800 text-sm">Fórmula:</strong>
                        <code className="text-blue-600 text-sm ml-2">{tool.formula}</code>
                      </div>
                      <div className="text-green-700 text-sm">
                        <strong>Ejemplo:</strong> {tool.example}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recursos Recomendados */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-2xl font-bold text-purple-600 mb-4 flex items-center">
                    <span className="mr-3">📚</span>
                    Libros Recomendados
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        title: "El Inversor Inteligente",
                        author: "Benjamin Graham",
                        level: "Principiante-Intermedio",
                        description: "La biblia del value investing"
                      },
                      {
                        title: "Un Paseo Aleatorio por Wall Street",
                        author: "Burton Malkiel",
                        level: "Principiante",
                        description: "Fundamentos de inversión pasiva"
                      },
                      {
                        title: "Padre Rico, Padre Pobre",
                        author: "Robert Kiyosaki",
                        level: "Principiante",
                        description: "Mentalidad financiera básica"
                      },
                      {
                        title: "The Little Book of Common Sense Investing",
                        author: "John Bogle",
                        level: "Principiante-Intermedio",
                        description: "Inversión en fondos índice"
                      }
                    ].map((book, index) => (
                      <div key={index} className="p-3 bg-purple-50 rounded-lg">
                        <h5 className="font-semibold text-purple-800">{book.title}</h5>
                        <p className="text-purple-600 text-sm">Por {book.author}</p>
                        <p className="text-gray-600 text-sm">{book.description}</p>
                        <span className="inline-block mt-1 px-2 py-1 bg-purple-200 text-purple-800 text-xs rounded">
                          {book.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-2xl font-bold text-green-600 mb-4 flex items-center">
                    <span className="mr-3">🌐</span>
                    Recursos Online
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        resource: "Investopedia",
                        type: "Educación",
                        description: "Diccionario financiero y tutoriales completos"
                      },
                      {
                        resource: "Yahoo Finance",
                        type: "Datos",
                        description: "Cotizaciones en tiempo real y noticias"
                      },
                      {
                        resource: "TradingView",
                        type: "Análisis",
                        description: "Gráficos avanzados y análisis técnico"
                      },
                      {
                        resource: "Morningstar",
                        type: "Research",
                        description: "Análisis profesional de fondos y acciones"
                      },
                      {
                        resource: "SEC.gov",
                        type: "Regulación",
                        description: "Información oficial y reportes de empresas"
                      },
                      {
                        resource: "CNAV (Argentina)",
                        type: "Local",
                        description: "Regulador local de mercado de capitales"
                      }
                    ].map((resource, index) => (
                      <div key={index} className="p-3 bg-green-50 rounded-lg">
                        <div className="flex justify-between items-start mb-1">
                          <h5 className="font-semibold text-green-800">{resource.resource}</h5>
                          <span className="px-2 py-1 bg-green-200 text-green-800 text-xs rounded">
                            {resource.type}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">{resource.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Apps y Plataformas */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="mr-3">📱</span>
                  Apps y Plataformas Recomendadas
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      category: "🏦 Brokers Tradicionales",
                      platforms: [
                        { name: "Interactive Brokers", pros: "Bajas comisiones, global" },
                        { name: "Charles Schwab", pros: "Sin comisiones en ETFs" },
                        { name: "Fidelity", pros: "Fondos sin mínimo" }
                      ]
                    },
                    {
                      category: "₿ Crypto Exchanges",
                      platforms: [
                        { name: "Binance", pros: "Mayor volumen mundial" },
                        { name: "Coinbase", pros: "Fácil para principiantes" },
                        { name: "Kraken", pros: "Muy seguro, regulado" }
                      ]
                    },
                    {
                      category: "📊 Portfolio Tracking",
                      platforms: [
                        { name: "Personal Capital", pros: "Completo y gratuito" },
                        { name: "Mint", pros: "Gestión financiera integral" },
                        { name: "YNAB", pros: "Presupuesto y planificación" }
                      ]
                    }
                  ].map((category, index) => (
                    <div key={index}>
                      <h4 className="font-bold text-gray-800 mb-4">{category.category}</h4>
                      <div className="space-y-3">
                        {category.platforms.map((platform, i) => (
                          <div key={i} className="p-3 bg-gray-50 rounded-lg">
                            <h5 className="font-semibold text-gray-700">{platform.name}</h5>
                            <p className="text-gray-600 text-sm">{platform.pros}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checklist del Inversor */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="mr-3">✅</span>
                  Checklist del Inversor Inteligente
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-blue-600 mb-4">Antes de Invertir:</h4>
                    <div className="space-y-2">
                      {[
                        "Tengo fondo de emergencia de 6 meses",
                        "He pagado deudas de alto interés",
                        "Entiendo en qué voy a invertir",
                        "He definido mis objetivos financieros",
                        "Conozco mi tolerancia al riesgo",
                        "Tengo un plan de inversión escrito",
                        "He investigado las comisiones y costos"
                      ].map((item, index) => (
                        <div key={index} className="flex items-center">
                          <input type="checkbox" className="mr-3" />
                          <span className="text-gray-700 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-green-600 mb-4">Durante la Inversión:</h4>
                    <div className="space-y-2">
                      {[
                        "Reviso mi portfolio mensualmente",
                        "Rebalanceo cada 6-12 meses",
                        "No tomo decisiones emocionales",
                        "Mantengo registros de todas las operaciones",
                        "Sigo aprendiendo constantemente",
                        "No pongo más del 5% en una sola acción",
                        "Tengo estrategia de salida definida"
                      ].map((item, index) => (
                        <div key={index} className="flex items-center">
                          <input type="checkbox" className="mr-3" />
                          <span className="text-gray-700 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Calculadora Simple de Retorno */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-green-600 mb-6 flex items-center">
                  <span className="mr-3">🧮</span>
                  Calculadora Interés Compuesto
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-bold text-green-800 mb-4">📊 Ejemplo de Cálculo</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Inversión inicial:</span>
                        <span className="font-semibold">$100.000 ARS</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Aporte mensual:</span>
                        <span className="font-semibold">$20.000 ARS</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rentabilidad anual:</span>
                        <span className="font-semibold">10%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tiempo:</span>
                        <span className="font-semibold">10 años</span>
                      </div>
                      <hr className="border-green-200" />
                      <div className="flex justify-between text-lg">
                        <span className="font-bold">Total final:</span>
                        <span className="font-bold text-green-600">$4.158.781 ARS</span>
                      </div>
                      <div className="text-xs text-green-600">
                        Invertido: $2.500.000 | Ganancia: $1.658.781
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-800 mb-4">⚡ Fórmulas Útiles</h4>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 bg-blue-50 rounded">
                        <strong className="text-blue-800">Interés Compuesto:</strong>
                        <code className="block text-blue-600 text-xs mt-1">VF = VP × (1 + r)^n</code>
                        <div className="text-blue-600 text-xs">VF = Valor Futuro, VP = Valor Presente</div>
                      </div>
                      
                      <div className="p-3 bg-purple-50 rounded">
                        <strong className="text-purple-800">Regla del 72:</strong>
                        <code className="block text-purple-600 text-xs mt-1">Años para duplicar = 72 / % rentabilidad</code>
                        <div className="text-purple-600 text-xs">10% anual = 7.2 años para duplicar</div>
                      </div>
                      
                      <div className="p-3 bg-orange-50 rounded">
                        <strong className="text-orange-800">Valor Presente:</strong>
                        <code className="block text-orange-600 text-xs mt-1">VP = VF / (1 + r)^n</code>
                        <div className="text-orange-600 text-xs">Para calcular cuánto necesitas hoy</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PSICOLOGÍA - Sección expandida */}
          {activeTab === 'psychology' && (
            <div className="space-y-6">
              {/* Sesgos Cognitivos */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="mr-3">🧠</span>
                  Sesgos Cognitivos en Inversiones
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      bias: "FOMO (Fear of Missing Out)",
                      description: "Miedo a perderse oportunidades de ganancia, lleva a comprar en máximos.",
                      solution: "Establecer reglas de entrada claras y respetarlas.",
                      example: "Comprar Bitcoin cuando está en máximos históricos por ver noticias."
                    },
                    {
                      bias: "Pérdida Aversión",
                      description: "El dolor de perder es mayor que el placer de ganar la misma cantidad.",
                      solution: "Establecer stop-loss y objetivos de ganancia desde el inicio.",
                      example: "Mantener acciones perdedoras esperando recuperación."
                    },
                    {
                      bias: "Confirmación",
                      description: "Buscar información que confirme nuestras creencias previas.",
                      solution: "Buscar activamente opiniones contrarias y análisis críticos.",
                      example: "Solo leer noticias positivas sobre una criptomoneda que posees."
                    },
                    {
                      bias: "Exceso de Confianza",
                      description: "Sobrestimar nuestras habilidades para predecir el mercado.",
                      solution: "Mantener humildad y diversificar las inversiones.",
                      example: "Hacer trading diario pensando que puedes ganar al mercado."
                    },
                    {
                      bias: "Anclaje",
                      description: "Dar demasiado peso a la primera información recibida.",
                      solution: "Evaluar múltiples fuentes y actualizar análisis regularmente.",
                      example: "Recordar el precio de compra y no vender con pérdida."
                    },
                    {
                      bias: "Efecto Manada",
                      description: "Seguir lo que hace la mayoría sin análisis propio.",
                      solution: "Desarrollar criterio propio y estrategia independiente.",
                      example: "Comprar GameStop porque 'todos en Reddit lo hacen'."
                    }
                  ].map((bias, index) => (
                    <div key={index} className="p-4 border border-red-200 rounded-lg bg-red-50">
                      <h4 className="font-bold text-red-800 mb-2">⚠️ {bias.bias}</h4>
                      <p className="text-gray-700 text-sm mb-3">{bias.description}</p>
                      <div className="mb-3">
                        <strong className="text-gray-800 text-sm">Ejemplo:</strong>
                        <p className="text-gray-600 text-sm italic">{bias.example}</p>
                      </div>
                      <div className="bg-green-100 p-2 rounded">
                        <strong className="text-green-800 text-sm">💡 Solución:</strong>
                        <p className="text-green-700 text-sm">{bias.solution}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ciclo Emocional del Mercado */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-purple-600 mb-6 flex items-center">
                  <span className="mr-3">🎭</span>
                  Ciclo Emocional del Mercado
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-gray-800 mb-4">💹 Fases del Ciclo</h4>
                    <div className="space-y-3">
                      {[
                        { phase: "Optimismo", emotion: "😊", description: "Primeras subidas, esperanza", action: "Comenzar a invertir gradualmente" },
                        { phase: "Excitación", emotion: "🤑", description: "Ganancias consistentes, confianza", action: "Mantener disciplina, no aumentar riesgo" },
                        { phase: "Euforia", emotion: "🤩", description: "Máximos históricos, FOMO", action: "¡VENDER! Tomar ganancias" },
                        { phase: "Complacencia", emotion: "😌", description: "Ignorar señales de alerta", action: "Reducir exposición" },
                        { phase: "Negación", emotion: "🙄", description: "Es solo una corrección", action: "Preparar efectivo" },
                        { phase: "Miedo", emotion: "😰", description: "Pérdidas acelerando", action: "Mantener calma, DCA" },
                        { phase: "Desesperación", emotion: "😭", description: "Mínimos, pánico generalizado", action: "¡COMPRAR! Oportunidad" },
                        { phase: "Capitulación", emotion: "🫠", description: "Vender a cualquier precio", action: "Máxima oportunidad de compra" }
                      ].map((item, index) => (
                        <div key={index} className="p-3 bg-purple-50 rounded-lg flex items-center space-x-3">
                          <span className="text-2xl">{item.emotion}</span>
                          <div>
                            <div className="font-semibold text-purple-800">{item.phase}</div>
                            <div className="text-gray-600 text-sm">{item.description}</div>
                            <div className="text-blue-600 text-xs font-medium">{item.action}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-800 mb-4">🎯 Estrategia Anti-Emocional</h4>
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h5 className="font-bold text-green-800 mb-2">✅ Hacer Cuando Sube</h5>
                        <ul className="text-green-700 text-sm space-y-1">
                          <li>• Tomar ganancias parciales (+30%)</li>
                          <li>• Rebalancear portfolio</li>
                          <li>• Mantener plan original</li>
                          <li>• Aumentar posición en efectivo</li>
                          <li>• Celebrar pero no cambiar estrategia</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-red-50 rounded-lg">
                        <h5 className="font-bold text-red-800 mb-2">✅ Hacer Cuando Baja</h5>
                        <ul className="text-red-700 text-sm space-y-1">
                          <li>• Comprar más (DCA)</li>
                          <li>• Revisar fundamentales</li>
                          <li>• Mantener horizonte largo plazo</li>
                          <li>• Evitar noticias alarmistas</li>
                          <li>• Ver como oportunidad</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-yellow-50 rounded-lg">
                        <h5 className="font-bold text-yellow-800 mb-2">💡 Regla de Oro</h5>
                        <p className="text-yellow-700 text-sm">
                          <strong>"Haz lo opuesto a tus emociones"</strong> - Cuando sientes miedo extremo, es momento de comprar. 
                          Cuando sientes euforia, es momento de vender. El mercado premia a quien actúa contrario a la multitud.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reglas de Oro */}  
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-2xl font-bold text-yellow-600 mb-4 flex items-center">
                    <span className="mr-3">👑</span>
                    Reglas de Oro
                  </h3>
                  <div className="space-y-4">
                    {[
                      "Nunca inviertas dinero que no puedes permitirte perder",
                      "La diversificación es la única comida gratis en finanzas",
                      "El tiempo en el mercado vence al timing del mercado",
                      "Mantén un fondo de emergencia de 6 meses de gastos",
                      "Edúcate antes de invertir en cualquier activo",
                      "Las emociones son el mayor enemigo del inversor",
                      "Si algo suena demasiado bueno para ser cierto, probablemente lo sea",
                      "Invierte regularmente, no trates de adivinar el momento perfecto"
                    ].map((rule, index) => (
                      <div key={index} className="flex items-start p-3 bg-yellow-50 rounded-lg">
                        <span className="text-yellow-600 mr-3 font-bold">{index + 1}.</span>
                        <span className="text-gray-700 text-sm">{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-2xl font-bold text-red-600 mb-4 flex items-center">
                    <span className="mr-3">🚫</span>
                    Errores Comunes
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        error: "Poner todos los huevos en una canasta",
                        impact: "Riesgo de pérdida total si falla una inversión"
                      },
                      {
                        error: "Comprar alto, vender bajo",
                        impact: "Opuesto a la estrategia correcta, pérdidas garantizadas"
                      },
                      {
                        error: "No tener plan de inversión",
                        impact: "Decisiones emocionales e inconsistentes"
                      },
                      {
                        error: "Perseguir rendimientos pasados",
                        impact: "Lo que funcionó ayer puede no funcionar mañana"
                      },
                      {
                        error: "Trading excesivo",
                        impact: "Altos costos de transacción que erosionan ganancias"
                      },
                      {
                        error: "No considerar la inflación",
                        impact: "Pérdida de poder adquisitivo real"
                      },
                      {
                        error: "Invertir sin entender",
                        impact: "Decisiones mal informadas y pérdidas evitables"
                      }
                    ].map((mistake, index) => (
                      <div key={index} className="p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
                        <h5 className="font-semibold text-red-800 text-sm">{mistake.error}</h5>
                        <p className="text-red-600 text-xs mt-1">{mistake.impact}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Plan de Acción Emocional */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="mr-3">🎯</span>
                  Plan de Acción para Controlar Emociones
                </h3>
                
                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    {
                      situation: "📈 Mercado en Alza",
                      emotion: "Euforia/FOMO",
                      action: "Mantener plan original",
                      reminder: "Los mercados son cíclicos"
                    },
                    {
                      situation: "📉 Mercado en Baja",
                      emotion: "Pánico/Miedo",
                      action: "Rebalancear o comprar más",
                      reminder: "Las crisis son oportunidades"
                    },
                    {
                      situation: "💰 Grandes Ganancias",
                      emotion: "Overconfidence",
                      action: "Tomar ganancias parciales",
                      reminder: "Nadie quiebra tomando ganancias"
                    },
                    {
                      situation: "📉 Grandes Pérdidas",
                      emotion: "Desesperación",
                      action: "Revisar fundamentales",
                      reminder: "Solo pierdes si vendes"
                    }
                  ].map((scenario, index) => (
                    <div key={index} className="text-center p-4 border border-gray-200 rounded-lg">
                      <div className="text-2xl mb-2">{scenario.situation}</div>
                      <div className="text-red-600 font-semibold text-sm mb-2">{scenario.emotion}</div>
                      <div className="text-green-600 font-semibold text-sm mb-2">{scenario.action}</div>
                      <div className="text-gray-500 text-xs italic">{scenario.reminder}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-bold text-blue-800 mb-2">🧘 Técnicas de Control Emocional:</h5>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li><strong>Pausa de 24 horas:</strong> Nunca tomes decisiones importantes impulsivamente</li>
                    <li><strong>Escribe tus emociones:</strong> Documenta por qué quieres comprar/vender</li>
                    <li><strong>Consulta tu plan:</strong> ¿Esta decisión está en tu estrategia original?</li>
                    <li><strong>Habla con alguien:</strong> Una perspectiva externa puede ser valiosa</li>
                    <li><strong>Medita o camina:</strong> Despeja tu mente antes de actuar</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer con Disclaimer */}
        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-start">
            <span className="text-yellow-600 text-2xl mr-4">⚠️</span>
            <div>
              <h4 className="font-bold text-yellow-800 mb-2">Disclaimer Importante</h4>
              <p className="text-yellow-700 text-sm">
                Esta información es solo para fines educativos y no constituye asesoramiento financiero personalizado. 
                Todas las inversiones conllevan riesgo de pérdida. Consulta con un asesor financiero calificado antes 
                de tomar decisiones de inversión importantes. El rendimiento pasado no garantiza resultados futuros.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialEducation;
