import axios from 'axios';

// Base API URL
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    
  },
});

// =============================
// Request Interceptor (JWT)
// =============================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// =============================
// Response Interceptor (401)
// =============================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const locationService = {
  getAll: (params) => api.get('/locations', { params }),
  getById: (id) => api.get(`/locations/${id}`),
  create: (data) => api.post('/locations', data),
  update: (id, data) => api.put(`/locations/${id}`, data),
  delete: (id) => api.delete(`/locations/${id}`),
  getNearby: (lat, lng, radius) =>
    api.get('/locations/nearby', { params: { lat, lng, radius } }),
};

// =============================
// Auth Service (MISSING)
// =============================
export const authService = {
  // This uses the 'api' instance, so it automatically gets 'application/json' headers
  login: (email, password,role) => api.post('/auth/login', { email, password,role }),
  
  register: (name, email, password,role ="user") => api.post('/auth/register', { name, email, password,role}),
  
  // Gets the current user (for the "Me" endpoint)
  getCurrentUser: () => api.get('/auth/me'),
  
  logout: () => {
    // If your backend has a logout endpoint, call it here. 
    // Otherwise, just resolving is fine since the frontend handles the token removal.
    // return api.post('/auth/logout'); 
    return Promise.resolve();
  },
};

export const mediaService = {
  getAll: (params) => api.get('/media', { params }),
  getById: (id) => api.get(`/media/${id}`),
  upload: (formData, onProgress) =>
    api.post('/media/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      },
    }),
  update: (id, data) => api.put(`/media/${id}`, data),
  delete: (id) => api.delete(`/media/${id}`),
  getByLocation: (locationId, params) =>
    api.get(`/media/location/${locationId}`, { params }),
};

export const collectionService = {
  getAll: (params) => api.get('/collections', { params }),
  getById: (id) => api.get(`/collections/${id}`),
  create: (data) => api.post('/collections', data),
  update: (id, data) => api.put(`/collections/${id}`, data),
  delete: (id) => api.delete(`/collections/${id}`),
  addMedia: (id, mediaId) => api.post(`/collections/${id}/media`, { mediaId }),
  removeMedia: (id, mediaId) => api.delete(`/collections/${id}/media/${mediaId}`),
};

export const userService = {
  getProfile: (id) => api.get(`/users/${id}`),
  updateProfile: (id, data) => api.put(`/users/${id}`, data),
  getContributions: (id, params) => api.get(`/users/${id}/contributions`, { params }),
  getStats: (id) => api.get(`/users/${id}/stats`),
};

export const reviewService = {
  getPending: (params) => api.get('/review/pending', { params }),
  approve: (mediaId, data) => api.post(`/review/${mediaId}/approve`, data),
  reject: (mediaId, reason) => api.post(`/review/${mediaId}/reject`, { reason }),
  addAnnotation: (mediaId, annotation) =>
    api.post(`/review/${mediaId}/annotations`, annotation),
};

export const searchService = {
  search: (query, filters) => api.get('/search', { params: { query, ...filters } }),
  autocomplete: (query) => api.get('/search/autocomplete', { params: { query } }),
};

export const timelineService = {
  getEvents: (params) => api.get('/timeline/events', { params }),
  getByYearRange: (start, end, params) =>
    api.get('/timeline/range', { params: { start, end, ...params } }),
};

export default api;
