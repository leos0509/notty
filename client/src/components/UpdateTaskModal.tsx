"use client";
import { Task, TaskStatus, useTaskStore } from "@/store/useTaskStore";
import { useUpdateTaskModalStore } from "@/store/useUpdateTaskModalStore";
import { X } from "lucide-react";
import React, { use, useEffect, useState } from "react";

type UpdateTaskModalProps = {
  task: Task | null;
};

const UpdateTaskModal = ({ task }: UpdateTaskModalProps) => {
  const [id, setId] = useState<number>();
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.IN_PROGRESS);
  const [isChecked, setIsChecked] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const { closeModal } = useUpdateTaskModalStore();
  const { updateTask } = useTaskStore();

  useEffect(() => {
    if (task) {
      setId(task.id);
      setTitle(task.title);
      setDueDate(task.dueDate);
      setDescription(task.description || "");
      setStatus(task.status || TaskStatus.IN_PROGRESS);
      setIsChecked(task.isChecked);
      setIsPinned(task.isPinned);
    }
  }, [task]);

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

    const formattedDueDate = new Date(dueDate).toISOString();

    const updatedTask: Task = {
      id,
      title,
      dueDate: formattedDueDate,
      description,
      status,
      isPinned,
      isChecked,
    };

    if (id) {
      updateTask(id, updatedTask);
    }
    setTitle("");
    setDueDate("");
    setDescription("");
    setStatus(TaskStatus.IN_PROGRESS);
    setIsChecked(false);
    setIsPinned(false);
  };

  return (
    <div
      className={`flex w-full flex-col gap-2 rounded-lg bg-white p-8 shadow relative`}
    >
      <h1 className="text-lg font-bold">Update Task</h1>
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col justify-between gap-4"
      >
        <div className="flex w-full flex-col gap-4">
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
                value={dueDate.split("T")[0]}
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
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
              >
                {Object.values(TaskStatus).map((status) => (
                  <option key={status} value={status}>
                    {status}
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
              className="min-h-48 w-full rounded-md bg-gray-100 p-2 transition-all duration-100 ease-in-out hover:bg-gray-200 focus:ring-1 focus:ring-gray-500 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex flex-shrink-0 justify-end">
          <button
            className="h-full  rounded-md bg-gray-800 px-4 py-2 font-mono text-lg text-white uppercase hover:cursor-pointer hover:bg-gray-700"
            type="submit"
            onClick={closeModal}
          >
            update task
          </button>
        </div>
      </form>
      <button className="absolute top-4 right-4 p-2 rounded-full cursor-pointer hover:bg-gray-400 bg-gray-200" onClick={closeModal}>
          <X size={16} />
        </button>
    </div>
  );
};

const UpdateTaskModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { updatedTask, closeModal, isOpen } = useUpdateTaskModalStore();
  
  return (
    <div className="relative w-full">
      {children}
      <div
        className={`absolute top-1/2 left-1/2 flex h-full w-screen -translate-x-1/2 -translate-y-1/2 items-center bg-gray-900/50 px-8 lg:px-32 xl:px-64 ${isOpen ? "" : "hidden"}`}
        onClick={(e) => e.target === e.currentTarget && closeModal()}
      >
        <UpdateTaskModal task={updatedTask} />
      </div>
    </div>
  );
};

export default UpdateTaskModalProvider;
