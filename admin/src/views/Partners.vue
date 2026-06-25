<template>
  <CrudTable :api="partners" :default-form="{ status: 1, sort_order: 0 }">
    <template #columns>
      <el-table-column prop="name" label="客户名称" />
      <el-table-column prop="sort_order" label="排序" width="80" />
    </template>
    <template #form="{ form }">
      <el-form label-width="80px">
        <el-form-item label="名称"><el-input v-model="form.name" /></el-form-item>
        <el-form-item label="LOGO"><UploadImage v-model="form.logo_url" /></el-form-item>
        <el-form-item label="排序"><el-input-number v-model="form.sort_order" /></el-form-item>
        <el-form-item label="展示"><el-switch v-model="form.status" :active-value="1" :inactive-value="0" /></el-form-item>
      </el-form>
    </template>
  </CrudTable>
</template>

<script setup>
import CrudTable from '@/components/CrudTable.vue';
import UploadImage from '@/components/UploadImage.vue';
import { partners } from '@/api';
</script>
