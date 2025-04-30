import { useSnackbar } from '@/composables/useSnackbar';

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public status?: number
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleError = (error: any) => {
  const snackbar = useSnackbar();
  
  if (error instanceof AppError) {
    snackbar.show(error.message, 'error');
    return;
  }

  if (error.response) {
    // Handle API errors
    const message = error.response.data?.message || 'An error occurred';
    snackbar.show(message, 'error');
  } else if (error.request) {
    // Handle network errors
    snackbar.show('Network error. Please check your connection.', 'error');
  } else {
    // Handle other errors
    snackbar.show('An unexpected error occurred', 'error');
  }

  console.error('Error details:', error);
}; 