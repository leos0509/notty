import { create } from "zustand";
import axios from "axios";

export enum TaskStatus {
  TODO = "To do",
  IN_PROGRESS = "In progress",
  DONE = "Done",
}

export interface Task {
  id?: number;
  title: string;
  dueDate: string;
  status?: TaskStatus | null;
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
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("User ID not found in localStorage.");
      return;
    }

    try {
      const res = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}tasks`,
        headers: { userId },
      });
      const tasks = await res.data;
      set({ tasks });
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  },
  addTask: async (task) => {
    const userId = localStorage.getItem("userId");

    console.log("userId", userId);
    console.log("task", task);

    if (!userId) {
      console.error("User ID not found in localStorage.");
      return;
    }

    try {
      await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}tasks`,
        headers: { userId },
        data: task,
      });
      set((state) => ({ tasks: [...state.tasks, task] }));
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  },
  removeTask: async (id) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("User ID not found in localStorage.");
      return;
    }

    try {
      await axios({
        method: "DELETE",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}tasks/${id}`,
        headers: { userId },  // Add userId in headers
      });
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      }));
    } catch (error) {
      console.error("Failed to remove task:", error);
    }
  },
  togglePin: async (id) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("User ID not found in localStorage.");
      return;
    }

    try {
      await axios({
        method: "PATCH",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}tasks/pinned/${id}`,
        headers: { userId },  // Add userId in headers
      });
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, isPinned: !task.isPinned } : task
        ),
      }));
    } catch (error) {
      console.error("Failed to toggle pin:", error);
    }
  },
  toggleCheck: async (id) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("User ID not found in localStorage.");
      return;
    }

    try {
      await axios({
        method: "PATCH",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}tasks/checked/${id}`,
        headers: { userId },  // Add userId in headers
      });
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, isChecked: !task.isChecked } : task
        ),
      }));
    } catch (error) {
      console.error("Failed to toggle check:", error);
    }
  },
  updateTask: async (id, task) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("User ID not found in localStorage.");
      return;
    }

    try {
      await axios({
        method: "PUT",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}tasks/${id}`,
        headers: { userId },  // Add userId in headers
        data: task,
      });
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? task : t)),
      }));
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  },
}));
