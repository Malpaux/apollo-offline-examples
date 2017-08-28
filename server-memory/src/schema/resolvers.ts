import jwt from 'jsonwebtoken';

import { Context } from '../';

import User from '../models/user';
import Viewer from '../models/viewer';

export default {
  Mutation: {
    createToken: (
      _: any,
      { input }: { input: { email: string, password: string } },
      context: Context,
    ) => {
      const user = User.fromCredentials(context, input.email, input.password);
      if (user) {
        // Generate token (async)
        return new Promise((resolve) => {
          jwt.sign({ user: user.id }, process.env.JWT_SECRET as string, {}, (error, token) => {
            if (error) return resolve({ token: null });
            resolve({ token });
          });
        });
      }
      return { token: null };
    },
    viewer: (_: any, args: { token: string }, context: Context) =>
      Viewer.fromToken(context, args.token),
  },
  Query: {
    viewer: (_: any, args: { token: string }, context: Context) =>
      Viewer.fromToken(context, args.token),
  },
};
