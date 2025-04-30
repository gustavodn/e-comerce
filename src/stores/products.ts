import { defineStore } from 'pinia';
import api from '@/core/api';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_uuid: string;
  brand_uuid: string;
  color_uuid: string;
}

interface Category {
  uuid: string;
  name: string;
}

interface Brand {
  uuid: string;
  name: string;
}

interface Color {
  uuid: string;
  name: string;
}

interface ProductsState {
  items: Product[];
  categories: Category[];
  brands: Brand[];
  colors: Color[];
  loading: boolean;
  error: string | null;
  total: number;
  currentPage: number;
  filters: {
    search: string;
    category: string | null;
    brand: string | null;
    color: string | null;
  };
}

export const useProductsStore = defineStore('products', {
  state: (): ProductsState => ({
    items: [],
    categories: [],
    brands: [],
    colors: [],
    loading: false,
    error: null,
    total: 0,
    currentPage: 1,
    filters: {
      search: '',
      category: null,
      brand: null,
      color: null,
    },
  }),

  actions: {
    async fetchProducts(page = 1, perPage = 12, filters?: Partial<ProductsState['filters']>) {
      this.loading = true;
      this.error = null;
      this.currentPage = page;

      if (filters) {
        this.filters = { ...this.filters, ...filters };
      }

      try {
        const params: any = {
          page,
          per_page: perPage,
        };

        if (this.filters.search) {
          params.search_key = this.filters.search;
        }
        if (this.filters.category) {
          params.category_uuid = this.filters.category;
        }
        if (this.filters.brand) {
          params.brand_uuid = this.filters.brand;
        }
        if (this.filters.color) {
          params.color_uuid = this.filters.color;
        }

        const response = await api.get('/shop', { params });
        this.items = response.data.data;
        this.total = response.data.total;
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to fetch products';
      } finally {
        this.loading = false;
      }
    },

    async fetchCategories() {
      try {
        const response = await api.get('/shop/categories');
        this.categories = response.data.data;
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to fetch categories';
      }
    },

    async fetchBrands() {
      try {
        const response = await api.get('/shop/brands');
        this.brands = response.data.data;
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to fetch brands';
      }
    },

    async fetchColors() {
      try {
        const response = await api.get('/shop/colors');
        this.colors = response.data.data;
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to fetch colors';
      }
    },

    setFilters(filters: Partial<ProductsState['filters']>) {
      this.filters = { ...this.filters, ...filters };
    },

    clearFilters() {
      this.filters = {
        search: '',
        category: null,
        brand: null,
        color: null,
      };
    },
  },
}); 