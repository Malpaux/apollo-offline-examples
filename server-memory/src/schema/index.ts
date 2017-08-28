import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';
import typeDefs from './schema.gql';

export default makeExecutableSchema({
  resolvers,
  typeDefs,
});
