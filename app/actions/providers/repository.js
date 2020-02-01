import { Fetch } from '../../utils/fetch';

export async function GetProviders() {
  return Fetch('/api/providers');
}
