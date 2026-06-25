<template>
  <div class="section-pad">
    <div class="container-kc">
      <h1>公司实力</h1>
      <p class="mt-2 text-slate-600 mb-12">山东区域行业地位、自研研发、生产车间、业务与售后团队及全流程服务体系。</p>
      <section v-for="s in list" :key="s.id" class="mb-16 grid md:grid-cols-2 gap-8 items-center">
        <div :class="{ 'md:order-2': s.sort_order % 2 === 0 }">
          <h2>{{ s.title }}</h2>
          <p class="mt-4 text-slate-600 leading-relaxed whitespace-pre-line">{{ s.content }}</p>
        </div>
        <div class="aspect-video bg-slate-100 rounded-lg overflow-hidden" :class="{ 'md:order-1': s.sort_order % 2 === 0 }">
          <LazyImage v-if="s.image_url" :src="s.image_url" :alt="`${s.title}-济南控创电子公司实力`" />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getStrength } from '@/api';
import { usePageSeo } from '@/utils/seo';
import LazyImage from '@/components/LazyImage.vue';

usePageSeo({ title: '公司实力_山东工控服务商-济南控创电子', keywords: '山东工控机,生产车间,工控服务商', description: '济南控创电子公司实力，山东区域工控机服务商。' });

const list = ref([]);
onMounted(async () => {
  list.value = await getStrength();
});
</script>
