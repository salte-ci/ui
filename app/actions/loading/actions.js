import { UPDATE_LOADING } from './constants';

export function UpdateLoading(name, loading) {
  return {
    type: UPDATE_LOADING,
    loading: {
      [name]: loading,
    },
  };
}
