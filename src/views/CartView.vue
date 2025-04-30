<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>Shopping Cart</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="item in cartItems"
                :key="item.id"
              >
                <template v-slot:prepend>
                  <v-img
                    :src="item.product.image_url"
                    width="80"
                    height="80"
                    cover
                  ></v-img>
                </template>

                <v-list-item-title>{{ item.product.name }}</v-list-item-title>
                <v-list-item-subtitle>
                  ${{ item.product.price }} x {{ item.quantity }}
                </v-list-item-subtitle>

                <template v-slot:append>
                  <v-btn
                    icon
                    variant="text"
                    @click="updateQuantity(item.id, item.quantity - 1)"
                    :disabled="item.quantity <= 1"
                  >
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                  <span class="mx-2">{{ item.quantity }}</span>
                  <v-btn
                    icon
                    variant="text"
                    @click="updateQuantity(item.id, item.quantity + 1)"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    variant="text"
                    color="error"
                    @click="removeFromCart(item.id)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
              </v-list-item>
            </v-list>

            <div v-if="cartItems.length === 0" class="text-center my-4">
              Your cart is empty
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Order Summary</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-title>Subtotal</v-list-item-title>
                <v-list-item-subtitle>${{ totalPrice }}</v-list-item-subtitle>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-title>Total</v-list-item-title>
                <v-list-item-subtitle class="text-h6">${{ totalPrice }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>

            <v-btn
              color="primary"
              block
              class="mt-4"
              :disabled="cartItems.length === 0"
              @click="checkout"
            >
              Checkout
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useCartStore } from '@/stores/cart';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const router = useRouter();

const cartItems = computed(() => cartStore.items);

const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0);
});

const updateQuantity = async (itemId: string, quantity: number) => {
  try {
    await cartStore.updateQuantity(itemId, quantity);
  } catch (error) {
    console.error('Failed to update quantity:', error);
  }
};

const removeFromCart = async (itemId: string) => {
  try {
    await cartStore.removeFromCart(itemId);
  } catch (error) {
    console.error('Failed to remove item:', error);
  }
};

const checkout = () => {
  // Implement checkout logic here
  router.push('/checkout');
};

onMounted(async () => {
  await cartStore.fetchCart();
});
</script> 