import Image from 'next/image';
import Link from 'next/link';
import { Quote, ArrowRight } from 'lucide-react';

export function PrincipalMessage() {
  return (
    <section aria-labelledby="principal-heading" className="w-full bg-white py-14 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[320px_1fr] lg:items-center lg:gap-16">
        
        {/* LEFT: Principal Image & Info */}
        <div className="mx-auto w-full ">
          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <div className="relative aspect-square w-full overflow-hidden">
              <Image
                src="/7cf0e033-3ae2-4c52-a274-844a86606033.jpg"
                alt="Engr. Md. Abdul Karim, Principal of Feni Polytechnic Institute"
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                className="object-cover"
                priority
              />
            </div>
            
            <div className="border-t border-slate-200 bg-slate-50 px-4 py-3 text-center">
              <p className="text-sm font-bold text-slate-900">Engr. Md. Abdul Karim</p>
              <p className="text-xs text-slate-600">Principal, Feni Polytechnic Institute</p>
            </div>
          </div>
        </div>

        {/* RIGHT: Message Content */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Message from the Principal
          </p>

          <h2
            id="principal-heading"
            className="mt-3 font-serif text-2xl font-bold leading-snug text-slate-900 sm:text-3xl"
          >
            Preparing skilled technologists for a digital Bangladesh
          </h2>

          <blockquote className="relative mt-6 border-l-4 border-blue-500 pl-5">
            <Quote
              className="absolute -left-1 -top-4 h-8 w-8 text-blue-100"
              aria-hidden="true"
            />
            
            <p className="font-serif text-lg italic leading-relaxed text-slate-700">
              “Technical education is the backbone of national development. At FPI, we combine
              disciplined classroom learning with hands-on workshop practice so every diploma
              engineer leaves this campus ready for industry.”
            </p>
          </blockquote>

          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-slate-600">
            On behalf of the teachers, staff and students, I warmly welcome you to our Smart Campus
            portal. Through this ERP platform you can access admission information, class routines,
            attendance, examination results and official notices from anywhere — keeping students,
            guardians and faculty connected throughout the academic year.
          </p>

          <Link
            href="/principal-message"
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
          >
            Read the full message
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

      </div>
    </section>
  );
}