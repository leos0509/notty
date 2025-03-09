import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { Task, useTaskContext } from "./TaskContext";
import axios from "axios";

type TaskContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  task: Task | null;
  setTask: Dispatch<SetStateAction<Task | null>>;
};

const TaskModalContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskModalContext = () => {
  const context = useContext(TaskModalContext);
  if (!context) {
    throw new Error(
      "useTaskModalContext must be used within a TaskModalProvider",
    );
  }
  return context;
};

type TaskModalProps = {
  isOpen: boolean;
  task: Task | null;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const TaskModal = ({ isOpen, task, setIsOpen }: TaskModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [dueDate, setDueDate] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { setTasks } = useTaskContext();

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setStatus(task.status || "pending");
      setDueDate(task.dueDate || "");
      setIsPinned(task.isPinned || false);
      setIsChecked(task.isChecked || false);
    }
  }, [task]);

  const formattedDueDate = dueDate
    ? new Date(dueDate).toISOString().split("T")[0]
    : "";

  const taskUpdate = async (task: any, id: number) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}tasks/${id}`,
        task,
      );
      setTasks((prevTasks: Task[]) =>
        prevTasks.map((task) => (task.id === id ? response.data : task)),
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const taskCreate = async (task: any) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}tasks`,
        task,
      );
      setTasks((prevTasks: Task[]) => [...prevTasks, response.data]);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      title,
      description,
      status,
      dueDate,
      isPinned,
      isChecked,
    };

    if (task) {
      taskUpdate(formData, task.id);
    } else {
      taskCreate(formData);
    }
    setIsOpen(false);

    setTitle("");
    setDescription("");
    setStatus("pending");
    setDueDate("");
    setIsPinned(false);
    setIsChecked(false);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gray-800/50 ${isOpen ? "" : "hidden"}`}
      onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
    >
      <div className="w-1/2 rounded-lg bg-white px-6 py-4 shadow-lg">
        <h2 className="text-xl font-semibold">
          {task?.title ? "Edit Task" : "New Task"}
        </h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border p-2 text-sm focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none"
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border p-2 text-sm focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none"
            />
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-lg border p-2 text-sm focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none"
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Due Date */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Due Date</label>
            <input
              type="date"
              value={formattedDueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded-lg border p-2 text-sm focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none"
            />
          </div>

          {/* Pinned Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isPinned}
              onChange={(e) => setIsPinned(e.target.checked)}
              className="h-4 w-4"
            />
            <label className="font-semibold">Pinned</label>
          </div>

          {/* Checked Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="h-4 w-4"
            />
            <label className="font-semibold">Checked</label>
          </div>

          {/* Submit & Cancel Buttons */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg bg-gray-300 px-4 py-2 text-sm font-semibold cursor-pointer hover:opacity-80"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white cursor-pointer hover:opacity-80"
            >
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* 🔹 Task Modal Provider */
const TaskModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState<Task | null>(null);

  const contextValue = useMemo(
    () => ({ isOpen, setIsOpen, task, setTask }),
    [isOpen, task],
  );

  return (
    <TaskModalContext.Provider value={contextValue}>
      {children}
    </TaskModalContext.Provider>
  );
};

export default TaskModalProvider;
