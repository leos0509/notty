"use client";
import { useTaskStore } from "@/store/useTaskStore";
import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import useUserStore from "@/store/userStore";

const TaskList = () => {
  const { tasks, fetchTask } = useTaskStore();
  const { isAuthenticated } = useUserStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      if (isAuthenticated) {
        await fetchTask();
      }
      setLoading(false);
    };

    loadTasks();
  }, [fetchTask, isAuthenticated]);

  if (loading) {
    return (
      <div className="flex w-full flex-col items-start gap-2">
        <div>
          <h1 className="text-lg font-bold">Task List</h1>
        </div>
        <div className="flex h-34 w-full items-center justify-center gap-2">
          <h1 className="text-lg font-semibold">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-start gap-2">
      <div>
        <h1 className="text-lg font-bold">Task List</h1>
      </div>
      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full flex-col items-center justify-between gap-2">
          {tasks.length === 0 ? (
            <div className="flex h-34 w-full items-center justify-center gap-2">
              <h1 className="text-lg font-semibold">
                No task found. Create one ...
              </h1>
            </div>
          ) : (
            tasks.map((task) => <TaskCard key={task.id} task={task} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;