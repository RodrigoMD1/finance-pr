declare global {
  interface Window {
    MercadoPago?: new (
      publicKey: string,
      options?: { locale?: string }
    ) => MercadoPagoSDK;
  }
}

export interface MercadoPagoSDK {
  bricks(): MPBricksBuilder;
}

export interface MPBricksBuilder {
  create(
    brick: 'cardPayment',
    containerId: string,
    props: {
      initialization?: { amount?: number };
      callbacks?: {
        onReady?: () => void;
        onError?: (error: { message?: string }) => void;
        onSubmit?: (args: { formData: { token?: string } }) => Promise<void> | void;
      };
    }
  ): Promise<void>;
  unmount?(containerId: string): void;
}

export {};
