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
