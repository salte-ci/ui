import * as Window from '../window';

export function OnNextRender() {
  return new Promise((resolve) => {
    Window.requestAnimationFrame(() => {
      Window.setTimeout(() => resolve());
    });
  });
}
