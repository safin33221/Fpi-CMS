import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Login() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <section className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">FPI CMS</p>
          <h1 className="mt-2 text-2xl font-bold text-slate-950">Welcome Back</h1>
          <p className="mt-2 text-sm text-slate-500">Login to your dashboard</p>
        </div>

        <form className="space-y-5">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Email Address</span>
            <input
              required
              type="email"
              placeholder="Enter your email"
              className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-primary focus:ring-3 focus:ring-primary/15"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input
              required
              type="password"
              placeholder="Enter your password"
              className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-primary focus:ring-3 focus:ring-primary/15"
            />
          </label>

          <Button type="submit" className="h-11 w-full rounded-lg">
            Login
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          New student?{' '}
          <Link href="/get-start" className="font-medium text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </section>
    </main>
  );
}
