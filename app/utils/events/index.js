export function currentTargetPredicate(e) {
  return e.target === e.currentTarget;
}

/**
 * Adds an event listener that's only triggered once.
 * @param {HTMLElement} target the target to add the listener to
 * @param {string} type A case-sensitive string representing the event type to listen for.
 * @param {AddEventListenerOptions} options An options object that specifies characteristics about the event listener.
 * @param {Function} predicate a function that determines whether the triggered event matches the 'once' condition.
 */
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
