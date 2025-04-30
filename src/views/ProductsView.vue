<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3">
        <v-card>
          <v-card-title>Filters</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="search"
              label="Search"
              @update:model-value="debouncedSearch"
              clearable
            ></v-text-field>

            <v-select
              v-model="selectedCategory"
              :items="categories"
              item-title="name"
              item-value="uuid"
              label="Category"
              clearable
              @update:model-value="handleFilterChange"
            ></v-select>

            <v-select
              v-model="selectedBrand"
              :items="brands"
              item-title="name"
              item-value="uuid"
              label="Brand"
              clearable
              @update:model-value="handleFilterChange"
            ></v-select>

            <v-select
              v-model="selectedColor"
              :items="colors"
              item-title="name"
              item-value="uuid"
              label="Color"
              clearable
              @update:model-value="handleFilterChange"
            ></v-select>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="9">
        <v-row>
          <v-col
            v-for="product in products"
            :key="product.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-img
                :src="product.image_url"
                height="200"
                cover
              ></v-img>
              <v-card-title>{{ product.name }}</v-card-title>
              <v-card-text>
                <div class="text-subtitle-1">${{ product.price }}</div>
                <div class="text-caption">{{ product.description }}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="primary"
                  @click="addToCart(product)"
                  :loading="cartStore.loading"
                >
                  Add to Cart
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <div v-if="loading" class="text-center my-4">
          <v-progress-circular indeterminate></v-progress-circular>
        </div>

        <div v-if="!loading && products.length === 0" class="text-center my-4">
          No products found
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useProductsStore } from '@/stores/products';
import { useCartStore } from '@/stores/cart';
import { debounce } from 'lodash-es';

const productsStore = useProductsStore();
const cartStore = useCartStore();

const search = ref('');
const selectedCategory = ref(null);
const selectedBrand = ref(null);
const selectedColor = ref(null);
const loading = ref(false);

const products = computed(() => productsStore.items);
const categories = computed(() => productsStore.categories);
const brands = computed(() => productsStore.brands);
const colors = computed(() => productsStore.colors);

const debouncedSearch = debounce(() => {
  handleFilterChange();
}, 500);

const handleFilterChange = async () => {
  loading.value = true;
  try {
    await productsStore.fetchProducts(1, 12, {
      search: search.value,
      category: selectedCategory.value,
      brand: selectedBrand.value,
      color: selectedColor.value
    });
  } finally {
    loading.value = false;
  }
};

const addToCart = async (product: any) => {
  try {
    await cartStore.addToCart(product.id, 1);
  } catch (error) {
    console.error('Failed to add to cart:', error);
  }
};

onMounted(async () => {
  await handleFilterChange();
});
</script> 