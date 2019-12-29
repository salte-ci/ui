import { config } from '../../config';

export const themes = Object.keys(config.colors);

export function GetTheme(theme) {
  return config.colors[theme];
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
      return config.colors.secondary;
    case 'secondary':
    case 'white':
      return config.colors.primary;
    default:
      throw new Error(`Unknown Theme. (${theme})`);
  }
}

export function GetThemeAndComplementary(theme) {
  return [GetTheme(theme), GetComplementary(theme)];
}
