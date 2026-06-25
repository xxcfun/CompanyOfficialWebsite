<template>
  <div>
    <el-row :gutter="16" class="mb-6">
      <el-col :span="6" v-for="item in stats" :key="item.label">
        <el-card shadow="hover">
          <div class="text-slate-500 text-sm">{{ item.label }}</div>
          <div class="text-3xl font-semibold mt-2 text-brand-600">{{ item.value }}</div>
        </el-card>
      </el-col>
    </el-row>
    <el-card header="最近操作日志">
      <el-table :data="logs" size="small">
        <el-table-column prop="admin_name" label="管理员" width="100" />
        <el-table-column prop="action" label="操作" />
        <el-table-column prop="ip" label="IP" width="120" />
        <el-table-column prop="created_at" label="时间" width="180" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getDashboard } from '@/api';

const data = ref({ products: 0, solutions: 0, cases: 0, news: 0, logs: [] });
const stats = computed(() => [
  { label: '产品总数', value: data.value.products },
  { label: '方案总数', value: data.value.solutions },
  { label: '案例总数', value: data.value.cases },
  { label: '资讯总数', value: data.value.news },
]);
const logs = computed(() => data.value.logs || []);

onMounted(async () => {
  data.value = await getDashboard();
});
</script>
