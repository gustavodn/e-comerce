<template>
  <div>
    <v-row>
      <v-col cols="12" md="3">
        <v-card class="mb-4">
          <v-card-title>Filters</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="searchQuery"
              label="Search"
              prepend-icon="mdi-magnify"
              clearable
            ></v-text-field>

            <v-select
              v-model="selectedCategory"
              :items="categories"
              label="Category"
              item-title="name"
              item-value="uuid"
              clearable
            ></v-select>

            <v-select
              v-model="selectedBrand"
              :items="brands"
              label="Brand"
              item-title="name"
              item-value="uuid"
              clearable
            ></v-select>

            <v-select
              v-model="selectedColor"
              :items="colors"
              label="Color"
              item-title="name"
              item-value="uuid"
              clearable
            ></v-select>

            <v-btn
              color="primary"
              block
              @click="clearFilters"
            >
              Clear Filters
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="9">
        <v-row>
          <v-col
            v-for="product in productsStore.items"
            :key="product.id"
            cols="12"
            sm="6"
            md="4"
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
                  @click="addToCart(product.id)"
                  :loading="cartStore.loading"
                >
                  Add to Cart
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <div v-if="productsStore.loading" class="text-center my-4">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>

        <div v-if="productsStore.error" class="text-center my-4">
          <v-alert type="error">
            {{ productsStore.error }}
          </v-alert>
        </div>

        <v-row>
          <v-col cols="12">
            <v-pagination
              v-model="currentPage"
              :length="Math.ceil(productsStore.total / itemsPerPage)"
              :total-visible="5"
              color="primary"
              @input="fetchProducts"
            ></v-pagination>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useProductsStore } from '@/stores/products';
import { useCartStore } from '@/stores/cart';
import { useProductSearch } from '@/composables/useProductSearch';
import { useFilterOptions } from '@/composables/useFilterOptions';

const productsStore = useProductsStore();
const cartStore = useCartStore();
const {
  searchQuery,
  selectedCategory,
  selectedBrand,
  selectedColor,
  clearFilters,
} = useProductSearch();

const { fetchCategories, fetchBrands, fetchColors } = useFilterOptions();
const loadingFilters = ref(false);

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

const categories = ref<Category[]>([]);
const brands = ref<Brand[]>([]);
const colors = ref<Color[]>([]);

const currentPage = ref(1);
const itemsPerPage = 12; // Adjust as needed

const fetchProducts = async () => {
  productsStore.loading = true;
  try {
    await productsStore.fetchProducts(currentPage.value, itemsPerPage, {
      search: searchQuery.value,
      category: selectedCategory.value,
      brand: selectedBrand.value,
      color: selectedColor.value
    });
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    productsStore.loading = false;
  }
};

onMounted(async () => {
  loadingFilters.value = true;
  try {
    await fetchProducts();
    categories.value = await fetchCategories();
    brands.value = await fetchBrands();
    colors.value = await fetchColors();
  } catch (error) {
    console.error('Error fetching filter options:', error);
  } finally {
    loadingFilters.value = false;
  }
});

const addToCart = async (productId: string) => {
  await cartStore.addToCart(productId);
};
</script>