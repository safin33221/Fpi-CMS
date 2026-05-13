'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import { OtpVerificationForm } from '@/components/module/auth/OtpVerificationForm';
import { SetPasswordForm } from '@/components/module/auth/SetPasswordForm';
import { VerifyStudentForm } from '@/components/module/auth/VerifyStudentForm';
import { useRegistration, type RegistrationStep } from '@/hooks/useRegistration';
import { cn } from '@/lib/utils';
import type { VerifyStudentPayload } from '@/types/registration';

const steps: { id: RegistrationStep; title: string; subtitle: string }[] = [
  {
    id: 'verify',
    title: 'Student Verification',
    subtitle: 'Enter your institute information to confirm your identity.',
  },
  {
    id: 'otp',
    title: 'OTP Verification',
    subtitle: 'Use the 6-digit code sent to your registered phone number.',
  },
  {
    id: 'password',
    title: 'Create Account',
    subtitle: 'Add your email and password to finish registration.',
  },
];

export default function Registration() {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const {
    step,
    studentInfo,
    loading,
    error,
    verifyStudent,
    verifyOtp,
    createAccount,
    backToVerify,
  } = useRegistration();

  const activeStep = steps.find((item) => item.id === step) || steps[0];
  const activeStepIndex = steps.findIndex((item) => item.id === step);

  const handleVerifyStudent = async (data: VerifyStudentPayload) => {
    setOtp('');
    await verifyStudent(data);
  };

  const handleCreateAccount = async (email: string, password: string) => {
    const success = await createAccount(email, password);

    if (success) {
      router.push('/login');
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-7xl items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            FPI CMS Registration
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
            Start with a verified student account.
          </h1>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
            Complete each step in order. Your OTP is sent automatically after
            the student record is verified.
          </p>

          <div className="mt-8 space-y-3">
            {steps.map((item, index) => {
              const isComplete = index < activeStepIndex;
              const isActive = item.id === step;

              return (
                <div
                  key={item.id}
                  className={cn(
                    'flex items-center gap-3 rounded-lg border bg-white p-3 shadow-sm',
                    isActive ? 'border-primary/40' : 'border-slate-200'
                  )}
                >
                  <span
                    className={cn(
                      'flex size-8 items-center justify-center rounded-full text-sm font-semibold',
                      isComplete || isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-slate-100 text-slate-500'
                    )}
                  >
                    {isComplete ? <Check className="size-4" /> : index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-xl sm:p-8">
          <div className="mb-6">
            <p className="text-sm text-slate-500">Step {activeStepIndex + 1} of 3</p>
            <h2 className="mt-1 text-2xl font-bold text-slate-950">{activeStep.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{activeStep.subtitle}</p>
          </div>

          {error && (
            <div className="mb-5 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {step === 'verify' && (
            <VerifyStudentForm loading={loading} onSubmit={handleVerifyStudent} />
          )}

          {step === 'otp' && (
            <OtpVerificationForm
              loading={loading}
              otp={otp}
              studentInfo={studentInfo}
              onBack={backToVerify}
              onChangeOtp={setOtp}
              onSubmit={() => verifyOtp(otp)}
            />
          )}

          {step === 'password' && (
            <SetPasswordForm loading={loading} onSubmit={handleCreateAccount} />
          )}
        </div>
      </section>
    </main>
  );
}
