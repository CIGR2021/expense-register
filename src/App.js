import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login.jsx';
import Wallet from './pages/Wallet.jsx';

function App() {
  return (
    <Switch>
      <Route exact path="/carteira" component={ Wallet } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
