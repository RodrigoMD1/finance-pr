import { useEffect, useState } from "react";
import { withBase } from '../services/api';

export function VerifyEmail() {
  const [message, setMessage] = useState("Verificando...");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (!token) {
      setMessage("Token inválido.");
      return;
    }
  fetch(withBase(`/users/verify-email?token=${token}`))
      .then(res => res.json())
      .then(data => {
        setMessage(data.message || "Verificación completada.");
      })
      .catch(() => setMessage("Error al verificar el email."));
  }, []);

  return (
    <div className="p-8 text-center">
      <h2 className="mb-4 text-xl font-bold">Verificación de Email</h2>
      <div>{message}</div>
    </div>
  );
}