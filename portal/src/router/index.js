import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('@/views/Home.vue'), meta: { title: '首页' } },
      { path: 'products', name: 'products', component: () => import('@/views/Products.vue'), meta: { title: '产品中心', breadcrumb: ['产品中心'] } },
      { path: 'products/:id', name: 'product-detail', component: () => import('@/views/ProductDetail.vue'), meta: { title: '产品详情', breadcrumb: ['产品中心', '产品详情'] } },
      { path: 'solutions', name: 'solutions', component: () => import('@/views/Solutions.vue'), meta: { title: '解决方案', breadcrumb: ['解决方案'] } },
      { path: 'solutions/:id', name: 'solution-detail', component: () => import('@/views/SolutionDetail.vue'), meta: { title: '方案详情', breadcrumb: ['解决方案', '方案详情'] } },
      { path: 'cases', name: 'cases', component: () => import('@/views/Cases.vue'), meta: { title: '成功案例', breadcrumb: ['成功案例'] } },
      { path: 'cases/:id', name: 'case-detail', component: () => import('@/views/CaseDetail.vue'), meta: { title: '案例详情', breadcrumb: ['成功案例', '案例详情'] } },
      { path: 'news', name: 'news', component: () => import('@/views/News.vue'), meta: { title: '新闻资讯', breadcrumb: ['新闻资讯'] } },
      { path: 'news/:id', name: 'news-detail', component: () => import('@/views/NewsDetail.vue'), meta: { title: '资讯详情', breadcrumb: ['新闻资讯', '资讯详情'] } },
      { path: 'certificates', name: 'certificates', component: () => import('@/views/Certificates.vue'), meta: { title: '资质实力', breadcrumb: ['资质实力'] } },
      { path: 'strength', name: 'strength', component: () => import('@/views/Strength.vue'), meta: { title: '公司实力', breadcrumb: ['公司实力'] } },
      { path: 'about', name: 'about', component: () => import('@/views/About.vue'), meta: { title: '关于我们', breadcrumb: ['关于我们'] } },
      { path: 'contact', name: 'contact', component: () => import('@/views/Contact.vue'), meta: { title: '联系我们', breadcrumb: ['联系我们'] } },
      { path: 'privacy', name: 'privacy', component: () => import('@/views/Privacy.vue'), meta: { title: '隐私政策', breadcrumb: ['隐私政策'] } },
      { path: 'terms', name: 'terms', component: () => import('@/views/Terms.vue'), meta: { title: '服务条款', breadcrumb: ['服务条款'] } },
    ],
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFound.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.afterEach(() => {
  // 百度等爬虫可读取 noscript；SPA 内容由 @vueuse/head 与各页 usePageSeo 注入
});

export default router;
