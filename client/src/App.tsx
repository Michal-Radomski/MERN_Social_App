import React from "react";

import "./App.scss";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <Navbar />
      <Landing />
    </React.Fragment>
  );
};

export default App;
