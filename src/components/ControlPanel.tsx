import React, { useState } from 'react';
import { PortfolioItem } from "../types/PortfolioItem";
import { AssetSearch } from './AssetSearch';
import { AssetSearchResult } from '../services/realTimeDataService';
import panelImg from '../assets/img/finance55.jpg';
import toast from 'react-hot-toast';

type ControlPanelProps = {
  onAddItem: (item: Omit<PortfolioItem, 'id'>) => void;
};

export const ControlPanel: React.FC<ControlPanelProps> = ({ onAddItem }) => {
  const [form, setForm] = useState({
    nombre: '',
    ticker: '',
    cantidad: '',
    precio: '',
    tipoActivo: '',
  });
  const [selectedAsset, setSelectedAsset] = useState<AssetSearchResult | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAssetSelect = (asset: AssetSearchResult & { price?: number }) => {
    setSelectedAsset(asset);
    setForm({
      ...form,
      nombre: asset.name,
      ticker: asset.symbol,
      tipoActivo: asset.type === 'crypto' ? 'crypto' : 'accion',
      precio: asset.price ? asset.price.toString() : ''
    });

    if (asset.price) {
      toast.success(`💰 Precio actual: $${asset.price.toLocaleString('es-AR', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      })}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAsset) {
      toast.error('Por favor, selecciona un activo de la búsqueda');
      return;
    }

    if (!form.cantidad || !form.precio) {
      toast.error('Por favor, complete cantidad y precio');
      return;
    }

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
    setSelectedAsset(null);
    
    toast.success(`✅ ${form.nombre} agregado exitosamente`);
  };

  return (
    <div>
      <img
        src={panelImg}
        alt="Panel de control"
        className="object-cover w-full max-w-lg mx-auto mb-6 shadow rounded-xl"
      />
      
      <div className="mb-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">
          🔍 Buscar Activo (Criptomonedas y Acciones)
        </h3>
        <AssetSearch 
          onAssetSelect={handleAssetSelect}
          placeholder="Busca Bitcoin, Apple, Tesla, Ethereum, Google..."
        />
        
        {selectedAsset && (
          <div className="p-4 mt-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">
                {selectedAsset.type === 'crypto' ? '₿' : '📈'}
              </span>
              <div>
                <div className="font-semibold text-green-800">
                  {selectedAsset.name} ({selectedAsset.symbol})
                </div>
                <div className="text-sm text-green-600">
                  {selectedAsset.type === 'crypto' ? 'Criptomoneda' : 'Acción'} • {selectedAsset.market || 'Mercado'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del activo"
          value={form.nombre}
          onChange={handleChange}
          className="w-full input input-bordered"
          readOnly={!!selectedAsset}
          required
        />

        <input
          type="text"
          name="ticker"
          placeholder="Símbolo (ej: BTC, AAPL)"
          value={form.ticker}
          onChange={handleChange}
          className="w-full input input-bordered"
          readOnly={!!selectedAsset}
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
          placeholder="Precio de compra (USD)"
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
          disabled={!!selectedAsset}
          required
        >
          <option value="">Tipo de activo</option>
          <option value="crypto">Criptomoneda</option>
          <option value="accion">Acción</option>
        </select>

        <button
          type="submit"
          className="btn btn-primary md:col-span-2"
          disabled={!selectedAsset}
        >
          {selectedAsset ? `➕ Agregar ${selectedAsset.name}` : '🔍 Primero selecciona un activo'}
        </button>
      </form>
      
      {selectedAsset && (
        <div className="p-4 text-sm text-blue-600 bg-blue-50 border border-blue-200 rounded-lg">
          💡 <strong>Consejo:</strong> El precio se obtuvo automáticamente. Puedes modificarlo si compraste a un precio diferente.
        </div>
      )}
    </div>
  );
};