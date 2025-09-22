export default function Mercados() {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-white rounded-xl shadow">
        <h2 className="text-2xl font-bold text-gray-900">🌐 Mercados</h2>
        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
          {[
            ['Inflación','Aumento generalizado de precios'],
            ['PIB','Valor total de bienes y servicios'],
            ['Tasa de Interés','Precio del dinero'],
            ['Tipo de Cambio','Valor de una moneda vs otra'],
            ['Déficit Fiscal','Gasto > Ingresos del Estado'],
            ['Riesgo País','Probabilidad de impago soberano'],
          ].map(([k,v]) => (
            <div key={k} className="p-4 border rounded-lg">
              <div className="text-sm font-bold text-gray-900">{k}</div>
              <div className="mt-1 text-sm text-gray-700">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
