export interface InfoToChangePassword {
  email: string;
  confirmToken: string;
}

export interface ChangePasswordRequest extends InfoToChangePassword {
  newPassword: string;
  newPasswordConfirm: string;
}