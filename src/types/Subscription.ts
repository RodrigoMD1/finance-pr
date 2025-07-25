export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  features: string[];
  maxAssets: number;
  duration: 'monthly' | 'yearly';
  popular?: boolean;
  color: string;
  icon: string;
}

export interface UserSubscription {
  id: string;
  userId: string;
  planId: string;
  plan: SubscriptionPlan;
  status: 'active' | 'inactive' | 'pending' | 'cancelled' | 'expired';
  startDate: Date;
  endDate: Date;
  mercadoPagoId?: string;
  paymentMethod?: string;
  autoRenew: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentRequest {
  planId: string;
  userId: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface PaymentResponse {
  id: string;
  init_point: string;
  status: string;
  preference_id: string;
}

export interface SubscriptionUsage {
  userId: string;
  currentAssets: number;
  maxAssets: number;
  plan: SubscriptionPlan;
  canAddAsset: boolean;
  assetsRemaining: number;
}

export interface PaymentHistory {
  id: string;
  planId: string;
  planName: string;
  amount: number;
  currency: string;
  status: 'completed' | 'failed' | 'pending';
  date: Date;
  method: string;
}
