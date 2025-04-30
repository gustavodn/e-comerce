import { defineStore } from 'pinia';
import api from '@/core/api';

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product: {
    name: string;
    price: number;
    // Add other product properties as needed
  };
}

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
    loading: false,
    error: null,
  }),

  getters: {
    totalItems: (state) => state.items.length,
    totalPrice: (state) => 
      state.items.reduce((total, item) => total + (item.product.price * item.quantity), 0),
  },

  actions: {
    async addToCart(productId: string, quantity: number = 1) {
      this.loading = true;
      this.error = null;

      try {
        await api.post('/carts', {
          product_id: productId,
          stock: quantity,
        });

        // After successful addition, fetch updated cart
        await this.fetchCart();
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to add item to cart';
      } finally {
        this.loading = false;
      }
    },

    async fetchCart() {
      this.loading = true;
      this.error = null;

      try {
        const response = await api.get('/carts');
        this.items = response.data.data;
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to fetch cart';
      } finally {
        this.loading = false;
      }
    },

    async removeFromCart(cartItemId: string) {
      this.loading = true;
      this.error = null;

      try {
        await api.delete(`/carts/${cartItemId}`);
        await this.fetchCart();
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to remove item from cart';
      } finally {
        this.loading = false;
      }
    },

    async updateQuantity(cartItemId: string, quantity: number) {
      this.loading = true;
      this.error = null;

      try {
        await api.put(`/carts/${cartItemId}`, { stock: quantity });
        await this.fetchCart();
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to update quantity';
      } finally {
        this.loading = false;
      }
    },
  },
});