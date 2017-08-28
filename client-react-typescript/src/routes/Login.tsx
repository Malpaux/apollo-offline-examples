/**
 * Main container
 * @module routes/Main
 */

import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import authenticator from '../modules/authenticator';
import { networkInterface } from '../modules/client';
import createToken from '../modules/graphql/mutations/createtoken.gql';

/**
 * Main container
 * @alias module:routes/Main
 */
class Main extends React.PureComponent<RouteComponentProps<any>, { error?: boolean }> {
  constructor(props: RouteComponentProps<any>) {
    super(props);

    this.state = {};
  }

  public componentWillMount() {
    this.sideFx();
  }

  public componentWillUpdate() {
    this.sideFx();
  }

  /** Render */
  public render() {
    return (
      <div>
        {this.state.error ?
          'Log in failed. Please check your network connection and refresh the page'
        : 'Logging in...'}
      </div>
    );
  }

  /** Side effects */
  protected sideFx() {
    // Redirect to main view if already signed in
    if (authenticator.hasToken()) return this.props.history.replace('/');

    // Automatically log in using the example user
    // TODO: You'll want to remove this code and implement a proper log in form
    // We're using the networkInterface directly to avoid caching the user's credentials
    networkInterface.networkInterface.query({
      query: createToken,
      variables: {
        input: {
          email: 'test@example.com',
          password: 'test',
        },
      },
    }).then(({ data: { createToken: { token } } }: { [key: string]: any }) => {
      if (token) {
        // Log in successful, write token to localStorage
        authenticator.setToken(token);
        // Redirect to main view
        this.props.history.replace('/');
      } else {
        // Log in failed (credentials invalid)
        this.setState({ error: true });
      }
    }).catch(() => {
      // Network error, server not reachable
      this.setState({ error: true });
    });
  }
}

export default Main;
