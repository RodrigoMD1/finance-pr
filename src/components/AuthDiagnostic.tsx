import React from 'react';

export const AuthDiagnostic: React.FC = () => {
  const checkAuth = () => {
    console.log('=== DIAGNÓSTICO DE AUTENTICACIÓN ===');
    
    // Obtener datos del localStorage
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    const userRole = localStorage.getItem('userRole');
    
    console.log('📦 LocalStorage Data:');
    console.log('  Token:', token ? `${token.substring(0, 20)}...` : 'MISSING');
    console.log('  User ID:', userId);
    console.log('  User Name:', userName);
    console.log('  User Email:', userEmail);
    console.log('  User Role:', userRole);
    console.log('  🎯 Is Admin?', userRole === 'admin' || (userRole && userRole.includes('admin')));
    
    // Intentar decodificar el token JWT
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('🔓 Token Payload:');
        console.log('  User ID from token:', payload.userId || payload.id || payload.sub);
        console.log('  Role from token:', payload.role || payload.roles);
        console.log('  Email from token:', payload.email);
        console.log('  Expires at:', new Date(payload.exp * 1000));
        console.log('  Is expired:', payload.exp * 1000 < Date.now());
      } catch (error) {
        console.error('❌ Error decoding token:', error);
      }
    }
    
    console.log('================================');
  };

  const testAdminEndpoint = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('❌ No token found');
      return;
    }

    try {
      console.log('🔄 Testing admin endpoint...');
      const response = await fetch('https://proyecto-inversiones.onrender.com/api/admin/stats', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include', // Incluye cookies en la petición
        mode: 'cors' // Modo CORS explícito
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Admin data:', data);
      } else {
        const errorText = await response.text();
        console.error('❌ Error response:', errorText);
      }
    } catch (error) {
      console.error('❌ Network error:', error);
    }
  };

  const clearAuth = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    console.log('🗑️ Authentication data cleared');
    window.location.reload();
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h3 className="mb-4 text-lg font-semibold">Diagnóstico de Autenticación</h3>
      <div className="space-y-2">
        <button 
          onClick={checkAuth}
          className="px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Verificar Auth (Ver consola)
        </button>
        <button 
          onClick={testAdminEndpoint}
          className="px-4 py-2 mr-2 text-white bg-green-500 rounded hover:bg-green-600"
        >
          Probar Endpoint Admin
        </button>
        <button 
          onClick={clearAuth}
          className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
        >
          Limpiar Auth y Recargar
        </button>
      </div>
      <p className="mt-4 text-sm text-gray-600">
        Los resultados aparecerán en la consola del navegador (F12)
      </p>
    </div>
  );
};
