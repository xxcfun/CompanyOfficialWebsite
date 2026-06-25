<template>
  <nav class="container-kc py-4 text-sm text-slate-500" aria-label="面包屑">
    <router-link to="/" class="hover:text-brand-600">首页</router-link>
    <template v-for="(item, i) in crumbs" :key="i">
      <span class="mx-2">/</span>
      <span v-if="i === crumbs.length - 1" class="text-slate-800">{{ item }}</span>
      <span v-else>{{ item }}</span>
    </template>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const crumbs = computed(() => route.meta.breadcrumb || []);
</script>
