import finanzasImg from '../assets/img/finance235.jpg';

export default function Inicio() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-10 bg-gradient-to-b from-white via-blue-50 to-blue-100">
      <img
        src={finanzasImg}
        alt="Ilustración finanzas"
        className="object-cover w-full max-w-2xl mb-8 border-4 border-blue-300 shadow-lg h-80 rounded-2xl"
      />
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-center text-blue-700 md:text-5xl drop-shadow">
        Bienvenido a <span className="text-gray-900">FinancePR</span>
      </h1>
      <p className="max-w-2xl mb-8 text-lg text-center text-gray-700 md:text-xl">
        <strong className="text-blue-700">FinancePR</strong> es tu aliado para alcanzar la estabilidad financiera.<br />
        Lleva el control de tus ingresos y gastos, planifica tus metas y toma decisiones inteligentes para tu futuro económico.
      </p>

      {/* Características principales */}
      <div className="grid w-full max-w-4xl grid-cols-1 gap-8 mb-12 md:grid-cols-3">
        <div className="flex flex-col items-center p-6 bg-white border border-blue-100 shadow rounded-xl">
          <h2 className="mb-2 text-xl font-semibold text-blue-700">📊 Panel de control intuitivo</h2>
          <p className="mb-2 text-center text-gray-700">Visualiza tu balance en tiempo real, consulta tus movimientos recientes y accede a reportes detallados.</p>
          <ul className="w-full text-sm text-left text-gray-600 list-disc list-inside">
            <li>Gráficos de ingresos y egresos</li>
            <li>Alertas de gastos inusuales</li>
            <li>Filtros por categorías y fechas</li>
          </ul>
        </div>
        <div className="flex flex-col items-center p-6 bg-white border border-blue-100 shadow rounded-xl">
          <h2 className="mb-2 text-xl font-semibold text-blue-700">🎯 Metas y presupuestos</h2>
          <p className="mb-2 text-center text-gray-700">Define objetivos de ahorro, establece límites de gasto y recibe recomendaciones personalizadas.</p>
          <ul className="w-full text-sm text-left text-gray-600 list-disc list-inside">
            <li>Seguimiento de metas mensuales</li>
            <li>Presupuestos automáticos</li>
            <li>Notificaciones de progreso</li>
          </ul>
        </div>
        <div className="flex flex-col items-center p-6 bg-white border border-blue-100 shadow rounded-xl">
          <h2 className="mb-2 text-xl font-semibold text-blue-700">💡 Educación financiera</h2>
          <p className="mb-2 text-center text-gray-700">Accede a recursos y consejos para mejorar tu cultura financiera y tomar mejores decisiones.</p>
          <ul className="w-full text-sm text-left text-gray-600 list-disc list-inside">
            <li>Tips de ahorro y control de gastos</li>
            <li>Artículos y videos educativos</li>
            <li>Glosario de términos financieros</li>
          </ul>
        </div>
      </div>

      {/* Seguridad y comunidad */}
      <div className="grid w-full max-w-4xl grid-cols-1 gap-8 mb-10 md:grid-cols-2">
        <div className="flex flex-col items-center p-6 border border-blue-100 shadow bg-blue-50 rounded-xl">
          <h3 className="mb-2 text-lg font-semibold text-blue-700">🔒 Seguridad y privacidad</h3>
          <p className="text-center text-gray-700">
            Tus datos están protegidos con cifrado de extremo a extremo.<br />
            Solo tú tienes acceso a tu información financiera.
          </p>
        </div>
        <div className="flex flex-col items-center p-6 border border-blue-100 shadow bg-blue-50 rounded-xl">
          <h3 className="mb-2 text-lg font-semibold text-blue-700">🤝 Comunidad y soporte</h3>
          <p className="text-center text-gray-700">
            Únete a nuestra comunidad de usuarios, comparte experiencias y recibe soporte personalizado cuando lo necesites.
          </p>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex flex-col gap-4 mb-10 md:flex-row">
        <a href="/registro" className="px-8 py-3 text-lg font-semibold text-white transition-colors bg-blue-700 rounded-lg shadow-md hover:bg-blue-800">Comenzar ahora</a>
        <a href="#features" className="px-8 py-3 text-lg font-semibold text-blue-700 transition-colors border-2 border-blue-700 rounded-lg hover:bg-blue-50">Ver más</a>
      </div>

      {/* Frase motivacional */}
      <div className="max-w-2xl mt-10 text-base text-center text-gray-700">
        <p>
          <span className="font-semibold text-blue-700">¿Sabías?</span> Llevar un registro de tus finanzas puede ayudarte a ahorrar hasta un <span className="font-bold text-green-600">20% más</span> cada mes.<br />
          <span className="font-semibold text-blue-700">¡Empieza hoy y toma el control de tu futuro financiero!</span>
        </p>
      </div>

      {/* Footer breve */}
      <footer className="mt-12 text-xs text-center text-gray-400">
        © {new Date().getFullYear()} FinancePR · Hecho con <span className="text-red-400">❤️</span> para tu tranquilidad financiera.
      </footer>
    </div>
  );
}