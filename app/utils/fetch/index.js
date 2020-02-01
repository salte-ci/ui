import { config } from '../../config';
import * as Window from '../window';

export class FetchError extends Error {
  constructor({ code, message, status }) {
    super(message);

    this.code = code || 'internal_server_error';
    this.status = status || 500;
  }
}

/**
 * Sends a fetch request to the given url.
 * @param {String} url a string representing the url to hit.
 * @param {RequestInit} options options to pass to the fetch request.
 */
export async function Fetch(url, options = {}) {
  if (url.startsWith('/api')) {
    return Fetch(url.replace('/api', config.url), options);
  }

  const response = await Window.fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  }).catch(() => {
    throw new FetchError({
      message: `Error while attempting to call the server, server may be down.`,
    });
  });

  const contentType = response.headers.get('Content-Type') || '';

  const content = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  if (response.ok) {
    return content;
  }

  throw new FetchError(content);
}
