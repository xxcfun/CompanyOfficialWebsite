<template>
  <CrudTable :api="products" :default-form="{ type: 1, status: 1, sort_order: 0 }">
    <template #columns>
      <el-table-column prop="name" label="产品名称" />
      <el-table-column prop="type" label="分类" width="120">
        <template #default="{ row }">{{ typeMap[row.type] }}</template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="80">
        <template #default="{ row }">{{ row.status ? '上架' : '下架' }}</template>
      </el-table-column>
    </template>
    <template #form="{ form }">
      <el-form label-width="90px">
        <el-form-item label="分类">
          <el-select v-model="form.type">
            <el-option v-for="(l, v) in typeMap" :key="v" :label="l" :value="Number(v)" />
          </el-select>
        </el-form-item>
        <el-form-item label="名称"><el-input v-model="form.name" /></el-form-item>
        <el-form-item label="封面"><UploadImage v-model="form.cover" /></el-form-item>
        <el-form-item label="简介"><el-input v-model="form.summary" type="textarea" /></el-form-item>
        <el-form-item label="参数JSON"><el-input v-model="form.params" type="textarea" rows="3" placeholder='[{"name":"处理器","value":"i7"}]' /></el-form-item>
        <el-form-item label="场景"><el-input v-model="form.scenes" type="textarea" /></el-form-item>
        <el-form-item label="行业"><el-input v-model="form.industry" /></el-form-item>
        <el-form-item label="详情HTML"><el-input v-model="form.content" type="textarea" rows="5" /></el-form-item>
        <el-form-item label="SEO标题"><el-input v-model="form.seo_title" /></el-form-item>
        <el-form-item label="SEO关键词"><el-input v-model="form.seo_keywords" /></el-form-item>
        <el-form-item label="SEO描述"><el-input v-model="form.seo_description" type="textarea" /></el-form-item>
        <el-form-item label="排序"><el-input-number v-model="form.sort_order" /></el-form-item>
        <el-form-item label="上架"><el-switch v-model="form.status" :active-value="1" :inactive-value="0" /></el-form-item>
        <el-divider v-if="form.id">产品资料</el-divider>
        <template v-if="form.id">
          <div v-for="f in files" :key="f.id" class="flex gap-2 mb-2">
            <el-input v-model="f.file_name" size="small" />
            <el-input v-model="f.file_url" size="small" />
            <el-button size="small" type="danger" @click="removeFile(f.id)">删</el-button>
          </div>
          <el-button size="small" @click="addFile">添加资料</el-button>
        </template>
      </el-form>
    </template>
  </CrudTable>
</template>

<script setup>
import { ref, watch } from 'vue';
import CrudTable from '@/components/CrudTable.vue';
import UploadImage from '@/components/UploadImage.vue';
import { products } from '@/api';

const typeMap = { 1: '研华工控机', 2: '智微智能', 3: '自研设备' };
const files = ref([]);

async function loadFiles(productId) {
  if (!productId) return;
  files.value = await products.files(productId);
}

async function addFile() {
  await products.saveFile({ product_id: files.value[0]?.product_id || 0, file_name: '产品手册.pdf', file_url: '' });
}

async function removeFile(id) {
  await products.removeFile(id);
}

watch(files, () => {}, { deep: true });
</script>
