<template>
  <div class="min-h-screen flex flex-col">
    <SiteHeader />
    <main class="flex-1">
      <AppBreadcrumb v-if="showBreadcrumb" />
      <router-view />
    </main>
    <SiteFooter />
    <BackToTop />
    <FloatPhone />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import SiteHeader from '@/components/SiteHeader.vue';
import SiteFooter from '@/components/SiteFooter.vue';
import AppBreadcrumb from '@/components/AppBreadcrumb.vue';
import BackToTop from '@/components/BackToTop.vue';
import FloatPhone from '@/components/FloatPhone.vue';
import { provideSiteConfig } from '@/composables/useSiteConfig';

provideSiteConfig();

const route = useRoute();
const showBreadcrumb = computed(() => route.name !== 'home' && route.meta?.breadcrumb);
</script>
