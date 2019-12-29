import { UPDATE_TOKEN } from './constants';

export function UpdateToken(provider, token) {
  return {
    type: UPDATE_TOKEN,
    tokens: {
      [provider]: token,
    },
  };
}
