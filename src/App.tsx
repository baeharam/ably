import { QueryClient, QueryClientProvider } from "react-query";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ResetPassword from "./pages/ResetPassword";
import Login from "./pages/Login";
import User from "./pages/User";

const queryClient = new QueryClient();

const App = (): React.ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/reset-password" />
          </Route>
          <Route path="/reset-password" component={ResetPassword} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/user" component={User} />
        </Switch>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
