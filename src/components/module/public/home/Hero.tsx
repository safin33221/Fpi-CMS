"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BellRing,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { SLIDES } from "./hero-data";


export default function Hero() {
  const [index, setIndex] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);

  const statsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!statsRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.3,
      }
    );

    observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, []);

  const next = () =>
    setIndex((prev) => (prev + 1) % SLIDES.length);

  const prev = () =>
    setIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <section className="relative overflow-hidden bg-slate-50/50 text-slate-900 py-12 lg:py-20">
      {/* Subtle Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />

      {/* Background Glows */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-400/20 blur-[100px]" />
      <div className="pointer-events-none absolute top-1/2 -right-32 h-96 w-96 rounded-full bg-indigo-400/20 blur-[100px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">

        {/* LEFT SIDE CONTENT */}
        <div className="flex flex-col items-start justify-center">
          {/* Dynamic Badge with Pulse */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700 shadow-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600"></span>
            </span>
            Bangladesh Technical Education Board
          </div>

          {/* Main Title */}
          <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.15]">
            Welcome to{" "}
            <span className="mt-1 block bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Feni Polytechnic Institute
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            One connected digital platform for Admission, Attendance, Class Routine, Results, Notice, and every academic activity.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/login"
              className="group inline-flex items-center gap-2.5 rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:bg-blue-700 hover:shadow-blue-600/45 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 active:scale-95"
            >
              Explore ERP
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/notice"
              className="inline-flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-7 py-3.5 font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300 active:scale-95"
            >
              <BellRing className="h-4 w-4 text-blue-600" />
              Latest Notice
            </Link>
          </div>

          {/* Stats Section */}

        </div>

        {/* RIGHT SIDE (Centered Slider Showcase) */}
        <div className="flex justify-center items-start w-full">
          <div className="relative w-full max-w-lg lg:max-w-none">
            {/* Decorative Outer Glow Ring */}
            <div className="absolute -inset-1.5 rounded-[2rem] bg-linear-to-r from-blue-500/20 to-indigo-500/20 blur-xl opacity-75" />

            <div className="relative aspect-16/11 w-full overflow-hidden rounded-3xl border border-white/50 bg-slate-900 shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={SLIDES[index].src}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={SLIDES[index].src}
                    alt={SLIDES[index].alt}
                    fill
                    priority
                    className="object-cover object-center"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Bottom Glassmorphic Caption Bar */}
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur-md">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-white drop-shadow-sm line-clamp-1">
                    {SLIDES[index].caption}
                  </p>

                  {/* Slide Pagination Indicators */}
                  <div className="flex gap-1.5">
                    {SLIDES.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-blue-500" : "w-1.5 bg-white/40"
                          }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Navigation Controls */}
                <div className="flex gap-1.5 shrink-0">
                  <button
                    onClick={prev}
                    aria-label="Previous slide"
                    className="rounded-xl border border-white/10 bg-white/10 p-2 text-white transition-all hover:bg-white/20 active:scale-90"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <button
                    onClick={next}
                    aria-label="Next slide"
                    className="rounded-xl border border-white/10 bg-white/10 p-2 text-white transition-all hover:bg-white/20 active:scale-90"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
