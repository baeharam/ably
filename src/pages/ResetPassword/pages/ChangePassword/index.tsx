import React, { useState } from "react";
import { useMutation } from "react-query";
import { useLocation } from "react-router-dom";
import { fetcher } from "@utils/request";
import { ApiSuffix } from "@constants";

interface InfoToChangePassword {
  email: string;
  confirmToken: string;
}

interface ChangePasswordRequest extends InfoToChangePassword {
  newPassword: string;
  newPasswordConfirm: string;
}

const ChangePassword = (): React.ReactElement => {
  const { state } = useLocation<InfoToChangePassword>();
  const { email, confirmToken } = state;

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const { mutate, isSuccess, isError } = useMutation<
    unknown,
    unknown,
    ChangePasswordRequest
  >((changePasswordRequest) =>
    fetcher.patch(ApiSuffix.CHANGE_PASSWORD, changePasswordRequest)
  );

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (newPassword !== newPasswordConfirm) {
      return;
    }

    mutate({
      email,
      confirmToken,
      newPassword,
      newPasswordConfirm,
    });
  };

  const handleChangeNewPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => setNewPassword(event.target.value);
  const handleChangeNewPasswordConfirm = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => setNewPasswordConfirm(event.target.value);

  return (
    <>
      <h1>비밀번호 변경</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChangeNewPassword}
          type="password"
          placeholder="새로운 비밀번호"
          required
        />
        <input
          onChange={handleChangeNewPasswordConfirm}
          type="password"
          placeholder="새로운 비밀번호 확인"
          required
        />
        <button>비밀번호 변경하기</button>
      </form>
      {isSuccess && <p>비밀번호 변경에 성공했습니다!</p>}
      {isError && <p>비밀번호 변경에 실패했습니다!</p>}
    </>
  );
};

export default ChangePassword;
