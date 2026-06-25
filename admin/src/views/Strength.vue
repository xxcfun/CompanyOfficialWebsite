<template>
  <el-table :data="list" v-loading="loading" border>
    <el-table-column prop="section_key" label="标识" width="120" />
    <el-table-column prop="title" label="标题" />
    <el-table-column label="操作" width="100">
      <template #default="{ row }">
        <el-button link type="primary" @click="edit(row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="visible" title="编辑公司实力" width="600px">
    <el-form label-width="80px">
      <el-form-item label="标识"><el-input v-model="form.section_key" /></el-form-item>
      <el-form-item label="标题"><el-input v-model="form.title" /></el-form-item>
      <el-form-item label="内容"><el-input v-model="form.content" type="textarea" rows="5" /></el-form-item>
      <el-form-item label="配图"><UploadImage v-model="form.image_url" /></el-form-item>
      <el-form-item label="排序"><el-input-number v-model="form.sort_order" /></el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="save">保存</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import UploadImage from '@/components/UploadImage.vue';
import { strength } from '@/api';

const list = ref([]);
const loading = ref(false);
const visible = ref(false);
const form = ref({});

async function load() {
  loading.value = true;
  list.value = await strength.list();
  loading.value = false;
}

function edit(row) {
  form.value = { ...row };
  visible.value = true;
}

async function save() {
  await strength.save(form.value);
  ElMessage.success('已保存');
  visible.value = false;
  load();
}

onMounted(load);
</script>
