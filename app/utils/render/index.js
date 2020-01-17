import * as WindowUtils from '../window';

export function OnNextRender(callback) {
  WindowUtils.requestAnimationFrame(() => {
    WindowUtils.setTimeout(() => callback());
  });
}
