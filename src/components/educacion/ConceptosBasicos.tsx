export default function ConceptosBasicos() {
  const items: Array<[string,string]> = [
    ['Inversión','Colocar dinero en un activo esperando obtener ganancias futuras.'],
    ['Rentabilidad','Porcentaje de ganancia o pérdida de una inversión en un período.'],
    ['Riesgo','Probabilidad de perder dinero o no obtener el rendimiento esperado.'],
    ['Diversificación','Distribuir inversiones en diferentes activos para reducir riesgo.'],
    ['Volatilidad','Medida de cuánto varían los precios de un activo.'],
    ['Liquidez','Facilidad para convertir un activo en dinero rápidamente.'],
  ];
  return (
    <div className="space-y-6">
      <div className="p-6 bg-white rounded-xl shadow">
        <h2 className="text-2xl font-bold text-gray-900">Conceptos Básicos</h2>
        <p className="mt-1 text-gray-700">Definiciones fundamentales para arrancar con el pie derecho.</p>
        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
          {items.map(([title, text]) => (
            <div key={title} className="p-4 border rounded-lg">
              <div className="text-sm font-bold text-gray-900">{title}</div>
              <div className="mt-1 text-sm text-gray-700">{text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
