import api from './api';

export const employeeService = {
  getAll: () => api.get('/employee').then((r) => r.data),
  getById: (id) => api.get(`/employee/${id}`).then((r) => r.data),
  create: (data) => api.post('/employee', data).then((r) => r.data),
  update: (id, data) => api.put(`/employee/${id}`, data).then((r) => r.data),
  remove: (id) => api.delete(`/employee/${id}`).then((r) => r.data),
};

export default employeeService;
