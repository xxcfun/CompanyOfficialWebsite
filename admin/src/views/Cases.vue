<template>
  <CrudTable :api="cases" :default-form="{ status: 1, location: '山东', sort_order: 0 }">
    <template #columns>
      <el-table-column prop="customer_name" label="客户" />
      <el-table-column prop="location" label="地区" width="100" />
    </template>
    <template #form="{ form }">
      <el-form label-width="90px">
        <el-form-item label="客户"><el-input v-model="form.customer_name" /></el-form-item>
        <el-form-item label="场景"><el-input v-model="form.project_scene" /></el-form-item>
        <el-form-item label="设备"><el-input v-model="form.devices_used" /></el-form-item>
        <el-form-item label="成果"><el-input v-model="form.result" type="textarea" /></el-form-item>
        <el-form-item label="封面"><UploadImage v-model="form.cover" /></el-form-item>
        <el-form-item label="详情"><el-input v-model="form.content" type="textarea" rows="4" /></el-form-item>
        <el-form-item label="地区"><el-input v-model="form.location" /></el-form-item>
        <el-form-item label="排序"><el-input-number v-model="form.sort_order" /></el-form-item>
        <el-form-item label="展示"><el-switch v-model="form.status" :active-value="1" :inactive-value="0" /></el-form-item>
      </el-form>
    </template>
  </CrudTable>
</template>

<script setup>
import CrudTable from '@/components/CrudTable.vue';
import UploadImage from '@/components/UploadImage.vue';
import { cases } from '@/api';
</script>
