import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { notifyAuthChanged } from '../utils/auth';
import { withBase } from '../services/api';
import { FaEnvelope, FaLock, FaSignInAlt, FaSpinner } from 'react-icons/fa';

export function Login({ onLoginSuccess }: { onLoginSuccess?: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(withBase('/auth/login'), {
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
  if (onLoginSuccess) onLoginSuccess();
  notifyAuthChanged();
        navigate('/inicio');
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
        <div className="bg-white/10 backdrop-blur-lg p-8 lg:p-12 rounded-2xl border border-white/20 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
              <FaSignInAlt className="text-white text-2xl lg:text-3xl" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
              Bienvenido de vuelta
            </h2>
            <p className="text-gray-300 text-base lg:text-lg">
              Inicia sesión en tu cuenta FinancePR
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm lg:text-base font-semibold text-white mb-3">
                Correo electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaEnvelope className="text-orange-500 text-lg" />
                </div>
                <input
                  type="email"
                  placeholder="ejemplo@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 lg:py-4 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-base lg:text-lg"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm lg:text-base font-semibold text-white mb-3">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-orange-500 text-lg" />
                </div>
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 lg:py-4 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-base lg:text-lg"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm lg:text-base text-center">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 lg:py-4 flex items-center justify-center gap-3 text-lg lg:text-xl font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin text-xl" />
                  Iniciando sesión...
                </>
              ) : (
                <>
                  <FaSignInAlt className="text-xl" />
                  Iniciar sesión
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-300 text-sm lg:text-base">
              ¿No tienes una cuenta?{' '}
              <NavLink 
                to="/register" 
                className="text-orange-400 hover:text-orange-300 font-semibold transition-colors"
              >
                Regístrate aquí
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}