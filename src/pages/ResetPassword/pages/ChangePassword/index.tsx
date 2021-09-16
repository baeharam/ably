import React, { useState } from "react";
import { useMutation } from "react-query";
import { useLocation } from "react-router-dom";
import { fetcher } from "@utils/request";
import { ApiSuffix } from "@constants";
import { FetchError } from "@types";
import { ChangePasswordRequest, InfoToChangePassword } from "./types";

const ChangePassword = (): React.ReactElement => {
  const { state } = useLocation<InfoToChangePassword>();
  const { email, confirmToken } = state;

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const { mutate, isSuccess, error } = useMutation<
    unknown,
    FetchError,
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
          data-testid="새로운 비밀번호"
          required
        />
        <input
          onChange={handleChangeNewPasswordConfirm}
          type="password"
          placeholder="새로운 비밀번호 확인"
          data-testid="새로운 비밀번호 확인"
          required
        />
        <button data-testid="비밀번호 변경하기">비밀번호 변경하기</button>
      </form>
      {isSuccess && (
        <p data-testid="성공 메시지">비밀번호 변경에 성공했습니다!</p>
      )}
      {error && <p>{error.message}</p>}
    </>
  );
};

export default ChangePassword;
