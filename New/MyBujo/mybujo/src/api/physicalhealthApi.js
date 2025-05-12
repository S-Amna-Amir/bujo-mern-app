import axios from 'axios';

export const savePhysicalHealthData = (data) => {
  return axios.post('/api/physicalHealth', data, {
    headers: { 'Content-Type': 'application/json' }
  });
};

export const updatePhysicalHealthData = (id, data) => {
  return axios.put(`/api/physicalHealth/${id}`, data, {
    headers: { 'Content-Type': 'application/json' }
  });
};

export const getTodayPhysicalHealthData = () => {
  return axios.get('/api/physicalHealth/today');
};

export const getMonthlyData = (month) => {
  return axios.get(`/api/physicalHealth/monthly?month=${month}`);
};