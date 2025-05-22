import React, { useState } from 'react';

type PortfolioItem = {
  id: number;
  nombre: string;
  cantidad: number;
  precio: number;
  tipoActivo: string;
};

type ControlPanelProps = {
  // Ahora acepta un item sin id, el id lo pone el backend
  onAddItem: (item: Omit<PortfolioItem, 'id'>) => void;
};

export const ControlPanel: React.FC<ControlPanelProps> = ({ onAddItem }) => {
  const [form, setForm] = useState({
    nombre: '',
    cantidad: '',
    precio: '',
    tipoActivo: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // No generes el id aquí, el backend lo genera
    const nuevoItem = {
      nombre: form.nombre,
      cantidad: parseFloat(form.cantidad),
      precio: parseFloat(form.precio),
      tipoActivo: form.tipoActivo,
    };

    onAddItem(nuevoItem);

    setForm({
      nombre: '',
      cantidad: '',
      precio: '',
      tipoActivo: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 m-5 mb-6 md:grid-cols-2">
      <input
        type="text"
        name="nombre"
        placeholder="Nombre del activo"
        value={form.nombre}
        onChange={handleChange}
        className="w-full input input-bordered"
        required
      />
      <input
        type="number"
        name="cantidad"
        placeholder="Cantidad"
        value={form.cantidad}
        onChange={handleChange}
        className="w-full input input-bordered"
        required
      />
      <input
        type="number"
        name="precio"
        placeholder="Precio de compra"
        value={form.precio}
        onChange={handleChange}
        className="w-full input input-bordered"
        required
      />
      <select
        name="tipoActivo"
        value={form.tipoActivo}
        onChange={handleChange}
        className="w-full select select-bordered"
        required
      >
        <option value="">Seleccionar tipo</option>
        <option value="Acción">Acción</option>
        <option value="Criptomoneda">Criptomoneda</option>
        <option value="Otro">Otro</option>
      </select>
      <button type="submit" className="btn btn-primary col-span-full">Agregar activo</button>
    </form>
  );
};