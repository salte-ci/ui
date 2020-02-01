import { UpdateError } from '../../actions/error';
import { UpdateLoading } from '../../actions/loading';

export function LoadingThunk(key, thunk) {
  return async (dispatch, getState) => {
    try {
      dispatch(UpdateError(key, null));
      dispatch(UpdateLoading(key, true));

      return await thunk(dispatch, getState);
    } catch (error) {
      dispatch(UpdateError(key, error));
    } finally {
      dispatch(UpdateLoading(key, false));
    }

    return null;
  };
}
