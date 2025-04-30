<template>
  <v-snackbar
    v-model="snackbar.state.value.show"
    :color="snackbar.state.value.color"
    :timeout="3000"
    @update:model-value="snackbar.hide"
  >
    {{ snackbar.state.value.message }}
  </v-snackbar>
</template>

<script setup lang="ts">
import { useSnackbar } from '@/composables/useSnackbar';

const snackbar = useSnackbar();
</script> 