"use client";

import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-green-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Home */}
          <Link href="/" className="flex items-center space-x-2">
            <AiFillHome size={28} className="text-yellow-400" />
            <span className="font-bold text-xl text-yellow-400">Home</span>
          </Link>

          {/* Title (hidden on mobile) */}
          <h1 className="hidden md:block text-lg md:text-xl font-semibold text-yellow-300">
            MyProduct
          </h1>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
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

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none text-yellow-400"
            >
              {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-green-700 px-4 pb-4 space-y-2">
          <Link
            href="/products"
            className="block hover:text-yellow-400 transition"
            onClick={() => setIsOpen(false)}
          >
            Products
          </Link>

          {session && (
            <Link
              href="/dashboard/add-product"
              className="block hover:text-yellow-400 transition"
              onClick={() => setIsOpen(false)}
            >
              Add Product
            </Link>
          )}

          {!session ? (
            <Link
              href="/login"
              className="block px-3 py-1 rounded bg-yellow-400 text-green-800 font-semibold hover:bg-yellow-300 transition"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          ) : (
            <button
              onClick={() => {
                signOut({ callbackUrl: "/" });
                setIsOpen(false);
              }}
              className="block w-full text-left px-3 py-1 rounded bg-yellow-400 text-green-800 font-semibold hover:bg-yellow-300 transition"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
