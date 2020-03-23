<<<<<<< HEAD
import React from 'react';
import MainApp from './Components/MainApp';
import ProtectedRoute from './Components/ProtectedRoute';
import LoginContainer from './Containers/Login-Container';
import RegisterContainer from './Containers/Register-Container';
import LandingPage from './Components/LandingPage';
=======
import React from "react";
import MainApp from "./Components/MainApp";
import ProtectedRoute from "./Components/ProtectedRoute";
import LoginContainer from "./Containers/Login-Container";
import RegisterContainer from "./Containers/Register-Container";
>>>>>>> dev

import { Route, Switch } from 'react-router-dom';

import './styles.scss';

class App extends React.Component {
  render() {
    return (
      <div className="AppLayout">
        <Switch>
          <Route exact path="/register" component={RegisterContainer} />
          <Route exact path="/login" component={LoginContainer} />
          <ProtectedRoute exact path="/" component={MainApp} />
        </Switch>
      </div>
    );
  }
}

export default App;
