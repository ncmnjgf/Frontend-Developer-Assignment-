import api from './api';

export const countryService = {
  getAll: () => api.get('/country').then((r) => r.data),
};

export default countryService;
