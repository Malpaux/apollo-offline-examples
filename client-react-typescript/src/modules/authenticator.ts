/**
 * Client-side authentication store
 * @module modules/authenticator
 */

/** Client-side authentication store */
export class Authenticator {
  /** The current token */
  protected token: string | null = null;

  constructor(
    /** The token's localStorage field */
    protected field: string = 'auth:token',
  ) {}

  /** Clear token */
  public clearToken(): Authenticator {
    localStorage.removeItem(this.field);
    this.token = null;
    return this;
  }

  /** Get the current token */
  public getToken(): string | null {
    return this.token;
  }

  /** Check if a token exists */
  public hasToken(): boolean {
    return Boolean(this.token);
  }

  /** Load token from local storage */
  public init(): Authenticator {
    this.token = localStorage.getItem(this.field);
    return this;
  }

  /** Set a new token */
  public setToken(token: string): Authenticator {
    localStorage.setItem(this.field, token);
    this.token = token;
    return this;
  }
}

/** The default authentication store */
export default new Authenticator();
