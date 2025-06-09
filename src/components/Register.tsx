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
      } else {
        setMessage(data.message || 'Error al registrarse');
      }
    } catch {
      setMessage('Error de conexión');
    }
  };

  if (success) {
    return (
      <div className="max-w-md p-6 mx-auto mt-10 text-center bg-white shadow-lg rounded-xl">
        <h2 className="mb-2 text-2xl font-bold text-green-700">¡Registro exitoso!</h2>
        <div className="mb-2 text-gray-700">{message}</div>
        <a href="/login" className="inline-block px-6 py-2 mt-4 font-semibold text-white transition-colors bg-blue-700 rounded-lg shadow hover:bg-blue-800">
          Ir a iniciar sesión
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col max-w-md gap-6 p-8 mx-auto mt-10 bg-white shadow-lg rounded-xl"
      style={{ fontFamily: "Inter, Roboto, Arial, sans-serif" }}
    >
      <h2 className="mb-2 text-2xl font-bold text-center text-blue-700">Crear cuenta</h2>
      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-700">Nombre</label>
        <input
          type="text"
          placeholder="Tu nombre"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
        />
      </div>
      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-700">Correo electrónico</label>
        <input
          type="email"
          placeholder="ejemplo@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
        />
      </div>
      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-700">Contraseña</label>
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 mt-2 font-semibold text-white transition-colors bg-blue-700 rounded-lg shadow hover:bg-blue-800"
      >
        Registrarse
      </button>
      {message && (
        <div className="font-medium text-center text-red-600">{message}</div>
      )}
     
    </form>
  );
}