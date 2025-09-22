// Utilidades para manejo de autenticación
const base64UrlDecode = (str: string): string => {
  // Reemplazar caracteres de base64url y agregar padding
  let output = str.replace(/-/g, '+').replace(/_/g, '/');
  const pad = output.length % 4;
  if (pad) {
    output += '='.repeat(4 - pad);
  }
  return atob(output);
};

export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;

  try {
    const parts = token.split('.');
    if (parts.length < 2) return true;
    const payloadJson = base64UrlDecode(parts[1]);
    const payload = JSON.parse(payloadJson);
    const currentTime = Date.now() / 1000;
    if (!payload || typeof payload.exp !== 'number') return true;
    return payload.exp < currentTime;
  } catch {
    return true;
  }
};

export const logout = () => {
  localStorage.clear();
  window.dispatchEvent(new Event('auth-changed'));
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

  if (isTokenExpired(token)) {
    logout();
    throw new Error('Token expirado');
  }

  const method = (options.method || 'GET').toUpperCase();
  const hasBody = !!options.body;

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
    'Authorization': `Bearer ${token}`,
  };

  if (hasBody || ['POST', 'PUT', 'PATCH'].includes(method)) {
    headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  }

  const response = await fetch(url, {
    ...options,
    headers
  });

  if (response.status === 401) {
    logout();
    throw new Error('Sesión expirada');
  }

  return response;
};

// Notificar cambios de autenticación (login/logout)
export const notifyAuthChanged = () => {
  window.dispatchEvent(new Event('auth-changed'));
};
