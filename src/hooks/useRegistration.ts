import { useState } from 'react';
import { isAxiosError } from 'axios';
import api from '@/lib/api';
import type {
  RegisterResponse,
  SendOtpResponse,
  StudentInfo,
  VerifyOtpResponse,
  VerifyStudentPayload,
  VerifyStudentResponse,
} from '@/types/registration';

export type RegistrationStep = 'verify' | 'otp' | 'password';

type ApiErrorData = {
  error?: string;
  message?: string;
};

function getErrorMessage(error: unknown, fallback: string) {
  if (isAxiosError<ApiErrorData>(error)) {
    return error.response?.data?.error || error.response?.data?.message || fallback;
  }

  return fallback;
}

export function useRegistration() {
  const [step, setStep] = useState<RegistrationStep>('verify');
  const [studentId, setStudentId] = useState('');
  const [verificationToken, setVerificationToken] = useState('');
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendOtp = async (id: string) => {
    try {
      await api.post<SendOtpResponse>('/auth/send-otp', { studentId: id });
    } catch (error) {
      setError(getErrorMessage(error, 'Failed to send OTP. Please try again.'));
      throw error;
    }
  };

  const verifyStudent = async (data: VerifyStudentPayload) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post<VerifyStudentResponse>('/auth/verify-student', data);

      if (response.data.success) {
        setStudentId(response.data.studentId);
        setStudentInfo({
          name: response.data.name,
          department: response.data.department,
          semester: response.data.semester,
        });

        await sendOtp(response.data.studentId);
        setStep('otp');
      }
    } catch (error) {
      setError(getErrorMessage(error, 'Verification failed. Please check your details.'));
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (otp: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post<VerifyOtpResponse>('/auth/verify-otp', {
        studentId,
        otp,
      });

      if (response.data.success) {
        setVerificationToken(response.data.verificationToken);
        setStep('password');
      }
    } catch (error) {
      setError(getErrorMessage(error, 'Invalid OTP. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  const createAccount = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post<RegisterResponse>('/auth/register', {
        verificationToken,
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        return true;
      }
    } catch (error) {
      setError(getErrorMessage(error, 'Account creation failed. Please try again.'));
    } finally {
      setLoading(false);
    }

    return false;
  };

  const reset = () => {
    setStep('verify');
    setStudentId('');
    setVerificationToken('');
    setStudentInfo(null);
    setError(null);
  };

  const backToVerify = () => {
    setStep('verify');
    setVerificationToken('');
    setError(null);
  };

  return {
    step,
    studentInfo,
    loading,
    error,
    verifyStudent,
    verifyOtp,
    createAccount,
    backToVerify,
    reset,
  };
}
