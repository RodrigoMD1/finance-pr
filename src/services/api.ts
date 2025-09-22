// En desarrollo usaremos el proxy de Vite en '/api'. En prod, defina VITE_API_URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const withBase = (path: string) => {
  if (path.startsWith('http')) return path;
  const base = API_BASE_URL.replace(/\/$/, '');
  const p = path.replace(/^\//, '');
  return `${base}/${p}`;
};
