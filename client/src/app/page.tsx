"use client";
import TaskAccordion from "@/components/TaskAccordion";
import { Task, TaskProvider, useTaskContext } from "@/components/TaskContext";
import TaskModalProvider from "@/components/TaskModal";
import axios from "axios";
import { useEffect, useState } from "react";

const getTask = async () => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_BASE_URL + "tasks",
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

export default function Home() {

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start gap-4 pt-24">
      <h1 className="text-2xl font-bold">
        Todo App <span className="italic">Made by Leos</span>
      </h1>
      <TaskProvider>
        <TaskModalProvider>
          <TaskAccordion />
        </TaskModalProvider>
      </TaskProvider>
    </div>
  );
}
