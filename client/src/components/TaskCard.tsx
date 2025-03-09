import React, { useState } from "react";
import { ChevronDown, Pin, PinOff, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Task, TaskStatus, useTaskStore } from "@/store/useTaskStore";
import { useUpdateTaskModalStore } from "@/store/useUpdateTaskModalStore";

type TaskCardProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { id, title, description, dueDate, status, isPinned, isChecked } = task;
  const { openModal } = useUpdateTaskModalStore();
  const { removeTask, toggleCheck, togglePin } = useTaskStore();

  const formattedDate = dueDate ? format(new Date(dueDate), "MM/dd/yyyy") : "";

  const handlePinChange = () => {
    if (id) {
      togglePin(id);
    }
  }

  const handleCheckChange = () => {
    if (id) {
      toggleCheck(id);
    }
  }

  return (
    <div className="relative flex w-full flex-col rounded-lg border border-gray-300 bg-white shadow-sm">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckChange}
        className="absolute top-1/2 -left-8 h-4 w-4 flex-shrink-0 -translate-y-1/2 transform cursor-pointer"
      />
      <div
        className="group flex items-center justify-between rounded-md bg-gray-100 p-4"
        aria-expanded={isOpen}
        aria-controls="task-content"
      >
        <div className="flex flex-col items-start gap-1">
          <h2
            className={`text-lg font-semibold ${isChecked ? "line-through" : ""}`}
          >
            {title}
          </h2>
          <div className="flex items-center gap-2">
            {dueDate && (
              <p className="text-sm text-gray-500 italic">{formattedDate}</p>
            )}
            <div className="size-1 flex-shrink-0 rounded-full bg-gray-400"></div>
            <p
              // className={`text-sm ${status === "completed" ? "text-green-500" : status === "in_progress" ? "text-blue-500" : "text-red-500"}`}
            >
              {status && status.charAt(0).toUpperCase() +
                status.slice(1).replace(/_/g, " ")}
            </p>
          </div>
        </div>

        {description && (
          <div className="flex items-center gap-2">
            <button
              aria-label="Pin task"
              className="transition-all duration-100 ease-in-out hover:cursor-pointer hover:text-amber-500"
                onClick={handlePinChange}
            >
              {isPinned ? <PinOff size={20} /> : <Pin size={20} />}
            </button>
            <button
              aria-label="Edit task"
              className="transition-all duration-100 ease-in-out hover:cursor-pointer hover:text-blue-500"
                onClick={() => openModal(task)}
            >
              <Pencil size={20} />
            </button>
            <button
              aria-label="Delete task"
              className="transition-all duration-100 ease-in-out hover:cursor-pointer hover:text-red-500"
              onClick={id ? () => removeTask(id) : () => {}}
            >
              <Trash2 size={20} />
            </button>
            <button
              aria-label="Toggle description"
              className="cursor-pointer transition-transform duration-200 ease-in-out hover:opacity-60"
              onClick={() => setIsOpen(!isOpen)}
            >
              <ChevronDown
                className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        )}
      </div>

      {/* Dropdown Description */}
      <div
        id="task-content"
        className={`grid rounded-b-md bg-white transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-[500px] p-4 opacity-100"
            : "max-h-0 overflow-hidden opacity-0"
        }`}
      >
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default TaskCard;
