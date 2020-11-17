import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import Header from "./components/Header.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import CoursePage from "./pages/CoursePage.jsx";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/courses" component={CoursePage} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
