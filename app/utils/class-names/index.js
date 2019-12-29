export function ConcatClassNames(...classNames) {
  return classNames && Array.isArray(classNames) && classNames.filter(className => className).join(' ');
}
