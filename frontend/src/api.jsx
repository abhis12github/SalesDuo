import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function optimizeProduct(asin) {
  const res = await axios.post(`${API_BASE}/product/optimize`, { asin });
  return res.data;
}

export async function getHistory(asin) {
  const res = await axios.get(`${API_BASE}/history/${asin}`);
  return res.data.history;
}