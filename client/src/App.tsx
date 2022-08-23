import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";

import "./App.scss";
import store from "./redux/store";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import setAuthToken from "./utils/setAuthToken";
import {loadUser} from "./redux/actions/auth";
import Routes from "./components/routing/Routes";

const App = (): JSX.Element => {
  React.useEffect(() => {
    // Check for token in LS when app first runs
    if (localStorage.token) {
      // If there is a token set axios headers for all requests
      // console.log("localStorage.token:", localStorage.token);
      setAuthToken(localStorage.token);
    }
    // Try to fetch a user, if no token or invalid token we will get a 401 response from our API
    store.dispatch(loadUser() as Dispatch);
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <Navbar />
          <Switch>
            <Route exact={true} path="/" component={Landing} />
            <Route component={Routes} />
          </Switch>
        </React.Fragment>
      </Router>
    </Provider>
  );
};

export default App;
