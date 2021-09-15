import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { ApiSuffix } from "@constants";
import { fetcher } from "@utils/request";
import { AxiosResponse } from "axios";
import { IssueAuthCodeResponse } from "./types";
import { FetchError } from "@types";

const IssueAuthCode = (): React.ReactElement => {
  const [email, setEmail] = useState("");
  const { data, error, refetch } = useQuery<
    AxiosResponse<IssueAuthCodeResponse>,
    FetchError
  >("authInfo", () => fetcher.get(`${ApiSuffix.ISSUE_AUTH_CODE}${email}`), {
    enabled: false,
  });
  const history = useHistory();

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>): void => {
    event.preventDefault();
    refetch();
  };

  const handleChangeEmail = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setEmail(event.target.value);
  };

  useEffect(() => {
    if (data != null) {
      history.push("./reset-password/verify-authcode", {
        ...data.data,
        email,
      });
    }
  }, [data, email, history]);

  return (
    <>
      <h1>인증 코드 발급 요청</h1>
      <form onSubmit={handleSubmit}>
        <input
          data-testid="이메일"
          onChange={handleChangeEmail}
          type="email"
          required
        />
        <button data-testid="다음">다음</button>
      </form>
      {error && <p>{error.message}</p>}
    </>
  );
};

export default IssueAuthCode;
