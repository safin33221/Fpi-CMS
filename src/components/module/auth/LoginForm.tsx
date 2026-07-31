"use client";

import { useState, useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { login } from "@/services/auth/login";
import { Eye, EyeOff, Lock, User, Loader2, AlertCircle } from "lucide-react";

const demoAccounts = [
  {
    label: "Admin",
    identifier: "admin@fpi.edu.bd",
    password: "Admin@123",
  },
  {
    label: "D Head",
    identifier: "10005",
    password: "FPI@10005",
  },
  {
    label: "Student",
    identifier: "student@gmail.com",
    password: "student",
  },

  // Future
  {
    label: "Teacher",
    identifier: "10003",
    password: "FPI@10003",
  },
  {
    label: "Register",
    identifier: "10004",
    password: "FPI@10004",
  },

];

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    identifier: "",
    password: "",
  });
  const [state, formAction, isPending] = useActionState(login, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (state.success && state.redirectTo) {
      router.push(state.redirectTo);
    }
  }, [state.success, state.redirectTo, router]);

  return (
    <form action={formAction} className="space-y-4 sm:space-y-5">
      {/* Identifier Input */}
      <div>
        <label
          htmlFor="identifier"
          className="mb-1.5 block text-xs sm:text-sm font-semibold text-slate-700"
        >
          Login ID / Email / Phone
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
            <User className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <input
            id="identifier"
            required
            name="identifier"
            type="text"
            autoComplete="username"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="Enter Student ID, Email or Phone"
            value={credentials.identifier}
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                identifier: e.target.value,
              }))
            }
            className="h-11 sm:h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
          />
        </div>
      </div>

      {/* Password Input */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label
            htmlFor="password"
            className="block text-xs sm:text-sm font-semibold text-slate-700"
          >
            Password
          </label>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
            <Lock className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <input
            id="password"
            required
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
            className="h-11 sm:h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-11 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
            ) : (
              <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {state && !state.success && state.message && (
        <div className="flex items-start gap-2.5 rounded-xl border border-red-200/80 bg-red-50/80 p-3 text-xs sm:text-sm text-red-700 animate-in fade-in-50">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
          <span>{state.message}</span>
        </div>
      )}
      <div className="space-y-2">
        <p className="text-xs font-medium text-slate-500">
          Demo Credentials
        </p>

        <div className="flex flex-wrap gap-2">
          {demoAccounts.map((account) => (
            <Button
              key={account.label}
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                setCredentials({
                  identifier: account.identifier,
                  password: account.password,
                })
              }
              className="text-xs"
            >
              {account.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Login Button */}
      <Button
        type="submit"
        disabled={isPending}
        className="h-11 sm:h-12 w-full rounded-xl bg-primary text-sm sm:text-base font-semibold text-primary-foreground shadow-md transition-all duration-200 hover:bg-primary/90 hover:shadow-lg active:scale-[0.99] disabled:opacity-70"
      >
        {isPending ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
            <span>Signing In...</span>
          </div>
        ) : (
          "Login to Dashboard"
        )}
      </Button>
    </form>
  );
}