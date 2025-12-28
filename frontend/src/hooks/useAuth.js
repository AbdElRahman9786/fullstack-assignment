import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authService } from "@/api/authService";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      // Store token if returned from API
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      // Navigate to tasks page after successful login
      navigate("/tasks");
    },
    onError: (error) => {
      console.error("Login failed:", error.response?.data?.message || error.message);
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      // Optionally auto-login after registration
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      // Navigate to login or dashboard after successful registration
      navigate("/login");
    },
    onError: (error) => {
      console.error("Registration failed:", error.response?.data?.message || error.message);
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      localStorage.removeItem("token");
      navigate("/login");
    },
    onError: (error) => {
      console.error("Logout failed:", error.message);
      // Still remove token and redirect on error
      localStorage.removeItem("token");
      navigate("/login");
    },
  });
};
