'use client';

import { useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

import type { StudentInfo } from '@/types/registration';
import { registerStudent } from '@/services/auth/registration';

const initialState = {
  success: false,
  message: '',
};

type Props = {
  studentInfo: StudentInfo | null;
};

export function SetPasswordForm({
  studentInfo,
}: Props) {
  const router = useRouter();

  const [confirmPassword, setConfirmPassword] =
    useState('');

  const [clientError, setClientError] =
    useState('');

  const [state, formAction, pending] =
    useActionState(
      registerStudent,
      initialState
    );

  useEffect(() => {
    if (state.success) {
      router.push('/login');
    }
  }, [state.success, router]);

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    const formData = new FormData(
      event.currentTarget
    );

    const password = String(
      formData.get('password')
    );

    if (password.length < 6) {
      event.preventDefault();

      setClientError(
        'Password must be at least 6 characters.'
      );

      return;
    }

    if (password !== confirmPassword) {
      event.preventDefault();

      setClientError(
        'Passwords do not match.'
      );

      return;
    }

    setClientError('');
  };

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <input
        type="hidden"
        name="studentId"
        value={studentInfo?.studentId ?? ''}
      />

      <label className="block">
        <span className="text-sm font-medium text-slate-700">
          Email Address
        </span>

        <input
          required
          name="email"
          type="email"
          placeholder="you@example.com"
          className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-primary focus:ring-3 focus:ring-primary/15"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-slate-700">
          Password
        </span>

        <input
          required
          minLength={6}
          name="password"
          type="password"
          placeholder="Create a password"
          className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-primary focus:ring-3 focus:ring-primary/15"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-slate-700">
          Confirm Password
        </span>

        <input
          required
          minLength={6}
          type="password"
          value={confirmPassword}
          onChange={(event) =>
            setConfirmPassword(
              event.target.value
            )
          }
          placeholder="Re-enter your password"
          className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-primary focus:ring-3 focus:ring-primary/15"
        />
      </label>

      {clientError && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {clientError}
        </p>
      )}

      {!clientError && state.message && (
        <p
          className={`rounded-lg px-3 py-2 text-sm ${
            state.success
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-700'
          }`}
        >
          {state.message}
        </p>
      )}

      <Button
        type="submit"
        disabled={pending}
        className="h-11 w-full rounded-lg"
      >
        {pending
          ? 'Creating account...'
          : 'Create Account'}
      </Button>
    </form>
  );
}