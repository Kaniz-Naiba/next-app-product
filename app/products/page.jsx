"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <p className="p-10 text-center">Loading products...</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="p-10 flex-1">
        <h1 className="text-4xl font-bold mb-8 text-center text-green-700">
          Products List
        </h1>

        {products.length === 0 ? (
          <p className="text-center text-gray-700">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id} // use MongoDB _id
                className="bg-green-50 p-6 rounded-lg shadow hover:shadow-2xl transition transform hover:-translate-y-1 flex flex-col"
              >
                <h2 className="text-2xl font-semibold mb-3 text-green-800">
                  {product.name}
                </h2>
                <p className="flex-grow text-gray-700 mb-4">{product.description}</p>
                <p className="font-bold text-green-900 mb-4">${product.price}</p>
                <Link
                  href={`/products/${product._id}`}
                  className="mt-auto px-4 py-2 bg-yellow-400 text-green-800 rounded hover:bg-yellow-300 text-center font-semibold transition"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
