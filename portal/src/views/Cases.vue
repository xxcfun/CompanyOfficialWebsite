<template>
  <div class="section-pad">
    <div class="container-kc">
      <h1>成功案例</h1>
      <p class="mt-2 text-slate-600 mb-10">山东本地企事业单位、工业工厂工控落地项目，彰显区域服务优势。</p>
      <div class="grid md:grid-cols-2 gap-6">
        <router-link v-for="c in list" :key="c.id" :to="`/cases/${c.id}`" class="card-kc p-6 hover:border-brand-300">
          <h2 class="text-xl">{{ c.customer_name }}</h2>
          <p class="mt-2 text-sm text-slate-600">{{ c.project_scene }}</p>
          <p class="mt-3 text-xs text-brand-600">{{ c.location }} · 设备：{{ c.devices_used }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getCases } from '@/api';
import { usePageSeo } from '@/utils/seo';

usePageSeo({
  title: '成功案例_山东工控机落地项目-济南控创电子',
  keywords: '山东工控机,成功案例,工业电脑',
  description: '济南控创电子山东工控成功案例，服务制造工厂与智能制造项目。',
});

const list = ref([]);
onMounted(async () => {
  const data = await getCases({ pageSize: 50 });
  list.value = data.list || [];
});
</script>
