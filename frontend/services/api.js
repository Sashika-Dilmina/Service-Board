import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const jobService = {
  getAll: async () => {
    const response = await api.get('');

    return response.data.data;
  },

  getById: async (id) => {
    const response = await api.get(`/${id}`);

    return response.data.data;
  },

  create: async (data) => {
    const response = await api.post('/', data);

    return response.data.data;
  },

  updateStatus: async (id, status) => {
    const response = await api.patch(`/${id}`, {
      status,
    });

    return response.data.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/${id}`);

    return response.data.data;
  },
};

export default api;