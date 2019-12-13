import { UPDATE_TOKEN } from './constants';

export function UpdateToken(tokens) {
  return {
    type: UPDATE_TOKEN,
    tokens,
  };
}
