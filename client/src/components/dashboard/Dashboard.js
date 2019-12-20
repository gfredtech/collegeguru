import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  useRouteMatch,
} from 'react-router-dom';
import ProtectedRoute from '../routing/ProtectedRoute';

const Dashboard = () => {
  let { path } = useRouteMatch();
  return (
    //UI displayed here

    //Routes here
    <Fragment>
      <Router>
        <Switch>
          <ProtectedRoute path={`${path}/mycolleges`}>
            <h2>Hello bro</h2>
          </ProtectedRoute>
          <ProtectedRoute exact path={path}>
            <h2>Hello world</h2>
          </ProtectedRoute>
        </Switch>
      </Router>
    </Fragment>
  );
};

export default Dashboard;
