import React from "react";
import { Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Header from "./components/Header.jsx";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
    </div>
  );
}

export default App;
