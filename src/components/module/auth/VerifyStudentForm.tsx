'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import type { VerifyStudentPayload } from '@/types/registration';

type Props = {
  loading: boolean;
  onSubmit: (data: VerifyStudentPayload) => void | Promise<void>;
};

type Field = {
  name: keyof VerifyStudentPayload;
  label: string;
  placeholder: string;
  type?: string;
};

const initialForm: VerifyStudentPayload = {
  roll: '',
  registrationNo: '',
  dob: '',
  phone: '',
};

const fields: Field[] = [
  { name: 'roll', label: 'Roll Number', placeholder: 'Enter your roll number' },
  {
    name: 'registrationNo',
    label: 'Registration Number',
    placeholder: 'Enter your registration number',
  },
  { name: 'dob', label: 'Date of Birth', placeholder: 'YYYY-MM-DD', type: 'date' },
  { name: 'phone', label: 'Phone Number', placeholder: 'As per institute record', type: 'tel' },
];

export function VerifyStudentForm({ loading, onSubmit }: Props) {
  const [form, setForm] = useState<VerifyStudentPayload>(initialForm);

  const updateField = (name: keyof VerifyStudentPayload, value: string) => {
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {fields.map((field) => (
        <label key={field.name} className="block">
          <span className="text-sm font-medium text-slate-700">{field.label}</span>
          <input
            required
            type={field.type || 'text'}
            value={form[field.name]}
            placeholder={field.placeholder}
            onChange={(event) => updateField(field.name, event.target.value)}
            className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-primary focus:ring-3 focus:ring-primary/15"
          />
        </label>
      ))}

      <Button type="submit" disabled={loading} className="h-11 w-full rounded-lg">
        {loading ? 'Verifying...' : 'Verify & Send OTP'}
      </Button>
    </form>
  );
}
