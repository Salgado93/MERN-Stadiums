import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Users from "./user/pages/Users";
import NewStadium from "./stadiums/pages/NewStadium";
import UserStadiums from "./stadiums/pages/UserStadiums";
import UpdatePlace from "./stadiums/pages/UpdateStadium";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/:userId/stadiums" exact>
            <UserStadiums />
          </Route>
          <Route path="/stadiums/new" exact>
            <NewStadium />
          </Route>
          <Route path="/stadiums/:stadiumId">
            <UpdatePlace />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
