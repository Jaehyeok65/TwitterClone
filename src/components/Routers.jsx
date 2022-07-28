import React from "react";
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

function Routers( { isLogin, user, refreshUser }) {


  return (
    <Router>
      {isLogin && <Navigation user = {user} />}
      <Switch>
        {isLogin ? (
        <>
        <Route exact path='/'>
          <Home user={user} />
        </Route>
        <Route exact path ='/profile'>
          <Profile user={user} refreshUser={refreshUser} />
        </Route>
        </>) : 
        (<Route exact path='/'>
            <Auth />
         </Route>)}
      </Switch>
    </Router>
  );
}

export default Routers;
