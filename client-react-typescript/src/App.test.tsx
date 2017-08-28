/**
 * @file Main app component test suite
 */

import React from 'react';
import { ApolloClient, ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';

import App from './App';

it('renders without crashing', () => {
  ReactDOM.render(
    <ApolloProvider client={new ApolloClient()}>
      <App />
    </ApolloProvider>,
    document.createElement('div'),
  );
});
