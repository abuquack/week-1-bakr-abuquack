import axios from "axios";
import { LoginDataType, RegisterDataType } from "../types/authTypes";

axios.defaults.withCredentials = true;

export const login = async (formData: LoginDataType) => {
  try {
    const response = await axios.post('/api/auth/login', formData, {
      headers: {
        'Content-type': 'application/json',
      },
    });
    return response.data;
  } catch {
    throw new Error('Login failed');
  }
}

export const register = async (formData: RegisterDataType) => {
  try {
    const response = await axios.post('/api/auth/signup', formData, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch {
    console.error('Register failed')
  }
}

export const getMe = async () => {
  try {
    const response = await axios.get('api/auth/me', {
    });
    return response.data;
  } catch {
    console.error('getMe failed')
  }
}

export const logout = async () => {
  try {
    const response = await axios.post('api/auth/logout', {
    });
    return response.data;
  } catch {
    console.error('logout failed');
  }
}