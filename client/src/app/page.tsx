"use client";

import TaskList from "@/components/TaskList";
import TaskModal from "@/components/TaskModal";

export default function Home() {
  return (
    <div className="flex min-h-screen h-full w-full flex-col items-center justify-start gap-4 px-8 py-16 pb-32 xl:px-64 bg-background">
      <TaskModal />
      <hr />
      <TaskList />
    </div>
  );
}
