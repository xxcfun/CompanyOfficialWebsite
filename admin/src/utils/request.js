import axios from 'axios';
import { ElMessage } from 'element-plus';
import router from '@/router';

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 20000,
});

service.interceptors.request.use((config) => {
  const token = localStorage.getItem('kc_admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

service.interceptors.response.use(
  (res) => {
    const data = res.data;
    if (data.code === 401) {
      localStorage.removeItem('kc_admin_token');
      router.push('/login');
      return Promise.reject(new Error(data.message));
    }
    if (data.code !== 0) {
      ElMessage.error(data.message || '请求失败');
      return Promise.reject(new Error(data.message));
    }
    return data.data;
  },
  (err) => {
    ElMessage.error(err.message || '网络错误');
    return Promise.reject(err);
  },
);

export default service;
