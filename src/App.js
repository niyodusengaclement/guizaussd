import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./views/Login";
import Register from "./views/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./views/Dashboard";
import "./assets/css/custom.css";
import "react-sortable-tree/style.css";
import PrivateRoute from "./utils/PrivateRoute";

toast.configure();

const App = () => {
  return (
    <React.StrictMode>
      <Suspense fallback="loading">
        <BrowserRouter>
          <Switch>
            <Route path="/login" render={(props) => <Login {...props} />} />
            <Route
              path="/register"
              render={(props) => <Register {...props} />}
            />

            <PrivateRoute exact path="/admin" component={Dashboard} />

            <Redirect from="*" to="/admin" />
            <Redirect exact from="/" to="/login" />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </React.StrictMode>
  );
};

export default App;
