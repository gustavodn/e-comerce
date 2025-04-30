<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card>
          <v-card-title class="text-center">Register</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleRegister" ref="form">
              <v-text-field
                v-model="name"
                label="Name"
                :rules="[v => !!v || 'Name is required']"
                required
              ></v-text-field>

              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                :rules="[
                  v => !!v || 'Email is required',
                  v => /.+@.+\..+/.test(v) || 'Email must be valid'
                ]"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                :rules="[
                  v => !!v || 'Password is required',
                  v => v.length >= 6 || 'Password must be at least 6 characters'
                ]"
                required
              ></v-text-field>

              <v-text-field
                v-model="passwordConfirmation"
                label="Confirm Password"
                type="password"
                :rules="[
                  v => !!v || 'Password confirmation is required',
                  v => v === password || 'Passwords must match'
                ]"
                required
              ></v-text-field>

              <v-btn
                color="primary"
                block
                type="submit"
                :loading="authStore.loading"
                :disabled="authStore.loading"
              >
                Register
              </v-btn>

              <div class="text-center mt-4">
                <router-link to="/login">Already have an account? Login</router-link>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import type { VForm } from 'vuetify/components';

const router = useRouter();
const authStore = useAuthStore();
const form = ref<VForm | null>(null);

const name = ref('');
const email = ref('');
const password = ref('');
const passwordConfirmation = ref('');

const handleRegister = async () => {
  const { valid } = await form.value?.validate();
  
  if (!valid) return;

  try {
    const success = await authStore.register({
      name: name.value,
      email: email.value,
      password: password.value,
      c_password: passwordConfirmation.value
    });

    if (success) {
      await router.push('/login');
    }
  } catch (error) {
    console.error('Registration failed:', error);
  }
};
</script> 