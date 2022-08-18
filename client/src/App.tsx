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

const NotFound = (): JSX.Element => <h1 style={{textAlign: "center", marginTop: "80px"}}>Page Not Found</h1>;

const App = (): JSX.Element => {
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
