import api from "./axios";

export const taskService = {
  // Get paginated list of tasks
  getTasks: async ({ page = 1, limit = 10 }) => {
    const response = await api.get("/tasks", {
      params: { page, limit },
    });
    return response.data;
  },

  // Get single task by ID
  getTask: async (taskId) => {
    const response = await api.get(`/tasks/${taskId}`);
    return response.data;
  },

  // Create a new task
  createTask: async (taskData) => {
    const response = await api.post("/tasks", taskData);
    return response.data;
  },

  // Update existing task
  updateTask: async ({ taskId, taskData }) => {
    const response = await api.put(`/tasks/${taskId}`, taskData);
    return response.data;
  },

  // Delete task
  deleteTask: async (taskId) => {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  },
};
