import '@babel/polyfill';
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '@webcomponents/webcomponentsjs/webcomponents-bundle';

import Raven from 'raven-js';

import { version } from './package.json';
import config from './src/config.js';

Raven.config('https://b8f036ced5554aff9442688709954e7f@sentry.io/1404350', {
  whitelistUrls: [
    /https?:\/\/(www\.)?salte\.ci/,
    /https?:\/\/alpha\.salte\.ci/
  ],
  release: version,
  environment: config.environment
}).install();

console.log('[Salte CI]: Checking for the magic! ✨');
Raven.context(() => {
  console.log('[Salte CI]: Magic found! Launching the rockets! 🚀');

  import('./src/sci-app.js').then(() => {
    console.log('[Salte CI]: Rockets have reached orbit! 🌕');
  }).catch((error) => {
    console.log('[Salte CI]: Failed to reach orbit! 🔥', error);
  });
});
