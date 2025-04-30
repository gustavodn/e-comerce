import { ref, watch } from 'vue';
import { useProductsStore } from '@/stores/products';
import { useDebounceFn } from '@vueuse/core';

export function useProductSearch() {
  const productsStore = useProductsStore();
  const searchQuery = ref('');
  const selectedCategory = ref<string | null>(null);
  const selectedBrand = ref<string | null>(null);
  const selectedColor = ref<string | null>(null);

  const debouncedSearch = useDebounceFn(() => {
    productsStore.setFilters({
      search: searchQuery.value,
      category: selectedCategory.value,
      brand: selectedBrand.value,
      color: selectedColor.value,
    });
    productsStore.fetchProducts(1);
  }, 500);

  watch([searchQuery, selectedCategory, selectedBrand, selectedColor], () => {
    debouncedSearch();
  });

  const clearFilters = () => {
    searchQuery.value = '';
    selectedCategory.value = null;
    selectedBrand.value = null;
    selectedColor.value = null;
    productsStore.clearFilters();
    productsStore.fetchProducts(1);
  };

  return {
    searchQuery,
    selectedCategory,
    selectedBrand,
    selectedColor,
    clearFilters,
  };
} 