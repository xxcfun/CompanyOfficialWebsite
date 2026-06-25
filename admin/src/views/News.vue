<template>
  <CrudTable :api="news" :default-form="{ category: 1, status: 1, sort_order: 0 }">
    <template #columns>
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="category" label="分类" width="100">
        <template #default="{ row }">{{ catMap[row.category] }}</template>
      </el-table-column>
    </template>
    <template #form="{ form }">
      <el-form label-width="90px">
        <el-form-item label="分类">
          <el-select v-model="form.category">
            <el-option v-for="(l, v) in catMap" :key="v" :label="l" :value="Number(v)" />
          </el-select>
        </el-form-item>
        <el-form-item label="标题"><el-input v-model="form.title" /></el-form-item>
        <el-form-item label="封面"><UploadImage v-model="form.cover" /></el-form-item>
        <el-form-item label="摘要"><el-input v-model="form.summary" type="textarea" /></el-form-item>
        <el-form-item label="内容"><el-input v-model="form.content" type="textarea" rows="6" /></el-form-item>
        <el-form-item label="发布时间"><el-date-picker v-model="form.publish_time" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" /></el-form-item>
        <el-form-item label="SEO"><el-input v-model="form.seo_title" placeholder="标题" /></el-form-item>
        <el-form-item label="发布"><el-switch v-model="form.status" :active-value="1" :inactive-value="0" /></el-form-item>
      </el-form>
    </template>
  </CrudTable>
</template>

<script setup>
import CrudTable from '@/components/CrudTable.vue';
import UploadImage from '@/components/UploadImage.vue';
import { news } from '@/api';

const catMap = { 1: '公司动态', 2: '行业资讯', 3: '技术干货', 4: '新品发布' };
</script>
