/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

export const AuthDiagnosticPanel = () => {
  const [diagnosticData, setDiagnosticData] = useState<any>(null);

  useEffect(() => {
    const runDiagnostic = () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const userName = localStorage.getItem('userName');
        const userEmail = localStorage.getItem('userEmail');
        const userRole = localStorage.getItem('userRole');

        let jwtPayload = null;
        if (token) {
          try {
            jwtPayload = JSON.parse(atob(token.split('.')[1]));
          } catch (e) {
            jwtPayload = { error: 'Token inválido' };
          }
        }

        setDiagnosticData({
          localStorage: {
            token: token ? `${token.substring(0, 20)}...` : 'MISSING',
            userId,
            userName,
            userEmail,
            userRole
          },
          jwtPayload,
          tokenExpired: jwtPayload ? jwtPayload.exp < Math.floor(Date.now() / 1000) : 'N/A',
          apiConfig: {
            baseUrl: import.meta.env.VITE_API_URL || 'https://proyecto-inversiones.onrender.com/api',
            currentOrigin: window.location.origin
          }
        });
      } catch (error) {
        const errorMessage = typeof error === 'object' && error !== null && 'message' in error
          ? (error as { message: string }).message
          : String(error);
        setDiagnosticData({ error: errorMessage });
      }
    };

    runDiagnostic();
  }, []);

  if (!diagnosticData) return <div>Cargando diagnóstico...</div>;

  return (
    <div className="fixed z-50 max-w-md p-4 bg-yellow-100 border border-yellow-400 rounded-lg shadow-lg top-4 right-4">
      <h3 className="mb-2 font-bold text-yellow-800">🔍 Diagnóstico de Autenticación</h3>
      
      <div className="space-y-2 text-xs text-yellow-900">
        <div>
          <strong>LocalStorage:</strong>
          <ul className="ml-2">
            <li>Token: {diagnosticData.localStorage?.token || 'MISSING'}</li>
            <li>User ID: {diagnosticData.localStorage?.userId || 'MISSING'}</li>
            <li>Email: {diagnosticData.localStorage?.userEmail || 'MISSING'}</li>
            <li>Role: {diagnosticData.localStorage?.userRole || 'MISSING'}</li>
          </ul>
        </div>

        {diagnosticData.jwtPayload && (
          <div>
            <strong>JWT Payload:</strong>
            <ul className="ml-2">
              <li>userId: {diagnosticData.jwtPayload.userId || 'MISSING'}</li>
              <li>email: {diagnosticData.jwtPayload.email || 'MISSING'}</li>
              <li>role: {diagnosticData.jwtPayload.role || 'MISSING'}</li>
              <li>name: {diagnosticData.jwtPayload.name || 'MISSING'}</li>
              <li>Expires: {new Date(diagnosticData.jwtPayload.exp * 1000).toLocaleString()}</li>
            </ul>
          </div>
        )}

        <div>
          <strong>Estado:</strong>
          <ul className="ml-2">
            <li>Token expirado: {diagnosticData.tokenExpired ? '❌ SÍ' : '✅ NO'}</li>
            <li>API URL: {diagnosticData.apiConfig?.baseUrl}</li>
            <li>Origin: {diagnosticData.apiConfig?.currentOrigin}</li>
          </ul>
        </div>

        <div className="p-2 mt-3 bg-yellow-200 rounded">
          <strong>Problemas detectados:</strong>
          <ul className="ml-2">
            {!diagnosticData.localStorage?.token && <li>❌ Token faltante</li>}
            {diagnosticData.tokenExpired && <li>❌ Token expirado</li>}
            {!diagnosticData.jwtPayload?.userId && <li>❌ userId faltante en JWT</li>}
            {!diagnosticData.jwtPayload?.role && <li>❌ role faltante en JWT</li>}
            {diagnosticData.apiConfig?.currentOrigin === 'http://localhost:5174' && 
             <li>⚠️ Puerto 5174 puede tener problemas de CORS</li>}
          </ul>
        </div>
      </div>

      <button
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
        className="px-2 py-1 mt-2 text-xs text-white bg-red-500 rounded hover:bg-red-600"
      >
        Limpiar y Recargar
      </button>
    </div>
  );
};
