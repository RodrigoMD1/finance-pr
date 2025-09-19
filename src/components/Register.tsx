import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaSpinner, FaCheckCircle, FaSignInAlt } from 'react-icons/fa';

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
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-industrial-charcoal via-industrial-iron to-industrial-charcoal px-4">
        <div className="w-full max-w-md">
          <div className="glass-effect p-8 rounded-2xl border border-green-400/20 text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
              <FaCheckCircle className="text-white text-2xl" />
            </div>
            <h2 className="text-3xl font-bold text-industrial-white mb-4">
              ¡Registro exitoso!
            </h2>
            <p className="text-industrial-steel mb-6 leading-relaxed">
              {message}
            </p>
            <a 
              href="/login" 
              className="industrial-button inline-flex items-center gap-2 px-6 py-3 font-semibold"
            >
              <FaSignInAlt />
              Ir a iniciar sesión
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-industrial-charcoal via-industrial-iron to-industrial-charcoal px-4">
      <div className="w-full max-w-md">
        <div className="glass-effect p-8 rounded-2xl border border-industrial-copper/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-industrial-copper to-industrial-copper/70 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <FaUserPlus className="text-white text-2xl" />
            </div>
            <h2 className="text-3xl font-bold text-industrial-white mb-2">
              Crear cuenta
            </h2>
            <p className="text-industrial-steel">
              Únete a la plataforma financiera más completa
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-industrial-white mb-2">
                Nombre completo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-industrial-copper" />
                </div>
                <input
                  type="text"
                  placeholder="Tu nombre completo"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="industrial-input pl-10"
                />
              </div>
            </div>

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
                  placeholder="Contraseña segura"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="industrial-input pl-10"
                />
              </div>
            </div>

            {/* Error Message */}
            {message && !success && (
              <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm text-center">
                {message}
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
                  Registrando...
                </>
              ) : (
                <>
                  <FaUserPlus />
                  Crear cuenta
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-industrial-steel text-sm">
              ¿Ya tienes una cuenta?{' '}
              <a 
                href="/login" 
                className="text-industrial-copper hover:text-industrial-copper/80 font-semibold transition-colors"
              >
                Inicia sesión aquí
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}