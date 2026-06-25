<template>
  <el-table :data="list" v-loading="loading" border>
    <el-table-column prop="id" label="ID" width="70" />
    <el-table-column prop="admin_name" label="管理员" width="100" />
    <el-table-column prop="action" label="操作行为" />
    <el-table-column prop="ip" label="IP" width="130" />
    <el-table-column prop="created_at" label="时间" width="180" />
  </el-table>
  <el-pagination class="mt-4" layout="total, prev, pager, next" :total="total" v-model:current-page="page" @current-change="load" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { logs } from '@/api';

const list = ref([]);
const total = ref(0);
const page = ref(1);
const loading = ref(false);

async function load() {
  loading.value = true;
  const data = await logs.list({ page: page.value, pageSize: 20 });
  list.value = data.list;
  total.value = data.total;
  loading.value = false;
}

onMounted(load);
</script>
