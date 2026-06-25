<template>
  <div class="section-pad">
    <div class="container-kc">
      <h1 class="mb-2">产品中心</h1>
      <p class="text-slate-600 mb-8">研华工控机、智微智能工控机官方授权，控创自研工控设备支持山东本地定制与整机出货。</p>
      <div class="flex flex-wrap gap-3 mb-10">
        <button
          v-for="t in tabs"
          :key="t.value"
          type="button"
          class="px-4 py-2 text-sm rounded-md border transition-colors"
          :class="activeType === t.value ? 'bg-brand-600 text-white border-brand-600' : 'border-slate-200 hover:border-brand-300'"
          @click="switchType(t.value)"
        >
          {{ t.label }}
        </button>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <router-link v-for="p in list" :key="p.id" :to="`/products/${p.id}`" class="card-kc group">
          <div class="aspect-[4/3] bg-slate-100 overflow-hidden">
            <LazyImage :src="p.cover" :alt="`${p.name}-济南工控机产品`" class="group-hover:scale-105 transition-transform duration-300" />
          </div>
          <div class="p-5">
            <h2 class="text-lg">{{ p.name }}</h2>
            <p class="mt-2 text-sm text-slate-600 line-clamp-2">{{ p.summary }}</p>
            <span class="mt-4 inline-block text-brand-600 text-sm">查看详情 →</span>
          </div>
        </router-link>
      </div>
      <p v-if="!list.length" class="text-center text-slate-500 py-12">暂无产品</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getProducts } from '@/api';
import { usePageSeo } from '@/utils/seo';
import LazyImage from '@/components/LazyImage.vue';

usePageSeo({
  title: '产品中心_研华工控机_智微智能工控机-济南控创电子',
  keywords: '研华工控机,智微智能工控机,济南工控机,工控设备定制',
  description: '济南控创电子产品中心，提供研华、智微智能及自研工控设备全系选型与山东本地服务。',
});

const route = useRoute();
const router = useRouter();
const list = ref([]);
const activeType = ref(route.query.type ? parseInt(route.query.type, 10) : 0);

const tabs = [
  { label: '全部', value: 0 },
  { label: '研华工控机', value: 1 },
  { label: '智微智能工控机', value: 2 },
  { label: '自研工控设备', value: 3 },
];

async function load() {
  const params = { pageSize: 50 };
  if (activeType.value) params.type = activeType.value;
  const data = await getProducts(params);
  list.value = data.list || [];
}

function switchType(v) {
  activeType.value = v;
  router.replace({ query: v ? { type: v } : {} });
}

watch(() => route.query.type, (v) => {
  activeType.value = v ? parseInt(v, 10) : 0;
  load();
});

onMounted(load);
</script>
