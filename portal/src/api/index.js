import request from '@/utils/request';

export const getHome = () => request.get('/api/public/home');
export const getBanners = () => request.get('/api/public/banners');
export const getAdvantages = () => request.get('/api/public/advantages');
export const getProducts = (params) => request.get('/api/public/products', { params });
export const getProduct = (id) => request.get(`/api/public/products/${id}`);
export const getSolutions = () => request.get('/api/public/solutions');
export const getSolution = (id) => request.get(`/api/public/solutions/${id}`);
export const getCases = (params) => request.get('/api/public/cases', { params });
export const getCase = (id) => request.get(`/api/public/cases/${id}`);
export const getNews = (params) => request.get('/api/public/news', { params });
export const getNewsItem = (id) => request.get(`/api/public/news/${id}`);
export const getCertificates = () => request.get('/api/public/certificates');
export const getPartners = () => request.get('/api/public/partners');
export const getStrength = () => request.get('/api/public/strength');
export const getAbout = () => request.get('/api/public/about');
export const getConfig = () => request.get('/api/public/config');
export const getDownload = (id) => request.get(`/api/public/download/${id}`);
