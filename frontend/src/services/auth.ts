/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { LoginDataType, SignupDataType } from "../types/authTypes";

axios.defaults.withCredentials = true;

export const register = async (formData: SignupDataType) => {
  try {
    const response = await axios.post('/api/auth/signup', formData, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return { data: response.data };
  } catch (error: any) {
    return { error: error.response?.data?.message || 'Registration failed' };
  }
}


export const login = async (formData: LoginDataType) => {
  try {
    const response = await axios.post('/api/auth/login', formData, {
      headers: {
        'Content-type': 'application/json',
      },
    });
    return { data: response.data };
  } catch (error: any) {
    return { error: error.response?.data?.message || 'Login failed' }
  }
}


export const getMe = async () => {
  try {
    const response = await axios.get('/api/auth/me');
    return { data: response.data };
  } catch (error: any) {
    return { error: error.response?.status === 401 ? 'Unauthorized' : 'Failed to fetch user' }
  }
}

export const logout = async () => {
  try {
    await axios.post('/api/auth/logout');
    return { error: null };
  } catch (error: any) {
    return { error: error.response?.data?.message || 'Logout failed' }
  }
}