import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export async function getCategories() {
  const { data } = await api.get('/categories');
  return data;
}

export async function getMenu(params = {}) {
  const { data } = await api.get('/menu', { params });
  return data;
}

export async function getProduct(id) {
  const { data } = await api.get(`/products/${id}`);
  return data;
}

export async function getGallery(category) {
  const { data } = await api.get('/gallery', {
    params: category ? { category } : undefined,
  });
  return data;
}

export async function createOrder(orderData) {
  const { data } = await api.post('/orders', orderData);
  return data;
}

export async function getOrder(id) {
  const { data } = await api.get(`/orders/${id}`);
  return data;
}
