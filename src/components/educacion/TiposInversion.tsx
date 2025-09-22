export default function TiposInversion() {
  const rentaFija = [
    ['Bonos del Gobierno','Bajo','3-6%'],
    ['Bonos Corporativos','Medio','4-8%'],
    ['Plazo Fijo','Muy Bajo','2-5%'],
    ['Fondos de Inversión RF','Bajo','3-7%'],
  ];
  const rentaVariable = [
    ['Acciones Individuales','Alto','Variable'],
    ['ETFs','Medio-Alto','8-12%'],
    ['Fondos Mutuos','Medio','6-10%'],
    ['REITs','Medio','7-9%'],
  ];
  return (
    <div className="space-y-6">
      <div className="p-6 bg-white rounded-xl shadow">
        <h2 className="text-2xl font-bold text-gray-900">Tipos de Inversión</h2>
        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="text-lg font-semibold text-gray-900">Renta Fija</div>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700">Predecible</span>
            </div>
            <p className="mb-3 text-sm text-gray-700">Rendimientos más estables y conocidos.</p>
            <div className="space-y-2">
              {rentaFija.map(([name,risk,ret]) => (
                <div key={name} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm font-medium text-gray-800">{name}</span>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 text-[11px] rounded-full ${risk==='Muy Bajo'?'bg-slate-100 text-slate-700':risk==='Bajo'?'bg-blue-50 text-blue-700':'bg-amber-50 text-amber-700'}`}>Riesgo: {risk}</span>
                    <span className="px-2 py-0.5 text-[11px] rounded-full bg-gray-100 text-gray-700">~{ret}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="text-lg font-semibold text-gray-900">Renta Variable</div>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-orange-50 text-orange-700">Crecimiento</span>
            </div>
            <p className="mb-3 text-sm text-gray-700">Mayor potencial de crecimiento con más volatilidad.</p>
            <div className="space-y-2">
              {rentaVariable.map(([name,risk,ret]) => (
                <div key={name} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm font-medium text-gray-800">{name}</span>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 text-[11px] rounded-full ${/Alto/.test(String(risk))?'bg-rose-50 text-rose-700':'bg-amber-50 text-amber-700'}`}>Riesgo: {risk}</span>
                    <span className="px-2 py-0.5 text-[11px] rounded-full bg-gray-100 text-gray-700">~{ret}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="p-4 mt-4 border rounded-lg">
          <div className="text-lg font-semibold text-gray-900">₿ Criptomonedas</div>
          <p className="mt-1 text-sm text-gray-700">Alto potencial con riesgos significativos; investigación es clave.</p>
        </div>
      </div>
    </div>
  );
}
