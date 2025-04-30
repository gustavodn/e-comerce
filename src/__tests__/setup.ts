import { config } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import { createRouter, createWebHistory } from 'vue-router'
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/vue'
import matchers from '@testing-library/jest-dom/matchers'

// Extend Vitest's expect method with methods from react-testing-library
expect.extend(matchers)

// Create Vuetify instance
const vuetify = createVuetify({
  components,
  directives,
})

// Create Pinia instance
const pinia = createPinia()

// Create i18n instance
const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
})

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/products', component: { template: '<div>Products</div>' } },
    { path: '/cart', component: { template: '<div>Cart</div>' } },
    { path: '/login', component: { template: '<div>Login</div>' } },
    { path: '/register', component: { template: '<div>Register</div>' } },
  ],
})

// Configure Vue Test Utils
config.global.plugins = [vuetify, pinia, i18n, router]

// Cleanup after each test
afterEach(() => {
  cleanup()
}) 