<template>
  <div>
    <section class="relative bg-slate-900 text-white overflow-hidden">
      <swiper
        v-if="banners.length"
        :modules="modules"
        :autoplay="{ delay: 5000 }"
        :pagination="{ clickable: true }"
        class="hero-swiper"
      >
        <swiper-slide v-for="b in banners" :key="b.id">
          <div class="min-h-[420px] md:min-h-[520px] flex items-center container-kc relative z-10">
            <div class="max-w-2xl py-16">
              <h1 class="text-white text-3xl md:text-5xl font-semibold leading-tight">{{ b.title }}</h1>
              <p class="mt-4 text-slate-300 text-lg">{{ b.subtitle }}</p>
              <div class="mt-8 flex gap-4">
                <router-link :to="b.link_url || '/products'" class="btn-primary">了解产品</router-link>
                <router-link to="/contact" class="btn-outline border-white text-white hover:bg-white/10">联系我们</router-link>
              </div>
            </div>
          </div>
          <div class="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent z-0" />
        </swiper-slide>
      </swiper>
      <div v-else class="min-h-[420px] flex items-center container-kc">
        <div>
          <h1 class="text-white text-4xl">济南工控机 · 山东工业电脑解决方案</h1>
          <p class="mt-4 text-slate-300">研华工控机 | 智微智能工控机官方授权 · 成就客户</p>
        </div>
      </div>
    </section>

    <section class="section-pad bg-brand-50">
      <div class="container-kc text-center">
        <p class="text-brand-600 text-sm tracking-widest uppercase">企业宗旨</p>
        <h2 class="mt-2 text-4xl md:text-5xl font-light text-brand-700">成就客户</h2>
        <p class="mt-4 max-w-2xl mx-auto text-slate-600">售前定制方案、售中严谨交付、售后极速维保，全流程保障山东客户项目落地。</p>
      </div>
    </section>

    <section class="section-pad">
      <div class="container-kc">
        <h2 class="text-center mb-12">核心优势</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <article v-for="a in advantages" :key="a.id" class="card-kc p-6">
            <h3 class="text-lg">{{ a.title }}</h3>
            <p class="mt-3 text-slate-600 text-sm leading-relaxed">{{ a.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section-pad bg-slate-50">
      <div class="container-kc">
        <div class="flex justify-between items-end mb-10">
          <h2>三大产品体系</h2>
          <router-link to="/products" class="text-brand-600 text-sm">查看全部 →</router-link>
        </div>
        <div class="grid md:grid-cols-3 gap-6">
          <router-link v-for="t in productTypes" :key="t.type" :to="`/products?type=${t.type}`" class="card-kc p-8 text-center hover:border-brand-300">
            <h3>{{ t.name }}</h3>
            <p class="mt-2 text-sm text-slate-500">{{ t.desc }}</p>
          </router-link>
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="container-kc">
        <h2 class="mb-10">精选解决方案</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <router-link v-for="s in solutions" :key="s.id" :to="`/solutions/${s.id}`" class="card-kc flex flex-col md:flex-row">
            <div class="md:w-2/5 aspect-video md:aspect-auto bg-slate-100">
              <LazyImage :src="s.cover" :alt="`${s.title}-山东工控解决方案`" />
            </div>
            <div class="p-6 flex-1">
              <span class="text-xs text-brand-600">{{ s.category }}</span>
              <h3 class="mt-2">{{ s.title }}</h3>
              <p class="mt-2 text-sm text-slate-600 line-clamp-2">{{ s.summary }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <section class="section-pad bg-slate-50">
      <div class="container-kc">
        <h2 class="mb-10">精选成功案例</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <router-link v-for="c in cases" :key="c.id" :to="`/cases/${c.id}`" class="card-kc p-6">
            <h3>{{ c.customer_name }}</h3>
            <p class="mt-2 text-sm text-slate-600">{{ c.project_scene }}</p>
            <p class="mt-2 text-xs text-brand-600">{{ c.location }} · {{ c.devices_used }}</p>
          </router-link>
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="container-kc">
        <h2 class="text-center mb-10">合作伙伴</h2>
        <div class="flex flex-wrap justify-center gap-8 items-center opacity-80">
          <div v-for="p in partners" :key="p.id" class="w-32 h-16 flex items-center justify-center bg-slate-50 rounded border text-xs text-slate-500">
            {{ p.name }}
          </div>
        </div>
      </div>
    </section>

    <section class="section-pad bg-slate-50">
      <div class="container-kc">
        <div class="flex justify-between items-end mb-10">
          <h2>最新资讯</h2>
          <router-link to="/news" class="text-brand-600 text-sm">更多资讯 →</router-link>
        </div>
        <ul class="space-y-4">
          <li v-for="n in news" :key="n.id">
            <router-link :to="`/news/${n.id}`" class="flex justify-between gap-4 py-3 border-b border-slate-200 hover:text-brand-600">
              <span>{{ n.title }}</span>
              <time class="text-xs text-slate-400 shrink-0">{{ formatDate(n.publish_time) }}</time>
            </router-link>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { getHome } from '@/api';
import { usePageSeo } from '@/utils/seo';
import LazyImage from '@/components/LazyImage.vue';

const modules = [Autoplay, Pagination];
const banners = ref([]);
const advantages = ref([]);
const solutions = ref([]);
const cases = ref([]);
const partners = ref([]);
const news = ref([]);

const productTypes = [
  { type: 1, name: '研华工控机', desc: '官方授权 · 全系可售' },
  { type: 2, name: '智微智能工控机', desc: '工业整机 · 稳定可靠' },
  { type: 3, name: '自研工控设备', desc: '定制生产 · 整机出货' },
];

usePageSeo({
  title: '济南工控机_山东工控机_研华工控机_智微智能工控机-济南控创电子',
  keywords: '济南工控机,山东工控机,研华工控机,智微智能工控机,工业电脑解决方案,工控设备定制',
  description: '济南控创电子科技有限公司，山东区域工控机与工业电脑解决方案专家，成就客户。',
});

function formatDate(d) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('zh-CN');
}

onMounted(async () => {
  try {
    const data = await getHome();
    banners.value = data.banners || [];
    advantages.value = data.advantages || [];
    solutions.value = (data.solutions || []).slice(0, 4);
    cases.value = (data.cases || []).slice(0, 4);
    partners.value = data.partners || [];
    news.value = data.news || [];
  } catch { /* 静态降级 */ }
});
</script>
