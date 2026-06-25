<template>
  <div class="section-pad">
    <div class="container-kc">
      <h1>新闻资讯</h1>
      <p class="mt-2 text-slate-600 mb-8">公司动态、行业资讯、工控技术干货与新品发布，持续更新助力SEO收录。</p>
      <div class="flex flex-wrap gap-2 mb-8">
        <button v-for="c in cats" :key="c.value" type="button" class="px-3 py-1.5 text-sm rounded border" :class="cat === c.value ? 'bg-brand-600 text-white border-brand-600' : 'border-slate-200'" @click="cat = c.value; load()">{{ c.label }}</button>
      </div>
      <ul class="divide-y divide-slate-200">
        <li v-for="n in list" :key="n.id" class="py-5">
          <router-link :to="`/news/${n.id}`" class="block hover:text-brand-600">
            <h2 class="text-lg font-medium">{{ n.title }}</h2>
            <p class="mt-1 text-sm text-slate-500 line-clamp-2">{{ n.summary }}</p>
            <time class="mt-2 block text-xs text-slate-400">{{ formatDate(n.publish_time) }}</time>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getNews } from '@/api';
import { usePageSeo } from '@/utils/seo';

usePageSeo({ title: '新闻资讯_工控行业动态-济南控创电子', keywords: '工控资讯,山东工控机,行业动态', description: '济南控创电子新闻资讯，工控行业动态与技术干货。' });

const cat = ref(0);
const list = ref([]);
const cats = [
  { label: '全部', value: 0 },
  { label: '公司动态', value: 1 },
  { label: '行业资讯', value: 2 },
  { label: '技术干货', value: 3 },
  { label: '新品发布', value: 4 },
];

function formatDate(d) {
  return d ? new Date(d).toLocaleDateString('zh-CN') : '';
}

async function load() {
  const params = { pageSize: 30 };
  if (cat.value) params.category = cat.value;
  const data = await getNews(params);
  list.value = data.list || [];
}

onMounted(load);
</script>
