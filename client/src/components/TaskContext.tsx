import React, {
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import axios from "axios";

export interface Task {
  id: number;
  title: string;
  description?: string;
  dueDate?: string;
  status?: string;
  isPinned: boolean;
  isChecked: boolean;
}

const TaskContext = createContext<any>(null);

export const useTaskContext = () => {
  return useContext(TaskContext);
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  const getTask = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}tasks`,
      );
      setTasks(response.data);
      setLoading(false);
      if (response.data.length === 0) {
        setIsEmpty(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleChecked = async (id: number) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}tasks/checked/${id}`,
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, isChecked: !task.isChecked } : task,
        ),
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const togglePinned = async (id: number) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}tasks/pinned/${id}`,
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, isPinned: !task.isPinned } : task,
        ),
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = async (task: Task) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}tasks`,
        task,
      );
      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const pinnedTasks = tasks.filter((task) => task.isPinned);
  const unpinnedTasks = tasks.filter((task) => !task.isPinned);

  useEffect(() => {
    getTask();
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <TaskContext.Provider
      value={{ tasks, toggleChecked, togglePinned, deleteTask, addTask, pinnedTasks, unpinnedTasks, isLoading: loading, isEmpty }}
    >
      {children}
    </TaskContext.Provider>
  );
};