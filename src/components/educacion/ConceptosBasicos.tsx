import { FaChartLine, FaShieldAlt, FaRandom, FaWater, FaMoneyBillWave, FaBalanceScale, FaLightbulb, FaCalculator } from 'react-icons/fa';

export default function ConceptosBasicos() {
  const items = [
    {
      icon: <FaMoneyBillWave className="text-green-600" />,
      title: 'Inversión',
      desc: 'Colocar dinero en un activo esperando obtener ganancias futuras.',
      ejemplo: 'Comprar acciones de una empresa por $10,000 ARS esperando que valgan $12,000 en un año.',
      tip: 'No inviertas dinero que necesites en el corto plazo. Mantén un fondo de emergencia primero.'
    },
    {
      icon: <FaChartLine className="text-blue-600" />,
      title: 'Rentabilidad',
      desc: 'Porcentaje de ganancia o pérdida de una inversión en un período.',
      ejemplo: 'Si invertiste $100 y ahora vale $110, tu rentabilidad es del 10%.',
      tip: 'La rentabilidad pasada no garantiza resultados futuros. Siempre considera el horizonte temporal.'
    },
    {
      icon: <FaShieldAlt className="text-red-600" />,
      title: 'Riesgo',
      desc: 'Probabilidad de perder dinero o no obtener el rendimiento esperado.',
      ejemplo: 'Las acciones tienen más riesgo que los bonos, pero también mayor potencial de ganancia.',
      tip: 'Tu tolerancia al riesgo debe alinearse con tus objetivos y edad. Más joven = más riesgo aceptable.'
    },
    {
      icon: <FaRandom className="text-purple-600" />,
      title: 'Diversificación',
      desc: 'Distribuir inversiones en diferentes activos para reducir riesgo.',
      ejemplo: 'En vez de poner todo en una acción, divide en 10 acciones diferentes + bonos + crypto.',
      tip: '"No pongas todos los huevos en la misma canasta" - Warren Buffett'
    },
    {
      icon: <FaWater className="text-orange-600" />,
      title: 'Volatilidad',
      desc: 'Medida de cuánto varían los precios de un activo.',
      ejemplo: 'Bitcoin puede subir o bajar 10% en un día (alta volatilidad), bonos del gobierno apenas 0.1% (baja volatilidad).',
      tip: 'Alta volatilidad = más riesgo pero también más oportunidades de ganancia rápida.'
    },
    {
      icon: <FaMoneyBillWave className="text-teal-600" />,
      title: 'Liquidez',
      desc: 'Facilidad para convertir un activo en dinero rápidamente.',
      ejemplo: 'Acciones grandes = alta liquidez (vendes en segundos). Inmuebles = baja liquidez (meses para vender).',
      tip: 'Mantén parte de tu portafolio en activos líquidos para emergencias.'
    },
    {
      icon: <FaBalanceScale className="text-indigo-600" />,
      title: 'Asset Allocation',
      desc: 'Distribución estratégica de tu capital entre diferentes tipos de activos.',
      ejemplo: '60% acciones, 30% bonos, 10% efectivo - la mezcla depende de tu perfil de riesgo.',
      tip: 'Rebalancea tu portafolio cada 6-12 meses para mantener tus proporciones objetivo.'
    },
    {
      icon: <FaCalculator className="text-amber-600" />,
      title: 'Interés Compuesto',
      desc: 'Ganar rendimientos sobre tus rendimientos previos. La octava maravilla del mundo.',
      ejemplo: 'Invertir $10,000 al 10% anual = $25,937 en 10 años (vs $20,000 con interés simple).',
      tip: 'Cuanto antes empieces, más tiempo tiene el interés compuesto para trabajar a tu favor.'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <FaLightbulb className="text-3xl text-yellow-500" />
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Conceptos Básicos</h2>
            <p className="text-gray-700">Fundamentos esenciales para construir tu conocimiento financiero</p>
          </div>
        </div>
        
        <div className="p-4 mt-4 bg-white/80 backdrop-blur rounded-lg border-l-4 border-blue-500">
          <p className="text-sm text-gray-800">
            <strong className="text-blue-600">💡 Consejo:</strong> Estos conceptos son la base de toda inversión exitosa. 
            Tómate el tiempo para entenderlos bien antes de arriesgar tu dinero. La educación es tu mejor inversión.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {items.map((item) => (
          <div key={item.title} className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="flex items-start gap-3 mb-3">
              <div className="text-3xl mt-1">{item.icon}</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                <p className="mt-1 text-gray-700">{item.desc}</p>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="text-xs font-semibold text-blue-800 mb-1">📊 EJEMPLO</div>
              <p className="text-sm text-gray-800">{item.ejemplo}</p>
            </div>
            
            <div className="mt-3 p-3 bg-amber-50 rounded-lg border-l-2 border-amber-400">
              <div className="text-xs font-semibold text-amber-800 mb-1">💡 TIP</div>
              <p className="text-sm text-gray-800">{item.tip}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FaLightbulb className="text-emerald-600" />
          Reglas de Oro para Principiantes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-lg">
            <div className="font-semibold text-emerald-700 mb-2">✅ Sí hacer</div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Invertir solo dinero que no necesites en 5+ años</li>
              <li>• Diversificar en diferentes activos y sectores</li>
              <li>• Empezar con poco e ir aprendiendo</li>
              <li>• Tener un plan claro y objetivos definidos</li>
              <li>• Revisar tu portafolio periódicamente</li>
            </ul>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <div className="font-semibold text-rose-700 mb-2">❌ No hacer</div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Invertir dinero del alquiler o comida</li>
              <li>• Poner todo tu capital en un solo activo</li>
              <li>• Seguir consejos de desconocidos en redes</li>
              <li>• Entrar en pánico y vender en pérdida</li>
              <li>• Invertir en algo que no entiendes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
