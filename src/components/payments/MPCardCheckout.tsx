import React, { useEffect, useRef, useState } from 'react';
import type { MercadoPagoSDK, MPBricksBuilder } from '../../types/mercadopago';

interface MPCardCheckoutProps {
  publicKey: string;
  amount: number;
  email?: string;
  onTokenReady: (cardTokenId: string) => void;
  onCancel?: () => void;
}

// Componente que monta el Brick de Tarjeta y retorna el card_token_id al confirmar
const MPCardCheckout: React.FC<MPCardCheckoutProps> = ({ publicKey, amount, email, onTokenReady, onCancel }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const bricksRef = useRef<MPBricksBuilder | null>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    const init = async () => {
      try {
        if (!publicKey || /your-public-key-here/i.test(publicKey)) {
          setError('Configura VITE_MP_PUBLIC_KEY con tu Public Key real de Mercado Pago');
          setLoading(false);
          return;
        }
        if (!window.MercadoPago) {
          setError('SDK de Mercado Pago no cargado');
          return;
        }
        // Aviso si se usa clave de producción en local: las tarjetas de prueba fallarán
        const isProdKey = /^APP_USR-/i.test(publicKey);
        const isLocal = /localhost|127\.0\.0\.1/i.test(window.location.hostname);
        if (isProdKey && isLocal) {
          setNotice('Estás usando una Public Key de producción (APP_USR) en entorno local. Las tarjetas de PRUEBA no funcionarán. Usa una Public Key TEST- para sandbox.');
        }
        // Evitar doble render en StrictMode si ya hay contenido del brick
        const host = document.getElementById('mp-card-brick');
        if (host && host.childNodes.length > 0 && mountedRef.current) {
          setLoading(false);
          return;
        }
        if (!Number.isFinite(amount) || amount <= 0) {
          setError('El monto del plan es inválido');
          setLoading(false);
          return;
        }
        const mp: MercadoPagoSDK = new window.MercadoPago(publicKey, { locale: 'es-AR' }) as unknown as MercadoPagoSDK;
        const bricksBuilder: MPBricksBuilder = mp.bricks();
        bricksRef.current = bricksBuilder;

        const renderCardPaymentBrick = async () => {
          await bricksBuilder.create('cardPayment', 'mp-card-brick', {
            initialization: {
              amount,
              ...(email ? { payer: { email } } : {})
            },
            callbacks: {
              onReady: () => setLoading(false),
              onError: (e: unknown) => {
                // Log detallado en consola para diagnóstico
                console.error('MP Brick onError', e);
                // Intentamos extraer la mayor información posible del error
                let msg = 'Error en el Brick de tarjeta';
                if (typeof e === 'string') msg = e;
                else if (typeof e === 'object' && e) {
                  const anyErr = e as Record<string, unknown>;
                  if (typeof anyErr.message === 'string') {
                    msg = anyErr.message as string;
                  } else if (Array.isArray(anyErr.cause) && anyErr.cause.length) {
                    const first = anyErr.cause[0] as Record<string, unknown>;
                    if (typeof first.description === 'string') msg = first.description as string;
                    else if (typeof first.code === 'string') msg = `Código: ${first.code}`;
                  } else {
                    try { msg = JSON.stringify(anyErr); } catch { /* noop */ }
                  }
                }
                setError(`Error al tokenizar: ${msg}`);
              },
              onSubmit: ({ formData }: { formData: { token?: string } }) => {
                console.log('MP Brick onSubmit formData', formData);
                // formData.token es el card_token_id
                const token = formData?.token;
                if (token) onTokenReady(token);
                // Importante: devolver una Promesa resuelta para indicar al Brick que
                // el manejo asincrónico finalizó correctamente y evitar estados inconsistentes
                return Promise.resolve();
              }
            }
          });
          mountedRef.current = true;
        };

        await renderCardPaymentBrick();
      } catch (e) {
        const err = e as { message?: string };
        setError(err?.message || 'Error iniciando Mercado Pago');
      }
    };
    init();

    return () => {
      try {
        if (bricksRef.current) {
          bricksRef.current.unmount?.('mp-card-brick');
        }
        mountedRef.current = false;
      } catch {
        // ignore
      }
    };
  }, [publicKey, amount, email, onTokenReady]);

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg">
      <h3 className="mb-3 text-lg font-semibold text-gray-900">Pagar con tarjeta</h3>
      {notice && <div className="p-2 mb-3 text-sm text-yellow-800 border border-yellow-200 rounded bg-yellow-50">{notice}</div>}
      {loading && <div className="text-sm text-gray-600">Cargando formulario seguro…</div>}
      {error && (
        <div className="p-2 mb-3 text-sm text-red-700 border border-red-200 rounded bg-red-50">
          {error}
          <div className="mt-2 text-xs text-red-800">
            Si persiste, probá desactivar bloqueadores/tracking prevention y permitir cookies de terceros para mercadopago.com/mercadolibre.com. También probá en ventana de incógnito sin extensiones.
          </div>
        </div>
      )}
      <div id="mp-card-brick" ref={containerRef} />
      {onCancel && (
        <button className="mt-3 text-gray-800 border-gray-300 btn btn-sm btn-outline hover:bg-gray-100" onClick={onCancel}>
          Cancelar
        </button>
      )}
    </div>
  );
};

export default MPCardCheckout;
