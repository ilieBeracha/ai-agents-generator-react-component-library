import { create } from "zustand";
import { login, register } from "@/services/authService";
import { User } from "@/types/User";

interface AuthStore {
  token: string | null;
  error: string | null;
  isLoggedIn: boolean;
  login: (user: Partial<User>) => Promise<void>;
  logout: () => void;
  register: (user: User) => Promise<void>;
  checkAuth: () => Promise<void>;
  setTokenInLocalStorage: (token: string) => void;
  resetError: () => void;
}

export const authStore = create<AuthStore>((set) => ({
  token: localStorage.getItem("token") || "",
  error: null,
  isLoggedIn: false,

  login: async (user: Partial<User>) => {
    const response = await login(user);
    if (response.status === 200) {
      set({ isLoggedIn: true });
      authStore.getState().setTokenInLocalStorage(response.token);
      set({ error: null });
    } else {
      set({ error: response.message });
    }
  },

  register: async (user: User) => {
    const response = await register(user);
    if (response.status === 200) {
      set({ isLoggedIn: true });
      authStore.getState().setTokenInLocalStorage(response.token);
      set({ error: null });
    } else {
      set({ error: response.message });
    }
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
  resetError: () => {
    set({ error: null });
  },
}));
