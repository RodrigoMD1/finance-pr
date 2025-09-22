import { FaCalendarAlt, FaHandshake, FaGlobeAmericas, FaBalanceScale, FaCheck, FaTimes } from 'react-icons/fa';

export default function Estrategias() {
  const data = [
    {
      icon: <FaCalendarAlt className="text-orange-500" />, title: 'Dollar Cost Averaging (DCA)',
      desc: 'Invertir una cantidad fija periódicamente, independiente del precio.',
      pros: ['Reduce impacto de volatilidad','Disciplina de inversión','Fácil de implementar'],
      cons: ['Puede perder oportunidades','Requiere constancia'],
      ideal: 'Principiantes y perfiles conservadores'
    },
    {
      icon: <FaHandshake className="text-emerald-500" />, title: 'Buy and Hold',
      desc: 'Comprar activos de calidad y mantener a largo plazo.',
      pros: ['Aprovecha interés compuesto','Bajos costos','Menos estrés'],
      cons: ['Requiere paciencia','Puede ignorar cambios fundamentales'],
      ideal: 'Largo plazo con tolerancia al riesgo'
    },
    {
      icon: <FaGlobeAmericas className="text-blue-500" />, title: 'Diversificación por Sectores',
      desc: 'Distribuir inversiones en industrias y geografías.',
      pros: ['Reduce riesgo específico','Aprovecha ciclos distintos','Protección ante crisis sectoriales'],
      cons: ['Diluye grandes ganancias','Más investigación'],
      ideal: 'Todos los inversores'
    },
    {
      icon: <FaBalanceScale className="text-purple-500" />, title: 'Rebalanceo Periódico',
      desc: 'Ajustar proporciones para mantener asignación objetivo.',
      pros: ['Mantiene perfil de riesgo','Vender caro / comprar barato','Disciplina'],
      cons: ['Costos de transacción','Puede ir contra tendencia'],
      ideal: 'Portfolios diversificados'
    }
  ];
  return (
    <div className="space-y-6">
      <div className="p-6 bg-white rounded-xl shadow">
        <h2 className="text-2xl font-bold text-gray-900">Estrategias</h2>
        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
          {data.map((s) => (
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
    </div>
  );
}
