export interface InfoToVerifyAuthCode {
  issueToken: string;
  remainMillisecond: number;
  email: string;
}

export interface AuthCodeVerificationRequest {
  email: string;
  authCode: string;
  issueToken: string;
}

export interface AuthCodeVerificationResponse {
  confirmToken: string;
}
