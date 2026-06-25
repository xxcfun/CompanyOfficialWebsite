<template>
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
    <div class="container-kc flex items-center justify-between h-16 md:h-20">
      <router-link to="/" class="flex items-center gap-2 shrink-0">
        <span class="text-lg md:text-xl font-semibold text-brand-700">控创电子</span>
        <span class="hidden sm:inline text-xs text-slate-500">济南工控机 · 山东工业电脑</span>
      </router-link>
      <nav class="hidden lg:flex items-center gap-8 text-sm text-slate-700">
        <router-link v-for="item in nav" :key="item.to" :to="item.to" class="hover:text-brand-600 transition-colors" active-class="text-brand-600 font-medium">
          {{ item.label }}
        </router-link>
      </nav>
      <button type="button" class="lg:hidden p-2" aria-label="菜单" @click="open = !open">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
    </div>
    <div v-show="open" class="lg:hidden border-t border-slate-100 bg-white">
      <router-link v-for="item in nav" :key="item.to" :to="item.to" class="block px-6 py-3 text-sm border-b border-slate-50" @click="open = false">
        {{ item.label }}
      </router-link>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const open = ref(false);
const nav = [
  { label: '首页', to: '/' },
  { label: '产品中心', to: '/products' },
  { label: '解决方案', to: '/solutions' },
  { label: '成功案例', to: '/cases' },
  { label: '新闻资讯', to: '/news' },
  { label: '资质实力', to: '/certificates' },
  { label: '公司实力', to: '/strength' },
  { label: '关于我们', to: '/about' },
  { label: '联系我们', to: '/contact' },
];
</script>
