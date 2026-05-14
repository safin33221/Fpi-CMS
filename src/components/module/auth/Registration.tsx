/* eslint-disable @typescript-eslint/no-explicit-any */
// app/registration/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SetPasswordForm } from '@/components/module/auth/SetPasswordForm';
import { VerifyStudentForm } from '@/components/module/auth/VerifyStudentForm';
import { cn } from '@/lib/utils';
import type { StudentInfo } from '@/types/registration';

type RegistrationStep = 'verify' | 'review' | 'password';

const steps: { id: RegistrationStep; title: string; subtitle: string }[] = [
  {
    id: 'verify',
    title: 'Student Verification',
    subtitle: 'Enter your institute information to confirm your identity.',
  },
  {
    id: 'review',
    title: 'Review Details',
    subtitle: 'Check the verified student information before continuing.',
  },
  {
    id: 'password',
    title: 'Create Account',
    subtitle: 'Set your email and password to finish registration.',
  },
];

const detailLabels: { label: string; value: keyof StudentInfo }[] = [
  { label: 'Name', value: 'name' },
  { label: 'Roll', value: 'roll' },
  { label: 'Registration No', value: 'registrationNo' },
  { label: 'Date of Birth', value: 'dob' },
  { label: 'Phone', value: 'phone' },
  { label: 'Department', value: 'department' },
  { label: 'Semester', value: 'semester' },
  { label: 'Shift', value: 'shift' },
  { label: 'Session', value: 'session' },
  { label: 'Technology', value: 'technology' },
  { label: 'Student ID', value: 'studentId' },
];

function StudentDetails({
  studentInfo,
  onBack,
  onNext,
}: {
  studentInfo: StudentInfo;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2">
        {detailLabels.map((item) => (
          <div key={item.value} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              {item.label}
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-950">
              {studentInfo[item.value] || 'Not provided'}
            </p>
          </div>
        ))}
      </div>
      <div className="flex flex-col-reverse gap-3 sm:flex-row">
        <Button variant="outline" onClick={onBack} className="h-11 flex-1 rounded-lg">
          Edit Information
        </Button>
        <Button onClick={onNext} className="h-11 flex-1 rounded-lg">
          Next
        </Button>
      </div>
    </div>
  );
}

export default function Registration() {
  const router = useRouter();
  const [step, setStep] = useState<RegistrationStep>('verify');
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleVerificationSuccess = (verifiedStudent: StudentInfo) => {
    setStudentInfo(verifiedStudent);
    setStep('review');
    setError(null);
  };

  const handleVerificationError = (errMsg: string) => {
    setError(errMsg);
  };

  const handleCreateAccount = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      // Call your account creation API/server action
      // Replace with your actual endpoint
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          studentInfo, // include the verified student data
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Account creation failed');
      router.push('/login');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const activeStep = steps.find((item) => item.id === step) || steps[0];
  const activeStepIndex = steps.findIndex((item) => item.id === step);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            FPI CMS Registration
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
            Start with a verified student account.
          </h1>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
            First verify your student record, then review the details and set
            your login credentials.
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
            <VerifyStudentForm
              onSuccess={handleVerificationSuccess}
              onError={handleVerificationError}
            />
          )}

          {step === 'review' && studentInfo && (
            <StudentDetails
              studentInfo={studentInfo}
              onBack={() => setStep('verify')}
              onNext={() => setStep('password')}
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