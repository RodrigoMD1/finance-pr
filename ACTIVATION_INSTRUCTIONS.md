// INSTRUCCIONES PARA ACTIVAR EL BACKEND REAL

// 1. En el backend, configurar .env con credenciales reales
// 2. Después cambiar estas líneas en el frontend:

// En src/components/Subscriptions.tsx (línea 3):
// CAMBIAR DE:
import { localSubscriptionService } from '../services/localSubscriptionService';
// A:
import { realSubscriptionService as localSubscriptionService } from '../services/realSubscriptionService';

// En src/hooks/useSubscriptionLimits.ts (línea 2):  
// CAMBIAR DE:
import { localSubscriptionService } from '../services/localSubscriptionService';
// A:
import { realSubscriptionService as localSubscriptionService } from '../services/realSubscriptionService';

// 3. Actualizar .env del frontend:
VITE_API_URL=http://localhost:3000/api
// O para producción:
// VITE_API_URL=https://tu-backend-url.com/api

// ¡Y YA ESTÁ! El sistema funcionará completamente con MercadoPago real
