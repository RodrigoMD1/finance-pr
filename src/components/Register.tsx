import { useState } from "react";


export function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setSuccess(false);
    try {
      const res = await fetch('https://proyecto-inversiones.onrender.com/api/auth/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setMessage("Te enviamos un correo de verificación. Por favor, revisa tu bandeja de entrada y haz clic en el enlace para verificar tu email.");
        // Puedes llamar a onRegisterSuccess() si quieres cerrar el modal automáticamente
      } else {
        setMessage(data.message || 'Error al registrarse');
      }
    } catch {
      setMessage('Error de conexión');
    }
  };

  if (success) {
    return (
      <div className="p-4 text-center">
        <h2 className="mb-2 text-lg font-bold">Registro exitoso</h2>
        <div className="mb-2">{message}</div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col max-w-xs gap-4 mx-auto">
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        className="input input-bordered"
      />
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="input input-bordered"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className="input input-bordered"
      />
      <button type="submit" className="btn btn-primary">Registrarse</button>
      {message && <div className="text-red-600">{message}</div>}
    </form>
  );
}