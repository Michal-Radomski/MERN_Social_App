import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

const Alert = ({alerts}: {alerts: Alert[]}): JSX.Element => {
  // console.log({alerts});
  return (
    <React.Fragment>
      <div className="alert-wrapper">
        {alerts !== null &&
          alerts.length > 0 &&
          alerts.map((alert: Alert) => (
            <div key={alert.id} className={`alert alert-${alert.alertType}`}>
              {alert.msg}
            </div>
          ))}
      </div>
    </React.Fragment>
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state: State) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, null)(Alert);
