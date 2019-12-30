import { UPDATE_ERROR } from './constants';

export function UpdateError(name, error) {
  return {
    type: UPDATE_ERROR,
    error: {
      [name]: error,
    },
  };
}
