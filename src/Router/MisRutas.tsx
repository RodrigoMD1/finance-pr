

import Inicio from '../components/Inicio';
import { Footer } from '../components/Footer';
import Navbar from '../components/Layout/Navbar';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Login } from '../components/Login';
import { Register } from '../components/Register';
import { Finance } from '../components/Finance';
import { Stadistics } from '../components/Stadistics';
import { UserSettings } from '../components/UserSettings';
import { VerifyEmail } from '../components/VerifyEmail';
import { Reports } from '../components/Reports';
import Aprendizaje from '../components/Aprendizaje';
import { News } from '../components/News';
import EducacionLayout from '../components/educacion/EducacionLayout';
import ConceptosBasicos from '../components/educacion/ConceptosBasicos';
import TiposInversion from '../components/educacion/TiposInversion';
import Estrategias from '../components/educacion/Estrategias';
import Psicologia from '../components/educacion/Psicologia';
import Analisis from '../components/educacion/Analisis';
import Mercados from '../components/educacion/Mercados';
import Planificacion from '../components/educacion/Planificacion';
import Herramientas from '../components/educacion/Herramientas';
import { UserManual } from '../components/UserManual';
import { Subscriptions } from '../components/Subscriptions';
import { PaymentSuccess, PaymentFailure } from '../components/PaymentStatus';
import { useAuthCheck } from '../hooks/useAuthCheck';
import { logout } from '../utils/auth';
import { UserRoleFixer } from '../components/UserRoleFixer';

export const MisRutas = () => {
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
           
            <Navbar
                onLogoutClick={handleLogout}
                isAuthenticated={isAuthenticated}
            />

            <Routes>
                <Route path='/' element={<Inicio />} />
                <Route path='/inicio' element={<Inicio />} />
                <Route path='/finance' element={<Finance />} />
                <Route path='/stadistics' element={<Stadistics />} />
                <Route path='/settings' element={isAuthenticated ? <UserSettings /> : <Inicio />} />
                <Route path='/verify-email' element={<VerifyEmail />} />
                <Route path='/reports' element={<Reports />} />
                <Route path="/login" element={<Login onLoginSuccess={() => { /* navigation handled in component */ }} />} />
                <Route path="/register" element={<Register />} />

                <Route path="/news" element={<News />} />
                <Route path="/manual" element={<UserManual />} />
                <Route path="/subscriptions" element={<Subscriptions />} />
                <Route path="/aprendizaje" element={<Aprendizaje />} />
                <Route path="/educacion" element={<EducacionLayout />}>
                    <Route index element={<Navigate to="conceptos" replace />} />
                    <Route path="conceptos" element={<ConceptosBasicos />} />
                    <Route path="tipos" element={<TiposInversion />} />
                    <Route path="estrategias" element={<Estrategias />} />
                    <Route path="psicologia" element={<Psicologia />} />
                    <Route path="analisis" element={<Analisis />} />
                    <Route path="mercados" element={<Mercados />} />
                    <Route path="planificacion" element={<Planificacion />} />
                    <Route path="herramientas" element={<Herramientas />} />
                </Route>
                <Route path="/payment/success" element={<PaymentSuccess />} />
                <Route path="/payment/failure" element={<PaymentFailure />} />
                <Route path="/fix-roles" element={isAuthenticated ? <UserRoleFixer /> : <Inicio />} />

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