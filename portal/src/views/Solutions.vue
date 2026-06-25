<template>
  <div class="section-pad">
    <div class="container-kc">
      <h1>解决方案</h1>
      <p class="mt-2 text-slate-600 mb-10">覆盖工业自动化、智能制造产线、工厂整体工控、企事业单位及山东本地化定制方案。</p>
      <div class="space-y-6">
        <article v-for="s in list" :key="s.id" class="card-kc p-6 md:p-8">
          <span class="text-xs text-brand-600">{{ s.category }}</span>
          <h2 class="mt-2 text-2xl">
            <router-link :to="`/solutions/${s.id}`" class="hover:text-brand-600">{{ s.title }}</router-link>
          </h2>
          <p class="mt-3 text-slate-600">{{ s.summary }}</p>
          <router-link :to="`/solutions/${s.id}`" class="mt-4 inline-block text-brand-600 text-sm">查看方案详情 →</router-link>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getSolutions } from '@/api';
import { usePageSeo } from '@/utils/seo';

usePageSeo({
  title: '工业电脑解决方案_山东工控方案-济南控创电子',
  keywords: '工业电脑解决方案,山东工控机,智能制造,工控方案',
  description: '济南控创电子提供工业自动化、智能制造、企事业单位工控等山东本地化解决方案。',
});

const list = ref([]);
onMounted(async () => {
  list.value = await getSolutions();
});
</script>
