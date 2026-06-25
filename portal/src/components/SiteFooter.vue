<template>
  <footer class="bg-slate-900 text-slate-300 text-sm">
    <div class="container-kc py-12 grid md:grid-cols-4 gap-8">
      <div class="md:col-span-2">
        <h3 class="text-white text-lg font-medium mb-3">济南控创电子科技有限公司</h3>
        <p class="leading-relaxed text-slate-400">山东区域专业工控机、工业电脑解决方案服务商。研华工控机、智微智能工控机官方授权代理，自研工控设备生产线，以「成就客户」为宗旨。</p>
      </div>
      <div>
        <h4 class="text-white mb-3">快速导航</h4>
        <ul class="space-y-2">
          <li><router-link to="/products" class="hover:text-white">产品中心</router-link></li>
          <li><router-link to="/solutions" class="hover:text-white">解决方案</router-link></li>
          <li><router-link to="/contact" class="hover:text-white">联系我们</router-link></li>
        </ul>
      </div>
      <div>
        <h4 class="text-white mb-3">合规信息</h4>
        <ul class="space-y-2">
          <li><router-link to="/privacy" class="hover:text-white">隐私政策</router-link></li>
          <li><router-link to="/terms" class="hover:text-white">服务条款</router-link></li>
        </ul>
      </div>
    </div>
    <div class="border-t border-slate-800 py-6 text-center text-xs text-slate-500 space-y-1">
      <p>{{ config?.copyright || 'Copyright © 2026 济南控创电子科技有限公司' }}</p>
      <p>
        <a v-if="config?.icp_number" href="https://beian.miit.gov.cn/" target="_blank" rel="noopener" class="hover:text-slate-300">{{ config.icp_number }}</a>
        <span v-if="config?.police_number" class="ml-3">{{ config.police_number }}</span>
      </p>
    </div>
  </footer>
</template>

<script setup>
import { onMounted } from 'vue';
import { useSiteConfig } from '@/composables/useSiteConfig';
import { getConfig } from '@/api';

const { config } = useSiteConfig();
onMounted(async () => {
  try {
    config.value = await getConfig();
  } catch { /* ignore */ }
});
</script>
