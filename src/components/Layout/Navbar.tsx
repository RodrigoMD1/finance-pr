import { NavLink } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaSignInAlt, FaChartBar, FaFileAlt, FaHome, FaNewspaper, FaBook } from "react-icons/fa";

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
    <nav className="px-4 py-2 shadow-md navbar bg-base-200 rounded-box">
      <div className="navbar-start">
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost lg:hidden" aria-label="Menú">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="z-10 w-56 p-2 mt-3 shadow menu menu-sm dropdown-content bg-base-100 rounded-box"
          >
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