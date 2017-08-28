'use strict';

const path = require('path');
const fs = require('fs');

/** The current app directory */
const appDirectory = fs.realpathSync(process.cwd());
/** Resolve app-relative path */
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

/** Public url as found in environment */
const envPublicUrl = process.env.PUBLIC_URL;

/** Ensure closing slash */
const ensureSlash = (path, needsSlash) => {
  const hasSlash = path.endsWith('/');
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${path}/`;
  } else {
    return path;
  }
};

const getServedPath = (publicUrl) =>
  publicUrl ? ensureSlash(url.parse(publicUrl).pathname, true) : '/';

module.exports = {
  // The source directory
  appSrc: resolveApp('src'),
  // The main js entry point
  appJs: resolveApp('src/index.tsx'),
  // The app's HTML template
  appHtml: resolveApp('src/index.html'),

  // Build directory
  appBuild: resolveApp('dist'),
  // Public url
  publicUrl: envPublicUrl,
  // Path the app is going to be served from
  servedPath: getServedPath(envPublicUrl),

  // Environment variables to pass into app
  env: ['NODE_ENV', 'HTTPS', 'PUBLIC_URL', 'BACKEND_GQL'],
  // Default values for passed environment variables
  envDefault: {
    BACKEND_GQL: 'localhost/graphql',
    HTTPS: false,
  },

  appPackageJson: resolveApp('package.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  appNodeModules: resolveApp('node_modules'),
  ownNodeModules: resolveApp('node_modules'),
};
