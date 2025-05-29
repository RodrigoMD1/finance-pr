import { HeroSection } from '../components/Layout/HeroSection';
import Inicio from '../components/Inicio';
import { Footer } from '../components/Footer';
import { Navbarr } from '../components/Layout/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { Login } from '../components/Login';
import { Register } from '../components/Register';
import { Finance } from '../components/Finance';
import { Stadistics } from '../components/Stadistics';
import { UserSettings } from '../components/UserSettings';
import { VerifyEmail } from '../components/VerifyEmail'; // <-- importa el componente de verificación

export const MisRutas = () => {
    const [showAuth, setShowAuth] = useState(false);
    const [authView, setAuthView] = useState<'login' | 'register'>('login');

    // Función para cerrar sesión
    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <BrowserRouter>
            <HeroSection />
            <Navbarr
                onLoginClick={() => { setShowAuth(true); setAuthView('login'); }}
                onLogoutClick={handleLogout}
            />

            {/* Modal de autenticación */}
            {showAuth && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-gray-500 p-8 rounded shadow-lg min-w-[320px]">
                        {authView === 'login' ? (
                            <>
                                <Login onLoginSuccess={() => setShowAuth(false)} />
                                <button className="btn btn-link" onClick={() => setAuthView('register')}>
                                    ¿No tienes cuenta? Registrate
                                </button>
                            </>
                        ) : (
                            <>
                                <Register onRegisterSuccess={() => setShowAuth(false)} />
                                <button className="btn btn-link" onClick={() => setAuthView('login')}>
                                    ¿Ya tienes cuenta? Iniciar sesión
                                </button>
                            </>
                        )}
                        <button className="mt-2 btn btn-sm btn-error" onClick={() => setShowAuth(false)}>
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

            <Routes>
                <Route path='/' element={<Inicio />} />
                <Route path='/inicio' element={<Inicio />} />
                <Route path='/finance' element={<Finance />} />
                <Route path='/stadistics' element={<Stadistics />} />
                <Route path='/settings' element={<UserSettings />} />
                <Route path='/verify-email' element={<VerifyEmail />} /> 

                <Route
                    path="*"
                    element={
                        <div className="p-8 text-center">
                            <h1 className="text-4xl font-bold text-red-600">Error 404</h1>
                            <p className="mt-2 text-lg">Esta página no existe.</p>
                        </div>
                    }
                />
            </Routes>

            <div className="divider"></div>
            <Footer />
        </BrowserRouter>
    );
};