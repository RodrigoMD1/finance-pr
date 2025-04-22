import { HeroSection } from '../components/Layout/HeroSection';
import { Inicio } from '../components/Inicio';
import { Footer } from '../components/Footer';
import { Navbarr } from '../components/Layout/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

export const MisRutas = () => {
    const [showForm, setShowForm] = useState(false); // Estado para mostrar/ocultar el formulario
    const [view, setView] = useState<"login" | "register">("login"); // Estado para alternar entre Login y Register

    const handleLoginClick = () => {
        setShowForm(true); // Mostrar el formulario
        setView("login"); // Asegurarse de que el formulario sea el de login
    };

    const handleViewChange = (newView: "login" | "register") => {
        setView(newView); // Cambiar entre login y registro
    };

    return (
        <BrowserRouter>
            {/* Contenido-estatico/ navegacion */}
            <HeroSection />
            <Navbarr onLoginClick={handleLoginClick} /> {/* Pasamos la función como prop */}
            <div className="divider"></div>
            {/* Contenido-principal */}
            {showForm && (
                <Inicio
                    initialView={view} // Pasamos el estado actual como prop
                    onViewChange={handleViewChange} // Pasamos la función para manejar cambios
                />
            )}
            <Routes>
                <Route path='/control-panel' element={<h1>Control Panel</h1>} />
                <Route
                    path="*"
                    element={
                        <>
                            <h1>Error 404</h1>
                            <strong>Esta página no existe.</strong>
                        </>
                    }
                />
            </Routes>
            <div className="divider"></div>
            {/* Footer */}
            <Footer />
        </BrowserRouter>
    );
};