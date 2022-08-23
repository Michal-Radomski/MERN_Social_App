import React from "react";
import {Route, Switch} from "react-router-dom";

import Login from "../auth/Login";
import Register from "../auth/Register";
import Dashboard from "../dashboard/Dashboard";
import Alert from "../layout/Alert";
import NotFound from "../layout/NotFound";
import AddEducation from "../profile-forms/AddEducation";
import AddExperience from "../profile-forms/AddExperience";
import CreateProfile from "../profile-forms/CreateProfile";
import EditProfile from "../profile-forms/EditProfile";
import PrivateRoute from "./PrivateRoute";

const Routes = (): JSX.Element => {
  return (
    <React.Fragment>
      <section className="container">
        <Alert alerts={[]} />
        <Switch>
          <Route exact={true} path="/register" component={Register} />
          <Route exact={true} path="/login" component={Login} />
          <PrivateRoute exact={true} path="/dashboard" component={Dashboard} />
          <PrivateRoute exact={true} path="/create-profile" component={CreateProfile} />
          <PrivateRoute exact={true} path="/edit-profile" component={EditProfile} />
          <PrivateRoute exact={true} path="/add-experience" component={AddExperience} />
          <PrivateRoute exact={true} path="/add-education" component={AddEducation} />
          <Route path="/*" component={NotFound} />
        </Switch>
      </section>
    </React.Fragment>
  );
};

export default Routes;
