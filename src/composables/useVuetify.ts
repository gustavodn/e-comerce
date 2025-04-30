import { getCurrentInstance } from 'vue';
import type { Vuetify } from 'vuetify';

export const useVuetify = (): Vuetify | null => {
  const instance = getCurrentInstance();
  return instance?.appContext.config.globalProperties.$vuetify || null;
}; 