"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/userStore";

const SigninPage = () => {
  const router = useRouter();
  const { setUser, setToken } = useUserStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/signin`,
        { email, password },
      );

      if (response.data.token) {
        setUser(response.data.user);
        setToken(response.data.token);
        router.push("/");
      }
    } catch (error: any) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background flex h-full min-h-screen w-full flex-col items-center justify-center px-8 py-16">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="text-center font-mono text-2xl font-bold">Signin</h2>
        <p className="text-center text-sm italic">
          Please sign in to take note
        </p>

        {error && <p className="mt-2 text-center text-red-500">{error}</p>}

        <form onSubmit={handleLogin} className="mt-4 flex flex-col gap-4">
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border px-4 py-2 focus:ring-1 focus:ring-gray-800 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border px-4 py-2 focus:ring-1 focus:ring-gray-800 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="rounded-lg bg-gray-900 px-4 py-2 text-white transition hover:bg-gray-600"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <a href="/signup" className="font-semibold hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SigninPage;
