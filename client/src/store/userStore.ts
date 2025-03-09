import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

interface UserStore {
  userId: string;
  setUserId: (id: string) => void;
}

export const useUserStore = create<UserStore>((set) => {
  let storedUserId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  if (!storedUserId) {
    storedUserId = uuidv4();
    if (typeof window !== "undefined") {
      localStorage.setItem("userId", storedUserId);
    }
  }

  return {
    userId: storedUserId,
    setUserId: (id: string) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("userId", id);
      }
      set({ userId: id });
    },
  };
});
