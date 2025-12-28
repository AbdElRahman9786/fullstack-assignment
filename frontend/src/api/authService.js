import api from "./axios";

export const authService = {
  login: async (credentials) => {
    const response = await api.post("/login", credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post("/register", userData);
    return response.data;
  },

  logout: async () => {
    const response = await api.post("/logout");
    localStorage.removeItem("token");
    return response.data;
  },


}