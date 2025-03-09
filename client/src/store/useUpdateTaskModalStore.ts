import { create } from "zustand";
import { Task } from "./useTaskStore";

export interface UpdateTaskModalStore {
  isOpen: boolean;
  updatedTask: Task | null;
  openModal: (task: Task) => void;
  closeModal: () => void;
}

export const useUpdateTaskModalStore = create<UpdateTaskModalStore>((set) => ({
  isOpen: false,
  updatedTask: null,
  openModal: (task) => {
    set({ isOpen: true , updatedTask: task });
  },
  closeModal: () => set({ isOpen: false }),
}));
