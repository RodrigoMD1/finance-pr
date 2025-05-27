import { NavLink } from "react-router-dom";

export const Navbarr = ({
  onLoginClick,
  onLogoutClick,
}: {
  onLoginClick: () => void;
  onLogoutClick: () => void;
}) => {
  const isLoggedIn = !!localStorage.getItem('token');
  const name = localStorage.getItem('userName');

  console.log({ isLoggedIn, name });


  return (
    <div className="shadow-sm navbar bg-base-300 rounded-box">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="p-2 mt-3 shadow menu menu-sm dropdown-content bg-base-100 rounded-box z-1 w-52">
            <li><NavLink to="/inicio">Inicio</NavLink></li>
            <li>
              <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </details>
            </li>
            <li><NavLink to="/finance">FinanceTable</NavLink></li>
          </ul>
        </div>
        <a className="text-xl btn btn-ghost">daisyUI</a>
      </div>
      <div className="hidden navbar-center lg:flex">
        <ul className="px-1 menu menu-horizontal">
          <li><NavLink to="/inicio">Inicio</NavLink></li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </details>
          </li>
          <li><NavLink to="/finance">FinanceTable</NavLink></li>
        </ul>
      </div>
      <div className="flex items-center gap-2 navbar-end">
        {isLoggedIn && name ? (
          <span className="px-3 py-1 text-sm rounded alert alert-info">
            Conectado como: <strong>{name}</strong>
          </span>
        ) : null}
        {isLoggedIn && (
          <NavLink to="/stadistics" className="btn btn-info">
            Estadísticas
          </NavLink>
        )}
        {isLoggedIn ? (
          <a className="btn" onClick={onLogoutClick}>Cerrar Sesión</a>
        ) : (
          <a className="btn" onClick={onLoginClick}>Iniciar Sesión</a>
        )}
      </div>
    </div>
  );
};