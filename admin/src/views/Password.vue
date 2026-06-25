<template>
  <el-card class="max-w-md">
    <el-form label-width="100px">
      <el-form-item label="原密码"><el-input v-model="form.oldPassword" type="password" show-password /></el-form-item>
      <el-form-item label="新密码"><el-input v-model="form.newPassword" type="password" show-password /></el-form-item>
      <el-form-item label="确认密码"><el-input v-model="form.confirm" type="password" show-password /></el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">修改密码</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { changePassword } from '@/api';

const form = ref({ oldPassword: '', newPassword: '', confirm: '' });

async function submit() {
  if (form.value.newPassword !== form.value.confirm) {
    ElMessage.warning('两次密码不一致');
    return;
  }
  await changePassword({ oldPassword: form.value.oldPassword, newPassword: form.value.newPassword });
  ElMessage.success('密码已修改');
  form.value = { oldPassword: '', newPassword: '', confirm: '' };
}
</script>
