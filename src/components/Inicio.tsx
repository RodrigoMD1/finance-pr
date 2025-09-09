import finanzasImg from '../assets/img/finance235.jpg';
import financeImg2 from '../assets/img/finance55.jpg';
import '../App.css';

const partners = [
  { name: 'Banco Nación', color: '#1a2947', text: 'BN', fontSize: 14 },
  { name: 'Mercado Pago', color: '#bfa14a', text: 'MP', fontSize: 12 },
  { name: 'AFIP', color: '#1a2947', text: 'AFIP', fontSize: 13 },
];

const testimonios = [
  {
    nombre: 'María González',
    empresa: 'Contadora, PyME Solutions',
    texto: 'FinancePR nos permitió optimizar la gestión financiera y tomar decisiones más seguras. La interfaz es clara y el soporte excelente.'
  },
  {
    nombre: 'Carlos Pérez',
    empresa: 'CEO, Inversiones RP',
    texto: 'La seguridad y los reportes automáticos nos ahorran tiempo y dinero. Recomendado para cualquier empresa que quiera profesionalizar sus finanzas.'
  }
];


export default function Inicio() {
  return (
  <div className="flex flex-col items-center min-h-[80vh] px-4 py-10 section">
      {/* Hero visual y título */}
      <div className="flex flex-col items-center w-full max-w-6xl gap-10 mb-10 md:flex-row">
        <img src={finanzasImg} alt="Finanzas" className="object-cover w-full max-w-xl img-feature h-80" />
        <div className="flex flex-col items-start justify-center">
          <h1 className="mb-4 text-5xl font-bold tracking-tight">FinancePR: Soluciones Financieras para Empresas</h1>
          <p className="max-w-lg mb-6 text-lg text-muted">
            Optimiza la gestión financiera de tu empresa con herramientas avanzadas, reportes automáticos y seguridad de nivel corporativo.<br />
            <span className="font-semibold">¿Por qué elegirnos?</span> Porque entendemos los desafíos de los negocios modernos y ofrecemos soluciones adaptadas a cada sector: PyMEs, profesionales independientes y grandes empresas.
          </p>
          <a href="/registro" className="btn-primary">Comenzar ahora</a>
        </div>
      </div>

      {/* Nueva sección visual con imagen y texto */}
      <div className="flex flex-col items-center w-full max-w-6xl gap-10 md:flex-row section">
        <div className="flex-1">
          <h2 className="mb-4 text-3xl font-semibold">Transforma tu gestión financiera</h2>
          <ul className="mb-4 ml-6 text-lg list-disc text-muted">
            <li>Automatización de reportes y balances</li>
            <li>Paneles visuales para equipos y directivos</li>
            <li>Integración con bancos y sistemas contables</li>
            <li>Alertas inteligentes y control de riesgos</li>
            <li>Soporte y capacitación personalizada</li>
          </ul>
          <p className="text-muted">FinancePR evoluciona junto a tu empresa, con actualizaciones constantes y una comunidad activa de usuarios corporativos.</p>
        </div>
        <img src={financeImg2} alt="Gestión empresarial" className="object-cover w-full max-w-md img-feature h-72" />
      </div>

      {/* Partners con íconos SVG */}
      <div className="w-full max-w-4xl mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-center">Confían en nosotros</h2>
        <div className="flex flex-row items-center justify-center gap-8">
          {partners.map((p) => (
            <div key={p.name} className="flex flex-col items-center">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="20" fill={p.color} />
                <text x="50%" y="55%" textAnchor="middle" fill="#fff" fontSize={p.fontSize} fontFamily="Arial" dy=".3em">{p.text}</text>
              </svg>
              <span className="mt-2 text-xs text-muted">{p.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Características principales */}
      <div className="grid w-full max-w-6xl grid-cols-1 gap-8 mb-12 md:grid-cols-3">
        <div className="flex flex-col items-center card">
          <h2 className="mb-2 text-2xl font-semibold">Panel Corporativo</h2>
          <p className="mb-2 text-center text-muted">Balance en tiempo real, reportes automáticos y control multiusuario para equipos financieros.</p>
          <ul className="w-full text-base text-left list-disc list-inside text-muted">
            <li>Gráficos avanzados</li>
            <li>Alertas inteligentes</li>
            <li>Exportación a Excel y PDF</li>
          </ul>
        </div>
        <div className="flex flex-col items-center card">
          <h2 className="mb-2 text-2xl font-semibold">Gestión de Metas</h2>
          <p className="mb-2 text-center text-muted">Define objetivos empresariales, presupuestos y seguimiento de KPIs financieros.</p>
          <ul className="w-full text-base text-left list-disc list-inside text-muted">
            <li>Metas trimestrales y anuales</li>
            <li>Presupuestos colaborativos</li>
            <li>Alertas de desvíos</li>
          </ul>
        </div>
        <div className="flex flex-col items-center card">
          <h2 className="mb-2 text-2xl font-semibold">Seguridad y Cumplimiento</h2>
          <p className="mb-2 text-center text-muted">Cifrado de datos, auditoría y cumplimiento normativo para tranquilidad empresarial.</p>
          <ul className="w-full text-base text-left list-disc list-inside text-muted">
            <li>Certificación ISO</li>
            <li>Acceso granular por roles</li>
            <li>Backup automático</li>
          </ul>
        </div>
      </div>

      {/* Beneficios extra con cards visuales */}
      <div className="grid w-full max-w-6xl grid-cols-1 gap-8 mb-12 md:grid-cols-2">
        <div className="card">
          <h3 className="mb-2 text-xl font-semibold">Integración con sistemas contables</h3>
          <img src={financeImg2} alt="Integración" className="object-cover w-full h-40 max-w-xs img-feature" />
          <p className="text-muted">Conecta FinancePR con tu software de gestión, ERP o sistema bancario. Automatiza la conciliación y reduce errores humanos.</p>
        </div>
        <div className="card">
          <h3 className="mb-2 text-xl font-semibold">Soporte y capacitación</h3>
          <img src={finanzasImg} alt="Soporte" className="object-cover w-full h-40 max-w-xs img-feature" />
          <p className="text-muted">Accede a nuestro equipo de expertos y a capacitaciones exclusivas para potenciar el uso de la plataforma en tu empresa.</p>
        </div>
        <div className="card">
          <h3 className="mb-2 text-xl font-semibold">Actualizaciones constantes</h3>
          <img src={financeImg2} alt="Actualizaciones" className="object-cover w-full h-40 max-w-xs img-feature" />
          <p className="text-muted">Recibe nuevas funcionalidades y mejoras de seguridad sin costo adicional. FinancePR evoluciona junto a tu negocio.</p>
        </div>
        <div className="card">
          <h3 className="mb-2 text-xl font-semibold">Comunidad empresarial</h3>
          <img src={finanzasImg} alt="Comunidad" className="object-cover w-full h-40 max-w-xs img-feature" />
          <p className="text-muted">Participa en foros, webinars y eventos exclusivos para clientes. Comparte experiencias y aprende de otros líderes.</p>
        </div>
      </div>

      {/* Sección de aprendizaje y recursos */}
      <div className="w-full max-w-6xl mb-12 section">
        <h2 className="mb-6 text-2xl font-bold text-center">Recursos y Aprendizaje</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="card">
            <h3 className="mb-2 text-lg font-semibold">¿Qué es el flujo de caja?</h3>
            <p className="text-muted">El flujo de caja es el movimiento de dinero dentro y fuera de una empresa. Permite saber si hay liquidez suficiente para operar y crecer.</p>
          </div>
          <div className="card">
            <h3 className="mb-2 text-lg font-semibold">Balance general</h3>
            <p className="text-muted">Documento que muestra los activos, pasivos y patrimonio de una empresa en un momento determinado. Es clave para analizar la salud financiera.</p>
          </div>
          <div className="card">
            <h3 className="mb-2 text-lg font-semibold">Estado de resultados</h3>
            <p className="text-muted">Informe que resume ingresos, costos y gastos en un periodo. Permite conocer si la empresa tuvo ganancias o pérdidas.</p>
          </div>
          <div className="card">
            <h3 className="mb-2 text-lg font-semibold">Inflación</h3>
            <p className="text-muted">Aumento generalizado de los precios. Impacta en el poder de compra y en la planificación financiera de empresas y personas.</p>
          </div>
          <div className="card">
            <h3 className="mb-2 text-lg font-semibold">Capital de trabajo</h3>
            <p className="text-muted">Recursos que necesita una empresa para operar día a día. Se calcula como activos corrientes menos pasivos corrientes.</p>
          </div>
          <div className="card">
            <h3 className="mb-2 text-lg font-semibold">Rentabilidad</h3>
            <p className="text-muted">Es la capacidad de una empresa para generar ganancias en relación a sus inversiones o ventas.</p>
          </div>
          <div className="card">
            <h3 className="mb-2 text-lg font-semibold">Diversificación</h3>
            <p className="text-muted">Estrategia para reducir riesgos invirtiendo en diferentes activos, sectores o mercados.</p>
          </div>
          <div className="card">
            <h3 className="mb-2 text-lg font-semibold">Presupuesto</h3>
            <p className="text-muted">Plan financiero que estima ingresos y gastos futuros. Ayuda a controlar el uso de recursos y evitar sorpresas.</p>
          </div>
          <div className="card">
            <h3 className="mb-2 text-lg font-semibold">Activo y pasivo</h3>
            <p className="text-muted">El activo es lo que posee la empresa (dinero, bienes, inversiones). El pasivo es lo que debe (deudas, obligaciones).</p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-muted">Explora más recursos y aprende sobre economía y finanzas para tomar mejores decisiones en tu empresa.</p>
        </div>
      </div>

      {/* Testimonios */}
      <div className="w-full max-w-5xl mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-center">Testimonios</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {testimonios.map((t, idx) => (
            <div key={idx} className="flex flex-col card">
              <p className="mb-4 italic text-muted">"{t.texto}"</p>
              <span className="font-semibold">{t.nombre}</span>
              <span className="text-xs text-muted">{t.empresa}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Botones de acción secundarios */}
      <div className="flex flex-col gap-4 mb-10 md:flex-row">
        <a href="/registro" className="btn-primary">Comenzar ahora</a>
        <a href="#features" className="btn-secondary">Ver más</a>
      </div>

      {/* Frase motivacional */}
      <div className="max-w-2xl mt-10 text-base text-center text-muted">
        <p>
          <span className="font-semibold">¿Sabías?</span> Las empresas que gestionan sus finanzas digitalmente mejoran su rentabilidad hasta un <span className="font-bold" style={{color: 'var(--color-secondary)'}}>30%</span> anual.<br />
          <span className="font-semibold">¡Da el salto profesional con FinancePR!</span>
        </p>
      </div>

      {/* Footer breve */}
      <footer className="mt-12 text-xs text-center text-muted">
        © {new Date().getFullYear()} FinancePR · Soluciones financieras para negocios.
      </footer>
    </div>
  );
}