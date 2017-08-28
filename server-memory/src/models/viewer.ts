import jwt from 'jsonwebtoken';

import { Context } from '../';

import Item from './item';

export default class Viewer {
  public static fromToken(context: Context, token: string) {
    // Verify token (async)
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        process.env.JWT_SECRET as string,
        {},
        (error, payload: { user: string }) => {
          if (error) return reject(error);
          resolve(new Viewer({ ...context, user: payload.user }));
        },
      );
    });
  }

  constructor(
    protected context: Context,
  ) {}

  public createItem(args: { input: { name: string } }) {
    return Item.create(this.context, { ...args.input, owner: this.context.user });
  }

  public deleteItem(args: { input: { id: string } }) {
    return Item.delete(this.context, args.input);
  }

  public item(args: { id: string }) {
    return Item.fromId(this.context, args.id);
  }

  public items() {
    return Item.byUser(this.context, this.context.user);
  }

  public toggleItem(args: { input: { id: string } }) {
    return Item.toggle(this.context, args.input);
  }
}
