import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    app: {
      title: 'E-Commerce App',
    },
    auth: {
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      name: 'Name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
    },
    products: {
      search: 'Search',
      category: 'Category',
      brand: 'Brand',
      color: 'Color',
      addToCart: 'Add to Cart',
      noProducts: 'No products found',
    },
    cart: {
      title: 'Shopping Cart',
      empty: 'Your cart is empty',
      subtotal: 'Subtotal',
      shipping: 'Shipping',
      total: 'Total',
      checkout: 'Checkout',
    },
    locales: {
      en: 'English',
      es: 'Español',
    },
  },
  es: {
    app: {
      title: 'Aplicación de Comercio',
    },
    auth: {
      login: 'Iniciar Sesión',
      register: 'Registrarse',
      logout: 'Cerrar Sesión',
      name: 'Nombre',
      email: 'Correo Electrónico',
      password: 'Contraseña',
      confirmPassword: 'Confirmar Contraseña',
    },
    products: {
      search: 'Buscar',
      category: 'Categoría',
      brand: 'Marca',
      color: 'Color',
      addToCart: 'Agregar al Carrito',
      noProducts: 'No se encontraron productos',
    },
    cart: {
      title: 'Carrito de Compras',
      empty: 'Tu carrito está vacío',
      subtotal: 'Subtotal',
      shipping: 'Envío',
      total: 'Total',
      checkout: 'Pagar',
    },
    locales: {
      en: 'English',
      es: 'Español',
    },
  },
};

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'en',
  fallbackLocale: 'en',
  messages,
});

export default i18n; 