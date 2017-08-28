# Apollo-Offline examples GraphQL server

This is the GraphQL backend used in the Apollo-Offline client examples. It uses Apollo-Server-Express and TypeScript.

**Important:** You can think of this server as a more elaborate mock rather than something you would actually want to use in your app. It stores all data in memory and does **not** persist it at any point.

## Quick start
```shell
yarn / npm install
npm run build
npm start
```

## Development
### Configuration
The build & development setup of this example is largely inspired by [create-react-app](https://github.com/facebookincubator/create-react-app).

When looking into custom configuration, you'll probably want to start with the ```config/paths.js``` file.

### Scripts
#### Compiler watch mode
```shell
npm run dev
```

#### Start server
```shell
npm start
```

#### Linting

Execute TSLint

```shell
npm run lint
```

Try to automatically fix linting errors
```shell
npm run lint:fix
```

#### Testing

Execute Jest unit tests using

```shell
npm test

npm run test:coverage
```

Tests are defined in the same directory the module lives in. They are specified in '[module].test.ts' files.

#### Building

To build the project, execute

```shell
npm run build
```

## ToDo
- Complete basic unit tests
