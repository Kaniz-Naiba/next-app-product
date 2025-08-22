"use client";

import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 bg-green-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Home */}
          <Link href="/" className="flex items-center space-x-2">
            <AiFillHome size={28} className="text-yellow-400" />
            <span className="font-bold text-xl text-yellow-400">Home</span>
          </Link>

          {/* Title */}
          <h1 className="text-lg md:text-xl font-semibold text-yellow-300">
            My Product App
          </h1>

          {/* Navigation Items */}
          <div className="flex items-center space-x-6">
            <Link href="/products" className="hover:text-yellow-400 transition">
              Products
            </Link>

            {session && (
              <Link
                href="/dashboard/add-product"
                className="hover:text-yellow-400 transition"
              >
                Add Product
              </Link>
            )}

            {!session ? (
              <Link
                href="/login"
                className="ml-4 px-3 py-1 rounded bg-yellow-400 text-green-800 font-semibold hover:bg-yellow-300 transition"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="ml-4 px-3 py-1 rounded bg-yellow-400 text-green-800 font-semibold hover:bg-yellow-300 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
