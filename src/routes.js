import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./views/Login";
// import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import Dashboard from "./views/Dashboard";
import Menus from "./views/Menus";
import "./assets/css/custom.css";
import "react-sortable-tree/style.css";
import PrivateRoute from "./utils/PrivateRoute";
import Notfound from "./views/Notfound";
import AllApps from "./views/AllApps";
import AuthLayout from "./components/container/AuthLayout";

toast.configure();

const Routes = () => {
  return (
    <React.StrictMode>
      <Suspense fallback="loading">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <AuthLayout>
                  <Login />
                </AuthLayout>
              )}
            />
            <Route
              exact
              path="/login"
              render={() => (
                <AuthLayout>
                  <Login />
                </AuthLayout>
              )}
            />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/menus" component={Menus} />
            <PrivateRoute exact path="/apps" component={AllApps} />
            <PrivateRoute exact path="/apps/:app_id" component={Menus} />
            <PrivateRoute
              exact
              path="/apps/:app_id/:menu_id"
              component={Menus}
            />
            <Route exact path="*" component={Notfound} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </React.StrictMode>
  );
};

export default Routes;
