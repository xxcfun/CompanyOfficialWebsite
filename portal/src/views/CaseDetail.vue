<template>
  <div v-if="item" class="section-pad">
    <div class="container-kc max-w-4xl">
      <h1>{{ item.customer_name }}</h1>
      <dl class="mt-6 grid sm:grid-cols-2 gap-4 text-sm">
        <div><dt class="text-slate-500">项目场景</dt><dd class="mt-1">{{ item.project_scene }}</dd></div>
        <div><dt class="text-slate-500">所用设备</dt><dd class="mt-1">{{ item.devices_used }}</dd></div>
        <div><dt class="text-slate-500">服务地区</dt><dd class="mt-1">{{ item.location }}</dd></div>
      </dl>
      <h2 class="mt-8 text-xl">项目成果</h2>
      <p class="mt-3 text-slate-600 whitespace-pre-line">{{ item.result }}</p>
      <article class="prose-kc mt-8" v-html="item.content" />
      <CtaConsult class="mt-10" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getCase } from '@/api';
import { usePageSeo } from '@/utils/seo';
import CtaConsult from '@/components/CtaConsult.vue';

const route = useRoute();
const item = ref(null);

async function load() {
  item.value = await getCase(route.params.id);
  usePageSeo({ title: item.value.seo_title || item.value.customer_name, keywords: item.value.seo_keywords, description: item.value.seo_description });
}

onMounted(load);
watch(() => route.params.id, load);
</script>
