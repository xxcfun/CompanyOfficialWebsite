<template>
  <el-card v-loading="loading">
    <el-form label-width="100px" class="max-w-3xl">
      <el-form-item label="公司简介"><el-input v-model="form.intro" type="textarea" rows="5" /></el-form-item>
      <el-form-item label="发展历程"><el-input v-model="form.history" type="textarea" rows="6" /></el-form-item>
      <el-form-item label="企业宗旨"><el-input v-model="form.mission" /></el-form-item>
      <el-form-item label="经营理念"><el-input v-model="form.philosophy" type="textarea" rows="3" /></el-form-item>
      <el-form-item label="企业愿景"><el-input v-model="form.vision" type="textarea" rows="3" /></el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { about } from '@/api';

const loading = ref(false);
const form = ref({ mission: '成就客户' });

onMounted(async () => {
  loading.value = true;
  form.value = (await about.get()) || form.value;
  loading.value = false;
});

async function save() {
  await about.save(form.value);
  ElMessage.success('已保存，前台将同步更新');
}
</script>
