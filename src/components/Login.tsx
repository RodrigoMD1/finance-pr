import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaSignInAlt, FaSpinner } from 'react-icons/fa';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-industrial-charcoal via-industrial-iron to-industrial-charcoal px-4">
      <div className="w-full max-w-md">
        <div className="glass-effect p-8 rounded-2xl border border-industrial-copper/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-industrial-copper to-industrial-copper/70 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <FaSignInAlt className="text-white text-2xl" />
            </div>
            <h2 className="text-3xl font-bold text-industrial-white mb-2">
              Bienvenido de vuelta
            </h2>
            <p className="text-industrial-steel">
              Inicia sesión en tu cuenta
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-industrial-white mb-2">
                Correo electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-industrial-copper" />
                </div>
                <input
                  type="email"
                  placeholder="ejemplo@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="industrial-input pl-10"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-industrial-white mb-2">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-industrial-copper" />
                </div>
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="industrial-input pl-10"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm text-center">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="industrial-button w-full py-3 flex items-center justify-center gap-2 text-lg font-semibold"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                <>
                  <FaSignInAlt />
                  Iniciar sesión
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-industrial-steel text-sm">
              ¿No tienes una cuenta?{' '}
              <a 
                href="/register" 
                className="text-industrial-copper hover:text-industrial-copper/80 font-semibold transition-colors"
              >
                Regístrate aquí
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}