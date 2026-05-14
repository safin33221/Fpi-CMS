export type VerifyStudentPayload = {
  roll: string;
  registrationNo: string;
  dob: string;
  phone: string;
};

export type StudentInfo = {
  studentId: string;
  roll: string;
  registrationNo: string;
  dob: string;
  phone: string;
  name: string;
  department: string;
  semester: string;
  shift?: string;
  session?: string;
  technology?: string;
};

export type VerifyStudentResponse = {
  success: boolean;
  studentId: string;
  name: string;
  department: string;
  semester: string;
  shift?: string;
  session?: string;
  technology?: string;
};

export type SendOtpPayload = {
  studentId: string;
};

export type SendOtpResponse = {
  success: boolean;
  message: string;
};

export type VerifyOtpPayload = {
  studentId: string;
  otp: string;
};

export type VerifyOtpResponse = {
  success: boolean;
  verificationToken: string;
};

export type RegisterPayload = {
  studentId: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    role: string;
  };
};
