<template>
  <div v-if="item" class="section-pad">
    <div class="container-kc max-w-4xl">
      <h1>{{ item.title }}</h1>
      <p class="mt-2 text-brand-600 text-sm">{{ item.category }}</p>
      <p class="mt-4 text-slate-600">{{ item.summary }}</p>
      <CtaConsult class="my-8" />
      <section v-for="block in blocks" :key="block.title" class="mt-8">
        <h2 class="text-xl mb-3">{{ block.title }}</h2>
        <p class="text-slate-600 leading-relaxed whitespace-pre-line">{{ block.content }}</p>
      </section>
      <article class="prose-kc mt-10" v-html="item.content" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getSolution } from '@/api';
import { usePageSeo } from '@/utils/seo';
import CtaConsult from '@/components/CtaConsult.vue';

const route = useRoute();
const item = ref(null);

const blocks = computed(() => [
  { title: '场景介绍', content: item.value?.scene_desc },
  { title: '适配设备', content: item.value?.devices },
  { title: '行业痛点', content: item.value?.pain_points },
  { title: '落地优势', content: item.value?.advantages },
  { title: '服务保障', content: item.value?.service },
].filter((b) => b.content));

async function load() {
  item.value = await getSolution(route.params.id);
  usePageSeo({
    title: item.value.seo_title || item.value.title,
    keywords: item.value.seo_keywords,
    description: item.value.seo_description,
  });
}

onMounted(load);
watch(() => route.params.id, load);
</script>
