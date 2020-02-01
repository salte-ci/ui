import * as Window from '../utils/window';
import { LIVE, ALPHA, LOCAL } from './constants';

export const environments = {
  'https://salte.ci': LIVE,
  'https://alpha.salte.ci': ALPHA,
  'http://localhost:8081': LOCAL,
};

export const environment = environments[Window.origin()] || ALPHA;
