import Raven from 'raven-js';

import { version } from '@salte-ci/package.json';
import config from '@salte-ci/src/config.js';

Raven.config('https://b8f036ced5554aff9442688709954e7f@sentry.io/1404350', {
  whitelistUrls: [
    /https?:\/\/(www\.)?salte\.ci/,
    /https?:\/\/alpha\.salte\.ci/
  ],
  release: version,
  environment: config.environment
}).install();

Raven.context(() => {
  console.log('[Salte CI]: Checking for the magic! ✨');

  // NOTE: Requiring CSS Grid means that we don't support Edge <= 15.
  if (window.HTMLTemplateElement && CSS.supports('display', 'grid')) {
    console.log('[Salte CI]: Magic found! Launching the rockets! 🚀');

    import('@salte-ci/src/sci-app.js').then(() => {
      console.log('[Salte CI]: Rockets have reached orbit! 🌕');
    }).catch((error) => {
      console.log('[Salte CI]: Failed to reach orbit! 🔥', error);
    });
  } else {
    console.log('[Salte CI]: Launch has been aborted due to an unsupported browser!');
    document.body.classList.add('invalid-browser');
  }
});
