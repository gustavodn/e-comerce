import { ref, onMounted, onUnmounted } from 'vue';
import { useProductsStore } from '@/stores/products';

export function useInfiniteScroll() {
  const productsStore = useProductsStore();
  const loading = ref(false);
  const page = ref(1);
  const perPage = 10;

  const loadMore = async () => {
    if (loading.value) return;
    
    loading.value = true;
    try {
      await productsStore.fetchProducts(page.value, perPage);
      page.value++;
    } finally {
      loading.value = false;
    }
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollHeight - scrollTop <= clientHeight * 1.5) {
      loadMore();
    }
  };

  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    loadMore();
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  return {
    loading,
  };
} 