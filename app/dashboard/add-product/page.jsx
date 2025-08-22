"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function AddProductPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p className="p-10 text-center">Loading...</p>;
  }

  if (!session) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, price }),
      });

      if (!res.ok) {
        const data = await res.json();
        setMessage(data.message || "Failed to add product");
        return;
      }

      setMessage("Product added successfully!");
      setName("");
      setDescription("");
      setPrice("");
    } catch (err) {
      setMessage("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />

      <div className="flex justify-center p-4 sm:p-10">
        <div className="w-full max-w-lg rounded-xl bg-green-100 p-6 sm:p-8 shadow-lg border border-green-300">
          <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center text-green-900">
            Add Product
          </h1>

          {message && (
            <div className="mb-4 rounded-md bg-yellow-100 p-3 text-sm sm:text-base text-yellow-800">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm sm:text-base font-medium mb-2 text-green-900">
                Product Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-md border border-green-400 px-3 py-2 text-sm sm:text-base focus:border-yellow-400 focus:outline-none"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base font-medium mb-2 text-green-900">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full rounded-md border border-green-400 px-3 py-2 text-sm sm:text-base focus:border-yellow-400 focus:outline-none"
                placeholder="Enter product description"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base font-medium mb-2 text-green-900">
                Price ($)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="w-full rounded-md border border-green-400 px-3 py-2 text-sm sm:text-base focus:border-yellow-400 focus:outline-none"
                placeholder="Enter price"
                min="0"
                step="0.01"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-green-700 py-2 sm:py-3 text-yellow-400 text-sm sm:text-base font-semibold hover:bg-green-800 hover:text-yellow-300 transition"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
