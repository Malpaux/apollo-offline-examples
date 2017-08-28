/**
 * Main app component
 * @module App
 */

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'theming';

import { theme } from './modules/styles';
import Login from './routes/Login';
import Main from './routes/Main';

const App: React.StatelessComponent<any> = () => (
  <ThemeProvider theme={theme}>
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route exact={true} path="/" component={Main} />
      </Switch>
    </Router>
  </ThemeProvider>
);

export default App;
