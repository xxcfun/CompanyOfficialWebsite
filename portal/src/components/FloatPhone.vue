<template>
  <a
    :href="`tel:${phone}`"
    class="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-3 bg-brand-600 text-white text-sm rounded-full shadow-lg hover:bg-brand-700 transition-colors"
    aria-label="咨询电话"
  >
    <span>📞</span>
    <span class="hidden sm:inline">咨询 {{ phone }}</span>
  </a>
</template>

<script setup>
import { useSiteConfig } from '@/composables/useSiteConfig';

const { phone } = useSiteConfig();
</script>
