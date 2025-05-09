import { HeroSection } from '../components/Layout/HeroSection';
import Inicio from '../components/Inicio';
import { Footer } from '../components/Footer';
import { Navbarr } from '../components/Layout/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ControlPanel } from '../components/ControlPanel';
import { FinanceTable } from '../components/Layout/FinanceTable';


export const MisRutas = () => {


    return (
        <BrowserRouter>
            {/* Contenido-estatico/ navegacion */}
            <HeroSection />
            <Navbarr/>

            <Routes>
                <Route path='/' element={<Inicio />} />
                <Route path='/inicio' element={<Inicio/>} />
                <Route path='/FinanceTable' element={<FinanceTable/>} />
                <Route path='/control-panel' element={<ControlPanel/>} />
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