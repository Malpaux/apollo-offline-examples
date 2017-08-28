/**
 * @file Main entry point
 */

import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import schema from './schema';

/** In-memory database */
const db = {
  Item: [
    {
      done: true,
      id: 'itemId',
      name: 'Item Name',
      owner: 'userId',
    },
    {
      done: false,
      id: 'itemId2',
      name: 'Item Name 2',
      owner: 'userId',
    },
  ],
  User: [
    {
      email: 'test@example.com',
      id: 'userId',
      password: 'test',
    },
  ],
};

export interface Context {
  db: typeof db;
  [key: string]: any;
}

/** The main express app */
const app = express();

// Configure cross-origin access
app.use('*', cors({ origin: `http://${process.env.FRONTEND}` }));

// Set up GraphQL
app.use('/graphql', bodyParser.json(), graphqlExpress(() => ({
  context: { db },
  debug: false,
  schema,
})));

if (process.env.NODE_ENV === 'development') {
  // Set up GraphiQL
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
}

// Start server
app.listen(process.env.PORT);
