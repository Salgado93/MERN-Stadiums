import React, { useState, useCallback } from "react";
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
import { AuthContext } from "./shared/context/auth-context";
import Auth from "./user/pages/Auth";

const App = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid,token) => {
    setToken(token);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(false);
    setUserId(null)
  }, []);

  let routes;
  if (token) {
    routes = (
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
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/stadiums" exact>
          <UserStadiums />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token:token, userId: userId, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
