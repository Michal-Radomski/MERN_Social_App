import React from "react";

const NotFound = (): JSX.Element => {
  return (
    <React.Fragment>
      <section className="container">
        <h1 className="x-large text-primary" style={{textAlign: "center", marginTop: "50px"}}>
          <i className="fas fa-exclamation-triangle" /> Page Not Found
        </h1>
        <p className="large" style={{textAlign: "center"}}>
          Sorry, this page does not exist
        </p>
      </section>
    </React.Fragment>
  );
};

export default NotFound;
