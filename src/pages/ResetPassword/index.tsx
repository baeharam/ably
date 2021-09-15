import { Switch, Route, useRouteMatch } from "react-router-dom";
import IssueAuthCode from "./pages/IssueAuthCode";
import VerifyAuthCode from "./pages/VerifyAuthCode";
import ChangePassword from "./pages/ChangePassword";

const ResetPassword = (): React.ReactElement => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path} component={IssueAuthCode} />
      <Route exact path={`${path}verify-authcode`} component={VerifyAuthCode} />
      <Route exact path={`${path}change-password`} component={ChangePassword} />
    </Switch>
  );
};

export default ResetPassword;
