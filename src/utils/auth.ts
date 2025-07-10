// Utilidades para manejo de autenticación
export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  
  try {
    // Decodifica el payload del JWT (sin verificar la firma)
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    
    // Verifica si el token ha expirado
    return payload.exp < currentTime;
  } catch {
    // Si hay error al decodificar, considerar el token como expirado
    return true;
  }
};

export const logout = () => {
  localStorage.clear();
  window.location.reload();
};

export const checkTokenAndLogout = (): boolean => {
  const token = localStorage.getItem('token');
  
  if (isTokenExpired(token)) {
    logout();
    return false;
  }
  
  return true;
};

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  
  // Verificar token antes de hacer la petición
  if (isTokenExpired(token)) {
    logout();
    throw new Error('Token expirado');
  }
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  
  // Si la respuesta es 401 (no autorizado), desconectar
  if (response.status === 401) {
    logout();
    throw new Error('Sesión expirada');
  }
  
  return response;
};
