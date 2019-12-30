export const THEMES = [
  'primary',
  'secondary',
  'white',
  'accent',
  'success',
  'warning',
  'danger',
  'github',
  'bitbucket',
  'gitlab',
];

export const ALL_THEMES = THEMES.concat(['darken', 'disabled']);

export function GetVariable(theme) {
  return `var(--sci-${theme}-color)`;
}

export function GetComplementary(theme) {
  switch (theme) {
    case 'primary':
    case 'accent':
    case 'success':
    case 'warning':
    case 'danger':
    case 'github':
    case 'bitbucket':
    case 'gitlab':
    case 'disabled':
      return 'secondary';
    case 'secondary':
    case 'white':
      return 'primary';
    default:
      throw new Error(`Unknown Theme. (${theme})`);
  }
}
