import Raven from 'raven-js';

import { version } from './package.json';
import { environment } from './app/config';
import { RootLogger } from './app/utils/logger';
import { LOCAL } from './app/config/constants';

const logger = RootLogger.extend('setup');

if (environment === LOCAL) {
  localStorage.setItem('debug', 'salte-ci:*');
}

Raven.config('https://b8f036ced5554aff9442688709954e7f@sentry.io/1404350', {
  whitelistUrls: [
    /https?:\/\/(www\.)?salte\.ci/,
    /https?:\/\/alpha\.salte\.ci/,
  ],
  release: version,
  environment,
}).install();

logger('Checking for the magic! ✨');
Raven.context(() => {
  logger('Magic found! Launching the rockets! 🚀');

  import('./app/app.js')
    .then(() => {
      logger('Rockets have reached orbit! 🌕');
    })
    .catch((error) => {
      logger('Failed to reach orbit! 🔥', error);
    });
});
