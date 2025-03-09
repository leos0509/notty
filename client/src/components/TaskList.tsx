import { useTaskStore } from "@/store/useTaskStore";
import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";

const TaskList = () => {
  const { tasks, fetchTask } = useTaskStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      await fetchTask();
      setLoading(false);
    };

    loadTasks();
  }, [fetchTask]);

  if (loading) {
    return (
      <div className="flex w-full flex-col items-start gap-2">
        <div>
          <h1 className="text-lg font-bold">Task List</h1>
        </div>
        <div className="flex w-full gap-2 justify-center items-center h-34">
          <h1 className="text-lg font-semibold">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-start gap-2 h-full">
      <div>
        <h1 className="text-lg font-bold">Task List</h1>
      </div>
      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full flex-col items-center justify-between gap-2">
          {tasks.length === 0 ? (
            <div className="flex w-full gap-2 justify-center items-center h-34">
            <h1 className="text-lg font-semibold">No task found. Create one ...</h1>
          </div>
          ) : (
            tasks.map((task, index) => (
              <TaskCard key={index} task={task} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
