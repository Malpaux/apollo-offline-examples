import { Context } from '../';

export default class User {
  public static fromCredentials(context: Context, email: string, password: string) {
    const user = context.db.User.find((_user) => _user.email === email);
    // TODO Verify hashed password
    return user && user.password === password ? new User(context, user) : null;
  }

  public static fromId(context: Context, id: string) {
    const user = context.db.User.find((_user) => _user.id === id);
    return user ? new User(context, user) : null;
  }

  public email: string;
  public id: string;

  constructor(
    protected context: Context,
    protected _data: { [key: string]: any },
  ) {
    this.email = _data.email;
    this.id = _data.id;
  }
}
