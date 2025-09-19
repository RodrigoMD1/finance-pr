import { NavLink } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaSignInAlt, FaChartBar, FaFileAlt, FaHome, FaNewspaper, FaBook, FaCog, FaBars } from "react-icons/fa";
import { useState } from "react";

export const Navbarr = ({
  onLoginClick,
  onLogoutClick,
  isAuthenticated,
}: {
  onLoginClick: () => void;
  onLogoutClick: () => void;
  isAuthenticated: boolean;
}) => {
  const isLoggedIn = isAuthenticated;
  const name = localStorage.getItem('userName');

  return (
    <nav className="glass-effect border-b steel-border px-6 py-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo y título principal */}
        <div className="flex items-center gap-4">
          <NavLink to="/inicio" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-black to-gray-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight" style={{color: 'var(--color-primary)'}}>FinancePR</span>
              <span className="text-xs copper-accent uppercase tracking-wider">Enterprise</span>
            </div>
          </NavLink>
        </div>

        {/* Navegación principal - Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          <NavLink 
            to="/inicio" 
            className={({ isActive }) => 
              `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-black text-white shadow-lg' 
                  : 'text-gray-600 hover:text-black hover:bg-gray-100'
              }`
            }
          >
            <FaHome /> Inicio
          </NavLink>
          
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-black hover:bg-gray-100 transition-all duration-200">
              <FaBook /> Recursos
            </button>
            <div className="absolute top-full left-0 mt-2 w-56 glass-effect rounded-lg shadow-xl border steel-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="p-2">
                <NavLink to="/news" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <FaNewspaper className="copper-accent" /> Noticias
                </NavLink>
                <NavLink to="/manual" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <FaBook className="copper-accent" /> Manual de Usuario
                </NavLink>
                <NavLink to="/subscriptions" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <FaCog className="copper-accent" /> Suscripciones
                </NavLink>
                <NavLink to="/aprendizaje" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <FaBook className="copper-accent" /> Aprendizaje
                </NavLink>
              </div>
            </div>
          </div>
                      <FaBook /> Suscripciones
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/aprendizaje" className="flex items-center gap-2">
                      <FaBook /> Aprendizaje
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <NavLink to="/finance" className="flex items-center gap-2">
                <FaFileAlt /> Finanzas
              </NavLink>
            </li>
            {isLoggedIn && (
              <>
                <li>
                  <NavLink to="/stadistics" className="flex items-center gap-2">
                    <FaChartBar /> Estadísticas
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/reports" className="flex items-center gap-2">
                    <FaFileAlt /> Informes
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        <NavLink to="/inicio" className="text-2xl font-bold tracking-wide normal-case btn btn-ghost">
          <span className="text-primary">FinancePR</span>
        </NavLink>
      </div>
      <div className="hidden navbar-center lg:flex">
        <ul className="gap-2 px-1 menu menu-horizontal">
          <li>
            <NavLink to="/inicio" className="flex items-center gap-2">
              <FaHome /> Inicio
            </NavLink>
          </li>
          <li>
            <details>
              <summary className="flex items-center gap-2">
                <FaBook /> Recursos
              </summary>
              <ul className="p-2">
                <li>
                  <NavLink to="/news" className="flex items-center gap-2">
                    <FaNewspaper /> Noticias
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/manual" className="flex items-center gap-2">
                    <FaBook /> Manual de Usuario
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/subscriptions" className="flex items-center gap-2">
                    <FaBook /> Suscripciones
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/aprendizaje" className="flex items-center gap-2">
                    <FaBook /> Aprendizaje
                  </NavLink>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <NavLink to="/finance" className="flex items-center gap-2">
              <FaFileAlt /> Finanzas
            </NavLink>
          </li>
          {isLoggedIn && (
            <>
              <li>
                <NavLink to="/stadistics" className="flex items-center gap-2">
                  <FaChartBar /> Estadísticas
                </NavLink>
              </li>
              <li>
                <NavLink to="/reports" className="flex items-center gap-2">
                  <FaFileAlt /> Informes
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="flex items-center gap-3 navbar-end">
        {isLoggedIn && name && (
          <span className="flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full bg-info/20 text-info">
            <FaUserCircle className="text-lg" />
            <span>Conectado como:</span>
            <strong>{name}</strong>
          </span>
        )}
        {isLoggedIn ? (
          <button className="flex items-center gap-2 btn btn-error btn-sm" onClick={onLogoutClick}>
            <FaSignOutAlt /> Cerrar Sesión
          </button>
        ) : (
          <button className="flex items-center gap-2 btn btn-success btn-sm" onClick={onLoginClick}>
            <FaSignInAlt /> Iniciar Sesión
          </button>
        )}
      </div>
    </nav>
  );
};