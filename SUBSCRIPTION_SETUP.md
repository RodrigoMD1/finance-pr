# Sistema de Suscripciones con MercadoPago - Guía Completa Backend

Este proyecto incluye un sistema completo de suscripciones con integración a MercadoPago.

## 📋 LISTA DE TAREAS PARA EL BACKEND

### 🛠️ 1. CONFIGURACIÓN INICIAL

#### Instalar dependencias necesarias:
```bash
npm install mercadopago
npm install @types/node
npm install cors
npm install helmet
```

#### Variables de entorno (.env):
```env
# MercadoPago
MP_ACCESS_TOKEN=APP_USR-tu_access_token_mercadopago
MP_PUBLIC_KEY=APP_USR-tu_public_key_mercadopago

# URLs
FRONTEND_URL=http://localhost:5176
BACKEND_URL=http://localhost:3000

# Base de datos
DATABASE_URL=tu_conexion_base_datos

# JWT
JWT_SECRET=tu_jwt_secret
```

### 🗄️ 2. ESTRUCTURA DE BASE DE DATOS

#### Tabla: subscriptions
```sql
CREATE TABLE subscriptions (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  plan_id VARCHAR(50) NOT NULL,
  status ENUM('active', 'inactive', 'pending', 'cancelled', 'expired') DEFAULT 'pending',
  start_date DATETIME NOT NULL,
  end_date DATETIME NOT NULL,
  mercado_pago_id VARCHAR(255),
  payment_method VARCHAR(100),
  auto_renew BOOLEAN DEFAULT true,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

#### Tabla: payments
```sql
CREATE TABLE payments (
  id VARCHAR(255) PRIMARY KEY,
  subscription_id VARCHAR(255),
  user_id VARCHAR(255) NOT NULL,
  plan_id VARCHAR(50) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'ARS',
  mp_preference_id VARCHAR(255),
  mp_payment_id VARCHAR(255),
  status ENUM('pending', 'approved', 'rejected', 'cancelled') DEFAULT 'pending',
  payment_method VARCHAR(100),
  external_reference VARCHAR(255),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (subscription_id) REFERENCES subscriptions(id)
);
```

### 🔧 3. ENDPOINTS REQUERIDOS

#### **POST /api/payments/create**
**Propósito:** Crear preferencia de pago en MercadoPago
**Body esperado:**
```json
{
  "planId": "pro",
  "userId": "user123",
  "email": "user@example.com",
  "firstName": "Juan",
  "lastName": "Pérez"
}
```

**Código de ejemplo:**
```typescript
@Post('create')
async createPayment(@Body() paymentData: PaymentRequest) {
  // 1. Validar que el usuario existe
  const user = await this.userService.findById(paymentData.userId);
  if (!user) throw new NotFoundException('Usuario no encontrado');

  // 2. Obtener el plan seleccionado
  const plan = this.getSubscriptionPlan(paymentData.planId);
  if (!plan) throw new BadRequestException('Plan no válido');

  // 3. Crear referencia externa única
  const externalReference = `${paymentData.userId}-${paymentData.planId}-${Date.now()}`;

  // 4. Configurar preferencia de MercadoPago
  const preference = {
    items: [{
      title: `Suscripción ${plan.name} - FinancePR`,
      quantity: 1,
      currency_id: 'ARS',
      unit_price: plan.price,
      description: plan.description
    }],
    payer: {
      email: paymentData.email,
      name: paymentData.firstName,
      surname: paymentData.lastName
    },
    back_urls: {
      success: `${process.env.FRONTEND_URL}/payment/success`,
      failure: `${process.env.FRONTEND_URL}/payment/failure`,
      pending: `${process.env.FRONTEND_URL}/payment/pending`
    },
    auto_return: 'approved',
    external_reference: externalReference,
    notification_url: `${process.env.BACKEND_URL}/api/webhooks/mercadopago`,
    expires: true,
    expiration_date_from: new Date().toISOString(),
    expiration_date_to: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 min
  };

  // 5. Crear preferencia en MercadoPago
  const mpResponse = await mercadopago.preferences.create(preference);

  // 6. Guardar registro de pago en BD
  await this.paymentService.create({
    id: mpResponse.body.id,
    userId: paymentData.userId,
    planId: paymentData.planId,
    amount: plan.price,
    currency: 'ARS',
    mp_preference_id: mpResponse.body.id,
    external_reference: externalReference,
    status: 'pending'
  });

  return {
    id: mpResponse.body.id,
    init_point: mpResponse.body.init_point,
    status: 'created',
    preference_id: mpResponse.body.id
  };
}
```

#### **GET /api/subscriptions/current**
**Propósito:** Obtener suscripción activa del usuario
```typescript
@Get('current')
@UseGuards(JwtAuthGuard)
async getCurrentSubscription(@Request() req) {
  const userId = req.user.id;
  
  const subscription = await this.subscriptionService.findActiveByUserId(userId);
  
  if (!subscription) {
    // Devolver plan gratuito por defecto
    return this.createFreeSubscription(userId);
  }
  
  // Verificar si la suscripción ha expirado
  if (new Date() > subscription.end_date) {
    await this.subscriptionService.expire(subscription.id);
    return this.createFreeSubscription(userId);
  }
  
  return subscription;
}
```

#### **GET /api/subscriptions/usage**
**Propósito:** Obtener uso actual de la suscripción
```typescript
@Get('usage')
@UseGuards(JwtAuthGuard)
async getUsage(@Request() req) {
  const userId = req.user.id;
  
  const subscription = await this.getCurrentSubscription(req);
  const assetCount = await this.portfolioService.countByUserId(userId);
  
  const maxAssets = subscription.plan.maxAssets;
  const canAddAsset = maxAssets === -1 || assetCount < maxAssets;
  const assetsRemaining = maxAssets === -1 ? 999 : Math.max(0, maxAssets - assetCount);
  
  return {
    userId,
    currentAssets: assetCount,
    maxAssets,
    plan: subscription.plan,
    canAddAsset,
    assetsRemaining
  };
}
```

#### **POST /api/subscriptions/cancel**
**Propósito:** Cancelar suscripción actual
```typescript
@Post('cancel')
@UseGuards(JwtAuthGuard)
async cancelSubscription(@Request() req) {
  const userId = req.user.id;
  
  const subscription = await this.subscriptionService.findActiveByUserId(userId);
  if (!subscription || subscription.plan_id === 'free') {
    throw new BadRequestException('No hay suscripción activa para cancelar');
  }
  
  await this.subscriptionService.cancel(subscription.id);
  
  return { success: true, message: 'Suscripción cancelada exitosamente' };
}
```

#### **POST /api/webhooks/mercadopago**
**Propósito:** Recibir notificaciones de MercadoPago
```typescript
@Post('mercadopago')
async handleMercadoPagoWebhook(@Body() body: any, @Headers() headers: any) {
  // 1. Validar webhook (opcional pero recomendado)
  // const isValid = this.validateWebhookSignature(body, headers);
  // if (!isValid) throw new UnauthorizedException('Webhook inválido');
  
  if (body.type === 'payment') {
    const paymentId = body.data.id;
    
    // 2. Obtener información del pago
    const paymentInfo = await mercadopago.payment.findById(paymentId);
    const payment = paymentInfo.body;
    
    // 3. Buscar el registro de pago en BD
    const paymentRecord = await this.paymentService.findByExternalReference(
      payment.external_reference
    );
    
    if (paymentRecord) {
      // 4. Actualizar estado del pago
      await this.paymentService.updateStatus(paymentRecord.id, payment.status);
      
      // 5. Si el pago fue aprobado, activar suscripción
      if (payment.status === 'approved') {
        await this.activateSubscription(paymentRecord);
      }
    }
  }
  
  return { received: true };
}
```

### 🔐 4. MIDDLEWARE DE VALIDACIÓN DE LÍMITES

#### Middleware para verificar límites antes de agregar activos:
```typescript
@Injectable()
export class SubscriptionLimitGuard implements CanActivate {
  constructor(
    private subscriptionService: SubscriptionService,
    private portfolioService: PortfolioService
  ) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;
    
