import React from "react";
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
// import axios from "axios"; //* Action moved to Redux

import {setAlert} from "../../redux/actions/alert";
import {register} from "../../redux/actions/auth";

const Register = (props: {
  setAlert: (msg: string, alertType: string, timeout?: number) => void;
  register: ({name, email, password}: {name: string | undefined; email: string; password: string}) => void;
  isAuthenticated: boolean | null;
}): JSX.Element => {
  const [formData, setFormData] = React.useState<User>({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const {name, email, password, password2} = formData;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({...formData, [event.target.name]: event.target.value});

  //* Action moved to Redux - onSubmit V1
  // const onSubmit = async (event: React.SyntheticEvent) => {
  //   event.preventDefault();
  //   if (password !== password2) {
  //     console.log("Passwords do not match", "danger");
  //   } else {
  //     // console.log(formData);
  //     const newUser = {
  //       name: name,
  //       email: email,
  //       password: password,
  //     };

  //     try {
  //       const config = {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       };
  //       const body = JSON.stringify(newUser);
  //       const res = await axios.post("/api/users", body, config);
  //       console.log("res.data:", res.data);
  //     } catch (error) {
  //       console.error((error as CustomError).response.data);
  //     }
  //   }
  // };
  //* onSubmit - V2
  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (password !== password2) {
      // console.log("Passwords do not match", "danger");
      props.setAlert("Passwords do not match", "danger");
    } else {
      // console.log(formData);
      props.register({name, email, password});
    }
  };

  // Redirect if Registered
  if (props.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <React.Fragment>
      <section className="container">
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user" /> Create Your Account
        </p>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={onChange}
              minLength={3}
              // required={true}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={onChange}
              //  required={true}
            />
            <small className="form-text">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
              minLength={8}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={onChange}
              minLength={8}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </section>
    </React.Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state: State) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {setAlert, register})(Register);
