export function origin($location = window.location) {
  return $location.origin;
}

export function search($location = window.location) {
  return $location.search;
}

/* istanbul ignore next-line */
export function reload($location = window.location) {
  return $location.reload();
}

export function innerWidth($window = window) {
  return $window.innerWidth;
}

export function addEventListener(type, listener, options, $window = window) {
  $window.addEventListener(type, listener, options);
}

export function removeEventListener(type, listener, $window = window) {
  $window.removeEventListener(type, listener);
}
