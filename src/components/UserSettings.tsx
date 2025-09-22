import { useEffect, useState } from "react";
import { withBase } from '../services/api';

export function UserSettings() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [reportEnabled, setReportEnabled] = useState(false);
    const [reportFrequency, setReportFrequency] = useState("daily");
    const [message, setMessage] = useState("");
    const [emailVerified, setEmailVerified] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            const userId = localStorage.getItem("userId");
            const token = localStorage.getItem("token");
            if (!userId || !token) return;
            const res = await fetch(withBase(`/users/${userId}`), {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setUser(data);
                setReportEnabled(data.reportEnabled);
                setReportFrequency(data.reportFrequency || "daily");
                setEmailVerified(data.emailVerified);
            }
            setLoading(false);
        };
        fetchUser();
    }, []);

    const handleResendVerification = async () => {
        setMessage("");
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        const res = await fetch(withBase(`/users/resend-verification/${userId}`), {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
            setMessage("Correo de verificación reenviado. Revisa tu bandeja de entrada.");
        } else {
            setMessage("No se pudo reenviar el correo de verificación.");
        }
    };

    const handleSave = async () => {
        setMessage("");
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        const res = await fetch(withBase(`/users/report-config/${userId}`), {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ reportEnabled, reportFrequency })
        });
        if (res.ok) {
            setMessage("Configuración guardada correctamente.");
        } else {
            setMessage("Error al guardar la configuración.");
        }
    };

    if (loading) return <div className="p-4">Cargando configuración...</div>;

    return (
        <div className="max-w-md p-4 mx-auto border rounded">
            <h2 className="mb-4 text-xl font-bold">Configuración de usuario</h2>
            <div className="mb-2">
                <strong>Email:</strong> {user?.email}
            </div>
            <div className="mb-2">
                <strong>Estado de verificación:</strong>{" "}
                {emailVerified ? (
                    <span className="text-green-600">Verificado ✅</span>
                ) : (
                    <>
                        <span className="text-red-600">No verificado ❌</span>
                        <button
                            className="px-2 py-1 ml-2 bg-blue-100 border rounded"
                            onClick={handleResendVerification}
                        >
                            Reenviar correo de verificación
                        </button>
                    </>
                )}
            </div>
            <div className="mb-2">
                <label>
                    <input
                        type="checkbox"
                        checked={reportEnabled}
                        disabled={!emailVerified}
                        onChange={e => setReportEnabled(e.target.checked)}
                    />{" "}
                    Recibir reportes automáticos
                </label>
            </div>
            <div className="mb-4">
                <label>
                    Frecuencia:{" "}
                    <select
                        value={reportFrequency}
                        disabled={!emailVerified || !reportEnabled}
                        onChange={e => setReportFrequency(e.target.value)}
                        className="px-2 border rounded"
                    >
                        <option value="daily">Diario</option>
                        <option value="weekly">Semanal</option>
                    </select>
                </label>
            </div>
            <button
                className="btn btn-primary"
                disabled={!emailVerified}
                onClick={handleSave}
            >
                Guardar configuración
            </button>
            {message && <div className="mt-2 text-blue-600">{message}</div>}
        </div>
    );
}