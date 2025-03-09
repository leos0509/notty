import React from "react";
import TaskCard from "./TaskCard";
import { Task, useTaskContext } from "./TaskContext";
import { TaskModal, useTaskModalContext } from "./TaskModal";
import { set } from "date-fns";

const TaskAccordion = () => {
  const { tasks, isEmpty, isLoading } = useTaskContext();
  const { isOpen, setIsOpen, task, setTask } = useTaskModalContext();

  const pinnedTasks = tasks.filter((task: Task) => task.isPinned);
  const unpinnedTasks = tasks.filter((task: Task) => !task.isPinned);

  const handleCreateTask = () => {
    setIsOpen(true);
    setTask(null);
  }
  return (
    <div className="flex w-1/2 flex-col gap-2">
      <div className="w-full flex items-center justify-end px-2">
        <button className="p-2 cursor-pointer bg-amber-100 px-4 rounded-lg" onClick={handleCreateTask}>Create task</button>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {pinnedTasks.length > 0 && (
            <div className="flex flex-col gap-2 rounded-lg bg-amber-100 p-2">
              {/* Pinned Task */}
              {pinnedTasks.map((task: Task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}
          <div className="flex flex-col gap-2 p-2">
            {unpinnedTasks.map((task: Task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
          {isEmpty && (
            <div className="flex h-32 items-center justify-center rounded-lg bg-gray-100">
              No Task
            </div>
          )}
        </>
      )}
      <TaskModal isOpen={isOpen} setIsOpen={setIsOpen} task={task} />
    </div>
  );
};

export default TaskAccordion;
