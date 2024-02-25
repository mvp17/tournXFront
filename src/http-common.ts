import axios from 'axios';
import { useUserStore } from './modules/users/stores/userStore';

export default axios.create({
  baseURL: 'http://localhost:5268/api',
  headers: {
    'Content-type': 'application/json',
  },
});

export function authorizeRequest() {
  axios.interceptors.request.use(async (request) => {
    const token = useUserStore.getUser.token;
    if (token !== "") request.headers.Authorization = `Bearer ${token}`;
    return request;
  });
}
