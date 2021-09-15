import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { ApiSuffix } from "@constants";
import { fetcher } from "@utils/request";

const IssueAuthCode = (): React.ReactElement => {
  const [email, setEmail] = useState("");
  const { data, error, refetch } = useQuery(
    "authInfo",
    () => fetcher.get(`${ApiSuffix.ISSUE_AUTH_CODE}${email}`),
    {
      enabled: false,
    }
  );
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
      history.push("/verify-authcode", {
        ...data.data,
        email,
      });
    }
  }, [data, email, history]);

  return (
    <>
      <h1>인증 코드 발급 요청</h1>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChangeEmail} type="email" required />
        <button>다음</button>
      </form>
      {error && <p>인증 코드 발급 요청이 실패했습니다!</p>}
    </>
  );
};

export default IssueAuthCode;
