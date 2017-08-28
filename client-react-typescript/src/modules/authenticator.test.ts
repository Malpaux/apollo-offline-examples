/**
 * @file Authenticator test suite
 */

import defaultAuthenticator, { Authenticator } from './authenticator';

describe('authenticator', () => {
  it('should create a new authenticator', () => {
    expect(new Authenticator());
    expect(new Authenticator('fieldname'));
  });

  it('should read, write, check, and clear a token', () => {
    const authenticator = new Authenticator('token');

    localStorage.setItem('token', 'TOKEN');
    expect(authenticator.getToken()).toBe(null);
    expect(authenticator.hasToken()).toBe(false);

    expect(authenticator.init().getToken()).toBe('TOKEN');
    expect(authenticator.hasToken()).toBe(true);

    expect(authenticator.setToken('NEW_TOKEN').getToken()).toBe('NEW_TOKEN');
    expect(authenticator.hasToken()).toBe(true);
    expect(localStorage.getItem('token')).toBe('NEW_TOKEN');

    expect(authenticator.clearToken().getToken()).toBe(null);
    expect(authenticator.hasToken()).toBe(false);
    expect(localStorage.getItem('token')).toBe(null);
  });
});

describe('default authenticator', () => {
  it('should be an authenticator', () => {
    expect(defaultAuthenticator).toBeInstanceOf(Authenticator);
  });
});
