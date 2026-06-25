import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/login', name: 'login', component: () => import('@/views/Login.vue'), meta: { public: true } },
  {
    path: '/',
    component: () => import('@/layouts/AdminLayout.vue'),
    redirect: '/dashboard',
    children: [
      { path: 'dashboard', name: 'dashboard', component: () => import('@/views/Dashboard.vue'), meta: { title: '数据看板' } },
      { path: 'banners', name: 'banners', component: () => import('@/views/Banners.vue'), meta: { title: '轮播图管理' } },
      { path: 'products', name: 'products', component: () => import('@/views/Products.vue'), meta: { title: '产品管理' } },
      { path: 'solutions', name: 'solutions', component: () => import('@/views/Solutions.vue'), meta: { title: '解决方案' } },
      { path: 'cases', name: 'cases', component: () => import('@/views/Cases.vue'), meta: { title: '成功案例' } },
      { path: 'news', name: 'news', component: () => import('@/views/News.vue'), meta: { title: '新闻资讯' } },
      { path: 'certificates', name: 'certificates', component: () => import('@/views/Certificates.vue'), meta: { title: '资质证书' } },
      { path: 'partners', name: 'partners', component: () => import('@/views/Partners.vue'), meta: { title: '合作伙伴' } },
      { path: 'advantages', name: 'advantages', component: () => import('@/views/Advantages.vue'), meta: { title: '首页优势' } },
      { path: 'strength', name: 'strength', component: () => import('@/views/Strength.vue'), meta: { title: '公司实力' } },
      { path: 'about', name: 'about', component: () => import('@/views/About.vue'), meta: { title: '关于我们' } },
      { path: 'config', name: 'config', component: () => import('@/views/Config.vue'), meta: { title: '网站配置' } },
      { path: 'logs', name: 'logs', component: () => import('@/views/Logs.vue'), meta: { title: '系统日志' } },
      { path: 'password', name: 'password', component: () => import('@/views/Password.vue'), meta: { title: '修改密码' } },
    ],
  },
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('kc_admin_token');
  if (!to.meta.public && !token) {
    next('/login');
    return;
  }
  if (to.path === '/login' && token) {
    next('/dashboard');
    return;
  }
  next();
});

export default router;
