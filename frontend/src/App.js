import React, {Suspense} from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
//import Users from "./user/pages/Users";
//import NewStadium from "./stadiums/pages/NewStadium";
//import UserStadiums from "./stadiums/pages/UserStadiums";
//import UpdateStadium from "./stadiums/pages/UpdateStadium";
//import Auth from "./user/pages/Auth";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "./shared/context/auth-context";
import {useAuth} from './shared/hooks/auth-hook';

const Users = React.lazy(() => import('./user/pages/Users'));
const NewStadium = React.lazy(() => import('./stadiums/pages/NewStadium'));
const UserStadiums = React.lazy(() => import('./stadiums/pages/UserStadiums'));
const UpdateStadium = React.lazy(() => import('./stadiums/pages/UpdateStadium'));
const Auth = React.lazy(() => import('./user/pages/Auth'));

const App = () => {
  const {token, login, logout, userId} = useAuth();
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
          <UpdateStadium />
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
        <main>
          <Suspense 
            fallback={
              <div className="center">
                <LoadingSpinner/>
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
