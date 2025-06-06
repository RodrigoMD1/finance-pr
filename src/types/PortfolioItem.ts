export type PortfolioItem = {
  id: number;
  nombre: string;
  ticker: string;
  cantidad: number;
  precio: number;
  fechaCompra: string; // formato ISO
  tipoActivo: string;
};