import React from "react";
import {Link} from "react-router-dom";

const Register = (): JSX.Element => {
  const [formData, setFormData] = React.useState<User>({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const {name, email, password, password2} = formData;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({...formData, [event.target.name]: event.target.value});

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (password !== password2) {
      console.log("Passwords do not match", "danger");
    } else {
      console.log(formData);
    }
  };

  return (
    <React.Fragment>
      <section className="container">
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user" /> Create Your Account
        </p>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Email Address" name="email" value={email} onChange={onChange} />
            <small className="form-text">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
          </div>
          <div className="form-group">
            <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Confirm Password" name="password2" value={password2} onChange={onChange} />
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

export default Register;
