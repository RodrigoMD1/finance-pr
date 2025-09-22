import { NavLink, Outlet } from 'react-router-dom';
import { FaUniversity, FaChartLine, FaBullseye, FaBrain, FaSearch, FaGlobeAmericas, FaBookOpen, FaToolbox } from 'react-icons/fa';
import financeImg from '../../assets/img/finance235.jpg';

const items = [
  { to: 'conceptos', label: 'Conceptos Básicos', icon: FaUniversity },
  { to: 'tipos', label: 'Tipos de Inversión', icon: FaChartLine },
  { to: 'estrategias', label: 'Estrategias', icon: FaBullseye },
  { to: 'psicologia', label: 'Psicología', icon: FaBrain },
  { to: 'analisis', label: 'Análisis', icon: FaSearch },
  { to: 'mercados', label: 'Mercados', icon: FaGlobeAmericas },
  { to: 'planificacion', label: 'Planificación', icon: FaBookOpen },
  { to: 'herramientas', label: 'Herramientas', icon: FaToolbox },
];

export default function EducacionLayout() {
  return (
    <div className="max-w-7xl p-6 mx-auto">
      {/* Hero + Badges navegables */}
      <div className="relative p-8 overflow-hidden bg-white rounded-xl shadow">
        <img src={financeImg} alt="Educación" className="absolute inset-0 object-cover w-full h-full opacity-10" />
        <div className="relative">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">📚 Educación Financiera</h1>
          <p className="mt-2 text-gray-700">Explora cada tema a tu ritmo. Selecciona una sección para ver su contenido específico.</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {items.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => `inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full border ${isActive ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'}`}
              >
                <Icon /> {label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* Layout con sidebar en desktop y tabs en mobile */}
      <div className="grid grid-cols-1 gap-6 mt-8 lg:grid-cols-12">
        <aside className="hidden lg:block lg:col-span-3">
          <nav className="p-3 bg-white rounded-xl shadow divide-y divide-gray-100">
            <div className="py-2">
              {items.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium mt-1 ${isActive ? 'bg-orange-50 text-orange-700' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  <Icon className="text-base" /> {label}
                </NavLink>
              ))}
            </div>
          </nav>
        </aside>
        <main className="lg:col-span-9">
          {/* Tabs móviles */}
          <div className="lg:hidden p-2 bg-white rounded-xl shadow overflow-x-auto">
            <div className="flex items-center gap-2">
              {items.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) => `whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold ${isActive ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Contenido */}
          <div className="mt-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
