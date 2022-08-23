import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";
import {getProfiles} from "../../redux/actions/profile";

const Profiles = ({getProfiles, profile: {profiles, loading}}: {getProfiles: () => void; profile: State}): JSX.Element => {
  React.useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <section className="container">
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop" /> Browse and connect with developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile: Profile) => <ProfileItem key={profile.user._id} profile={profile} />)
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </React.Fragment>
      )}
    </section>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state: State) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {getProfiles})(Profiles as React.FC<any>);
