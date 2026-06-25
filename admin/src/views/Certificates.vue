<template>
  <CrudTable :api="certificates" :default-form="{ cert_type: 1, status: 1, sort_order: 0 }">
    <template #columns>
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="cert_type" label="类型" width="120">
        <template #default="{ row }">{{ types[row.cert_type] }}</template>
      </el-table-column>
    </template>
    <template #form="{ form }">
      <el-form label-width="80px">
        <el-form-item label="名称"><el-input v-model="form.name" /></el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.cert_type">
            <el-option v-for="(l, v) in types" :key="v" :label="l" :value="Number(v)" />
          </el-select>
        </el-form-item>
        <el-form-item label="图片"><UploadImage v-model="form.image_url" /></el-form-item>
        <el-form-item label="简介"><el-input v-model="form.summary" type="textarea" /></el-form-item>
        <el-form-item label="排序"><el-input-number v-model="form.sort_order" /></el-form-item>
        <el-form-item label="展示"><el-switch v-model="form.status" :active-value="1" :inactive-value="0" /></el-form-item>
      </el-form>
    </template>
  </CrudTable>
</template>

<script setup>
import CrudTable from '@/components/CrudTable.vue';
import UploadImage from '@/components/UploadImage.vue';
import { certificates } from '@/api';

const types = { 1: '品牌授权', 2: '企业荣誉', 3: '行业资质' };
</script>
