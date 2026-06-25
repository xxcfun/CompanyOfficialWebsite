<template>
  <div class="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
    <h1 class="text-6xl text-slate-300 font-light">404</h1>
    <p class="mt-4 text-slate-600">页面不存在或已移除</p>
    <router-link to="/" class="btn-primary mt-8">返回首页</router-link>
  </div>
</template>

<script setup>
import { usePageSeo } from '@/utils/seo';
usePageSeo({ title: '页面未找到-济南控创电子' });
</script>
