import finanzasImg from '../assets/img/finance235.jpg';
import financeImg2 from '../assets/img/finance55.jpg';
import '../App.css';

const partners = [
  { name: 'Banco Nación', color: '#1a1a1a', text: 'BN', fontSize: 14 },
  { name: 'Mercado Pago', color: '#cd853f', text: 'MP', fontSize: 12 },
  { name: 'AFIP', color: '#4a5568', text: 'AFIP', fontSize: 13 },
];


export default function Inicio() {
  return (
    <div className="industrial-bg min-h-screen">
      <div className="flex flex-col items-center min-h-[80vh] px-4 py-16 section">
        
        {/* Hero visual y título */}
        <div className="flex flex-col items-center w-full max-w-7xl gap-12 mb-16 md:flex-row">
          <div className="glass-effect p-8 rounded-lg">
            <img src={finanzasImg} alt="Finanzas" className="object-cover w-full max-w-xl img-feature h-80" />
          </div>
          <div className="flex flex-col items-start justify-center flex-1">
            <div className="mb-6">
              <span className="copper-accent text-sm font-bold uppercase tracking-wider">Plataforma Empresarial</span>
            </div>
            <h1 className="mb-6 text-6xl font-bold tracking-tight leading-tight">
              FinancePR
              <span className="copper-accent block text-4xl mt-2">Gestión Financiera Industrial</span>
            </h1>
            <p className="max-w-lg mb-8 text-xl text-muted leading-relaxed">
              Optimiza la gestión financiera de tu empresa con herramientas avanzadas, reportes automáticos y seguridad de nivel corporativo.
            </p>
            <div className="flex gap-4">
              <a href="/registro" className="btn-primary">Comenzar Demo</a>
              <a href="#features" className="btn-secondary">Ver Características</a>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="w-full max-w-7xl mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-effect p-8 rounded-lg text-center steel-border">
              <div className="copper-accent text-3xl font-bold mb-2">500+</div>
              <div className="text-muted">Empresas Activas</div>
            </div>
            <div className="glass-effect p-8 rounded-lg text-center steel-border">
              <div className="copper-accent text-3xl font-bold mb-2">99.9%</div>
              <div className="text-muted">Uptime Garantizado</div>
            </div>
            <div className="glass-effect p-8 rounded-lg text-center steel-border">
              <div className="copper-accent text-3xl font-bold mb-2">24/7</div>
              <div className="text-muted">Soporte Técnico</div>
            </div>
          </div>
        </div>

        {/* Nueva sección visual con imagen y texto */}
        <div className="flex flex-col items-center w-full max-w-7xl gap-12 mb-16 md:flex-row">
          <div className="flex-1">
            <div className="mb-4">
              <span className="copper-accent text-sm font-bold uppercase tracking-wider">Características Principales</span>
            </div>
            <h2 className="mb-6 text-4xl font-bold">Transforma tu gestión financiera</h2>
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 copper-accent rounded-full"></div>
                <span className="text-lg text-muted">Automatización de reportes y balances</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 copper-accent rounded-full"></div>
                <span className="text-lg text-muted">Paneles visuales para equipos y directivos</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 copper-accent rounded-full"></div>
                <span className="text-lg text-muted">Integración con bancos y sistemas contables</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 copper-accent rounded-full"></div>
                <span className="text-lg text-muted">Alertas inteligentes y control de riesgos</span>
              </div>
            </div>
            <p className="text-muted text-lg">FinancePR evoluciona junto a tu empresa, con actualizaciones constantes y una comunidad activa de usuarios corporativos.</p>
          </div>
          <div className="glass-effect p-8 rounded-lg">
            <img src={financeImg2} alt="Gestión empresarial" className="object-cover w-full max-w-md img-feature h-72" />
          </div>
        </div>

        {/* Partners con íconos SVG */}
        <div className="w-full max-w-5xl mb-16">
          <h2 className="mb-8 text-3xl font-bold text-center">Confían en nosotros</h2>
          <div className="flex flex-row items-center justify-center gap-12">
            {partners.map((p) => (
              <div key={p.name} className="flex flex-col items-center group">
                <div className="glass-effect p-4 rounded-lg steel-border group-hover:shadow-lg transition-all duration-300">
                  <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <circle cx="30" cy="30" r="30" fill={p.color} />
                    <text x="50%" y="55%" textAnchor="middle" fill="#fff" fontSize={p.fontSize + 4} fontFamily="Inter" dy=".3em">{p.text}</text>
                  </svg>
                </div>
                <span className="mt-3 text-sm text-muted font-medium">{p.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Características principales */}
        <div className="w-full max-w-7xl mb-16">
          <h2 className="mb-12 text-4xl font-bold text-center">Soluciones Empresariales</h2>
          <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
            <div className="card group">
              <div className="mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-black to-gray-600 rounded-lg flex items-center justify-center text-white text-xl">📊</div>
              </div>
              <h3 className="mb-3 text-2xl font-semibold">Panel Corporativo</h3>
              <p className="mb-4 text-muted leading-relaxed">Balance en tiempo real, reportes automáticos y control multiusuario para equipos financieros.</p>
              <ul className="space-y-2 text-muted">
                <li className="flex items-center gap-2"><span className="copper-accent">•</span> Gráficos avanzados</li>
                <li className="flex items-center gap-2"><span className="copper-accent">•</span> Alertas inteligentes</li>
                <li className="flex items-center gap-2"><span className="copper-accent">•</span> Exportación a Excel y PDF</li>
              </ul>
            </div>
            <div className="card group">
              <div className="mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-black to-gray-600 rounded-lg flex items-center justify-center text-white text-xl">🎯</div>
              </div>
              <h3 className="mb-3 text-2xl font-semibold">Gestión de Metas</h3>
              <p className="mb-4 text-muted leading-relaxed">Define objetivos empresariales, presupuestos y seguimiento de KPIs financieros.</p>
              <ul className="space-y-2 text-muted">
                <li className="flex items-center gap-2"><span className="copper-accent">•</span> Metas trimestrales y anuales</li>
                <li className="flex items-center gap-2"><span className="copper-accent">•</span> Presupuestos colaborativos</li>
                <li className="flex items-center gap-2"><span className="copper-accent">•</span> Alertas de desvíos</li>
              </ul>
            </div>
            <div className="card group">
              <div className="mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-black to-gray-600 rounded-lg flex items-center justify-center text-white text-xl">🔒</div>
              </div>
              <h3 className="mb-3 text-2xl font-semibold">Seguridad y Cumplimiento</h3>
              <p className="mb-4 text-muted leading-relaxed">Cifrado de datos, auditoría y cumplimiento normativo para tranquilidad empresarial.</p>
              <ul className="space-y-2 text-muted">
                <li className="flex items-center gap-2"><span className="copper-accent">•</span> Certificación ISO</li>
                <li className="flex items-center gap-2"><span className="copper-accent">•</span> Acceso granular por roles</li>
                <li className="flex items-center gap-2"><span className="copper-accent">•</span> Backup automático</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="w-full max-w-4xl mb-16">
          <div className="glass-effect p-12 rounded-lg text-center steel-border">
            <h2 className="mb-4 text-3xl font-bold">¿Listo para transformar tu empresa?</h2>
            <p className="mb-8 text-lg text-muted">Únete a más de 500 empresas que ya confían en FinancePR</p>
            <div className="flex justify-center gap-4">
              <a href="/registro" className="btn-primary">Comenzar Demo Gratuita</a>
              <a href="#contact" className="btn-secondary">Contactar Ventas</a>
            </div>
          </div>
        </div>

        {/* Footer breve */}
        <footer className="mt-16 text-xs text-center text-muted">
          <div className="mb-4">
            <span className="copper-accent font-bold text-lg">FinancePR</span>
          </div>
          © {new Date().getFullYear()} FinancePR · Soluciones financieras industriales para empresas.
        </footer>
      </div>
    </div>
  );
}