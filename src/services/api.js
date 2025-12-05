import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
  login: (data) => api.post("/login", data),
  register: (data) => api.post("/register", data),
};

export const tourService = {
  getAll: () => api.get("/tours"),
  getById: (id) => api.get(`/tours/${id}`),
  create: (data) => api.post("/tours", data),
  update: (id, data) => api.put(`/tours/${id}`, data),
  patch: (id, data) => api.patch(`/tours/${id}`, data),
  delete: (id) => api.delete(`/tours/${id}`),
};

export default api;
