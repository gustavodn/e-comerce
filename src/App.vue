<template>
  <v-app :theme="themeStore.isDark ? 'dark' : 'light'">
    <v-app-bar color="primary">
      <v-app-bar-title>{{ t('app.title') }}</v-app-bar-title>
      <v-spacer></v-spacer>
      
      <v-btn
        icon
        @click="themeStore.toggleTheme"
      >
        <v-icon>{{ themeStore.isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            v-bind="props"
          >
            <v-icon>mdi-translate</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="locale in availableLocales"
            :key="locale"
            @click="setLocale(locale)"
          >
            <v-list-item-title>{{ t(`locales.${locale}`) }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn
        v-if="!authStore.isAuthenticated"
        to="/login"
        variant="text"
      >
        {{ t('auth.login') }}
      </v-btn>
      <v-btn
        v-if="!authStore.isAuthenticated"
        to="/register"
        variant="text"
      >
        {{ t('auth.register') }}
      </v-btn>
      <v-btn
        v-if="authStore.isAuthenticated"
        to="/cart"
        icon
      >
        <v-badge
          :content="cartStore.totalItems"
          color="error"
        >
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
      <v-btn
        to="/"
        variant="text"
        v-if="authStore.isAuthenticated"
      >
        Home
      </v-btn>
      <v-btn
        v-if="authStore.isAuthenticated"
        @click="handleLogout"
        variant="text"
      >
        {{ t('auth.logout') }}
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer app>
      <v-col class="text-center">
        &copy; {{ new Date().getFullYear() }} {{ t('app.title') }}
      </v-col>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';
import { useThemeStore } from '@/stores/theme';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t, availableLocales, locale } = useI18n();
const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore();
const themeStore = useThemeStore();

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};

const setLocale = (newLocale: string) => {
  locale.value = newLocale;
  localStorage.setItem('locale', newLocale);
};
</script>

<style>
.v-application {
  font-family: 'Roboto', sans-serif;
}
</style>
