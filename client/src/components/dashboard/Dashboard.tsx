import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {getCurrentProfile} from "../../redux/actions/profile";

const Dashboard = ({
  getCurrentProfile,
  auth,
  profile,
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

  return (
    <React.Fragment>
      <div>Dashboard</div>
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
