import React from "react";
import {Link, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {History} from "history";

import {addExperience} from "../../redux/actions/profile";

const AddExperience = ({
  addExperience,
  history,
}: {
  addExperience: (arg0: FormData, arg1: History) => void;
  history: History;
}): JSX.Element => {
  const [formData, setFormData] = React.useState<State>({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = React.useState<boolean>(false);

  const {company, title, location, from, to, current, description} = formData;

  const onChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({
      ...formData,
      [(event.target as HTMLInputElement | HTMLTextAreaElement).name]: (
        event.target as HTMLInputElement | HTMLTextAreaElement
      ).value,
    });

  return (
    <section className="container">
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch" /> Add any developer/programming positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          addExperience(formData, history);
        }}
      >
        <div className="form-group">
          <input type="text" placeholder="* Job Title" name="title" value={title} onChange={onChange} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Company" name="company" value={company} onChange={onChange} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={onChange} />
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
            Current Job
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
            placeholder="Job Description"
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

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, {addExperience})(withRouter(AddExperience as React.FC<any>));
