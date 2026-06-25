<template>
  <div class="login-container">
    <div class="login-background">
      <div class="gradient-blob blob-1"></div>
      <div class="gradient-blob blob-2"></div>
    </div>

    <div class="login-wrapper">
      <div class="login-card">
        <div class="login-header">
          <h1>控创官网 CMS</h1>
          <p>济南控创电子 · 管理系统</p>
        </div>

        <el-form :model="form" @submit.prevent="onSubmit" class="login-form">
          <el-form-item>
            <el-input
              v-model="form.username"
              placeholder="请输入账号"
              autocomplete="username"
              class="login-input"
            >
              <template #prefix>
                <span class="input-icon">👤</span>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              show-password
              autocomplete="current-password"
              class="login-input"
            >
              <template #prefix>
                <span class="input-icon">🔒</span>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <div class="captcha-row">
              <el-input
                v-model="form.captcha"
                placeholder="验证码"
                class="captcha-input"
              >
                <template #prefix>
                  <span class="input-icon">✓</span>
                </template>
              </el-input>
              <div
                class="captcha-image"
                v-html="captchaSvg"
                @click="loadCaptcha"
                title="点击刷新"
              />
            </div>
          </el-form-item>

          <el-button
            type="primary"
            class="login-button"
            native-type="submit"
            :loading="loading"
            size="large"
          >
            登录
          </el-button>
        </el-form>

        <div class="login-footer">
          <p>© 2024 济南控创电子 All Rights Reserved</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getCaptcha, login } from "@/api";

const router = useRouter();
const loading = ref(false);
const captchaSvg = ref("");
const form = ref({
  username: "admin",
  password: "",
  captcha: "",
  captchaId: "",
});

async function loadCaptcha() {
  const data = await getCaptcha();
  form.value.captchaId = data.captchaId;
  captchaSvg.value = data.svg;
}

async function onSubmit() {
  loading.value = true;
  try {
    const data = await login(form.value);
    localStorage.setItem("kc_admin_token", data.token);
    localStorage.setItem("kc_admin_user", data.username);
    router.push("/dashboard");
  } finally {
    loading.value = false;
    loadCaptcha();
  }
}

onMounted(loadCaptcha);
</script>

<style scoped>
.login-container {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
}

.login-background {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.gradient-blob {
  position: absolute;
  opacity: 0.08;
  filter: blur(60px);
  border-radius: 50%;
}

.blob-1 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #3b82f6, transparent);
  top: -100px;
  right: -50px;
  animation: float 8s ease-in-out infinite;
}

.blob-2 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, #06b6d4, transparent);
  bottom: -80px;
  left: -50px;
  animation: float 10s ease-in-out infinite reverse;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(30px, 30px);
  }
}

.login-wrapper {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 420px;
  padding: 20px;
}

.login-card {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 40px;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.3),
    0 0 1px rgba(255, 255, 255, 0.5) inset;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-header h1 {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.5px;
}

.login-header p {
  margin: 8px 0 0 0;
  font-size: 13px;
  color: #64748b;
  font-weight: 500;
}

.login-form {
  margin-bottom: 24px;
}

.login-form :deep(.el-form-item) {
  margin-bottom: 20px;
}

.login-form :deep(.el-form-item:last-child) {
  margin-bottom: 0;
}

.login-input {
  font-size: 14px;
}

.login-input :deep(.el-input__wrapper) {
  border-radius: 10px;
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  transition: all 0.3s ease;
}

.login-input :deep(.el-input__wrapper:hover) {
  border-color: #cbd5e1;
  background: #ffffff;
}

.login-input :deep(.el-input__wrapper.is-focus) {
  border-color: #3b82f6;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input-icon {
  font-size: 16px;
  margin-right: 4px;
}

.captcha-row {
  display: flex;
  gap: 12px;
  align-items: center;
}

.captcha-input {
  flex: 1;
  font-size: 14px;
}

.captcha-input :deep(.el-input__wrapper) {
  border-radius: 10px;
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  transition: all 0.3s ease;
}

.captcha-input :deep(.el-input__wrapper:hover) {
  border-color: #cbd5e1;
  background: #ffffff;
}

.captcha-input :deep(.el-input__wrapper.is-focus) {
  border-color: #3b82f6;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.captcha-image {
  width: 110px;
  height: 40px;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  background: #f8fafc;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
  overflow: hidden;
}

.captcha-image:hover {
  border-color: #3b82f6;
  background: #ffffff;
}

.login-button {
  width: 100%;
  height: 44px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 10px;
  letter-spacing: 0.5px;
  margin-top: 8px;
  transition: all 0.3s ease;
}

.login-button :deep(.el-button__content) {
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-footer {
  text-align: center;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
}

.login-footer p {
  margin: 0;
  font-size: 12px;
  color: #94a3b8;
}

@media (max-width: 640px) {
  .login-wrapper {
    max-width: 100%;
  }

  .login-card {
    padding: 24px;
  }

  .login-header h1 {
    font-size: 24px;
  }

  .login-button {
    height: 40px;
    font-size: 15px;
  }
}
</style>
