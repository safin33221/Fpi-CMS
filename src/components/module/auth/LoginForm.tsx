"use client"
import { Button } from "@/components/ui/button";
import { login } from "@/services/auth/login";
import { useActionState } from "react";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, null);
  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Email Address
        </label>

        <input
          required
          name="email"
          type="email"
          placeholder="student@fpi.edu"
          className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Password
        </label>

        <input
          required
          name="password"
          type="password"
          placeholder="Enter your password"
          className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
        />
      </div>

      {/* Error Message */}
      {state && !state.success && state.message && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {state.message}
        </div>
      )}

      {/* Login Button */}
      <Button
        type="submit"
        disabled={isPending}
        className="h-12 w-full rounded-2xl bg-primary text-base font-semibold shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl"
      >
        {isPending ? "Signing In..." : "Login to Dashboard"}
      </Button>
    </form>
  );
};
