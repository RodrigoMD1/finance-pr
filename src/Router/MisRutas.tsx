

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
import { VerifyEmail } from '../components/VerifyEmail';
import { Reports } from '../components/Reports';
import Aprendizaje from '../components/Aprendizaje';
import { News } from '../components/News';
import { UserManual } from '../components/UserManual';
import { Subscriptions } from '../components/Subscriptions';
import { PaymentSuccess, PaymentFailure } from '../components/PaymentStatus';
import { useAuthCheck } from '../hooks/useAuthCheck';
import { logout } from '../utils/auth';

export const MisRutas = () => {
    const [showAuth, setShowAuth] = useState(false);
    const [authView, setAuthView] = useState<'login' | 'register'>('login');
    const { isAuthenticated, isLoading } = useAuthCheck();

    // Función para cerrar sesión
    const handleLogout = () => {
        logout();
    };

    // Mostrar pantalla de carga mientras verifica la autenticación
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="w-8 h-8 mx-auto mb-4 border-4 border-blue-700 rounded-full border-t-transparent animate-spin"></div>
                    <p className="text-gray-600">Verificando sesión...</p>
                </div>
            </div>
        );
    }

    return (
        <BrowserRouter>
           
            <Navbarr
                onLoginClick={() => { setShowAuth(true); setAuthView('login'); }}
                onLogoutClick={handleLogout}
                isAuthenticated={isAuthenticated}
            />

            {/* Modal de autenticación */}
            {showAuth && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white p-8 rounded-xl shadow-2xl min-w-[340px] max-w-xs w-full relative">
                        <button
                            className="absolute text-xl font-bold text-gray-400 top-2 right-2 hover:text-red-500"
                            onClick={() => setShowAuth(false)}
                            aria-label="Cerrar"
                        >
                            ×
                        </button>
                        {authView === 'login' ? (
                            <>
                                <Login onLoginSuccess={() => setShowAuth(false)} />
                                <div className="mt-4 text-center">
                                    <span className="text-gray-600">¿No tienes cuenta?</span>
                                    <button
                                        className="px-4 py-2 ml-2 font-semibold text-white transition-colors bg-blue-700 rounded-lg shadow hover:bg-blue-800"
                                        onClick={() => setAuthView('register')}
                                    >
                                        Regístrate
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Register />
                                <div className="mt-4 text-center">
                                    <span className="text-gray-600">¿Ya tienes cuenta?</span>
                                    <button
                                        className="px-4 py-2 ml-2 font-semibold text-white transition-colors bg-blue-700 rounded-lg shadow hover:bg-blue-800"
                                        onClick={() => setAuthView('login')}
                                    >
                                        Iniciar sesión
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            <Routes>
                <Route path='/' element={<Inicio />} />
                <Route path='/inicio' element={<Inicio />} />
                <Route path='/finance' element={isAuthenticated ? <Finance /> : <Inicio />} />
                <Route path='/stadistics' element={isAuthenticated ? <Stadistics /> : <Inicio />} />
                <Route path='/settings' element={isAuthenticated ? <UserSettings /> : <Inicio />} />
                <Route path='/verify-email' element={<VerifyEmail />} />
                <Route path='/reports' element={isAuthenticated ? <Reports /> : <Inicio />} />

                <Route path="/news" element={<News />} />
                <Route path="/manual" element={<UserManual />} />
                <Route path="/subscriptions" element={<Subscriptions />} />
                <Route path="/aprendizaje" element={<Aprendizaje />} />
                <Route path="/payment/success" element={<PaymentSuccess />} />
                <Route path="/payment/failure" element={<PaymentFailure />} />

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