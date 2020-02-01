import { Fetch } from '../../utils/fetch';

export async function GetLinks() {
  return Fetch('/api/links');
}

export async function AddLink(provider, code) {
  return Fetch(`/api/links/${provider}`, {
    body: JSON.stringify({ code }),
    method: 'post',
  });
}

export async function RemoveLink(provider) {
  return Fetch(`/api/links/${provider}`, {
    method: 'delete',
  });
}
