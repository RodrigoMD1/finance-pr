import { useState, useEffect } from "react";
import { Login } from "./Login";
import { Register } from "./Register";

export const Inicio = ({
    initialView,
    onViewChange,
}: {
    initialView: "login" | "register";
    onViewChange: (view: "login" | "register") => void;
}) => {
    const [view, setView] = useState(initialView); // Estado interno para manejar la vista actual

    // Sincronizar el estado interno con el valor de initialView cuando cambie
    useEffect(() => {
        setView(initialView);
    }, [initialView]);

    const handleViewChange = (newView: "login" | "register") => {
        setView(newView); // Cambiar la vista interna
        onViewChange(newView); // Notificar al componente padre
    };

    return (
        <div className=''>
            {view === "login" ? (
                <>
                    <Login />
                    <button onClick={() => handleViewChange("register")}>Registrarse</button>
                </>
            ) : (
                <>
                    <Register />
                    <button onClick={() => handleViewChange("login")}>Volver a Iniciar Sesión</button>
                </>
            )}
        </div>
    );
};