    // Solo aplicar en rutas de creación de activos
    if (request.method !== 'POST' || !request.url.includes('/portfolio')) {
      return true;
    }
    
    const usage = await this.subscriptionService.getUsage(userId);
    
    if (!usage.canAddAsset) {
      throw new ForbiddenException(
        `Has alcanzado el límite de ${usage.maxAssets} activos de tu plan ${usage.plan.name}`
      );
    }
    
    return true;
  }
}
```

### 📊 5. SERVICIOS REQUERIDOS

#### SubscriptionService:
```typescript
@Injectable()
export class SubscriptionService {
  async findActiveByUserId(userId: string) {
    return this.subscriptionRepository.findOne({
      where: { 
        user_id: userId, 
        status: 'active',
        end_date: MoreThan(new Date())
      }
    });
  }
  
  async activate(paymentRecord: Payment) {
    const plan = this.getSubscriptionPlan(paymentRecord.plan_id);
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1); // 1 mes
    
    return this.subscriptionRepository.save({
      id: uuid(),
      user_id: paymentRecord.user_id,
      plan_id: paymentRecord.plan_id,
      status: 'active',
      start_date: startDate,
      end_date: endDate,
      mercado_pago_id: paymentRecord.mp_payment_id,
      auto_renew: true
    });
  }
  
  async cancel(subscriptionId: string) {
    return this.subscriptionRepository.update(subscriptionId, {
      status: 'cancelled',
      auto_renew: false
    });
  }
}
```

### 🔄 6. TAREAS ADICIONALES IMPORTANTES

#### A. Configurar CORS para el frontend:
```typescript
app.enableCors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
});
```

#### B. Agregar validación en creación de portfolio:
```typescript
@Post()
@UseGuards(JwtAuthGuard, SubscriptionLimitGuard)
async createPortfolioItem(@Body() createDto: CreatePortfolioDto, @Request() req) {
  return this.portfolioService.create({
    ...createDto,
    user_id: req.user.id
  });
}
```

#### C. Job para verificar suscripciones expiradas:
```typescript
@Cron('0 0 * * *') // Diario a medianoche
async checkExpiredSubscriptions() {
  const expired = await this.subscriptionRepository.find({
    where: {
      status: 'active',
      end_date: LessThan(new Date())
    }
  });
  
  for (const subscription of expired) {
    await this.subscriptionRepository.update(subscription.id, {
      status: 'expired'
    });
  }
}
```

### 🎯 7. PUNTOS CRÍTICOS A VERIFICAR

1. **Seguridad de Webhooks:** Validar que las notificaciones vengan realmente de MercadoPago
2. **Manejo de Estados:** Los pagos pueden tener estados: pending, approved, rejected, cancelled
3. **Expiración:** Verificar suscripciones expiradas regularmente
4. **Límites:** Aplicar middleware en TODAS las rutas de creación de activos
5. **Logging:** Registrar todas las transacciones para auditoría
6. **Testing:** Usar ambiente sandbox de MercadoPago para pruebas

### 🚀 8. ORDEN DE IMPLEMENTACIÓN RECOMENDADO

1. ✅ Configurar base de datos y migraciones
2. ✅ Implementar modelos y servicios básicos
3. ✅ Crear endpoint de creación de pagos
4. ✅ Implementar webhook de MercadoPago
5. ✅ Crear endpoints de suscripciones
6. ✅ Agregar middleware de límites
7. ✅ Implementar job de verificación de expirados
8. ✅ Testing completo con ambiente sandbox

### 📝 9. COMPATIBILIDAD CON FRONTEND ACTUAL

El backend debe ser compatible con estas llamadas del frontend:
- `localSubscriptionService.createPayment(planId)` → `POST /api/payments/create`
- `localSubscriptionService.getCurrentSubscription()` → `GET /api/subscriptions/current`
- `localSubscriptionService.getSubscriptionUsage()` → `GET /api/subscriptions/usage`
- `localSubscriptionService.canAddAsset()` → Verificar en middleware
- `localSubscriptionService.cancelSubscription()` → `POST /api/subscriptions/cancel`

---

## 🎨 CONFIGURACIÓN DEL FRONTEND (Ya implementado)

### 1. Instalar dependencias
```bash
npm install mercadopago react-hot-toast
```

### 2. Variables de entorno
Crear un archivo `.env` basado en `.env.example`:
```env
VITE_API_URL=http://localhost:3000/api
VITE_MP_PUBLIC_KEY=tu_clave_publica_mercadopago
```

### 3. Estado Actual del Frontend
✅ **Implementado y funcionando:**
- Sistema de planes de suscripción
- Interfaz de usuario completa
- Limitaciones de activos
- Notificaciones con toast
- Servicio local para pruebas
- Banner de estado de suscripción
- FAQ integrado

### 4. Cómo cambiar de Local a Backend
Una vez que el backend esté listo, solo necesitas:

1. **Actualizar el servicio en el frontend:**
```typescript
// En src/components/Subscriptions.tsx y useSubscriptionLimits.ts
// Cambiar:
import { localSubscriptionService } from '../services/localSubscriptionService';
// Por:
import { subscriptionService } from '../services/subscriptionService';
```

2. **Actualizar variable de entorno:**
```env
VITE_API_URL=http://tu-backend-url/api
```

---

## 📊 FUNCIONALIDADES IMPLEMENTADAS

### Planes de Suscripción
- **Plan Gratuito**: 5 activos, funciones básicas
- **Plan Básico**: 15 activos, $2,990 ARS/mes
- **Plan Pro**: 50 activos, $5,990 ARS/mes (Popular)
- **Plan Premium**: Activos ilimitados, $9,990 ARS/mes

### Sistema de Limitaciones
- Verificación automática de límites antes de agregar activos
- Notificaciones cuando se alcanza el límite
- Actualización en tiempo real del uso de la suscripción

### Integración MercadoPago
- Creación automática de preferencias de pago
- Redirección a MercadoPago para procesar pagos
- Manejo de callbacks de éxito y falla
- Verificación del estado de pagos

### UI/UX
- Diseño responsive con Tailwind CSS y DaisyUI
- Notificaciones con react-hot-toast
- Indicadores de progreso y estados de carga
- FAQ y documentación de usuario

---

## 🔄 FLUJO COMPLETO DE SUSCRIPCIÓN

### Frontend → Backend:
1. **Usuario selecciona plan** → `POST /api/payments/create`
2. **Backend crea preferencia** → Responde con `init_point`
3. **Redirección a MercadoPago** → Usuario completa el pago
4. **MercadoPago notifica backend** → `POST /api/webhooks/mercadopago`
5. **Backend activa suscripción** → Actualiza BD
6. **Usuario regresa a app** → Frontend consulta nueva suscripción
7. **Aplicación de límites** → Middleware valida automáticamente

---

## 📁 ESTRUCTURA DE ARCHIVOS

### Frontend (Ya implementado):
```
src/
├── components/
│   ├── Subscriptions.tsx          # Página principal de suscripciones
│   ├── SubscriptionBanner.tsx     # Banner de estado
│   ├── PaymentStatus.tsx          # Páginas de éxito/falla
│   └── Finance.tsx                # Finanzas con limitaciones
├── hooks/
│   └── useSubscriptionLimits.ts   # Hook para manejar límites
├── services/
│   ├── subscriptionService.ts     # Servicio para backend (futuro)
│   └── localSubscriptionService.ts # Servicio local (actual)
├── types/
│   └── Subscription.ts            # Tipos TypeScript
└── data/
    └── subscriptionPlans.ts       # Definición de planes
