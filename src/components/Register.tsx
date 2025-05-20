import React, { useState } from 'react';

export const Register = ({ onRegisterSuccess }: { onRegisterSuccess: () => void }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (password !== repeatPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    try {
      const res = await fetch('https://proyecto-inversiones.onrender.com/api/auth/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onRegisterSuccess();
        }, 1500);
      } else {
        setError(data.message || 'Error al registrarse');
      }
    } catch {
      setError('Error de conexión');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col max-w-xs gap-4 mx-auto">
      <fieldset className="p-4 border fieldset w-xs border-base-300 rounded-box">
        <legend className="fieldset-legend">Registro</legend>
        <label className="fieldset-label">Nombre</label>
        <input
          type="text"
          className="input"
          placeholder="Nombre completo"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <label className="fieldset-label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <label className="fieldset-label">Contraseña</label>
        <input
          type="password"
          className="input"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <label className="fieldset-label">Repetir Contraseña</label>
        <input
          type="password"
          className="input"
          placeholder="Repetir Contraseña"
          value={repeatPassword}
          onChange={e => setRepeatPassword(e.target.value)}
          required
        />
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-600">¡Registro exitoso!</div>}
        <button className="mt-4 btn btn-primary" type="submit">Registrarse</button>
      </fieldset>
    </form>
  );
};