# 🛠️ Plan de Implementación Técnica - Mejoras al Modelo de Negocio

## 📋 Checklist de Implementación

### ✅ FASE 1: Quick Wins (Esta Semana)

#### 1.1 Agregar Plan "Starter" ($999)
**Archivo:** `src/data/subscriptionPlans.ts`

```typescript
// Agregar después del plan free:
{
  id: 'starter',
  name: 'Plan Iniciado',
  price: 999,
  currency: 'ARS',
  description: 'Tu primer paso hacia el éxito financiero',
  features: [
    'Hasta 10 activos financieros',
    'Estadísticas avanzadas',
    'Acceso a contenido educativo premium',
    'Soporte por chat en horario laboral',
    '7 días de prueba gratis' // ⭐
  ],
  maxAssets: 10,
  duration: 'monthly',
  color: 'bg-indigo-50',
  icon: '🌟',
  trial: true,
  trialDays: 7
}
```

**Actualización de Types:**
```typescript
// src/types/Subscription.ts
export interface SubscriptionPlan {
  // ... campos existentes
  trial?: boolean;           // 🆕
  trialDays?: number;        // 🆕
  yearlyPrice?: number;      // 🆕 Para descuento anual
  yearlyDiscount?: number;   // 🆕 Porcentaje de descuento
}
```

#### 1.2 Ajustar Precios Existentes (Opcional)
```typescript
// Cambios sugeridos:
basic: {
  price: 2499,  // antes 2990
  maxAssets: 20 // antes 15
}

pro: {
  price: 4999,  // antes 5990
  maxAssets: 75 // antes 50
}
```

---

### ✅ FASE 2: Sistema de Trial (2-3 días)

#### 2.1 Backend - Endpoint de Trial
**Nuevo archivo:** `backend/routes/trial.js`

```javascript
// POST /api/trial/start
router.post('/start', authMiddleware, async (req, res) => {
  const { planId } = req.body;
  const userId = req.user.id;
  
  // Verificar que el plan tenga trial
  const plan = getPlans().find(p => p.id === planId && p.trial);
  if (!plan) {
    return res.status(400).json({ message: 'Plan no tiene trial disponible' });
  }
  
  // Verificar que el usuario no haya usado trial antes
  const hasUsedTrial = await db.query(
    'SELECT * FROM trial_history WHERE user_id = $1 AND plan_id = $2',
    [userId, planId]
  );
  
  if (hasUsedTrial.rows.length > 0) {
    return res.status(400).json({ message: 'Ya has usado el trial de este plan' });
  }
  
  // Crear suscripción con trial
  const trialEndDate = new Date();
  trialEndDate.setDate(trialEndDate.getDate() + plan.trialDays);
  
  await db.query(
    `INSERT INTO subscriptions (user_id, plan_id, status, trial, trial_end_date, start_date, end_date)
     VALUES ($1, $2, 'active', true, $3, NOW(), $4)`,
    [userId, planId, trialEndDate, trialEndDate]
  );
  
  // Registrar en historial
  await db.query(
    'INSERT INTO trial_history (user_id, plan_id, started_at) VALUES ($1, $2, NOW())',
    [userId, planId]
  );
  
  res.json({ message: 'Trial iniciado', trialEndDate });
});
```

#### 2.2 Frontend - UI de Trial
**Archivo:** `src/components/Subscriptions.tsx`

```typescript
// Agregar nuevo botón para planes con trial
{plan.trial && !currentSubscription && (
  <button 
    className="btn btn-outline w-full"
    onClick={() => handleStartTrial(plan)}
  >
    🎁 Probar {plan.trialDays} días GRATIS
  </button>
)}

const handleStartTrial = async (plan: SubscriptionPlan) => {
  try {
    const response = await fetch(`${API_BASE_URL}/trial/start`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ planId: plan.id })
    });
    
    if (response.ok) {
      const data = await response.json();
      toast.success(`¡Trial activado! Tienes hasta ${new Date(data.trialEndDate).toLocaleDateString()}`);
      loadSubscriptionData(); // Refrescar
    } else {
      const error = await response.json();
      toast.error(error.message || 'Error al iniciar trial');
    }
  } catch (error) {
    toast.error('Error al iniciar trial');
  }
};
```

