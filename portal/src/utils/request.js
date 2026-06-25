import axios from 'axios';

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 15000,
});

service.interceptors.request.use((config) => config);

service.interceptors.response.use(
  (res) => {
    const data = res.data;
    if (data.code !== 0) {
      return Promise.reject(new Error(data.message || '请求失败'));
    }
    return data.data;
  },
  async (error) => {
    const config = error.config;
    if (!config || config.__retryCount >= 2) {
      return Promise.reject(error);
    }
    config.__retryCount = (config.__retryCount || 0) + 1;
    await new Promise((r) => setTimeout(r, 500));
    return service(config);
  },
);

export default service;
