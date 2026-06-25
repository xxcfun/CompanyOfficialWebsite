<template>
  <img
    :src="src"
    :alt="alt"
    loading="lazy"
    class="w-full h-full object-cover bg-slate-100"
    @error="onError"
  />
</template>

<script setup>
defineProps({
  src: { type: String, default: '' },
  alt: { type: String, required: true },
});

function onError(e) {
  e.target.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect fill="#f1f5f9" width="100%" height="100%"/><text x="50%" y="50%" fill="#94a3b8" text-anchor="middle" dy=".3em" font-size="14">控创电子</text></svg>');
}
</script>