---

### ✅ FASE 3: Facturación Anual (3-4 días)

#### 3.1 Agregar Precios Anuales
**Archivo:** `src/data/subscriptionPlans.ts`

```typescript
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'starter',
    name: 'Plan Iniciado',
    price: 999,              // mensual
    yearlyPrice: 9990,       // anual (12 meses por precio de 10)
    yearlyDiscount: 17,      // 17% = 2 meses gratis
    // ...resto
  },
  {
    id: 'basic',
    price: 2499,
    yearlyPrice: 24990,      // ahorro de ~$5,000
    yearlyDiscount: 17,
    // ...
  }
  // ... aplicar a todos
];
```

#### 3.2 Toggle Mensual/Anual
**Componente:** `src/components/Subscriptions.tsx`

```typescript
const Subscriptions = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  
  return (
    <>
      {/* Toggle Mensual/Anual */}
      <div className="flex justify-center items-center gap-4 mb-8">
        <button
          className={`px-6 py-2 rounded-lg ${billingCycle === 'monthly' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setBillingCycle('monthly')}
        >
          Mensual
        </button>
        <button
          className={`px-6 py-2 rounded-lg ${billingCycle === 'yearly' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setBillingCycle('yearly')}
        >
          Anual
          <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded">
            Ahorra 17%
          </span>
        </button>
      </div>
      
      {/* Cards de planes */}
      {plans.map(plan => {
        const price = billingCycle === 'yearly' && plan.yearlyPrice 
          ? plan.yearlyPrice 
          : plan.price;
        
        const priceLabel = billingCycle === 'yearly'
          ? `$${price.toLocaleString()}/año`
          : `$${price.toLocaleString()}/mes`;
        
        return (
          <div key={plan.id}>
            <h3>{priceLabel}</h3>
            {billingCycle === 'yearly' && plan.yearlyDiscount && (
              <span className="text-green-600">
                Ahorras {plan.yearlyDiscount}%
              </span>
            )}
          </div>
        );
      })}
    </>
  );
};
```

---

### ✅ FASE 4: Dashboard de Métricas Admin (1 semana)

#### 4.1 Nuevo Componente Admin
**Archivo:** `src/components/admin/MetricsDashboard.tsx`

```typescript
import { useEffect, useState } from 'react';
import { FaDollarSign, FaUsers, FaChartLine, FaExclamationTriangle } from 'react-icons/fa';

interface Metrics {
  mrr: number;              // Monthly Recurring Revenue
  arr: number;              // Annual Recurring Revenue
  totalUsers: number;
  paidUsers: number;
  freeUsers: number;
  churnRate: number;        // % de cancelaciones
  conversionRate: number;   // free -> paid
  arpu: number;             // Average Revenue Per User
}

export const MetricsDashboard = () => {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchMetrics();
  }, []);
  
  const fetchMetrics = async () => {
    const response = await fetch(`${API_BASE_URL}/admin/metrics`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    const data = await response.json();
    setMetrics(data);
    setLoading(false);
  };
  
  if (loading) return <div>Cargando métricas...</div>;
  if (!metrics) return <div>Error al cargar métricas</div>;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {/* MRR */}
      <MetricCard
        title="MRR"
        value={`$${metrics.mrr.toLocaleString()}`}
        subtitle="Ingresos Recurrentes Mensuales"
        icon={<FaDollarSign />}
        trend={+15} // % de crecimiento
        color="green"
      />
      
      {/* Usuarios */}
      <MetricCard
        title="Usuarios"
        value={metrics.totalUsers}
        subtitle={`${metrics.paidUsers} pagantes / ${metrics.freeUsers} free`}
        icon={<FaUsers />}
        color="blue"
      />
      
      {/* Conversión */}
      <MetricCard
        title="Conversión"
        value={`${metrics.conversionRate.toFixed(1)}%`}
        subtitle="Free → Paid"
        icon={<FaChartLine />}
        trend={+5}
        color="purple"
      />
      
      {/* Churn */}
      <MetricCard
        title="Churn Rate"
        value={`${metrics.churnRate.toFixed(1)}%`}
        subtitle="Cancelaciones"
        icon={<FaExclamationTriangle />}
        trend={-2} // negativo es bueno aquí
        color={metrics.churnRate > 5 ? 'red' : 'green'}
      />
      
      {/* ARPU */}
      <MetricCard
        title="ARPU"
        value={`$${metrics.arpu.toLocaleString()}`}
        subtitle="Ingreso Promedio por Usuario"
        icon={<FaDollarSign />}
        color="indigo"
      />
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  trend?: number;
  color: string;
}

const MetricCard = ({ title, value, subtitle, icon, trend, color }: MetricCardProps) => (
  <div className={`bg-${color}-50 border border-${color}-200 rounded-lg p-6`}>
    <div className="flex items-center justify-between mb-2">
      <span className={`text-${color}-600 text-2xl`}>{icon}</span>
      {trend && (
        <span className={`text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </span>
      )}
    </div>
    <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
    <p className="text-sm text-gray-600">{title}</p>
    <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
  </div>
);
```

#### 4.2 Backend - Endpoint de Métricas
**Archivo:** `backend/routes/admin/metrics.js`

```javascript
// GET /api/admin/metrics
router.get('/metrics', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    // MRR: suma de todas las suscripciones activas mensuales
    const mrrQuery = await db.query(`
      SELECT SUM(p.price) as mrr
      FROM subscriptions s
      JOIN plans p ON s.plan_id = p.id
      WHERE s.status = 'active' AND s.trial = false
    `);
    const mrr = mrrQuery.rows[0]?.mrr || 0;
    
    // ARR: MRR * 12
    const arr = mrr * 12;
    
    // Usuarios
    const usersQuery = await db.query(`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN plan_id != 'free' THEN 1 END) as paid,
        COUNT(CASE WHEN plan_id = 'free' THEN 1 END) as free
      FROM users u
      LEFT JOIN subscriptions s ON u.id = s.user_id AND s.status = 'active'
    `);
    const users = usersQuery.rows[0];
    
    // Churn Rate: cancelados este mes / activos mes pasado
    const churnQuery = await db.query(`
      SELECT 
        (SELECT COUNT(*) FROM subscriptions 
         WHERE status = 'canceled' 
         AND canceled_at >= NOW() - INTERVAL '30 days') as canceled,
        (SELECT COUNT(*) FROM subscriptions 
         WHERE status = 'active' 
         AND start_date < NOW() - INTERVAL '30 days') as active_last_month
    `);
    const churnData = churnQuery.rows[0];
    const churnRate = churnData.active_last_month > 0 
      ? (churnData.canceled / churnData.active_last_month) * 100 
      : 0;
    
    // Conversion Rate: nuevos pagantes últimos 30 días / nuevos registros
    const conversionQuery = await db.query(`
      SELECT 
        (SELECT COUNT(*) FROM subscriptions 
         WHERE plan_id != 'free' 
         AND start_date >= NOW() - INTERVAL '30 days') as new_paid,
        (SELECT COUNT(*) FROM users 
         WHERE created_at >= NOW() - INTERVAL '30 days') as new_users
    `);
    const conversionData = conversionQuery.rows[0];
    const conversionRate = conversionData.new_users > 0
      ? (conversionData.new_paid / conversionData.new_users) * 100
      : 0;
    
    // ARPU: MRR / usuarios pagantes
    const arpu = users.paid > 0 ? mrr / users.paid : 0;
    
    res.json({
      mrr,
      arr,
      totalUsers: parseInt(users.total),
      paidUsers: parseInt(users.paid),
      freeUsers: parseInt(users.free),
      churnRate,
      conversionRate,
      arpu
    });
  } catch (error) {
    console.error('Error fetching metrics:', error);
    res.status(500).json({ message: 'Error al obtener métricas' });
  }
});
```

---

### ✅ FASE 5: Programa de Referidos (3-4 días)

#### 5.1 Sistema de Códigos de Referido
**Archivo:** `src/components/ReferralProgram.tsx`

```typescript
export const ReferralProgram = () => {
  const [referralCode, setReferralCode] = useState('');
  const [referrals, setReferrals] = useState<any[]>([]);
  
  useEffect(() => {
    fetchReferralData();
  }, []);
  
  const fetchReferralData = async () => {
    const response = await fetch(`${API_BASE_URL}/referrals/my-code`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    const data = await response.json();
    setReferralCode(data.code);
    setReferrals(data.referrals || []);
  };
  
  const copyToClipboard = () => {
    const url = `${window.location.origin}/register?ref=${referralCode}`;
    navigator.clipboard.writeText(url);
    toast.success('¡Enlace copiado!');
  };
  
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">🎁 Programa de Referidos</h2>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h3 className="font-bold mb-2">¡Invita y Gana!</h3>
        <ul className="list-disc list-inside space-y-1 text-sm mb-4">
          <li>Tu amigo recibe <strong>20% de descuento permanente</strong></li>
          <li>Tú recibes <strong>1 mes gratis</strong> por cada referido que pague</li>
          <li>Sin límites, invita a cuantos quieras</li>
        </ul>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={`${window.location.origin}/register?ref=${referralCode}`}
            readOnly
            className="flex-1 px-4 py-2 border rounded-lg"
          />
          <button
            onClick={copyToClipboard}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Copiar
          </button>
        </div>
      </div>
      
      {/* Lista de referidos */}
      <div>
        <h3 className="font-bold mb-4">Tus Referidos ({referrals.length})</h3>
        {referrals.length === 0 ? (
          <p className="text-gray-600">Aún no has referido a nadie</p>
        ) : (
          <div className="space-y-2">
            {referrals.map((ref, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>{ref.email}</span>
                <span className={`px-3 py-1 rounded text-sm ${
                  ref.isPaying ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                }`}>
                  {ref.isPaying ? '✓ Pagando' : 'Free'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
```

---

## 📊 Tablas de Base de Datos Necesarias

```sql
-- Trial history
CREATE TABLE trial_history (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  plan_id VARCHAR(50),
  started_at TIMESTAMP DEFAULT NOW(),
  ended_at TIMESTAMP,
  converted BOOLEAN DEFAULT FALSE
);

-- Referral codes
CREATE TABLE referral_codes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  code VARCHAR(20) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Referrals
CREATE TABLE referrals (
  id SERIAL PRIMARY KEY,
  referrer_id INTEGER REFERENCES users(id),
  referred_id INTEGER REFERENCES users(id),
  referral_code VARCHAR(20),
  status VARCHAR(20) DEFAULT 'pending',
  reward_claimed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Add-ons (futuro)
CREATE TABLE subscription_addons (
  id SERIAL PRIMARY KEY,
  subscription_id INTEGER REFERENCES subscriptions(id),
  addon_id VARCHAR(50),
  status VARCHAR(20) DEFAULT 'active',
  price DECIMAL(10,2),
  started_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🎯 Priorización de Implementación

### Alta Prioridad (Hacer ya):
1. ✅ Plan Starter
2. ✅ Trial de 7 días
3. ✅ Dashboard de métricas

### Media Prioridad (Próximas 2 semanas):
4. Facturación anual
5. Programa de referidos
6. A/B testing de precios

### Baja Prioridad (Futuro):
7. Add-ons premium
8. White-label
9. Pricing dinámico por región

---

## 💬 ¿Por dónde empezar?

**Mi recomendación:**
1. Primero ajusta los planes y precios (1 hora)
2. Luego implementa el trial (más impacto en conversión)
3. Después el dashboard de métricas (para medir todo)

¿Quieres que te ayude a implementar alguna de estas fases? 🚀
