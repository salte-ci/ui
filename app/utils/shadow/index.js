import { GetTheme } from '../theme';

export function BoxShadows(shadowOptions) {
  if (!shadowOptions || !shadowOptions.length) {
    return '';
  }

  return shadowOptions.map(options => BoxShadow(options)).join(', ');
}

function NormalizeShadowOptions(options) {
  const normalizedOptions = {
    inset: false,
    offsetX: 0,
    offsetY: 2,
    blurRadius: 0,
    spreadRadius: 0,
    ...(typeof options === 'string' ? { color: GetTheme(options) || options } : options),
  };

  if (normalizedOptions.theme) {
    normalizedOptions.color = GetTheme(normalizedOptions.theme);
  }

  return normalizedOptions;
}

export function BoxShadow(options) {
  const { inset, offsetX, offsetY, blurRadius, spreadRadius, color } = NormalizeShadowOptions(options);

  const shadow = [];

  if (inset) {
    shadow.push('inset');
  }

  shadow.push(`${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius}px`);
  shadow.push(color);

  return shadow.join(' ');
}
