export function origin(
  /* istanbul ignore next */
  $location = window.location,
) {
  return $location.origin;
}

export function search(
  /* istanbul ignore next */
  $location = window.location,
) {
  return $location.search;
}

export function reload(
  /* istanbul ignore next */
  $location = window.location,
) {
  return $location.reload();
}

export function innerWidth(
  /* istanbul ignore next */
  $window = window,
) {
  return $window.innerWidth;
}

export function addEventListener(
  type,
  listener,
  options,
  /* istanbul ignore next */
  $window = window,
) {
  $window.addEventListener(type, listener, options);
}

export function removeEventListener(
  type,
  listener,
  /* istanbul ignore next */
  $window = window,
) {
  $window.removeEventListener(type, listener);
}

export function setTimeout(
  handler,
  timeout,
  /* istanbul ignore next */
  $window = window,
) {
  return $window.setTimeout(handler, timeout);
}

export function clearTimeout(
  handler,
  /* istanbul ignore next */
  $window = window,
) {
  $window.clearTimeout(handler);
}

export function requestAnimationFrame(
  callback,
  /* istanbul ignore next */
  $window = window,
) {
  return $window.requestAnimationFrame(callback);
}

/**
 * Fetches a resource from the network.
 * @param {String|URL} resource the resource that you wish to fetch
 * @param {RequestInit} [init] An object containing any custom settings that you want to apply to the request.
 * @param {Window} $window the window object, useful for testing purposes.
 */
export function fetch(
  resource,
  init,
  /* istanbul ignore next */
  $window = window,
) {
  return $window.fetch(resource, init);
}
