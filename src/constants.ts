export const BASE_URL = "https://ably-frontend-assignment-server.vercel.app";

export const ApiSuffix = {
  ISSUE_AUTH_CODE: `/api/reset-password?email=`,
  VALIDATE_AUTH_CODE: "/api/reset-password",
  CHANGE_PASSWORD: "/api/reset-password",
} as const;
