import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {getCurrentProfile} from "../../redux/actions/profile";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = ({
  getCurrentProfile,
  auth: {user},
  profile: {profile, loading},
}: {
  getCurrentProfile: () => void;
  auth: State;
  profile: State;
}): JSX.Element => {
  // console.log({auth});
  // console.log({profile});

  React.useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>

      {profile !== null ? (
        <React.Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state: State) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard as React.FC<any>);
