import { defineStore } from 'pinia';
import { useVuetify } from '@/composables/useVuetify';

interface ThemeState {
  isDark: boolean;
}

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => ({
    isDark: localStorage.getItem('theme') === 'dark'
  }),

  actions: {
    toggleTheme() {
      this.isDark = !this.isDark;
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
      
      // Update Vuetify theme
      const vuetify = useVuetify();
      if (vuetify) {
        vuetify.theme.global.name.value = this.isDark ? 'dark' : 'light';
      }
    }
  }
}); 