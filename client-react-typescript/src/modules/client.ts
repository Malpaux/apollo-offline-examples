/**
 * Apollo client setup
 * @module modules/client
 */

import offline from 'apollo-offline';
import {
  ApolloClient,
  createNetworkInterface,
  toIdValue,
} from 'react-apollo';

// Wrap network interface
export const { enhancer, networkInterface } = offline(
  createNetworkInterface({
    uri: `${process.env.HTTPS ? 'https' : 'http'}://${process.env.BACKEND_GQL}`,
  }),
);

/** Identify objects */
export const dataIdFromObject = (object: {
  __typename: string,
  id?: string,
  [key: string]: any,
}) => {
  switch (object.__typename) {
    case 'MutationViewer':
      return 'MutationViewer';

    case 'QueryViewer':
      return 'QueryViewer';
  }

  return object.id;
};

/** Resolve to passed id */
export const identityResolver = (_: any, args: { id: string }) => toIdValue(args.id);

/** The Apollo client */
const client = new ApolloClient({
  connectToDevTools: false,
  customResolvers: {
    Mutation: {
      viewer: () => toIdValue('MutationViewer'),
    },
    Query: {
      viewer: () => toIdValue('QueryViewer'),
    },
    QueryViewer: {
      item: identityResolver,
    },
  },
  dataIdFromObject,
  networkInterface,
  queryDeduplication: true,
});
networkInterface.setClient(client);

export default client;
