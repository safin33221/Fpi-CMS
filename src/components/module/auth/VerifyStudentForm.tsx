// components/module/auth/VerifyStudentForm.tsx
'use client';

import { useActionState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import type { StudentInfo, VerifyStudentPayload } from '@/types/registration';
import { verifyStudent } from '@/services/student/verifyStudent';

type Props = {
  onSuccess?: (studentInfo: StudentInfo) => void;
  onError?: (error: string) => void;
};

const fields: Array<{
  name: keyof VerifyStudentPayload;
  label: string;
  placeholder: string;
  type?: string;
  inputMode?: 'numeric' | 'tel';
}> = [
  { name: 'roll', label: 'Roll Number', placeholder: 'Enter board roll', inputMode: 'numeric' },
  { name: 'registrationNo', label: 'Registration Number', placeholder: 'Enter registration number', inputMode: 'numeric' },
  { name: 'dob', label: 'Date of Birth', placeholder: 'YYYY-MM-DD', type: 'date' },
  { name: 'phone', label: 'Phone Number', placeholder: 'As per institute record', type: 'tel', inputMode: 'tel' },
];

// Expected return type from the server action
type ActionState = {
  success: boolean;
  data?: StudentInfo;
  message?: string;
} | null;

export function VerifyStudentForm({ onSuccess, onError }: Props) {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    verifyStudent,
    null
  );

  // Handle side effects when state changes – prevents infinite loops
  useEffect(() => {
    if (!state) return;

    if (state.success && state.data) {
      onSuccess?.(state.data);
    } else if (!state.success && state.message) {
      onError?.(state.message);
    }
  }, [state, onSuccess, onError]);

  return (
    <form action={formAction} className="space-y-5">
      {fields.map((field) => (
        <label key={field.name} className="block">
          <span className="text-sm font-medium text-slate-700">{field.label}</span>
          <input
            required
            name={field.name}
            type={field.type || 'text'}
            inputMode={field.inputMode}
            placeholder={field.placeholder}
            disabled={isPending}
            defaultValue=""
            className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-3 focus:ring-primary/15 disabled:cursor-not-allowed disabled:bg-slate-50"
          />
        </label>
      ))}

      {state && !state.success && state.message && (
        <p className="text-sm text-red-600">{state.message}</p>
      )}

      <Button type="submit" disabled={isPending} className="h-11 w-full rounded-lg">
        {isPending ? 'Verifying...' : 'Verify Student'}
      </Button>
    </form>
  );
}