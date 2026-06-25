<template>
  <div>
    <div class="mb-4">
      <el-button type="primary" @click="openForm()">新增</el-button>
    </div>
    <el-table :data="list" v-loading="loading" border stripe>
      <slot name="columns" />
      <el-table-column label="操作" width="160" fixed="right">
        <template #default="{ row }">
          <el-button link type="primary" @click="openForm(row)">编辑</el-button>
          <el-button link type="danger" @click="onDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="visible" :title="form.id ? '编辑' : '新增'" width="640px" destroy-on-close>
      <slot name="form" :form="form" />
      <template #footer>
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" :loading="saving" @click="onSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';

const props = defineProps({
  api: { type: Object, required: true },
  defaultForm: { type: Object, default: () => ({}) },
});

const list = ref([]);
const loading = ref(false);
const visible = ref(false);
const saving = ref(false);
const form = ref({});

async function load() {
  loading.value = true;
  try {
    const data = await props.api.list({ pageSize: 100 });
    list.value = data.list || data || [];
  } finally {
    loading.value = false;
  }
}

function openForm(row) {
  form.value = row ? { ...row } : { ...props.defaultForm };
  visible.value = true;
}

async function onSave() {
  saving.value = true;
  try {
    await props.api.save(form.value);
    ElMessage.success('保存成功');
    visible.value = false;
    load();
  } finally {
    saving.value = false;
  }
}

async function onDelete(row) {
  await ElMessageBox.confirm('确认删除？', '提示', { type: 'warning' });
  await props.api.remove(row.id);
  ElMessage.success('已删除');
  load();
}

onMounted(load);
defineExpose({ load, form, openForm });
</script>
