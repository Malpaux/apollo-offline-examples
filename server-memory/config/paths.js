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
  appJs: resolveApp('src/index.ts'),

  // Build directory
  appBuild: resolveApp('dist'),

  // Environment variables to pass into app
  env: ['NODE_ENV', 'HTTPS', 'PORT', 'FRONTEND', 'JWT_SECRET'],
  // Default values for passed environment variables
  envDefault: {
    FRONTEND: 'localhost:3000',
    HTTPS: false,
    JWT_SECRET: 'i2>~B^"kudaa)km!k@i7tn{-_zW@)%?~fIea3ypSMg!6}S&{$CtY{vFVxy]5@xm',
    PORT: 80,
  },

  appPackageJson: resolveApp('package.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  appNodeModules: resolveApp('node_modules'),
  ownNodeModules: resolveApp('node_modules'),
};
