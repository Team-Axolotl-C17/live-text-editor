import React from 'react';
import MainApp from './Components/MainApp';
import ProtectedRoute from './Components/ProtectedRoute';
import LoginContainer from './Containers/Login-Container';
import RegisterContainer from './Containers/Register-Container';

import { Route, Switch } from 'react-router-dom';

import './styles.css';

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
