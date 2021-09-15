import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ResetPassword from "./pages/ResetPassword";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = (): React.ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route path="/reset-password" component={ResetPassword} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
