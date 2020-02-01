import * as Window from '../utils/window';
import { configs } from './configs';
import { environment } from './environments';
import { LOCAL, ALPHA } from './constants';

export const LOCAL_KEY = 'salte.ci.local';

export function SetLocal(local) {
  localStorage.setItem(LOCAL_KEY, local);
  Window.reload();
}

export function IsLocal(env) {
  return (
    [LOCAL, ALPHA].includes(env) && localStorage.getItem(LOCAL_KEY) === 'true'
  );
}

export function UseLocal(local) {
  return local ? 'http://localhost:8080' : undefined;
}

export function GetEndpoints(config, env) {
  return [LOCAL, ALPHA].includes(env)
    ? [config.url, 'http://localhost:8080']
    : [config.url];
}

const local = IsLocal(environment);

export const config = {
  ...configs[environment],
  local,
  url: UseLocal(local),
};

export const ENDPOINTS = GetEndpoints(config, environment);

export { environment };
