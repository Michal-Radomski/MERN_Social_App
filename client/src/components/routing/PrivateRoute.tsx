import React from "react";
import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Spinner from "../layout/Spinner";

const PrivateRoute = ({
  component: Component,
  auth: {isAuthenticated, loading},
  ...rest
}: {
  component: React.FC;
  auth: {isAuthenticated: boolean; loading: boolean};
}): JSX.Element => {
  // console.log({rest});
  if (loading) return <Spinner />;
  if (isAuthenticated) return <Component {...rest} />;

  return <Redirect to="/login" />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state: State) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute as React.FC<any>);
