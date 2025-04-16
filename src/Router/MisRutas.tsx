import { HeroSection } from '../components/Layout/HeroSection'
import { Inicio } from '../components/Inicio'
import { Footer } from '../components/Footer'
import { Navbarr } from '../components/Layout/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from '../components/Login'
import { Register } from '../components/Register'
import { ControlPanel } from '../components/ControlPanel'


export const MisRutas = () => {
    return (
        <BrowserRouter>

            {/* Contenido-estatico/ navegacion */}
            <HeroSection />
            <Navbarr />
            <div className="divider"></div>
            {/* Contenido-principal */}
            <Routes>
                <Route path='/' element={<Inicio />} />
                <Route path='/inicio' element={<Inicio />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/control-panel' element={<ControlPanel />} />
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
    )
}
