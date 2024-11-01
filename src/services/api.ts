import axios from 'axios';

const api = axios.create({
  baseURL: 'https://xpuhpdq3i0.execute-api.sa-east-1.amazonaws.com/prod'
});

export default api; 