import { ref } from 'vue';

interface SnackbarState {
  message: string;
  color: 'success' | 'error' | 'info' | 'warning';
  show: boolean;
}

const snackbarState = ref<SnackbarState>({
  message: '',
  color: 'info',
  show: false,
});

export const useSnackbar = () => {
  const show = (message: string, color: SnackbarState['color'] = 'info') => {
    snackbarState.value = {
      message,
      color,
      show: true,
    };
  };

  const hide = () => {
    snackbarState.value.show = false;
  };

  return {
    state: snackbarState,
    show,
    hide,
  };
}; 