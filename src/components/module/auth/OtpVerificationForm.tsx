'use client';

import { type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import type { StudentInfo } from '@/types/registration';

type Props = {
  loading: boolean;
  otp: string;
  studentInfo: StudentInfo | null;
  onBack: () => void;
  onChangeOtp: (value: string) => void;
  onSubmit: () => void | Promise<void>;
};

export function OtpVerificationForm({
  loading,
  otp,
  studentInfo,
  onBack,
  onChangeOtp,
  onSubmit,
}: Props) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  const handleOtpChange = (value: string) => {
    onChangeOtp(value.replace(/\D/g, '').slice(0, 6));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {studentInfo && (
        <div className="rounded-lg border border-sky-100 bg-sky-50 p-4 text-sm text-sky-900">
          <p className="font-semibold">{studentInfo.name}</p>
          <p className="mt-1 text-sky-800">
            {studentInfo.department} - Semester {studentInfo.semester}
          </p>
        </div>
      )}

      <label className="block">
        <span className="text-sm font-medium text-slate-700">OTP Code</span>
        <input
          required
          inputMode="numeric"
          pattern="[0-9]{6}"
          value={otp}
          onChange={(event) => handleOtpChange(event.target.value)}
          placeholder="Enter 6-digit OTP"
          className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-3 text-center font-mono text-lg tracking-[0.35em] text-slate-950 outline-none transition focus:border-primary focus:ring-3 focus:ring-primary/15"
        />
      </label>

      <Button type="submit" disabled={loading || otp.length !== 6} className="h-11 w-full rounded-lg">
        {loading ? 'Verifying...' : 'Verify OTP'}
      </Button>

      <Button
        type="button"
        variant="ghost"
        disabled={loading}
        onClick={onBack}
        className="h-10 w-full rounded-lg text-slate-600"
      >
        Back to student verification
      </Button>
    </form>
  );
}
