import React, { useState } from 'react';
import { PortfolioItem } from "../types/PortfolioItem";
import panelImg from '../assets/img/finance55.jpg'; 
type ControlPanelProps = {
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

    const nuevoItem = {
      nombre: form.nombre,
      cantidad: parseFloat(form.cantidad),
      precio: parseFloat(form.precio),
      tipoActivo: form.tipoActivo,
      fechaCompra: new Date().toISOString(),
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
    <div>
      <img
        src={panelImg}
        alt="Panel de control"
        className="object-cover w-full max-w-lg m-5 mx-auto mb-6 shadow rounded-xl"
      />
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
          <option value="Acción">Acciónes</option>
          <option value="Criptomoneda">Criptomoneda</option>
          <option value="Otro">Otro</option>
        </select>
        <button type="submit" className="btn btn-primary col-span-full">Agregar activo</button>
      </form>
    </div>
  );
};