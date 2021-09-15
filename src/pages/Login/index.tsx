import { ApiSuffix } from "@constants";
import { FetchError, isNullish, Nullable } from "@types";
import { fetcher } from "@utils/request";
import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Link, useHistory } from "react-router-dom";
import { LoginRequest, LoginResponse } from "./types";
import style from "./Login.module.scss";

const Login = (): React.ReactElement => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState<Nullable<string>>();

  const history = useHistory();
  const { mutateAsync, error } = useMutation<
    AxiosResponse<LoginResponse>,
    FetchError,
    LoginRequest
  >((loginInfo) => fetcher.post(ApiSuffix.LOGIN, loginInfo));

  const handleSubmit = async (
    event: React.SyntheticEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    try {
      const { data } = await mutateAsync({
        email,
        password,
      });
      setAccessToken(data.accessToken);
    } catch {}
  };

  const handleChangeEmail = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => setEmail(event.target.value);
  const handleChangePassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => setPassword(event.target.value);

  useEffect(() => {
    if (!isNullish(accessToken)) {
      history.push("/user", { accessToken });
    }
  }, [accessToken, history]);

  return (
    <>
      <h1>로그인</h1>
      <form className={style["login-form"]} onSubmit={handleSubmit}>
        <input
          className={style["login-form__input"]}
          onChange={handleChangeEmail}
          type="text"
          placeholder="아이디"
          required
        />
        <input
          className={style["login-form__input"]}
          onChange={handleChangePassword}
          type="password"
          placeholder="비밀번호"
          required
        />
        <button className={style["login-form__button"]}>로그인</button>
      </form>
      <button className={style["password-reset-button"]} type="button">
        <Link to="/reset-password">비밀번호 재설정</Link>
      </button>
      {error && <p>{error.message}</p>}
    </>
  );
};

export default Login;
