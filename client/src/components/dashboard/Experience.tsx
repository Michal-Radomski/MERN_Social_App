import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

// import { deleteExperience } from '../../redux/actions/profile';

const Experience = ({experience}: {experience: Experience[]}): JSX.Element => {
  const experiences = experience.map((exp: Experience) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
        {exp.to === null ? "Now" : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}
      </td>
      <td>
        <button
          // onClick={() => deleteExperience(exp._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <React.Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </React.Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  // deleteExperience: PropTypes.func.isRequired,
};

export default Experience;
