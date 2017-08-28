/**
 * Main route
 * @module routes/Main
 */

import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import authenticator from '../../modules/authenticator';
import Container from './Container';

/**
 * Main route
 * @alias module:routes/Main
 */
class Main extends React.PureComponent<RouteComponentProps<any>> {
  public componentWillMount() {
    this.sideFx();
  }

  public componentWillUpdate() {
    this.sideFx();
  }

  /** Render */
  public render() {
    return authenticator.hasToken() && <Container />;
  }

  /** Side effects */
  protected sideFx() {
    // Redirect to log in if not already signed in
    if (!authenticator.hasToken()) this.props.history.replace('/login');
  }
}

export default Main;
