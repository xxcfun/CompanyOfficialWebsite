<template>
  <el-card v-loading="loading">
    <el-form label-width="120px" class="max-w-2xl">
      <el-form-item label="站点名称"><el-input v-model="form.site_name" /></el-form-item>
      <el-form-item label="ICP备案号"><el-input v-model="form.icp_number" /></el-form-item>
      <el-form-item label="公安备案号"><el-input v-model="form.police_number" /></el-form-item>
      <el-form-item label="版权信息"><el-input v-model="form.copyright" /></el-form-item>
      <el-form-item label="咨询电话"><el-input v-model="form.phone" /></el-form-item>
      <el-form-item label="公司地址"><el-input v-model="form.address" type="textarea" /></el-form-item>
      <el-form-item label="工作时间"><el-input v-model="form.work_time" /></el-form-item>
      <el-form-item label="全局SEO标题"><el-input v-model="form.global_seo_title" /></el-form-item>
      <el-form-item label="全局关键词"><el-input v-model="form.global_seo_keywords" type="textarea" /></el-form-item>
      <el-form-item label="全局描述"><el-input v-model="form.global_seo_description" type="textarea" /></el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存配置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { config } from '@/api';

const loading = ref(false);
const form = ref({});

onMounted(async () => {
  loading.value = true;
  form.value = (await config.get()) || {};
  loading.value = false;
});

async function save() {
  await config.save(form.value);
  ElMessage.success('网站配置已更新');
}
</script>
