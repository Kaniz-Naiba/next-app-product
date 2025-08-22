"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductCard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <section className="p-10 bg-gray-50 flex flex-col items-center w-full">
      <h2 className="text-3xl font-bold mb-6 text-green-700">Product Highlights</h2>
      {loading ? (
        <p className="text-gray-700">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-700">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-green-50 p-5 rounded-lg shadow hover:shadow-2xl transition transform hover:-translate-y-1 flex flex-col"
            >
              <h3 className="text-xl font-semibold mb-2 text-green-800">{product.name}</h3>
              <p className="text-gray-700 flex-grow mb-4">{product.description}</p>
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
    </section>
  );
}
