<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card>
          <v-card-title class="text-center">Login</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                required
                :error-messages="authStore.error"
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
                :error-messages="authStore.error"
              ></v-text-field>

              <v-btn
                color="primary"
                block
                type="submit"
                :loading="authStore.loading"
                :disabled="authStore.loading"
              >
                Login
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');

const handleLogin = async () => {
  try {
    const success = await authStore.login(email.value, password.value);
    if (success) {
      await router.push('/');
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Watch for changes in the authStore error and clear it when the user starts typing
watch([email, password], () => {
  authStore.clearError();
});
</script>