import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import User from "./user/pages/Users";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

const app = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
