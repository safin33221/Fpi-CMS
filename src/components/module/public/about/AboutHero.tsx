
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import about from '../../../../../public/about.jpg';
import Image from "next/image";
export default function AboutHero() {
  return (
    <section
      aria-labelledby="about-title"
      className="relative w-full  border-b border-slate-200 "
    >
      {/* Background Hero Image with Light Overlay */}
      <Image
        src={about}
        alt="Feni Polytechnic Institute Campus"
        fill
        priority
        className="object-cover opacity-10"
      />

      {/* Light Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-white/80 to-white"
        aria-hidden="true"
      />

      {/* Content Container */}
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-xs text-slate-500 sm:text-sm">
            <li>
              <Link
                href="/"
                className="transition-colors hover:text-slate-900"
              >
                Home
              </Link>
            </li>

            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            </li>

            <li className="font-semibold text-slate-900" aria-current="page">
              About
            </li>
          </ol>
        </nav>

        {/* Hero Title */}
        <h1
          id="about-title"
          className="mt-5 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
        >
          About Feni Polytechnic Institute
        </h1>

        {/* Subtitle / Description */}
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base lg:text-lg">
          Six decades of technical education in greater Noakhali — training
          diploma engineers for industry, government service, and
          entrepreneurship under the Bangladesh Technical Education Board.
        </p>
      </div>
    </section>
  );
}