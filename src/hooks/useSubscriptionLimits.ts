import { useState, useEffect } from 'react';
import { realSubscriptionService } from '../services/realSubscriptionService';
import { SubscriptionUsage } from '../types/Subscription';
import toast from 'react-hot-toast';

export const useSubscriptionLimits = () => {
  const [usage, setUsage] = useState<SubscriptionUsage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsage();
  }, []);

  const loadUsage = async () => {
    try {
      setLoading(true);
  const usageData = await realSubscriptionService.getSubscriptionUsage();
      setUsage(usageData);
    } catch (error) {
      console.error('Error loading subscription usage:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkAssetLimit = async (): Promise<boolean> => {
  const canAdd = await realSubscriptionService.canAddAsset();
    if (!canAdd && usage) {
      toast.error(
        `Has alcanzado el límite de ${usage.maxAssets === -1 ? 'activos ilimitados' : usage.maxAssets + ' activos'} de tu plan ${usage.plan.name}. Actualiza tu plan para agregar más activos.`,
        { duration: 5000 }
      );
    }
    return canAdd;
  };

  const refreshUsage = () => {
    loadUsage();
  };

  return {
    usage,
    loading,
    checkAssetLimit,
    refreshUsage
  };
};
