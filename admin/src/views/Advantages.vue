<template>
  <CrudTable :api="advantages" :default-form="{ status: 1, sort_order: 0 }">
    <template #columns>
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="icon" label="图标" width="80" />
    </template>
    <template #form="{ form }">
      <el-form label-width="80px">
        <el-form-item label="标题"><el-input v-model="form.title" /></el-form-item>
        <el-form-item label="描述"><el-input v-model="form.description" type="textarea" /></el-form-item>
        <el-form-item label="图标"><el-input v-model="form.icon" placeholder="region/brand/factory" /></el-form-item>
        <el-form-item label="排序"><el-input-number v-model="form.sort_order" /></el-form-item>
        <el-form-item label="启用"><el-switch v-model="form.status" :active-value="1" :inactive-value="0" /></el-form-item>
      </el-form>
    </template>
  </CrudTable>
</template>

<script setup>
import CrudTable from '@/components/CrudTable.vue';
import { advantages } from '@/api';
</script>
