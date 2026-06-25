<template>
  <CrudTable :api="solutions" :default-form="{ status: 1, sort_order: 0 }">
    <template #columns>
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="category" label="分类" width="180" />
    </template>
    <template #form="{ form }">
      <el-form label-width="90px">
        <el-form-item label="分类"><el-input v-model="form.category" /></el-form-item>
        <el-form-item label="标题"><el-input v-model="form.title" /></el-form-item>
        <el-form-item label="封面"><UploadImage v-model="form.cover" /></el-form-item>
        <el-form-item label="摘要"><el-input v-model="form.summary" type="textarea" /></el-form-item>
        <el-form-item label="场景"><el-input v-model="form.scene_desc" type="textarea" /></el-form-item>
        <el-form-item label="设备"><el-input v-model="form.devices" type="textarea" /></el-form-item>
        <el-form-item label="痛点"><el-input v-model="form.pain_points" type="textarea" /></el-form-item>
        <el-form-item label="优势"><el-input v-model="form.advantages" type="textarea" /></el-form-item>
        <el-form-item label="服务"><el-input v-model="form.service" type="textarea" /></el-form-item>
        <el-form-item label="详情"><el-input v-model="form.content" type="textarea" rows="4" /></el-form-item>
        <el-form-item label="排序"><el-input-number v-model="form.sort_order" /></el-form-item>
        <el-form-item label="发布"><el-switch v-model="form.status" :active-value="1" :inactive-value="0" /></el-form-item>
      </el-form>
    </template>
  </CrudTable>
</template>

<script setup>
import CrudTable from '@/components/CrudTable.vue';
import UploadImage from '@/components/UploadImage.vue';
import { solutions } from '@/api';
</script>
