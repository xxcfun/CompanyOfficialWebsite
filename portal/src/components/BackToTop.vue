<template>
  <button
    v-show="visible"
    type="button"
    class="fixed bottom-24 right-4 z-40 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md text-slate-600 hover:text-brand-600"
    aria-label="回到顶部"
    @click="scrollTop"
  >
    ↑
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useWindowScroll } from '@vueuse/core';

const { y } = useWindowScroll();
const visible = ref(false);

function check() {
  visible.value = y.value > 400;
}
function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

onMounted(() => {
  window.addEventListener('scroll', check, { passive: true });
});
onUnmounted(() => window.removeEventListener('scroll', check));
</script>
