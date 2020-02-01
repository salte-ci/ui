import { UPDATE_PROVIDERS } from './constants';
import * as Repository from './repository';
import { LoadingThunk } from '../../utils/thunk';

export function UpdateProviders(providers) {
  return {
    type: UPDATE_PROVIDERS,
    providers,
  };
}

export function GetProviders() {
  return LoadingThunk('providers', async (dispatch) => {
    dispatch(UpdateProviders([]));

    const providers = await Repository.GetProviders();

    dispatch(UpdateProviders(providers));
  });
}
