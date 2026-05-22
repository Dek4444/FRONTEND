import { create } from "zustand";

interface AuthState {
  isLogin: boolean;
  nim: string | null;
  login: (nim: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLogin: localStorage.getItem("isLogin") === "true",
  nim: localStorage.getItem("nim"),
  login: (nim, password) => {
    if (nim === "24090122" && password === "admin123") {
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("nim", nim);
      set({ isLogin: true, nim });
      return true;
    }

    return false;
  },
  logout: () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("nim");
    set({ isLogin: false, nim: null });
  }
}));
