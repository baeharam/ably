import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ResetPassword from "./pages/ResetPassword";

const queryClient = new QueryClient();

const App = (): React.ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route path="/" component={ResetPassword} />
        </Switch>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
