<template>
  <div class="section-pad">
    <div class="container-kc max-w-3xl">
      <h1>联系我们</h1>
      <p class="mt-2 text-slate-600">欢迎来电咨询山东工控机选型、方案定制与售后服务。</p>
      <dl class="mt-12 space-y-8">
        <div>
          <dt class="text-sm text-slate-500">公司地址</dt>
          <dd class="mt-2 text-lg">{{ config?.address || '山东省济南市高新区工业南路88号控创科技园' }}</dd>
        </div>
        <div>
          <dt class="text-sm text-slate-500">咨询电话</dt>
          <dd class="mt-2">
            <a :href="`tel:${config?.phone}`" class="text-2xl text-brand-600 font-medium">{{ config?.phone || '0531-88888888' }}</a>
          </dd>
        </div>
        <div>
          <dt class="text-sm text-slate-500">工作时间</dt>
          <dd class="mt-2">{{ config?.work_time || '周一至周五 8:30-18:00' }}</dd>
        </div>
      </dl>
      <p class="mt-12 text-sm text-slate-500">本站不提供在线留言表单，请直接拨打电话咨询，我们将安排山东本地客户经理为您服务。</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getConfig } from '@/api';
import { usePageSeo } from '@/utils/seo';

usePageSeo({ title: '联系我们_济南工控机咨询-济南控创电子', keywords: '济南工控机咨询,山东工控机电话', description: '联系济南控创电子，获取工控机选型与方案咨询。' });

const config = ref(null);
onMounted(async () => {
  config.value = await getConfig();
});
</script>
