import { NavLink } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaSignInAlt, FaChartBar, FaFileAlt, FaHome, FaNewspaper, FaBook, FaBars, FaTimes, FaBitcoin } from "react-icons/fa";
import { useState } from "react";

interface NavbarProps {
  isAuthenticated: boolean;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, onLoginClick, onLogoutClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userName = localStorage.getItem('userName');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigationItems = [
    { to: "/inicio", icon: FaHome, label: "Inicio" },
    { to: "/finance", icon: FaChartBar, label: "Finanzas" },
    { to: "/reports", icon: FaFileAlt, label: "Reportes" },
    { to: "/news", icon: FaNewspaper, label: "Noticias" },
    { to: "/manual", icon: FaBook, label: "Manual" },
  ];

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
              {navigationItems.map((item) => (
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
              <button
                onClick={onLoginClick}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-all duration-200 shadow-lg"
              >
                <FaSignInAlt />
                Iniciar Sesión
              </button>
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
              {navigationItems.map((item) => (
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
                  <button
                    onClick={() => {
                      onLoginClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 w-full px-3 py-2 text-base font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-all duration-200 shadow-lg"
                  >
                    <FaSignInAlt />
                    Iniciar Sesión
                  </button>
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