declare module 'theming' {
  import * as React from 'react';

  export interface Theme { [key: string]: any; }
  export interface InjectedProps { theme: Theme; }

  export const channel: string;

  export const withTheme: <OriginalProps extends {}>(
    Component: React.StatelessComponent<OriginalProps & InjectedProps>
      | React.ComponentClass<OriginalProps & InjectedProps>,
  ) => React.ComponentClass<Readonly<OriginalProps>>;

  export const ThemeProvider: React.ComponentClass<{ theme: Theme }>;

  export const themeListener: {
    contextTypes: { [key: string]: (...args: any[]) => any }, // TODO: prop-types checker
    initial: (context: { [key: string]: any }) => Theme;
    subscribe: (
      context: { [key: string]: any },
      cb: (theme: Theme) => void,
    ) => (() => void),
  };

  export const createTheming: (customChannel?: string) => ({
    channel: string,
    themeListener: typeof themeListener,
    ThemeProvider: typeof ThemeProvider,
    withTheme: typeof withTheme,
  });
}
