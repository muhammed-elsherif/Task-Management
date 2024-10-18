import axios from './axios';

export const login = async (email: string, password: string) => {
  const response = await axios.post('/auth/login', { email, password });
  const { access_token, userId } = response.data;
  localStorage.setItem('token', access_token);
  localStorage.setItem('userId', userId); // Store user ID
};
