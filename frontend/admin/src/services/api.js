import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export async function getDashboard() {
  const { data } = await api.get('/admin/dashboard');
  return data;
}

export async function getOrders(params = {}) {
  const { data } = await api.get('/admin/orders', { params });
  return data;
}

export async function updateOrderStatus(id, status) {
  const { data } = await api.patch(`/admin/orders/${id}`, { status });
  return data;
}

export async function getCategories() {
  const { data } = await api.get('/categories');
  return data;
}

export async function createCategory(data) {
  const { data: result } = await api.post('/admin/categories', data);
  return result;
}

export async function updateCategory(id, data) {
  const { data: result } = await api.put(`/admin/categories/${id}`, data);
  return result;
}

export async function deleteCategory(id) {
  const { data } = await api.delete(`/admin/categories/${id}`);
  return data;
}

export async function getMenu(params = {}) {
  const { data } = await api.get('/menu', { params });
  return data;
}

export async function createProduct(data) {
  const { data: result } = await api.post('/admin/menu', data);
  return result;
}

export async function updateProduct(id, data) {
  const { data: result } = await api.put(`/admin/menu/${id}`, data);
  return result;
}

export async function deleteProduct(id) {
  const { data } = await api.delete(`/admin/menu/${id}`);
  return data;
}

export async function getGallery(category) {
  const { data } = await api.get('/gallery', { params: category ? { category } : {} });
  return data;
}

export async function createGalleryImage(data) {
  const { data: result } = await api.post('/admin/gallery', data);
  return result;
}

export async function updateGalleryImage(id, data) {
  const { data: result } = await api.put(`/admin/gallery/${id}`, data);
  return result;
}

export async function deleteGalleryImage(id) {
  const { data } = await api.delete(`/admin/gallery/${id}`);
  return data;
}
