"use client";

import TaskList from "@/components/TaskList";
import TaskModal from "@/components/TaskModal";
import useUserStore from "../store/userStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { checkAuth } from "@/lib/utils";

export default function Home() {
  const router = useRouter();
  const { setIsAuthenticated, setUser } = useUserStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const authStatus = await checkAuth();
      setIsAuthenticated(authStatus.isAuthenticated);
      setUser(authStatus.user);
      if (!authStatus.isAuthenticated) router.push("/signin");
    };

    verifyAuth();
    setLoading(false);
  }, [router, setIsAuthenticated, setUser]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-background flex h-full min-h-screen w-full flex-col items-center justify-center gap-4 px-8 py-32 xl:px-64">
      <TaskModal />
      <hr />
      <TaskList />
    </div>
  );
}
