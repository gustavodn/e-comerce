import { defineStore } from 'pinia';
import api from '@/core/api';

interface AuthState {
  token: string | null;
  user: any | null;
  loading: boolean;
  error: string | null;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('auth_token'),
    user: null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(email: string, password: string) {
      this.loading = true;
      this.error = null;

      try {
        const response = await api.post('/login', { email, password }, {
        });
        const { token } = response.data.data;
        

        this.token = token;
        localStorage.setItem('auth_token', token);

        // Fetch user data if needed
        // await this.fetchUser();

        return true;
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Login failed';
        return false;
      } finally {
        this.loading = false;
      }
    },

    async register(data: RegisterData) {
      this.loading = true;
      this.error = null;
      
      try {
        await api.post('/register', data);
        return true;
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Registration failed';
        return false;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('auth_token');
    },

    clearError() {
      this.error = null;
    }
  },
});