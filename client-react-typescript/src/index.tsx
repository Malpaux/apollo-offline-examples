/**
 * @file Main entry point
 */

import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import config from 'redux-offline/lib/defaults';

import App from './App';
import Loading from './components/Loading';
import Rehydrated from './components/Rehydrated';
import authenticator from './modules/authenticator';
import client, { enhancer } from './modules/client';
import { register as registerServiceWorker } from './modules/serviceworker';

// Load authentication token from localStorage (if any)
authenticator.init();

/** The Redux store */
export const store = createStore(
  combineReducers({
    apollo: client.reducer(),
  }),
  undefined,
  compose(
    applyMiddleware(client.middleware()),
    enhancer({
      ...config,
    }),
  ),
);

/** Render the app */
const render = (Component: React.StatelessComponent | React.ComponentClass) => {
  ReactDOM.render(
    <ApolloProvider client={client} store={store}>
      <Rehydrated loading={<Loading />}>
        <Component />
      </Rehydrated>
    </ApolloProvider>,
    document.getElementById('root') as HTMLElement,
  );
};

render(App);
// Enable Hot Module Replacement (HMR)
if (module.hot) module.hot.accept('./App', () => { render(App); });

registerServiceWorker();
