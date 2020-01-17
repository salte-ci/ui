export function once(target, type, callback, options) {
  const listener = (...args) => {
    callback(...args);
    target.removeEventListener(type, listener);
  };

  target.addEventListener(type, listener, options);
}
