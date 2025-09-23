// Servicio mínimo para diagnóstico y sincronización de datos en localStorage

export interface DataSummary {
  portfolioItems: number;
  subscriptionPlan: string;
  dataIntegrity: boolean;
}

const getPortfolioKey = (userId: string) => `portfolio_${userId}`;
const getBackupKey = (userId: string) => `portfolio_backup_${userId}`;
const getPlanKey = (userId: string) => `subscription_plan_${userId}`;

export const dataService = {
  async getDataSummary(userId: string): Promise<DataSummary> {
    const portfolioRaw = localStorage.getItem(getPortfolioKey(userId));
    let items: unknown[] = [];
    try {
      items = portfolioRaw ? JSON.parse(portfolioRaw) : [];
    } catch {
      items = [];
    }

    const plan = localStorage.getItem(getPlanKey(userId)) || localStorage.getItem('subscriptionPlan') || 'FREE';
    const integrity = Array.isArray(items) && items.every((it) => typeof it === 'object' && it !== null);

    return {
      portfolioItems: Array.isArray(items) ? items.length : 0,
      subscriptionPlan: plan,
      dataIntegrity: integrity,
    };
  },

  async initializeUserData(userId: string): Promise<void> {
    const portfolioKey = getPortfolioKey(userId);
    const backupKey = getBackupKey(userId);

    // Si no hay portfolio, intentar restaurar desde backup
    const current = localStorage.getItem(portfolioKey);
    if (!current) {
      const backup = localStorage.getItem(backupKey);
      if (backup) {
        localStorage.setItem(portfolioKey, backup);
        return;
      }
    }

    // Si hay datos en otras claves con 'portfolio', intentar consolidar
    const merged: unknown[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;
      if (key.includes('portfolio') && key !== portfolioKey && key !== backupKey) {
        try {
          const raw = localStorage.getItem(key);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) merged.push(...parsed);
          }
        } catch {
          // ignorar errores de parseo
        }
      }
    }

    if (merged.length > 0 && !current) {
      localStorage.setItem(portfolioKey, JSON.stringify(merged));
      localStorage.setItem(backupKey, JSON.stringify(merged));
    }
  },
};

export default dataService;
