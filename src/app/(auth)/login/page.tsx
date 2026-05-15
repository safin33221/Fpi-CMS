import LoginForm from "@/components/module/auth/LoginForm";
import { BookOpen, GraduationCap, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function page() {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-linear-to-br from-sky-100 via-white to-indigo-100 ">
      <div className="max-w-7x mx-auto">

        {/* Decorative Background */}
        <div className="absolute inset-0">
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-300/20 blur-3xl" />

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#dbeafe20_1px,transparent_1px),linear-gradient(to_bottom,#dbeafe20_1px,transparent_1px)] bg-size-[40px_40px]" />
        </div>

        <div className="relative z-10 grid w-full lg:grid-cols-2">
          {/* Left Campus Branding */}
          <section className="hidden flex-col justify-center px-16 py-12 lg:flex">
            <div className="max-w-lg">
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-primary/20 bg-white/70 px-5 py-2 shadow-sm backdrop-blur">
                <GraduationCap className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold tracking-wide text-primary">
                  FPI CAMPUS MANAGEMENT
                </span>
              </div>

              <h1 className="text-5xl font-black leading-tight text-slate-900">
                Smart Education
                <span className="block text-primary">Starts Here.</span>
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                Access your academic dashboard, manage campus activities,
                connect with students, and stay updated with everything in one
                modern educational platform.
              </p>

              <div className="mt-10 grid gap-4">
                <div className="flex items-center gap-4 rounded-2xl border border-white/60 bg-white/70 p-4 shadow-lg backdrop-blur">
                  <div className="rounded-xl bg-sky-100 p-3">
                    <BookOpen className="h-5 w-5 text-sky-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Student Dashboard
                    </h3>
                    <p className="text-sm text-slate-500">
                      Courses, notices, attendance & more.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-white/60 bg-white/70 p-4 shadow-lg backdrop-blur">
                  <div className="rounded-xl bg-indigo-100 p-3">
                    <ShieldCheck className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Secure Campus Access
                    </h3>
                    <p className="text-sm text-slate-500">
                      Protected authentication system for students & faculty.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Login Card */}
          <section className="flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md">
              <div className="rounded-3xl border border-white/40 bg-white/80 p-8 shadow-2xl backdrop-blur-xl">
                {/* Header */}
                <div className="mb-8 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>

                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                    FPI CMS
                  </p>

                  <h2 className="mt-3 text-3xl font-black text-slate-900">
                    Welcome Back
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Sign in to continue your academic journey
                  </p>
                </div>

                {/* Form */}
                <LoginForm />

                {/* Footer */}
                <div className="mt-8 border-t border-slate-200 pt-6 text-center">
                  <p className="text-sm text-slate-500">
                    New student?{" "}
                    <Link
                      href="/get-start"
                      className="font-semibold text-primary transition hover:underline"
                    >
                      Create an account
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
};
