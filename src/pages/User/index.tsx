import { ApiSuffix } from "@constants";
import { isNullish } from "@types";
import { fetcher } from "@utils/request";
import { AxiosResponse } from "axios";
import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useLocation, useHistory } from "react-router-dom";
import { InfoToReadUser, UserResponse } from "./types";
import style from "./User.module.scss";

const User = (): React.ReactElement => {
  const history = useHistory();
  const { state } = useLocation<InfoToReadUser>();
  const { data, error, isLoading } = useQuery<AxiosResponse<UserResponse>>(
    "user",
    () =>
      fetcher.get(ApiSuffix.USER, {
        headers: {
          Authorization: `Bearer ${state.accessToken}`,
        },
      })
  );
  const { mutate, isSuccess, isError } = useMutation(() =>
    fetcher.post(ApiSuffix.LOGOUT, null, {
      headers: {
        Authorization: `Bearer ${state.accessToken}`,
      },
    })
  );

  const { name, email, profileImage } = data?.data ?? {};

  const handleLogout = (): void => {
    mutate();
  };

  useEffect(() => {
    if (isSuccess) {
      history.replace("/login");
    }
  }, [isSuccess]);

  if (error) {
    history.goBack();
  }

  if (isNullish(data) || isLoading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <div className={style.user}>
        <div className={style.card}>{name}</div>
        <div className={style.card}>{email}</div>
        <img className={style.card} src={profileImage} alt="프로필 이미지" />
      </div>
      <button onClick={handleLogout} className={style.logout} type="button">
        로그아웃
      </button>
      {isError && <p>로그아웃에 실패했습니다.</p>}
    </>
  );
};

export default User;