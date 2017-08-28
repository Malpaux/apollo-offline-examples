# Apollo-Offline example using React & TypeScript

This example demonstrates basic techniques used in developing an offline-first GraphQL client app using [Apollo-Offline](https://github.com/Malpaux/apollo-offline), React, and TypeScript.

## Quick start
```shell
yarn / npm install
npm start
```

## App
It's the usual todo app.

### Usage
Once opening the app, you are automatically logged in and redirected to a todo list.

- You can add items by typing a task into the ```New item``` field and hitting the enter key
- You can mark tasks as done/todo by clicking on them
- Right-clicking a task removes it

## Development
### Configuration
The build & development setup of this example is largely inspired by [create-react-app](https://github.com/facebookincubator/create-react-app).

When looking into custom configuration, you'll probably want to start with the ```config/paths.js``` file.

### Scripts
#### Development server
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
- User log out if token is invalid + automatic renewal
