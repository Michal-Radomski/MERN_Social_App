import React from "react";
import {Link} from "react-router-dom";

const Login = (): JSX.Element => {
  const [formData, setFormData] = React.useState<User>({
    email: "",
    password: "",
  });

  const {email, password} = formData;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({...formData, [event.target.name]: event.target.value});

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <React.Fragment>
      <section className="container">
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user" /> Sign Into Your Account
        </p>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <input type="email" placeholder="Email Address" name="email" value={email} onChange={onChange} />
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

          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </section>
    </React.Fragment>
  );
};

export default Login;
