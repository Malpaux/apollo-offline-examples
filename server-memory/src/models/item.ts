import v4 from 'uuid/v4';

import { Context } from '../';

import User from './user';

export default class Item {
  public static byUser(context: Context, userId: string) {
    return context.db.Item.filter((item) => item.owner === userId)
      .map((item) => new Item(context, item));
  }

  public static create(context: Context, input: { name: string, owner: string }) {
    const item = { ...input, done: false, id: v4() };
    context.db.Item.push(item);
    return { item: new Item(context, item) };
  }

  public static delete(context: Context, { id }: { id: string }) {
    context.db.Item = context.db.Item.filter((item) => item.id !== id);
    return { success: true };
  }

  public static fromId(context: Context, id: string) {
    const item = context.db.Item.find((_item) => _item.id === id);
    return item ? new Item(context, item) : null;
  }

  public static toggle(context: Context, { id }: { id: string }) {
    const item = context.db.Item.find((_item) => _item.id === id);
    if (item) {
      item.done = !item.done;
      return { item: new Item(context, item) };
    }
    return null;
  }

  public done: boolean;
  public id: string;
  public name: string;

  constructor(
    protected context: Context,
    protected _data: { [key: string]: any },
  ) {
    this.done = _data.done;
    this.id = _data.id;
    this.name = _data.name;
  }

  public owner() {
    return User.fromId(this.context, this._data.id);
  }
}
