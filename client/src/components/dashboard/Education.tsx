import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import {connect} from "react-redux";

import {deleteEducation} from "../../redux/actions/profile";

const Education = ({
  education,
  deleteEducation,
}: {
  education: Education[];
  deleteEducation: (arg0: string) => void;
}): JSX.Element => {
  const educations = education.map((edu: Education) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
        {edu.to === null ? "Now" : <Moment format="YYYY/MM/DD">{edu.to}</Moment>}
      </td>
      <td>
        <button onClick={() => deleteEducation(edu._id)} className="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <React.Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Shool</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </React.Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, {deleteEducation})(Education);
