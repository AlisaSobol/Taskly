<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{ error: NuxtError }>()

function goHome () {
  clearError({ redirect: '/' })
}
</script>

<template>
<main class="text-center min-h-screen flex items-center justify-center bg-violet-500/10">
  <div class="p-8">
    <h1 class="mb-8 text-4xl font-thin">{{ error.statusText }}</h1>
    <h2 class="mb-8 text-5xl">{{ error.status }}</h2>
    <UButton size="xl" @click="goHome">Go to Home page</UButton>
  </div>
</main>
</template>