import { MappedTaskStatus, Task, TaskStatus, useTaskStore } from "@/store/useTaskStore";
import React, { useState } from "react";

const TaskModal = () => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.IN_PROGRESS);
  const { addTask } = useTaskStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !dueDate) {
      alert("Title and Due Date are required");
      return;
    }
    if (title.length > 50) {
      alert("Title must be less than 50 characters");
      return;
    }
    if (title.trim().length === 0) {
      alert("Title cannot be just spaces");
      return;
    }
    if (description.trim().length === 0) {
      alert("Description cannot be just spaces");
      return;
    }

    const newTask: Task = {
      title,
      dueDate,
      description,
      status: MappedTaskStatus[status],
      isPinned: false,
      isChecked: false,
    };

    addTask(newTask);
    setTitle("");
    setDueDate("");
    setDescription("");
    setStatus(TaskStatus.IN_PROGRESS);
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <h1 className="text-lg font-bold">Create your task</h1>
      <form
        onSubmit={handleSubmit}
        className="flex w-full justify-between gap-4"
      >
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full flex-wrap items-center gap-2 md:flex-nowrap">
            <label htmlFor="" className="font-semibold">
              Title:
            </label>
            <input
              type="text"
              placeholder="Your task title ..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md bg-gray-100 p-2 transition-all duration-100 ease-in-out hover:bg-gray-200 focus:ring-1 focus:ring-gray-500 focus:outline-none"
            />
          </div>
          <div className="flex w-full flex-col items-center gap-4 md:flex-row">
            <div className="flex w-full flex-wrap items-center gap-2 md:flex-nowrap">
              <label htmlFor="" className="font-semibold text-nowrap">
                Due Date:
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full min-w-48 rounded-md bg-gray-100 p-2 transition-all duration-100 ease-in-out hover:bg-gray-200 focus:ring-1 focus:ring-gray-500 focus:outline-none"
              />
            </div>
            <div className="flex w-full flex-wrap items-center gap-2 md:flex-nowrap">
              <label htmlFor="" className="font-semibold">
                Status:
              </label>
              <select
                className="w-full min-w-48 rounded-md bg-gray-100 p-2 transition-all duration-100 ease-in-out hover:bg-gray-200 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                value={status}
                onChange={(e) => e.target.value && setStatus(e.target.value as TaskStatus)}
              >
                {Object.values(TaskStatus).map((statusValue) => (
                  <option key={statusValue} value={statusValue}>
                    {statusValue}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex w-full flex-col items-start gap-2">
            <label htmlFor="" className="font-semibold">
              Description &#40;optional&#41;:
            </label>
            <textarea
              placeholder="Type something"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-24 w-full rounded-md bg-gray-100 p-2 transition-all duration-100 ease-in-out hover:bg-gray-200 focus:ring-1 focus:ring-gray-500 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex-shrink-0">
          <button
            className="h-full w-32 rounded-md bg-gray-800 px-4 py-2 font-mono text-lg text-white uppercase hover:cursor-pointer hover:bg-gray-700"
            type="submit"
          >
            add task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskModal;
