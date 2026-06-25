<template>
  <el-container class="admin-layout">
    <el-aside width="220px" class="admin-aside">
      <div class="admin-logo">控创官网 CMS</div>
      <el-menu
        :default-active="route.path"
        router
        background-color="#0f172a"
        text-color="#cbd5e1"
        active-text-color="#60a5fa"
        class="admin-menu"
      >
        <el-menu-item v-for="m in menus" :key="m.path" :index="m.path">
          <span>{{ m.title }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="admin-header">
        <div class="header-title">{{ route.meta.title }}</div>
        <div class="header-actions">
          <span class="user-name">{{ username }}</span>
          <el-button size="small" type="primary" @click="onLogout"
            >退出</el-button
          >
        </div>
      </el-header>
      <el-main class="admin-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { logout } from "@/api";

const route = useRoute();
const router = useRouter();
const username = computed(
  () => localStorage.getItem("kc_admin_user") || "admin",
);

const menus = [
  { path: "/dashboard", title: "数据看板" },
  { path: "/banners", title: "轮播图" },
  { path: "/products", title: "产品管理" },
  { path: "/solutions", title: "解决方案" },
  { path: "/cases", title: "成功案例" },
  { path: "/news", title: "新闻资讯" },
  { path: "/certificates", title: "资质证书" },
  { path: "/partners", title: "合作伙伴" },
  { path: "/advantages", title: "首页优势" },
  { path: "/strength", title: "公司实力" },
  { path: "/about", title: "关于我们" },
  { path: "/config", title: "网站配置" },
  { path: "/logs", title: "系统日志" },
  { path: "/password", title: "修改密码" },
];

async function onLogout() {
  try {
    await logout();
  } catch {
    /* ignore */
  }
  localStorage.removeItem("kc_admin_token");
  localStorage.removeItem("kc_admin_user");
  router.push("/login");
}
</script>

<style scoped>
.admin-layout {
  min-height: 100vh;
  background: #f8fafc;
}

.admin-aside {
  background: #0f172a;
  color: #f8fafc;
  display: flex;
  flex-direction: column;
}

.admin-logo {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  border-bottom: 1px solid rgba(148, 163, 184, 0.18);
}

.admin-menu {
  border: none;
  background: transparent;
  padding-top: 10px;
  flex: 1;
}

.admin-menu ::v-deep .el-menu-item {
  height: 46px;
  line-height: 46px;
  border-radius: 0 12px 12px 0;
}

.admin-menu ::v-deep .el-menu-item:hover {
  background: rgba(96, 165, 250, 0.14);
}

.admin-menu ::v-deep .el-menu-item.is-active {
  color: #ffffff;
  background: rgba(59, 130, 246, 0.2);
}

.admin-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 64px;
  padding: 0 24px;
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 1px 0 rgba(148, 163, 184, 0.08);
}

.header-title {
  font-size: 16px;
  font-weight: 600;
  color: #0f172a;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-name {
  color: #64748b;
  font-size: 14px;
}

.admin-main {
  padding: 24px;
  background: #f1f5f9;
  min-height: calc(100vh - 64px);
}

.admin-main :global(.el-card) {
  border-radius: 12px;
}
</style>
