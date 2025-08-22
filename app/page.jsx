"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section with Slider */}
      <section className="relative h-[80vh] w-full">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          loop
          className="h-full w-full"
        >
          {["slide1.webp", "slide2.jpg", "slide3.webp"].map((img, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative h-full w-full flex flex-col justify-center items-center text-center px-4">
                <img
                  src={`/images/${img}`}
                  alt={`Slide ${idx + 1}`}
                  className="absolute inset-0 w-full h-full object-cover brightness-50"
                />
                <div className="relative z-10 max-w-2xl">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
                    {idx === 0 && "Welcome to Product App 🚀"}
                    {idx === 1 && "Add Your Products Easily"}
                    {idx === 2 && "Featured Products"}
                  </h1>
                  <p className="text-lg md:text-2xl mb-6 text-white drop-shadow-md">
                    {idx === 0 &&
                      "Discover amazing products and add your own to the catalog"}
                    {idx === 1 && "Share your unique products with the world"}
                    {idx === 2 && "Explore our top-rated products today"}
                  </p>
                  <Link
                    href="/products"
                    className="inline-block px-6 py-3 bg-yellow-400 text-green-800 font-semibold rounded-lg shadow-lg hover:bg-yellow-300 hover:scale-105 transition-transform"
                  >
                    {idx === 0 && "Explore Products"}
                    {idx === 1 && "View Catalog"}
                    {idx === 2 && "Shop Now"}
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Product Highlights Section */}
      <section className="bg-gray-50 py-16">
       
        <ProductCard />
      </section>

      <Footer />
    </div>
  );
}
