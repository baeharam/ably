import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useMutation } from "react-query";
import { fetcher } from "@utils/request";
import dayjs from "dayjs";
import { FetchError, isNullish, Nullable } from "@types";
import { ApiSuffix } from "@constants";
import { AxiosResponse } from "axios";
import {
  InfoToVerifyAuthCode,
  AuthCodeVerificationRequest,
  AuthCodeVerificationResponse,
} from "./types";

const VerifyAuthCode = (): React.ReactElement => {
  const history = useHistory();
  const { state } = useLocation<InfoToVerifyAuthCode>();
  const { email, issueToken, remainMillisecond } = state;
  const [remainedTime, setRemainedTime] = useState(remainMillisecond);
  const [authCode, setAuthCode] = useState("");
  const [confirmToken, setConfirmToken] = useState<Nullable<string>>();
  const { mutateAsync, error } = useMutation<
    AxiosResponse<AuthCodeVerificationResponse>,
    FetchError,
    AuthCodeVerificationRequest
  >((authValidationInfo) =>
    fetcher.post(ApiSuffix.VALIDATE_AUTH_CODE, authValidationInfo)
  );

  const handleSubmit = async (
    event: React.SyntheticEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    try {
      const { data } = await mutateAsync({
        email,
        authCode,
        issueToken,
      });
      setConfirmToken(data.confirmToken);
    } catch {}
  };

  const handleChangeAuthCode = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setAuthCode(event.target.value);
  };

  useEffect(() => {
    const id = setInterval(() => {
      setRemainedTime((previousTime) => previousTime - 1000);
    }, 1000);

    return (): void => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!isNullish(confirmToken)) {
      history.push("/reset-password/change-password", {
        email,
        confirmToken,
      });
    }
  }, [confirmToken, email, history]);

  return (
    <>
      <h1>인증 코드 검증</h1>
      <p>남은시간: {dayjs(remainedTime).format("mm:ss")}</p>
      <form onSubmit={handleSubmit}>
        <input
          data-testid="인증 코드"
          onChange={handleChangeAuthCode}
          type="text"
          required
        />
        <button data-testid="다음">다음</button>
      </form>
      {error && <p>{error.message}</p>}
    </>
  );
};

export default VerifyAuthCode;
