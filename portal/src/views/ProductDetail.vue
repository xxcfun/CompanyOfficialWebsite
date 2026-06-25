<template>
  <div v-if="product" class="section-pad">
    <div class="container-kc">
      <h1>{{ product.name }}</h1>
      <p class="mt-2 text-slate-600">{{ product.summary }}</p>
      <div class="mt-8 grid lg:grid-cols-2 gap-10">
        <div class="aspect-square bg-slate-100 rounded-lg overflow-hidden">
          <LazyImage :src="product.cover" :alt="`${product.name}-山东工控机产品详情图`" />
        </div>
        <div>
          <CtaConsult class="mb-6" />
          <h2 class="text-xl mb-4">产品参数</h2>
          <table v-if="params.length" class="w-full text-sm border border-slate-200">
            <tr v-for="(row, i) in params" :key="i" class="border-b border-slate-100">
              <td class="p-3 bg-slate-50 w-1/3">{{ row.name }}</td>
              <td class="p-3">{{ row.value }}</td>
            </tr>
          </table>
          <h2 class="text-xl mt-8 mb-2">适用场景</h2>
          <p class="text-slate-600 text-sm">{{ product.scenes }}</p>
          <h2 class="text-xl mt-6 mb-2">行业用途</h2>
          <p class="text-slate-600 text-sm">{{ product.industry }}</p>
          <div v-if="downloads.length" class="mt-8">
            <h2 class="text-xl mb-3">资料下载</h2>
            <ul class="space-y-2">
              <li v-for="f in downloads" :key="f.id">
                <a :href="f.file_url" target="_blank" rel="noopener" class="text-brand-600 text-sm hover:underline">{{ f.file_name }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <article class="prose-kc mt-12" v-html="product.content" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getProduct } from '@/api';
import { usePageSeo } from '@/utils/seo';
import LazyImage from '@/components/LazyImage.vue';
import CtaConsult from '@/components/CtaConsult.vue';

const route = useRoute();
const product = ref(null);

const params = computed(() => {
  try {
    return JSON.parse(product.value?.params || '[]');
  } catch {
    return [];
  }
});
const downloads = computed(() => product.value?.downloads || []);

async function load() {
  product.value = await getProduct(route.params.id);
  usePageSeo({
    title: product.value.seo_title || `${product.value.name}-济南控创电子`,
    keywords: product.value.seo_keywords,
    description: product.value.seo_description,
  });
}

onMounted(load);
watch(() => route.params.id, load);
</script>
