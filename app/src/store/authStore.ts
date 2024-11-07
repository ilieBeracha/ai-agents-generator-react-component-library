import { create } from "zustand";
import { login, register } from "@/services/authService";
import { User } from "@/types/User";

interface AuthStore {
  token: string | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (user: User) => Promise<void>;
  checkAuth: () => Promise<void>;
  setTokenInLocalStorage: (token: string) => void;
}

export const authStore = create<AuthStore>((set) => ({
  token: localStorage.getItem("token") || "",
  isLoggedIn: false,

  login: async (email: string, password: string) => {
    const response = await login(email, password);
    set({ isLoggedIn: true });
    authStore.getState().setTokenInLocalStorage(response.token);
  },

  register: async (user: User) => {
    const response = await register(user);
    set({ isLoggedIn: true });
    authStore.getState().setTokenInLocalStorage(response.token);
  },

  logout: () => {
    set({ isLoggedIn: false });
    localStorage.removeItem("token");
  },

  checkAuth: async () => {
    const token = localStorage.getItem("token");
    if (token) {
      set({ token, isLoggedIn: true });
    }
  },

  setTokenInLocalStorage: (token: string) => {
    localStorage.setItem("token", token);
  },
}));
