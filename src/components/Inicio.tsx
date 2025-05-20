

export default function Inicio() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <h1 className="mb-4 text-4xl font-bold text-primary">Bienvenido a FinancePR</h1>
      <p className="max-w-2xl mb-6 text-lg text-center">
        <strong>FinancePR</strong> es tu aliado para alcanzar la estabilidad financiera. 
        Lleva el control de tus ingresos y gastos, planifica tus metas y toma decisiones inteligentes para tu futuro económico.
      </p>
      <div className="grid w-full max-w-4xl grid-cols-1 gap-8 mb-8 md:grid-cols-2">
        <div className="p-6 shadow bg-base-200 rounded-xl">
          <h2 className="mb-2 text-xl font-semibold text-primary">📊 Panel de control intuitivo</h2>
          <p className="mb-2">Visualiza tu balance en tiempo real, consulta tus movimientos recientes y accede a reportes detallados.</p>
          <ul className="text-sm text-gray-600 list-disc list-inside">
            <li>Gráficos de ingresos y egresos</li>
            <li>Alertas de gastos inusuales</li>
            <li>Filtros por categorías y fechas</li>
          </ul>
        </div>
        <div className="p-6 shadow bg-base-200 rounded-xl">
          <h2 className="mb-2 text-xl font-semibold text-primary">🎯 Metas y presupuestos</h2>
          <p className="mb-2">Define objetivos de ahorro, establece límites de gasto y recibe recomendaciones personalizadas.</p>
          <ul className="text-sm text-gray-600 list-disc list-inside">
            <li>Seguimiento de metas mensuales</li>
            <li>Presupuestos automáticos</li>
            <li>Notificaciones de progreso</li>
          </ul>
        </div>
      </div>
      <div className="max-w-2xl mb-8 text-center">
        <h3 className="mb-2 text-lg font-semibold text-primary">🔒 Seguridad y privacidad</h3>
        <p className="text-gray-700">
          Tus datos están protegidos con cifrado de extremo a extremo. Solo tú tienes acceso a tu información financiera.
        </p>
      </div>
      <div className="flex gap-4">
        <span className="btn btn-primary">Comenzar ahora</span>
        <span className="btn btn-outline">Ver más</span>
      </div>
      <div className="max-w-2xl mt-10 text-sm text-center text-gray-500">
        <p>
          ¿Sabías que llevar un registro de tus finanzas puede ayudarte a ahorrar hasta un 20% más cada mes?
          <br />
          <span className="font-semibold text-primary">¡Empieza hoy y toma el control de tu futuro financiero!</span>
        </p>
      </div>
    </div>
  );
}