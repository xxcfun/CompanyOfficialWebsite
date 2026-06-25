<template>
  <div class="section-pad">
    <div class="container-kc max-w-4xl">
      <h1>关于我们</h1>
      <template v-if="about">
        <section class="mt-10">
          <h2>公司简介</h2>
          <p class="mt-4 text-slate-600 leading-relaxed whitespace-pre-line">{{ about.intro }}</p>
        </section>
        <section class="mt-12 text-center py-12 bg-brand-50 rounded-lg">
          <p class="text-brand-600 text-sm">企业宗旨</p>
          <p class="mt-2 text-4xl font-light text-brand-700">{{ about.mission }}</p>
        </section>
        <section class="mt-12">
          <h2>发展历程</h2>
          <pre class="mt-4 text-slate-600 text-sm leading-loose whitespace-pre-wrap font-sans">{{ about.history }}</pre>
        </section>
        <section class="mt-12">
          <h2>经营理念</h2>
          <p class="mt-4 text-slate-600">{{ about.philosophy }}</p>
        </section>
        <section class="mt-12">
          <h2>企业愿景</h2>
          <p class="mt-4 text-slate-600">{{ about.vision }}</p>
        </section>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAbout } from '@/api';
import { usePageSeo } from '@/utils/seo';

usePageSeo({ title: '关于我们_济南控创电子科技有限公司', keywords: '济南控创电子,工控机公司,成就客户', description: '济南控创电子科技有限公司简介，以成就客户为宗旨。' });

const about = ref(null);
onMounted(async () => {
  about.value = await getAbout();
});
</script>
