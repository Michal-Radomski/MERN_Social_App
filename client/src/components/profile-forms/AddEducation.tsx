import React from "react";
import {Link, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {History} from "history";

import {addEducation} from "../../redux/actions/profile";

const AddEducation = ({
  addEducation,
  history,
}: {
  addEducation: (arg0: FormData, arg1: History) => void;
  history: History;
}): JSX.Element => {
  const [formData, setFormData] = React.useState<State>({
    school: "",
    degree: "",
    fieldOfStudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = React.useState<boolean>(false);

  const {school, degree, fieldOfStudy, from, to, current, description} = formData;

  const onChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({
      ...formData,
      [(event.target as HTMLInputElement | HTMLTextAreaElement).name]: (
        event.target as HTMLInputElement | HTMLTextAreaElement
      ).value,
    });

  return (
    <section className="container">
      <h1 className="large text-primary">Add An Education</h1>
      <p className="lead">
        <i className="fas fa-code-branch" /> Add any school or bootcamp that you have attended
      </p>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          addEducation(formData, history);
        }}
      >
        <div className="form-group">
          <input type="text" placeholder="* School or Bootcamp" name="school" value={school} onChange={onChange} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Degree" name="degree" value={degree} onChange={onChange} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Field of Study" name="fieldOfStudy" value={fieldOfStudy} onChange={onChange} />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={onChange} />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              value={current}
              onChange={() => {
                setFormData({...formData, current: !current});
                toggleDisabled(!toDateDisabled);
              }}
            />{" "}
            Current School
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={onChange}
            // disabled={current}
            disabled={toDateDisabled ? true : false}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols={30}
            rows={5}
            placeholder="Program Description"
            value={description}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </section>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, {addEducation})(withRouter(AddEducation as React.FC<any>));
