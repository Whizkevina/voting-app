import React, { Component } from 'react'
import { Route, Redirect, Switch} from 'react-router-dom'

import { PrivateRoute } from './views/utils'
import {
  RegisterPage,
  LoginPage,
  LogoutPage,
  UserPage
} from './views/containers'
import Main from './views/Main'

const Routes = ({ loggedIn, allowRedirects, user, ...props}) => (

    <Switch>

      // Login Route
      <Route
        exact path="/login"
        render={() => (
          loggedIn
            ? (<Redirect to='/main' />)
            : (<LoginPage updateAuthStatus={props.updateAuthStatus} />)
        )}
      />


      // Registration Route
      <Route
        exact path="/register"
        render={() => (
          loggedIn
            ? (<Redirect to='/main' />)
            : (<RegisterPage updateAuthStatus={props.updateAuthStatus} />)
        )}
      />


      // Logout Route
      <Route
        exact path="/logout"
        render={() => (
          <LogoutPage
            loggedIn={loggedIn}
            handleLogout={props.handleLogout}
          />
        )}
      />


      // Access user page only if logged in, else redirect to login
      <PrivateRoute
        allowRedirects={allowRedirects}
        exact path="/user"
        component={UserPage}
        loggedIn={loggedIn}
      />


      // Main page route 
      <Route exact path="/main" render={() => (
        <Main loggedIn={loggedIn} />
      )} />


      // Redirect to Main page for now
      <Route exact path="/" render={() => (
        <Redirect to='/main' />
      )} />


      // 404 Page not found Route
      <Route render={(props) => (
        <h1>404 Page not found</h1>
      )} />
    </Switch> 
  )

export default Routes