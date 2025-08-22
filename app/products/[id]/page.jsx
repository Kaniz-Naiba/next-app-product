"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) {
          if (res.status === 404) throw new Error("Product not found");
          throw new Error("Failed to fetch product");
        }
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProduct();
  }, [id]);

  if (loading) return <p className="p-10 text-center">Loading product...</p>;
  if (error) return <p className="p-10 text-center text-red-600">{error}</p>;
  if (!product) return <p className="p-10 text-center">Product not found</p>;

  return (
    <div className="p-10 max-w-3xl mx-auto bg-green-50 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-green-800">{product.name}</h1>
      <p className="mb-4 text-gray-700">{product.description}</p>
      <p className="text-xl font-semibold mb-4 text-green-900">${product.price}</p>
      
      {product.featured && (
        <span className="inline-block bg-yellow-400 text-green-900 px-3 py-1 rounded-full mb-4 font-semibold">
          Featured
        </span>
      )}

      <div className="mt-6">
        <Link
          href="/products"
          className="bg-green-700 text-yellow-300 px-4 py-2 rounded hover:bg-green-800 transition"
        >
          Back to Products
        </Link>
      </div>
    </div>
  );
}
