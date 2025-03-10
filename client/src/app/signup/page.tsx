"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/userStore";

const SignupPage = () => {
  const router = useRouter();
  const { setUser, setToken } = useUserStore();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/signup`,
        {
          name: userName,
          email,
          password,
        },
      );

      if (response.data.token) {
        setUser(response.data.newUser);
        setToken(response.data.token);
        router.push("/");
      }
    } catch {
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background flex h-full min-h-screen w-full flex-col items-center justify-center px-8 py-16">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="text-center font-mono text-2xl font-bold">Sign Up</h2>

        {error && <p className="mt-2 text-center text-red-500">{error}</p>}

        <form onSubmit={handleSignup} className="mt-4 flex flex-col gap-4">
          {/* Username Input */}
          <input
            type="text"
            placeholder="Username"
            className="w-full rounded-lg border px-4 py-2 focus:ring-1 focus:ring-gray-800 focus:outline-none"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />

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
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <a href="/signin" className="font-semibold hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
