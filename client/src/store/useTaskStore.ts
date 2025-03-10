import { create } from "zustand";
import axios from "axios";

export enum TaskStatus {
  TODO = "To do",
  IN_PROGRESS = "In progress",
  DONE = "Done",
}

export enum MappedTaskStatus {
  "To do" = "TODO",
  "In progress" = "IN_PROGRESS",
  "Done" = "DONE",
}

export interface Task {
  id?: number;
  title: string;
  dueDate: string;
  status?: MappedTaskStatus | null;
  description?: string;
  isPinned: boolean | false;
  isChecked: boolean | false;
  createdAt?: string;
  updatedAt?: string;
}

export interface TaskStore {
  tasks: Task[];
  fetchTask: () => Promise<void>;
  addTask: (task: Task) => Promise<void>;
  removeTask: (id: number) => Promise<void>;
  togglePin: (id: number) => Promise<void>;
  toggleCheck: (id: number) => Promise<void>;
  updateTask: (id: number, task: Task) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  fetchTask: async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}tasks`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const tasks = await res.data;
      set({ tasks });
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  },
  addTask: async (task) => {
    try {
      await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}tasks`,
        data: task,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      set((state) => ({ tasks: [...state.tasks, task] }));
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  },
  removeTask: async (id) => {
    try {
      await axios({
        method: "DELETE",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}tasks/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      }));
    } catch (error) {
      console.error("Failed to remove task:", error);
    }
  },
  togglePin: async (id) => {
    try {
      await axios({
        method: "PATCH",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}tasks/pinned/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, isPinned: !task.isPinned } : task,
        ),
      }));
    } catch (error) {
      console.error("Failed to toggle pin:", error);
    }
  },
  toggleCheck: async (id) => {
    try {
      await axios({
        method: "PATCH",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}tasks/checked/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, isChecked: !task.isChecked } : task,
        ),
      }));
    } catch (error) {
      console.error("Failed to toggle check:", error);
    }
  },
  updateTask: async (id, task) => {
    try {
      await axios({
        method: "PUT",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}tasks/${id}`,
        data: task,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...task } : t)),
      }));
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  },
}));
