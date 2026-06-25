import request from '@/utils/request';

export const getCaptcha = () => request.get('/api/admin/captcha');
export const login = (data) => request.post('/api/admin/login', data);
export const logout = () => request.post('/api/admin/logout');
export const changePassword = (data) => request.post('/api/admin/password', data);
export const getDashboard = () => request.get('/api/admin/dashboard');
export const uploadFile = (formData, type = 'image') => request.post(`/api/admin/upload?type=${type}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });

const crud = (resource) => ({
  list: (params) => request.get(`/api/admin/${resource}`, { params }),
  save: (data) => request.post(`/api/admin/${resource}`, data),
  remove: (id) => request.delete(`/api/admin/${resource}/${id}`),
});

export const banners = crud('banners');
export const products = {
  ...crud('products'),
  files: (productId) => request.get(`/api/admin/products/${productId}/files`),
  saveFile: (data) => request.post('/api/admin/product-files', data),
  removeFile: (id) => request.delete(`/api/admin/product-files/${id}`),
};
export const solutions = crud('solutions');
export const cases = crud('cases');
export const news = crud('news');
export const certificates = crud('certificates');
export const partners = crud('partners');
export const advantages = crud('advantages');
export const strength = { list: () => request.get('/api/admin/strength'), save: (data) => request.post('/api/admin/strength', data) };
export const about = { get: () => request.get('/api/admin/about'), save: (data) => request.post('/api/admin/about', data) };
export const config = { get: () => request.get('/api/admin/config'), save: (data) => request.post('/api/admin/config', data) };
export const logs = { list: (params) => request.get('/api/admin/logs', { params }) };
