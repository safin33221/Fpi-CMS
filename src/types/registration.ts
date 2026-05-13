export type VerifyStudentPayload = {
  roll: string;
  registrationNo: string;
  dob: string;
  phone: string;
};

export type StudentInfo = {
  name: string;
  department: string;
  semester: string;
};

export type VerifyStudentResponse = {
  success: boolean;
  studentId: string;
  name: string;
  department: string;
  semester: string;
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
  verificationToken: string;
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
