import { HeroSection } from '../components/Layout/HeroSection';
import Inicio from '../components/Inicio';
import { Footer } from '../components/Footer';
import { Navbarr } from '../components/Layout/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Nuevo componente contenedor
import { Finance } from '../components/Finance';

export const MisRutas = () => {
    return (
        <BrowserRouter>
            {/* Contenido estático / navegación */}
            <HeroSection />
            <Navbarr />

            <Routes>
                <Route path='/' element={<Inicio />} />
                <Route path='/inicio' element={<Inicio />} />
                <Route path='/finance' element={<Finance />} /> {/* ✅ Ruta principal del portafolio */}

                {/* Ruta 404 */}
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

            {/* Footer */}
            <Footer />
        </BrowserRouter>
    );
};
