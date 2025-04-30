<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card>
          <v-card-title class="text-center">404 - Page Not Found</v-card-title>
          <v-card-text class="text-center">
            <p>The page you are looking for does not exist.</p>
            <v-btn color="primary" to="/">Go to Home</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
// No additional logic needed for this component
</script> 