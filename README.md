# E-Commerce App

A modern e-commerce application built with Vue 3, TypeScript, and Vuetify 3.

## Features

- Product listing with infinite scroll
- Advanced search and filtering
- Shopping cart management
- User authentication
- Responsive design
- Dark mode support
- Internationalization (i18n)

## Tech Stack

- Vue 3 with Composition API
- TypeScript
- Vuetify 3 for UI components
- Pinia for state management
- Vue Router for navigation
- Axios for API calls
- Vue I18n for internationalization
- Vitest for testing

## Project Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Run tests:
```bash
npm run test
```

## Project Structure

```
src/
├── assets/          # Static assets
├── components/      # Reusable components
├── composables/     # Vue composables
├── core/            # Core functionality
│   └── api/         # API configuration
├── stores/          # Pinia stores
├── views/           # Page components
└── main.ts          # Application entry point
```

## API Integration

The application integrates with the following API endpoints:

- Login: `/login`
- Products: `/shop`
- Categories: `/shop/categories`
- Cart: `/carts`

## Development Guidelines

1. Follow the Vue 3 Composition API style
2. Use TypeScript for type safety
3. Implement responsive design using Vuetify's grid system
4. Write unit tests for critical components
5. Use ESLint and Prettier for code formatting

## License

MIT
