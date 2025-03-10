"use client";
import { create } from "zustand";

export interface User {
  id: number;
  name: string;
  email: string;
}

interface UserStore {
  user: User | null;
  userId: number | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setToken: (token: string) => void;
  signout: () => void;
}

const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  userId: null,
  token: null,
  isAuthenticated: false,

  setUser: (user) => {
    set({ user });
  },

  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },

  signout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, isAuthenticated: false });
  },
  
  setIsAuthenticated: (isAuthenticated) => {
    set({ isAuthenticated });
  },
}));

export default useUserStore;
