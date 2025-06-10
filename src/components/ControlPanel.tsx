import React, { useState } from 'react';
import { PortfolioItem } from "../types/PortfolioItem";
import panelImg from '../assets/img/finance55.jpg';

type ControlPanelProps = {
  onAddItem: (item: Omit<PortfolioItem, 'id'>) => void;
};

const TICKERS = [
  { value: '', label: 'Seleccionar ticker' },
  { value: 'AAPL', label: 'Apple (AAPL)' },
  { value: 'TSLA', label: 'Tesla (TSLA)' },
  { value: 'GOOGL', label: 'Google (GOOGL)' },
  { value: 'MSFT', label: 'Microsoft (MSFT)' },
  { value: 'AMZN', label: 'Amazon (AMZN)' },
  // Agrega más si lo deseas
];

const CRYPTOS = [
  { value: '', label: 'Seleccionar cripto' },
  { value: 'bitcoin', label: 'Bitcoin' },
  { value: 'ethereum', label: 'Ethereum' },
  // Agrega más si lo deseas
];

export const ControlPanel: React.FC<ControlPanelProps> = ({ onAddItem }) => {
  const [form, setForm] = useState({
    nombre: '',
    ticker: '',
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
      ticker: form.ticker,
      cantidad: parseFloat(form.cantidad),
      precio: parseFloat(form.precio),
      tipoActivo: form.tipoActivo,
      fechaCompra: new Date().toISOString(),
    };

    onAddItem(nuevoItem);

    setForm({
      nombre: '',
      ticker: '',
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
        className="object-cover w-full max-w-lg mx-auto mb-6 shadow rounded-xl"
      />
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2">
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
        {form.tipoActivo === "Acción" && (
          <select
            name="ticker"
            value={form.ticker}
            onChange={handleChange}
            className="w-full select select-bordered"
            required
          >
            {TICKERS.map(ticker => (
              <option key={ticker.value} value={ticker.value}>{ticker.label}</option>
            ))}
          </select>
        )}

        {form.tipoActivo === "Criptomoneda" && (
          <select
            name="ticker"
            value={form.ticker}
            onChange={handleChange}
            className="w-full select select-bordered"
            required
          >
            {CRYPTOS.map(crypto => (
              <option key={crypto.value} value={crypto.value}>{crypto.label}</option>
            ))}
          </select>
        )}

        {(form.tipoActivo === "Otro" || !form.tipoActivo) && (
          <input
            type="text"
            name="ticker"
            placeholder="Ticker o identificador"
            value={form.ticker}
            onChange={handleChange}
            className="w-full input input-bordered"
            disabled
          />
        )}
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
    </div>
  );
};