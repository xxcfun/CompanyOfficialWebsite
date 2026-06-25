<template>
  <div class="flex items-center gap-3">
    <el-input :model-value="modelValue" placeholder="图片URL" @update:model-value="$emit('update:modelValue', $event)" />
    <el-upload :show-file-list="false" :http-request="onUpload" accept="image/*">
      <el-button type="primary" size="small">上传</el-button>
    </el-upload>
    <img v-if="modelValue" :src="modelValue" class="w-16 h-16 object-cover rounded border" alt="预览" />
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { uploadFile } from '@/api';

const props = defineProps({ modelValue: String });
const emit = defineEmits(['update:modelValue']);

async function onUpload({ file }) {
  const fd = new FormData();
  fd.append('file', file);
  try {
    const { url } = await uploadFile(fd);
    emit('update:modelValue', url);
    ElMessage.success('上传成功');
  } catch { /* handled */ }
}
</script>
