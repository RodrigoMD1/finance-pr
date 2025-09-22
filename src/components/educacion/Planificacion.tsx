export default function Planificacion() {
  const antes = [
    'Fondo de emergencia (6 meses)',
    'Pagar deudas de alto interés',
    'Entender en qué vas a invertir',
    'Definir objetivos y horizonte',
    'Conocer tolerancia al riesgo',
    'Plan de inversión escrito',
    'Revisar comisiones y costos',
  ];
  const durante = [
    'Revisión mensual del portfolio',
    'Rebalanceo cada 6-12 meses',
    'Evitar decisiones emocionales',
    'Registro de operaciones',
    'Aprendizaje continuo',
    'No más del 5% en una sola acción',
    'Estrategia de salida definida',
  ];
  return (
    <div className="space-y-6">
      <div className="p-6 bg-white rounded-xl shadow">
        <h2 className="text-2xl font-bold text-gray-900">🧭 Planificación</h2>
        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
          <div className="p-4 border rounded-lg">
            <div className="text-sm font-bold text-gray-900">Checklist Antes de Invertir</div>
            <ul className="mt-2 space-y-1 text-sm text-gray-800 list-disc list-inside">
              {antes.map(i => (<li key={i}>{i}</li>))}
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="text-sm font-bold text-gray-900">Checklist Durante la Inversión</div>
            <ul className="mt-2 space-y-1 text-sm text-gray-800 list-disc list-inside">
              {durante.map(i => (<li key={i}>{i}</li>))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
