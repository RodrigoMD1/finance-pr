import { useState } from "react";
import { NavLink } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaSpinner, FaCheckCircle, FaSignInAlt } from 'react-icons/fa';
import { withBase } from '../services/api';

export function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setSuccess(false);
    setLoading(true);
    try {
      const res = await fetch(withBase('/auth/registro'), {
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
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
          <div className="bg-white/10 backdrop-blur-lg p-8 lg:p-12 rounded-2xl border border-green-400/20 shadow-2xl text-center">
            <div className="mx-auto w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
              <FaCheckCircle className="text-white text-2xl lg:text-3xl" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              ¡Registro exitoso!
            </h2>
            <p className="text-gray-300 mb-8 leading-relaxed text-base lg:text-lg">
              {message}
            </p>
            <NavLink 
              to="/login" 
              className="inline-flex items-center gap-3 px-6 py-3 lg:py-4 text-lg lg:text-xl font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <FaSignInAlt />
              Ir a iniciar sesión
            </NavLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
        <div className="bg-white/10 backdrop-blur-lg p-8 lg:p-12 rounded-2xl border border-white/20 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
              <FaUserPlus className="text-white text-2xl lg:text-3xl" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
              Crear cuenta
            </h2>
            <p className="text-gray-300 text-base lg:text-lg">
              Únete a la plataforma financiera más completa
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm lg:text-base font-semibold text-white mb-3">
                Nombre completo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaUser className="text-orange-500 text-lg" />
                </div>
                <input
                  type="text"
                  placeholder="Tu nombre completo"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 lg:py-4 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-base lg:text-lg"
                />
              </div>
            </div>

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
                  placeholder="Contraseña segura (mínimo 6 caracteres)"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 lg:py-4 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-base lg:text-lg"
                />
              </div>
            </div>

            {/* Error Message */}
            {message && !success && (
              <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm lg:text-base text-center">
                {message}
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
                  Registrando...
                </>
              ) : (
                <>
                  <FaUserPlus className="text-xl" />
                  Crear cuenta
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-300 text-sm lg:text-base">
              ¿Ya tienes una cuenta?{' '}
              <NavLink 
                to="/login" 
                className="text-orange-400 hover:text-orange-300 font-semibold transition-colors"
              >
                Inicia sesión aquí
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}