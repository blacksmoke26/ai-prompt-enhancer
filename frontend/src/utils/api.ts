/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import axios from 'axios';

/**
 * Base API client instance configured with default settings.
 * @example
 * ```typescript
 * import api from './api';
 * api.get('/users').then(response => console.log(response.data));
 * ```
 * @developer_notes This instance uses a 30-second timeout and JSON headers. Consider adjusting timeout for long-running operations.
 */
const API_BASE_URL = '/api';

/**
 * Axios instance with predefined configuration.
 * @example
 * ```typescript
 * api.post('/data', payload).then(handleResponse);
 * ```
 * @developer_notes Ensure all API routes are relative to the base URL. Update baseURL if environment changes.
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor to log outgoing API calls and add authentication tokens.
 * @example
 * ```typescript
 * // Logs: 'API Request: GET /users' with auth token
 * api.get('/users');
 * ```
 * @developer_notes Modify to add dynamic headers or authentication.
 */
api.interceptors.request.use(
  (config) => {
    // Log request details
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);

    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: any) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

/**
 * Response interceptor to log responses, handle errors, and implement retry logic.
 * @example
 * ```typescript
 * // Logs: 'API Response: 200 /users' or handles errors
 * api.get('/users');
 * ```
 * @developer_notes Add retry logic or custom error handling.
 */
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  async (error: any) => {
    console.error('API Response Error:', error);

    const originalRequest = error.config;

    // Handle specific status codes
    if (error.response?.status === 401) {
      // Unauthorized: Clear token and redirect to login
      localStorage.removeItem('authToken');
      window.location.href = '/login';
      console.error('Unauthorized access');
    } else if (error.response?.status === 429) {
      // Rate limiting: Implement exponential backoff retry
      const retryCount = originalRequest._retryCount || 0;
      if (retryCount < 3) {
        originalRequest._retryCount = retryCount + 1;
        const delay = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
        console.log(`Retrying request after ${delay}ms`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return api(originalRequest);
      }
      console.error('Rate limit exceeded');
    } else if (error.response?.status >= 500) {
      // Server error: Retry once
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        console.log('Retrying request due to server error');
        return api(originalRequest);
      }
      console.error('Server error occurred');
    } else if (error.code === 'ECONNABORTED') {
      // Timeout error
      console.error('Request timed out');
    } else {
      // Generic error
      console.error('An unexpected error occurred:', error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
