<template>
  <div class="section-pad">
    <div class="container-kc">
      <h1>资质实力</h1>
      <p class="mt-2 text-slate-600 mb-10">品牌代理授权、企业荣誉与行业资质，全方位塑造企业信任背书。</p>
      <div v-for="group in grouped" :key="group.title" class="mb-14">
        <h2 class="text-2xl mb-6">{{ group.title }}</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <figure v-for="c in group.items" :key="c.id" class="card-kc p-4 text-center">
            <div class="aspect-[4/3] bg-slate-50 rounded flex items-center justify-center text-slate-400 text-sm mb-4">
              <LazyImage v-if="c.image_url" :src="c.image_url" :alt="`${c.name}-济南控创电子资质证书`" />
              <span v-else>{{ c.name }}</span>
            </div>
            <figcaption>
              <h3 class="font-medium">{{ c.name }}</h3>
              <p class="mt-2 text-xs text-slate-500">{{ c.summary }}</p>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getCertificates } from '@/api';
import { usePageSeo } from '@/utils/seo';
import LazyImage from '@/components/LazyImage.vue';

usePageSeo({ title: '资质实力_研华智微授权代理-济南控创电子', keywords: '研华工控机代理,智微智能授权,企业资质', description: '济南控创电子资质实力展示，研华、智微智能官方授权与行业荣誉。' });

const list = ref([]);
const typeMap = { 1: '品牌代理授权', 2: '企业荣誉证书', 3: '行业资质' };

const grouped = computed(() => {
  const map = {};
  list.value.forEach((c) => {
    const title = typeMap[c.cert_type] || '其他资质';
    if (!map[title]) map[title] = { title, items: [] };
    map[title].items.push(c);
  });
  return Object.values(map);
});

onMounted(async () => {
  list.value = await getCertificates();
});
</script>
