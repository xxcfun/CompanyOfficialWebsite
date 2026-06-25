<template>
  <CrudTable ref="table" :api="banners" :default-form="{ status: 1, sort_order: 0 }">
    <template #columns>
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="sort_order" label="排序" width="80" />
      <el-table-column prop="status" label="状态" width="80">
        <template #default="{ row }">{{ row.status ? '启用' : '禁用' }}</template>
      </el-table-column>
    </template>
    <template #form="{ form }">
      <el-form label-width="80px">
        <el-form-item label="标题"><el-input v-model="form.title" /></el-form-item>
        <el-form-item label="副标题"><el-input v-model="form.subtitle" type="textarea" /></el-form-item>
        <el-form-item label="图片"><UploadImage v-model="form.image_url" /></el-form-item>
        <el-form-item label="链接"><el-input v-model="form.link_url" /></el-form-item>
        <el-form-item label="排序"><el-input-number v-model="form.sort_order" /></el-form-item>
        <el-form-item label="状态"><el-switch v-model="form.status" :active-value="1" :inactive-value="0" /></el-form-item>
      </el-form>
    </template>
  </CrudTable>
</template>

<script setup>
import CrudTable from '@/components/CrudTable.vue';
import UploadImage from '@/components/UploadImage.vue';
import { banners } from '@/api';
</script>
