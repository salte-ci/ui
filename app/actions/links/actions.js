import { ADD_LINKS, RESET_LINK } from './constants';
import * as Repository from './repository';
import { auth } from '../../auth';
import { LoadingThunk } from '../../utils/thunk';

export function AddLinks(links) {
  return {
    type: ADD_LINKS,
    links,
  };
}

export function ResetLink(provider) {
  return {
    type: RESET_LINK,
    provider,
  };
}

export function GetLinks() {
  return LoadingThunk('links', async (dispatch) => {
    dispatch(AddLinks([]));

    const links = await Repository.GetLinks();

    dispatch(AddLinks(links));
  });
}

export function AddLink(name) {
  return LoadingThunk(`links:${name}`, async (dispatch) => {
    await auth.login({
      provider: name,
      handler: 'tab',
    });

    const link = await Repository.AddLink(name, auth.provider(name).code);

    dispatch(AddLinks([link]));
  });
}

export function RemoveLink(providerID, providerName) {
  return LoadingThunk(`links:${providerName}`, async (dispatch) => {
    await Repository.RemoveLink(providerName);

    dispatch(ResetLink(providerID));
  });
}
