export interface LoginResponse {
  accessToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}