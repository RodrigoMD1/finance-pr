import { FaBookOpen, FaBrain, FaChartLine, FaUniversity, FaToolbox, FaBullseye, FaSearch, FaGlobeAmericas, FaCalendarAlt, FaHandshake, FaBalanceScale, FaCheck, FaTimes } from 'react-icons/fa';
import financeImg from '../assets/img/finance235.jpg';
import financeImg2 from '../assets/img/finance55.jpg';

const badges = {
  base: 'inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full',
};

// Página monolítica previa (no se usa en rutas nuevas)
export default function EducacionFinanciera() {
  return (
    <div className="max-w-6xl p-6 mx-auto">
      {/* Hero */}
      <div className="relative p-8 overflow-hidden bg-white rounded-xl shadow">
        <img src={financeImg} alt="Educación" className="absolute inset-0 object-cover w-full h-full opacity-10" />
        <div className="relative">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">📚 Educación Financiera</h1>
          <p className="mt-2 text-gray-700">Aprende los fundamentos de las inversiones, economía y finanzas personales. Tu camino hacia la libertad financiera comienza aquí.</p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className={`${badges.base} bg-blue-50 text-blue-700`}><FaUniversity /> Conceptos Básicos</span>
            <span className={`${badges.base} bg-emerald-50 text-emerald-700`}><FaChartLine /> Tipos de Inversión</span>
            <span className={`${badges.base} bg-purple-50 text-purple-700`}><FaBullseye /> Estrategias</span>
            <span className={`${badges.base} bg-rose-50 text-rose-700`}><FaBrain /> Psicología</span>
            <span className={`${badges.base} bg-amber-50 text-amber-700`}><FaSearch /> Análisis</span>
            <span className={`${badges.base} bg-cyan-50 text-cyan-700`}><FaGlobeAmericas /> Mercados</span>
            <span className={`${badges.base} bg-slate-50 text-slate-700`}><FaBookOpen /> Planificación</span>
            <span className={`${badges.base} bg-teal-50 text-teal-700`}><FaToolbox /> Herramientas</span>
          </div>
        </div>
      </div>

      {/* Tipos de Inversión */}
      <div className="p-6 mt-8 bg-white rounded-xl shadow">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">🏦 Tipos de Inversión</h2>
        {/* Renta Fija */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="text-lg font-semibold text-gray-900">Renta Fija</div>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700">Predecible</span>
            </div>
            <p className="mb-3 text-sm text-gray-700">Inversiones que ofrecen rendimientos predecibles y estables.</p>
            <div className="space-y-2">
              {[
                ['Bonos del Gobierno', 'Bajo', '3-6%'],
                ['Bonos Corporativos', 'Medio', '4-8%'],
                ['Plazo Fijo', 'Muy Bajo', '2-5%'],
                ['Fondos de Inversión RF', 'Bajo', '3-7%'],
              ].map(([name, risk, ret]) => (
                <div key={name} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm font-medium text-gray-800">{name}</span>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 text-[11px] rounded-full ${risk === 'Muy Bajo' ? 'bg-slate-100 text-slate-700' : risk === 'Bajo' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'}`}>Riesgo: {risk}</span>
                    <span className="px-2 py-0.5 text-[11px] rounded-full bg-gray-100 text-gray-700">~{ret}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Renta Variable */}
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="text-lg font-semibold text-gray-900">Renta Variable</div>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-orange-50 text-orange-700">Crecimiento</span>
            </div>
            <p className="mb-3 text-sm text-gray-700">Inversiones con rendimientos variables y mayor potencial de crecimiento.</p>
            <div className="space-y-2">
              {[
                ['Acciones Individuales', 'Alto', 'Variable'],
                ['ETFs', 'Medio-Alto', '8-12%'],
                ['Fondos Mutuos', 'Medio', '6-10%'],
                ['REITs', 'Medio', '7-9%'],
              ].map(([name, risk, ret]) => (
                <div key={name} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm font-medium text-gray-800">{name}</span>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 text-[11px] rounded-full ${/Alto/.test(String(risk)) ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'}`}>Riesgo: {risk}</span>
                    <span className="px-2 py-0.5 text-[11px] rounded-full bg-gray-100 text-gray-700">~{ret}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Criptomonedas */}
        <div className="p-4 mt-4 border rounded-lg">
          <div className="text-lg font-semibold text-gray-900">₿ Criptomonedas</div>
          <div className="grid grid-cols-1 gap-4 mt-2 md:grid-cols-3">
            <div className="p-3 bg-gray-50 rounded">
              <div className="text-sm font-semibold text-gray-900">Bitcoin (BTC)</div>
              <p className="mt-1 text-sm text-gray-700">La primera y más establecida criptomoneda. Considerada 'oro digital'.</p>
              <div className="mt-2 text-[13px] text-gray-700">Riesgo: <span className="font-semibold text-rose-600">Alto</span></div>
              <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
                <li>Reserva de valor</li>
                <li>Adopción institucional</li>
                <li>Volatilidad alta</li>
              </ul>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <div className="text-sm font-semibold text-gray-900">Altcoins Establecidas</div>
              <p className="mt-1 text-sm text-gray-700">Ethereum, Cardano, Solana - proyectos con utilidad real y ecosistemas desarrollados.</p>
              <div className="mt-2 text-[13px] text-gray-700">Riesgo: <span className="font-semibold text-rose-600">Muy Alto</span></div>
              <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
                <li>Innovación tecnológica</li>
                <li>Casos de uso específicos</li>
                <li>Mayor volatilidad</li>
              </ul>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <div className="text-sm font-semibold text-gray-900">Tokens Emergentes</div>
              <p className="mt-1 text-sm text-gray-700">Proyectos nuevos con alto potencial pero también alto riesgo de pérdida total.</p>
              <div className="mt-2 text-[13px] text-gray-700">Riesgo: <span className="font-semibold text-red-700">Extremo</span></div>
              <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
                <li>Potencial 100x</li>
                <li>Riesgo de pérdida total</li>
                <li>Investigación esencial</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Comparación de activos */}
      <div className="p-6 mt-8 bg-white rounded-xl shadow">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">⚖️ Comparación de Activos de Inversión</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-separate border-spacing-y-1">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="px-3 py-2">Activo</th>
                <th className="px-3 py-2">Riesgo</th>
                <th className="px-3 py-2">Rentabilidad Anual</th>
                <th className="px-3 py-2">Liquidez</th>
                <th className="px-3 py-2">Horizonte Ideal</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Plazo Fijo','Muy Bajo','2-5%','Baja','Corto'],
                ['Bonos Gobierno','Bajo','3-6%','Media','Medio'],
                ['Acciones Blue Chips','Medio','8-12%','Alta','Largo'],
                ['ETFs','Medio','6-10%','Alta','Largo'],
                ['Bitcoin','Alto','Variable','Alta','Largo'],
                ['Altcoins','Muy Alto','Variable','Media','Especulativo'],
              ].map((row) => (
                <tr key={row[0]} className="bg-gray-50">
                  {row.map((cell, i) => (
                    <td key={i} className="px-3 py-2 text-gray-800 border border-gray-100">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-3 mt-4 text-[13px] text-amber-800 bg-amber-50 border border-amber-200 rounded">
          ⚠️ Esta información es educativa y no constituye asesoramiento financiero.
        </div>
      </div>

      {/* Estrategias */}
      <div className="p-6 mt-8 bg-white rounded-xl shadow">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">🧠 Estrategias</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[
            {
              icon: <FaCalendarAlt className="text-orange-500" />, title: 'Dollar Cost Averaging (DCA)',
              desc: 'Invertir una cantidad fija periódicamente, independiente del precio del mercado.',
              pros: ['Reduce impacto de volatilidad','Disciplina de inversión','Fácil de implementar'],
              cons: ['Puede perder oportunidades','Requiere constancia'],
              ideal: 'Inversores principiantes y conservadores'
            },
            {
              icon: <FaHandshake className="text-emerald-500" />, title: 'Buy and Hold',
              desc: 'Comprar activos de calidad y mantenerlos a largo plazo sin importar fluctuaciones.',
              pros: ['Aprovecha crecimiento compuesto','Bajos costos','Menos estrés'],
              cons: ['Requiere paciencia','Puede ignorar cambios fundamentales'],
              ideal: 'Inversores a largo plazo con tolerancia al riesgo'
            },
            {
              icon: <FaGlobeAmericas className="text-blue-500" />, title: 'Diversificación por Sectores',
              desc: 'Distribuir inversiones entre diferentes industrias y geografías.',
              pros: ['Reduce riesgo específico','Aprovecha diferentes ciclos','Protección ante crisis sectoriales'],
              cons: ['Puede diluir grandes ganancias','Requiere más investigación'],
              ideal: 'Todos los tipos de inversores'
            },
            {
              icon: <FaBalanceScale className="text-purple-500" />, title: 'Rebalanceo Periódico',
              desc: 'Ajustar proporciones del portfolio periódicamente para mantener la asignación objetivo.',
              pros: ['Mantiene perfil de riesgo','Vender caro y comprar barato','Disciplina de inversión'],
              cons: ['Costos de transacción','Puede ir contra tendencias'],
              ideal: 'Inversores con portfolios diversificados'
            }
          ].map((s) => (
            <div key={s.title} className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                {s.icon}
                <div className="text-base font-semibold text-gray-900">{s.title}</div>
              </div>
              <p className="mb-3 text-sm text-gray-700">{s.desc}</p>
              <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
                <div>
                  <div className="mb-1 font-semibold text-emerald-700">✅ Ventajas</div>
                  <ul className="space-y-1 text-gray-800">
                    {s.pros.map(p => (
                      <li key={p} className="flex items-center gap-2"><FaCheck className="text-emerald-600" /> {p}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="mb-1 font-semibold text-rose-700">❌ Desventajas</div>
                  <ul className="space-y-1 text-gray-800">
                    {s.cons.map(c => (
                      <li key={c} className="flex items-center gap-2"><FaTimes className="text-rose-600" /> {c}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="px-2 py-1 mt-3 text-xs font-semibold rounded bg-gray-100 text-gray-800 inline-block">Ideal para: {s.ideal}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Cómo Construir tu Portfolio */}
      <div className="p-6 mt-8 bg-white rounded-xl shadow">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">🏗️ Cómo Construir tu Portfolio</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="p-4 border rounded-lg">
            <div className="text-sm font-bold text-gray-900">🎯 1. Definir Objetivos</div>
            <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
              <li>Establecer metas financieras</li>
              <li>Definir horizonte temporal</li>
              <li>Evaluar tolerancia al riesgo</li>
              <li>Determinar capital disponible</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="text-sm font-bold text-gray-900">📊 2. Asignación de Activos</div>
            <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
              <li>60-70% Renta Variable (jóvenes)</li>
              <li>20-30% Renta Fija</li>
              <li>5-10% Alternativos (crypto, commodities)</li>
              <li>Mantener fondo de emergencia</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="text-sm font-bold text-gray-900">🚀 3. Implementación</div>
            <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
              <li>Elegir instrumentos específicos</li>
              <li>Abrir cuentas necesarias</li>
              <li>Comenzar con DCA</li>
              <li>Establecer calendario de rebalanceo</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Perfiles de Inversor */}
      <div className="p-6 mt-8 bg-white rounded-xl shadow">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">🎭 Perfiles de Inversor</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            {
              title: 'Conservador', color: 'bg-slate-50 text-slate-800',
              chars: ['Preservar capital','Ingresos estables','Bajo riesgo'],
              alloc: '80% Renta Fija, 20% Renta Variable', horizon: '1-3 años'
            },
            {
              title: 'Moderado', color: 'bg-amber-50 text-amber-800',
              chars: ['Balance riesgo-rentabilidad','Crecimiento moderado','Diversificación'],
              alloc: '50% RV, 40% RF, 10% Alternativos', horizon: '3-7 años'
            },
            {
              title: 'Agresivo', color: 'bg-rose-50 text-rose-800',
              chars: ['Máximo crecimiento','Alta tolerancia al riesgo','Largo plazo'],
              alloc: '80% RV, 10% RF, 10% Alternativos', horizon: '7+ años'
            }
          ].map((p) => (
            <div key={p.title} className="p-4 border rounded-lg">
              <div className={`px-2 py-1 text-xs font-semibold rounded inline-block ${p.color}`}>{p.title}</div>
              <div className="mt-2 text-sm text-gray-800">
                <div className="font-semibold">Características:</div>
                <ul className="mt-1 mb-2 list-disc list-inside">
                  {p.chars.map(c => (<li key={c}>{c}</li>))}
                </ul>
                <div className="font-semibold">Asignación Sugerida:</div>
                <div className="mb-2">{p.alloc}</div>
                <div className="font-semibold">Horizonte:</div>
                <div>{p.horizon}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 mt-4 text-[13px] text-amber-800 bg-amber-50 border border-amber-200 rounded">
          ⚠️ Esta información es solo para fines educativos y no constituye asesoramiento financiero personalizado.
        </div>
      </div>

      {/* Definiciones Fundamentales */}
      <div className="p-6 mt-8 bg-white rounded-xl shadow">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">📚 Definiciones Fundamentales</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[
            ['Inversión', 'Colocar dinero en un activo esperando obtener ganancias futuras.'],
            ['Rentabilidad', 'Porcentaje de ganancia o pérdida de una inversión en un período.'],
            ['Riesgo', 'Probabilidad de perder dinero o no obtener el rendimiento esperado.'],
            ['Diversificación', 'Distribuir inversiones en diferentes activos para reducir riesgo.'],
            ['Volatilidad', 'Medida de cuánto varían los precios de un activo.'],
            ['Liquidez', 'Facilidad para convertir un activo en dinero rápidamente.'],
          ].map(([title, text]) => (
            <div key={title} className="p-4 border rounded-lg">
              <div className="text-sm font-bold text-gray-900">{title}</div>
              <div className="mt-1 text-sm text-gray-700">{text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicadores Económicos */}
      <div className="p-6 mt-8 bg-white rounded-xl shadow">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">📊 Indicadores Económicos</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[
            ['Inflación', 'Aumento generalizado y sostenido de precios en la economía.'],
            ['PIB', 'Producto Interno Bruto - valor total de bienes y servicios producidos.'],
            ['Tasa de Interés', 'Precio del dinero - lo que cuesta pedir prestado o ganancia por ahorrar.'],
            ['Tipo de Cambio', 'Valor de una moneda expresado en términos de otra moneda.'],
            ['Déficit Fiscal', 'Cuando un gobierno gasta más de lo que recauda.'],
            ['Riesgo País', 'Probabilidad de que un país no pague sus deudas.'],
          ].map(([title, text]) => (
            <div key={title} className="p-4 border rounded-lg">
              <div className="text-sm font-bold text-gray-900">{title}</div>
              <div className="mt-1 text-sm text-gray-700">{text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Principios Fundamentales */}
      <div className="p-6 mt-8 bg-white rounded-xl shadow">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">⚖️ Principios Fundamentales de Inversión</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="p-4 border rounded-lg">
            <div className="text-sm font-bold text-gray-900">📈 Relación Riesgo-Rentabilidad</div>
            <div className="mt-1 text-sm text-gray-700">A mayor rentabilidad esperada, mayor riesgo. No existe rentabilidad alta sin riesgo.</div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="text-sm font-bold text-gray-900">⏰ Horizonte Temporal</div>
            <div className="mt-1 text-sm text-gray-700">Las inversiones a largo plazo permiten asumir más riesgo y obtener mejores rendimientos.</div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="text-sm font-bold text-gray-900">🔄 Interés Compuesto</div>
            <div className="mt-1 text-sm text-gray-700">Reinvertir las ganancias genera crecimiento exponencial del capital a largo plazo.</div>
          </div>
        </div>
      </div>

      {/* CTA adicional */}
      <div className="relative p-6 mt-8 overflow-hidden bg-white rounded-xl shadow">
        <img src={financeImg2} alt="CTA" className="absolute inset-0 object-cover w-full h-full opacity-10" />
        <div className="relative">
          <h3 className="text-xl font-bold text-gray-900">Sigue aprendiendo</h3>
          <p className="mt-1 text-sm text-gray-700">Pronto añadiremos guías interactivas, ejemplos reales y simuladores.</p>
          <div className="flex flex-wrap gap-2 mt-4">
            <a className="px-4 py-2 text-sm font-semibold text-white bg-orange-500 rounded-lg hover:bg-orange-600" href="#">Ver guías</a>
            <a className="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-100 rounded-lg hover:bg-gray-200" href="#">Simuladores</a>
          </div>
        </div>
      </div>
    </div>
  );
}
