export interface InfoToReadUser {
  accessToken: string;
}

export interface UserResponse {
  name: string;
  email: string;
  profileImage: string;
  lastConnectedAt: Date;
}