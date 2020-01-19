export function currentTargetPredicate(e) {
  return e.target === e.currentTarget;
}

export function once(target, type, options, predicate) {
  return new Promise((resolve) => {
    const listener = (...args) => {
      if (typeof predicate === 'function' && !predicate(...args)) return;

      resolve(...args);
      target.removeEventListener(type, listener);
    };

    target.addEventListener(type, listener, options);
  });
}
