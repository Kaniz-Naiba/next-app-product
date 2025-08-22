"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function AddProductPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Form states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  // Products list
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // Redirect unauthenticated users
  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  if (status === "loading") return <p className="p-10 text-center">Loading...</p>;
  if (!session) return null;

  // Add or Update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const method = editingProduct ? "PATCH" : "POST";
      const url = editingProduct ? `/api/products/${editingProduct.id}` : "/api/products";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, price }),
      });

      if (!res.ok) {
        const data = await res.json();
        setMessage(data.message || "Failed to save product");
        return;
      }

      const savedProduct = await res.json();

      if (editingProduct) {
        setProducts(products.map((p) => (p.id === savedProduct.id ? savedProduct : p)));
        setEditingProduct(null);
        setMessage("Product updated successfully!");
      } else {
        setProducts([...products, savedProduct]);
        setMessage("Product added successfully!");
      }

      // Clear form
      setName("");
      setDescription("");
      setPrice("");
    } catch (err) {
      setMessage("Something went wrong. Try again.");
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setEditingProduct(product);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setProducts(products.filter((p) => p.id !== id));
      setMessage("Product deleted successfully!");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />

      <div className="flex flex-col items-center p-4 sm:p-10 space-y-10">
        {/* Form */}
        <div className="w-full max-w-lg rounded-xl bg-green-100 p-6 sm:p-8 shadow-lg border border-green-300">
          <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center text-green-900">
            {editingProduct ? "Update Product" : "Add Product"}
          </h1>

          {message && (
            <div className="mb-4 rounded-md bg-yellow-100 p-3 text-sm sm:text-base text-yellow-800 text-center">
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
                placeholder="Enter product name"
                className="w-full rounded-md border border-green-400 px-3 py-2 text-sm sm:text-base focus:border-yellow-400 focus:outline-none"
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
                placeholder="Enter product description"
                rows={3}
                className="w-full rounded-md border border-green-400 px-3 py-2 text-sm sm:text-base focus:border-yellow-400 focus:outline-none"
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
                placeholder="Enter price"
                min="0"
                step="0.01"
                className="w-full rounded-md border border-green-400 px-3 py-2 text-sm sm:text-base focus:border-yellow-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-green-700 py-2 sm:py-3 text-yellow-400 text-sm sm:text-base font-semibold hover:bg-green-800 hover:text-yellow-300 transition"
            >
              {editingProduct ? "Update Product" : "Add Product"}
            </button>
          </form>
        </div>

        {/* Product List */}
        <div className="w-full max-w-lg flex flex-col space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-green-100 rounded-lg border border-green-300"
            >
              <div className="flex-1">
                <h2 className="font-bold text-green-900">{product.name}</h2>
                <p className="text-green-800 text-sm">{product.description}</p>
                <p className="text-green-900 font-semibold">${product.price}</p>
              </div>
              <div className="flex space-x-2 mt-2 sm:mt-0">
                <button
                  onClick={() => handleEdit(product)}
                  className="px-3 py-1 bg-yellow-400 text-green-800 rounded hover:bg-yellow-300 transition text-sm sm:text-base"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="px-3 py-1 bg-red-400 text-white rounded hover:bg-red-500 transition text-sm sm:text-base"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
