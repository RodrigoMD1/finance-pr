import React, { useState } from 'react';

export function Login({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('https://proyecto-inversiones.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.id);
        localStorage.setItem('userName', data.name);
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('userRole', data.role);
        onLoginSuccess();
      } else {
        setError(data.message || 'Error al iniciar sesión');
      }
    } catch {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col max-w-md gap-6 p-8 mx-auto mt-16 bg-white shadow-lg rounded-xl"
      style={{ fontFamily: "Inter, Roboto, Arial, sans-serif" }}
    >
      <h2 className="mb-2 text-2xl font-bold text-center text-blue-700">Iniciar sesión</h2>
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
      {error && <div className="font-medium text-center text-red-600">{error}</div>}
      <button
        className="w-full py-2 mt-2 font-semibold text-white transition-colors bg-blue-700 rounded-lg shadow hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="w-4 h-4 mr-2 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
            Iniciando sesión...
          </div>
        ) : (
          'Iniciar sesión'
        )}
      </button>
      
    </form>
  );
}