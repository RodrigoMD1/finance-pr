export default function Psicologia() {
  const sesgos = [
    { t: 'FOMO (Fear of Missing Out)', d: 'Miedo a perderse oportunidades; suele llevar a comprar en máximos.', s: 'Establecer reglas de entrada claras y respetarlas.' },
    { t: 'Pérdida Aversión', d: 'El dolor de perder pesa más que el placer de ganar.', s: 'Definir stop-loss y objetivos de ganancia desde el inicio.' },
    { t: 'Confirmación', d: 'Buscar solo información que confirme tus creencias.', s: 'Buscar activamente opiniones contrarias y análisis críticos.' },
    { t: 'Exceso de Confianza', d: 'Sobrestimar tu capacidad para batir al mercado.', s: 'Mantener humildad y diversificar.' },
    { t: 'Anclaje', d: 'Dar demasiado peso al primer dato (p. ej., tu precio de compra).', s: 'Evaluar múltiples fuentes y actualizar el análisis.' },
    { t: 'Efecto Manada', d: 'Seguir a la mayoría sin análisis propio.', s: 'Desarrollar criterio propio y estrategia.' },
  ];

  const reglasOro = [
    'Nunca inviertas dinero que no puedas permitirte perder',
    'La diversificación es la única comida gratis en finanzas',
    'El tiempo en el mercado vence al timing del mercado',
    'Mantén un fondo de emergencia de 6 meses',
    'Edúcate antes de invertir',
    'Las emociones son el mayor enemigo',
    'Si suena demasiado bueno para ser cierto, probablemente lo sea',
    'Invierte regularmente, no adivines el momento perfecto',
  ];

  const erroresComunes = [
    'No diversificar (todos los huevos en una canasta)',
    'Comprar alto y vender bajo',
    'No tener plan de inversión',
    'Perseguir rendimientos pasados',
    'Trading excesivo (comisiones erosionan ganancias)',
    'Ignorar la inflación',
    'Invertir sin entender',
  ];

  const planAccion = [
    { ctx: 'Mercado en Alza (Euforia/FOMO)', act: ['Mantener plan original','Rebalancear','Tomar ganancias parciales'] },
    { ctx: 'Mercado en Baja (Pánico/Miedo)', act: ['DCA','Revisar fundamentales','Horizonte de largo plazo'] },
    { ctx: 'Grandes Ganancias (Overconfidence)', act: ['Tomar ganancias parciales','No cambiar estrategia por euforia'] },
    { ctx: 'Grandes Pérdidas (Desesperación)', act: ['Revisar fundamentales','Evitar vender por pánico'] },
  ];

  const tecnicasControl = [
    'Pausa de 24 horas para decisiones importantes',
    'Escribir emociones y razones de compra/venta',
    'Consultar tu plan: ¿está alineado?',
    'Hablar con alguien para otra perspectiva',
    'Meditar o caminar para despejar la mente',
  ];

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white rounded-xl shadow">
        <h2 className="text-2xl font-bold text-gray-900">🧠 Psicología del Inversor</h2>
        <p className="mt-1 text-gray-700">Entiende tus sesgos y crea sistemas para decidir mejor.</p>

        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-900">Sesgos Cognitivos</h3>
          <div className="grid grid-cols-1 gap-4 mt-2 md:grid-cols-2">
            {sesgos.map((s) => (
              <div key={s.t} className="p-4 border rounded-lg">
                <div className="text-sm font-bold text-gray-900">⚠️ {s.t}</div>
                <div className="mt-1 text-sm text-gray-700">{s.d}</div>
                <div className="mt-2 text-sm text-emerald-700"><span className="font-semibold">💡 Solución:</span> {s.s}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900">Ciclo Emocional del Mercado</h3>
          <div className="grid grid-cols-1 gap-3 mt-2 md:grid-cols-3">
            {['Optimismo','Excitación','Euforia','Complacencia','Negación','Miedo','Desesperación','Capitulación'].map(f => (
              <div key={f} className="p-3 bg-gray-50 border rounded text-sm">{f}</div>
            ))}
          </div>
          <div className="mt-3 p-3 bg-amber-50 text-amber-800 border border-amber-200 rounded text-sm">Regla de Oro: Haz lo opuesto a tus emociones. Euforia → vender/recortar; Miedo extremo → comprar planificado.</div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-gray-900">👑 Reglas de Oro</h4>
            <ul className="mt-2 space-y-1 text-sm text-gray-800 list-disc list-inside">
              {reglasOro.map(r => (<li key={r}>{r}</li>))}
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-gray-900">🚫 Errores Comunes</h4>
            <ul className="mt-2 space-y-1 text-sm text-gray-800 list-disc list-inside">
              {erroresComunes.map(e => (<li key={e}>{e}</li>))}
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 border rounded-lg">
          <h4 className="font-semibold text-gray-900">🎯 Plan de Acción Emocional</h4>
          <div className="grid grid-cols-1 gap-3 mt-2 md:grid-cols-2">
            {planAccion.map(p => (
              <div key={p.ctx} className="p-3 bg-gray-50 rounded">
                <div className="text-sm font-semibold text-gray-900">{p.ctx}</div>
                <ul className="mt-1 text-sm text-gray-800 list-disc list-inside">
                  {p.act.map(a => (<li key={a}>{a}</li>))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-3 text-sm text-gray-700">Técnicas: {tecnicasControl.join(' • ')}</div>
        </div>
      </div>
    </div>
  );
}
