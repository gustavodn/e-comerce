import { getCurrentInstance } from 'vue';

export const useVuetify = (): any => {
  const instance = getCurrentInstance();
  return instance?.appContext.config.globalProperties.$vuetify || null;
}; 