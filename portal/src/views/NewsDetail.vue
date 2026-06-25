<template>
  <div v-if="item" class="section-pad">
    <article class="container-kc max-w-3xl">
      <h1>{{ item.title }}</h1>
      <time class="block mt-2 text-sm text-slate-500">{{ formatDate(item.publish_time) }}</time>
      <div class="prose-kc mt-8" v-html="item.content" />
    </article>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getNewsItem } from '@/api';
import { usePageSeo } from '@/utils/seo';

const route = useRoute();
const item = ref(null);

function formatDate(d) {
  return d ? new Date(d).toLocaleDateString('zh-CN') : '';
}

async function load() {
  item.value = await getNewsItem(route.params.id);
  usePageSeo({ title: item.value.seo_title || item.value.title, keywords: item.value.seo_keywords, description: item.value.seo_description });
}

onMounted(load);
watch(() => route.params.id, load);
</script>
