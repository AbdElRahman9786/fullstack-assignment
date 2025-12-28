import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "@/api/taskService";

// Query key factory
export const taskKeys = {
  all: ["tasks"],
  lists: () => [...taskKeys.all, "list"],
  list: (filters) => [...taskKeys.lists(), filters],
  details: () => [...taskKeys.all, "detail"],
  detail: (id) => [...taskKeys.details(), id],
};

// Hook to fetch paginated tasks
export const useTasks = ({ page = 1, limit = 10 }) => {
  return useQuery({
    queryKey: taskKeys.list({ page, limit }),
    queryFn: () => taskService.getTasks({ page, limit }),
    placeholderData: (previousData) => previousData,
  });
};

// Hook to fetch single task
export const useTask = (taskId) => {
  return useQuery({
    queryKey: taskKeys.detail(taskId),
    queryFn: () => taskService.getTask(taskId),
    enabled: !!taskId,
  });
};

// Hook to create a task
export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: taskService.createTask,
    onSuccess: () => {
      // Invalidate and refetch tasks list
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
    },
    onError: (error) => {
      console.error("Create task failed:", error.response?.data?.message || error.message);
    },
  });
};

// Hook to update a task
export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: taskService.updateTask,
    onSuccess: (data, variables) => {
      // Invalidate tasks list and the specific task
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
      queryClient.invalidateQueries({ queryKey: taskKeys.detail(variables.taskId) });
    },
    onError: (error) => {
      console.error("Update task failed:", error.response?.data?.message || error.message);
    },
  });
};

// Hook to delete a task
export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: taskService.deleteTask,
    onSuccess: () => {
      // Invalidate and refetch tasks list
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
    },
    onError: (error) => {
      console.error("Delete task failed:", error.response?.data?.message || error.message);
    },
  });
};