```

### Backend (Por implementar):
```
src/
├── controllers/
│   ├── payments.controller.ts
│   ├── subscriptions.controller.ts
│   └── webhooks.controller.ts
├── services/
│   ├── payment.service.ts
│   ├── subscription.service.ts
│   └── mercadopago.service.ts
├── guards/
│   └── subscription-limit.guard.ts
├── entities/
│   ├── subscription.entity.ts
│   └── payment.entity.ts
└── dto/
    ├── create-payment.dto.ts
    └── webhook.dto.ts
```

---

## 🧪 TESTING

### Para probar con el sistema actual (Local):
1. Ir a `http://localhost:5176/subscriptions`
2. Seleccionar cualquier plan
3. El sistema simula el pago exitosamente
4. Verificar limitaciones en `/finance`
5. Usar botón "Limpiar Datos (Dev)" para resetear

### Para probar con backend real:
1. Usar credenciales de sandbox de MercadoPago
2. Navegar a `/subscriptions`
3. Seleccionar un plan y proceder al pago
4. Usar tarjetas de prueba de MercadoPago
5. Verificar webhook recibido correctamente
6. Confirmar que las limitaciones se apliquen

---

## 🚀 PRODUCCIÓN

### Checklist para producción:
- [ ] Cambiar a credenciales reales de MercadoPago
- [ ] Configurar SSL/HTTPS obligatorio
- [ ] Implementar logging completo de transacciones
- [ ] Configurar monitoreo de webhooks
- [ ] Implementar sistema de renovación automática
- [ ] Agregar alertas por fallos de pago
- [ ] Configurar backups de base de datos
- [ ] Implementar rate limiting en APIs
- [ ] Validar todos los casos edge de pagos
- [ ] Documentar procesos de soporte al cliente

