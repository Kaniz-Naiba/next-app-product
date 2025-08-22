"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Login failed");
        return;
      }

      router.push("/products");
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      <Navbar />

      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border-t-4 border-yellow-400 p-8">
          <h1 className="mb-6 text-center text-3xl font-bold text-green-700">
            Login
          </h1>

          {error && (
            <div className="mb-4 rounded-md bg-red-100 p-3 text-sm text-red-700 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-green-600 py-3 text-white font-semibold hover:bg-green-700 transition"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="mb-3 text-sm text-gray-600">or</p>
            <button
              onClick={() => signIn("google", { callbackUrl: "/products" })}
              className="w-full rounded-lg border border-yellow-400 bg-yellow-300 py-3 text-green-800 font-semibold hover:bg-yellow-400 transition"
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
