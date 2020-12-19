import React from "react";
import { Redirect, Route } from "react-router-dom";
import AuthToken from "./authToken";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ props }) =>
        AuthToken.isLoggedIn() ? (
          <Component {...props} />
        ) : (
          <Redirect to="login" />
        )
      }
    />
  );
};
export default PrivateRoute;