---

## 🆘 SOPORTE Y CONTACTO

Si tienes dudas durante la implementación:
1. Revisar documentación oficial de MercadoPago
2. Verificar que las URLs de webhook sean accesibles públicamente
3. Usar herramientas como ngrok para testing local de webhooks
4. Monitorear logs de MercadoPago en su dashboard

**Nota:** El frontend ya está 100% funcional con el sistema local. El backend solo necesita implementar los endpoints especificados para que todo funcione perfectamente.
      email: paymentData.email
    },
    back_urls: {
      success: `${process.env.FRONTEND_URL}/payment/success`,
      failure: `${process.env.FRONTEND_URL}/payment/failure`,
      pending: `${process.env.FRONTEND_URL}/payment/pending`
    },
    auto_return: 'approved',
    external_reference: `${paymentData.userId}-${paymentData.planId}`
  };
  
  const response = await mercadopago.preferences.create(preference);
  return response.body;
}
```

#### GET /api/payments/status/:id
Verificar estado del pago:
```typescript
@Get('status/:id')
async checkPaymentStatus(@Param('id') paymentId: string) {
  const payment = await mercadopago.payment.findById(paymentId);
  return payment.body;
}
```

#### GET /api/subscriptions/current
Obtener suscripción actual del usuario:
```typescript
@Get('current')
async getCurrentSubscription(@Request() req) {
  // Buscar suscripción activa del usuario
  return userSubscription;
}
```

#### GET /api/subscriptions/usage
Obtener uso de la suscripción:
```typescript
@Get('usage')
async getUsage(@Request() req) {
  const subscription = await this.getCurrentSubscription(req);
  const assetCount = await this.getAssetCount(req.user.id);
  
  return {
    currentAssets: assetCount,
    maxAssets: subscription.plan.maxAssets,
    canAddAsset: assetCount < subscription.plan.maxAssets || subscription.plan.maxAssets === -1
  };
}
```

## Funcionalidades Implementadas

### Planes de Suscripción
- **Plan Gratuito**: 5 activos, funciones básicas
- **Plan Básico**: 15 activos, $2,990 ARS/mes
- **Plan Pro**: 50 activos, $5,990 ARS/mes (Popular)
- **Plan Premium**: Activos ilimitados, $9,990 ARS/mes

### Sistema de Limitaciones
- Verificación automática de límites antes de agregar activos
- Notificaciones cuando se alcanza el límite
- Actualización en tiempo real del uso de la suscripción

### Integración MercadoPago
- Creación automática de preferencias de pago
- Redirección a MercadoPago para procesar pagos
- Manejo de callbacks de éxito y falla
- Verificación del estado de pagos

### UI/UX
- Diseño responsive con Tailwind CSS y DaisyUI
- Notificaciones con react-hot-toast
- Indicadores de progreso y estados de carga
- FAQ y documentación de usuario

## Flujo de Suscripción

1. **Usuario selecciona plan** → Se crea preferencia en MercadoPago
2. **Redirección a MercadoPago** → Usuario completa el pago
3. **Callback de éxito/falla** → Frontend recibe respuesta
4. **Actualización de suscripción** → Backend actualiza estado del usuario
5. **Aplicación de límites** → Sistema aplica nuevos límites automáticamente

## Estructura de Archivos

```
src/
├── components/
│   ├── Subscriptions.tsx          # Página principal de suscripciones
│   ├── PaymentStatus.tsx          # Páginas de éxito/falla de pago
│   └── Finance.tsx                # Finanzas con limitaciones
├── hooks/
│   └── useSubscriptionLimits.ts   # Hook para manejar límites
├── services/
│   └── subscriptionService.ts     # Servicio de suscripciones
├── types/
│   └── Subscription.ts            # Tipos TypeScript
└── data/
    └── subscriptionPlans.ts       # Definición de planes
```

## Testing

Para probar el sistema:
1. Usar las credenciales de prueba de MercadoPago
2. Navegar a `/subscriptions`
3. Seleccionar un plan y proceder al pago
4. Usar tarjetas de prueba de MercadoPago
5. Verificar que las limitaciones se apliquen correctamente

## Producción

Para producción:
1. Cambiar a credenciales reales de MercadoPago
2. Configurar webhook para recibir notificaciones de pago
3. Implementar sistema de renovación automática
4. Agregar logging y monitoreo de transacciones
