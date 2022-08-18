import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";

import "./App.scss";
import store from "./redux/store";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import setAuthToken from "./utils/setAuthToken";
import {loadUser} from "./redux/actions/auth";

const NotFound = (): JSX.Element => <h1 style={{textAlign: "center", marginTop: "80px"}}>Page Not Found</h1>;

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
          <Route exact={true} path="/" component={Landing} />
          <section className="container">
            <Alert alerts={[]} />
            <Switch>
              <Route exact={true} path="/register" component={Register} />
              <Route exact={true} path="/login" component={Login} />
              <Route path="*" component={NotFound} />
            </Switch>
          </section>
        </React.Fragment>
      </Router>
    </Provider>
  );
};

export default App;
