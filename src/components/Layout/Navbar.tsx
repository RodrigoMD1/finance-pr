import { NavLink, useLocation } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaSignInAlt, FaChartBar, FaFileAlt, FaHome, FaNewspaper, FaBook, FaBars, FaTimes, FaBitcoin, FaCrown, FaUniversity, FaChevronDown, FaFolderOpen } from "react-icons/fa";
import { useState } from "react";

interface NavbarProps {
  isAuthenticated: boolean;
  onLogoutClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, onLogoutClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResourcesMobileOpen, setIsResourcesMobileOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const userName = localStorage.getItem('userName');
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const topLevelNav = [
    { to: "/inicio", icon: FaHome, label: "Inicio" },
    { to: "/finance", icon: FaChartBar, label: "Finanzas" },
    { to: "/stadistics", icon: FaChartBar, label: "Estadísticas" },
    { to: "/reports", icon: FaFileAlt, label: "Informes" },
  ];

  const resourceLinks = [
    { to: "/manual", icon: FaBook, label: "Manual" },
    { to: "/news", icon: FaNewspaper, label: "Noticias" },
    { to: "/educacion", icon: FaUniversity, label: "Educación" },
    { to: "/subscriptions", icon: FaCrown, label: "Planes" },
  ];

  const isResourcesActive = ["/manual", "/news", "/educacion", "/subscriptions"].some(p => location.pathname.startsWith(p));

  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm sticky top-0 z-[9999] border-b border-orange-500/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink to="/inicio" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-2 rounded-lg shadow-lg">
                <FaBitcoin className="text-white text-xl" />
              </div>
              <span className="text-xl font-bold text-white">
                FinancePro
              </span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-2">
              {topLevelNav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-orange-500 text-white shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                    }`
                  }
                >
                  <item.icon className="text-lg" />
                  {item.label}
                </NavLink>
              ))}

              {/* Dropdown Recursos (desktop) */}
              <div
                className="relative"
                onMouseEnter={() => setIsResourcesOpen(true)}
                onMouseLeave={() => setIsResourcesOpen(false)}
              >
                <button
                  onClick={() => setIsResourcesOpen((v) => !v)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isResourcesActive ? 'bg-orange-500 text-white shadow-lg' : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                  aria-haspopup="menu"
                  aria-expanded={isResourcesOpen}
                >
                  <FaFolderOpen className="text-lg" />
                  Recursos
                  <FaChevronDown className={`text-xs opacity-80 transition-transform ${isResourcesOpen ? 'rotate-180' : ''}`} />
                </button>
                <div
                  className={`absolute right-0 top-full w-56 bg-gray-900/98 backdrop-blur-xl rounded-lg border border-orange-500/20 shadow-2xl p-2 ${
                    isResourcesOpen ? 'block' : 'hidden'
                  }`}
                  role="menu"
                >
                  {resourceLinks.map((r) => (
                    <NavLink
                      key={r.to}
                      to={r.to}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                          isActive
                            ? 'bg-orange-500 text-white shadow-lg'
                            : 'text-gray-300 hover:text-white hover:bg-gray-700'
                        }`
                      }
                    >
                      <r.icon className="text-base" />
                      {r.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center gap-2 text-gray-300">
                  <FaUserCircle className="text-lg text-orange-500" />
                  <span className="text-sm font-medium">{userName || 'Usuario'}</span>
                </div>
                <button
                  onClick={onLogoutClick}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white bg-gray-700 hover:bg-red-600 rounded-lg transition-all duration-200"
                >
                  <FaSignOutAlt />
                  Salir
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-all duration-200 shadow-lg"
              >
                <FaSignInAlt />
                Iniciar Sesión
              </NavLink>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
            >
              {isMobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            {/* Menu */}
            <div className="md:hidden absolute top-full left-0 right-0 z-[10000]">
              <div className="mx-2 px-2 pt-2 pb-3 space-y-1 bg-gray-900/98 backdrop-blur-xl rounded-lg mt-2 border border-orange-500/20 shadow-2xl">
              {topLevelNav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-orange-500 text-white shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                    }`
                  }
                >
                  <item.icon className="text-lg" />
                  {item.label}
                </NavLink>
              ))}

              {/* Sección Recursos (colapsable) */}
              <button
                onClick={() => setIsResourcesMobileOpen((v) => !v)}
                className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                  isResourcesActive ? 'bg-orange-500 text-white shadow-lg' : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <span className="inline-flex items-center gap-3">
                  <FaFolderOpen className="text-lg" />
                  Recursos
                </span>
                <FaChevronDown className={`text-sm transition-transform ${isResourcesMobileOpen ? 'rotate-180' : ''}`} />
              </button>
              {isResourcesMobileOpen && (
                <div className="pl-2 space-y-1">
                  {resourceLinks.map((r) => (
                    <NavLink
                      key={r.to}
                      to={r.to}
                      onClick={() => { setIsMobileMenuOpen(false); setIsResourcesMobileOpen(false); }}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg text-base transition-all duration-200 ${
                          isActive
                            ? 'bg-orange-500 text-white shadow-lg'
                            : 'text-gray-300 hover:text-white hover:bg-gray-700'
                        }`
                      }
                    >
                      <r.icon className="text-base" />
                      {r.label}
                    </NavLink>
                  ))}
                </div>
              )}
              
              <div className="border-t border-orange-500/20 pt-3 mt-3">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 px-3 py-2 text-gray-300">
                      <FaUserCircle className="text-lg text-orange-500" />
                      <span className="text-base font-medium">{userName || 'Usuario'}</span>
                    </div>
                    <button
                      onClick={() => {
                        onLogoutClick();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-200"
                    >
                      <FaSignOutAlt />
                      Salir
                    </button>
                  </div>
                ) : (
                  <NavLink
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 w-full px-3 py-2 text-base font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-all duration-200 shadow-lg"
                  >
                    <FaSignInAlt />
                    Iniciar Sesión
                  </NavLink>
                )}
              </div>
            </div>
          </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;