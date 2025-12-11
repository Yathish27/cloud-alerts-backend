import axios, { AxiosError } from 'axios';
import type { AlertsResponse, StatsResponse, Alert } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout:', error.config?.url);
    } else if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const alertsApi = {
  getAlerts: async (
    params?: {
      limit?: number;
      offset?: number;
      severity?: string;
      status?: string;
      source?: string;
      search?: string;
    }
  ): Promise<AlertsResponse> => {
    try {
      const response = await api.get<AlertsResponse>('/alerts', { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNREFUSED' || !error.response) {
          throw new Error('Cannot connect to backend server. Please ensure the backend is running on http://127.0.0.1:8000');
        }
        throw new Error(error.response?.data?.detail || error.message || 'Failed to fetch alerts');
      }
      throw error;
    }
  },

  getAlert: async (alertId: string): Promise<Alert> => {
    try {
      const response = await api.get<Alert>(`/alerts/${alertId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNREFUSED' || !error.response) {
          throw new Error('Cannot connect to backend server. Please ensure the backend is running on http://127.0.0.1:8000');
        }
        throw new Error(error.response?.data?.detail || error.message || 'Failed to fetch alert');
      }
      throw error;
    }
  },

  getStats: async (): Promise<StatsResponse> => {
    try {
      const response = await api.get<StatsResponse>('/stats');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNREFUSED' || !error.response) {
          throw new Error('Cannot connect to backend server. Please ensure the backend is running on http://127.0.0.1:8000');
        }
        throw new Error(error.response?.data?.detail || error.message || 'Failed to fetch statistics');
      }
      throw error;
    }
  },
};

export default api;

