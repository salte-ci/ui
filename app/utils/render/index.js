import * as Window from '../window';

export function OnNextRender(callback) {
  Window.requestAnimationFrame(() => {
    Window.setTimeout(() => callback());
  });
}
