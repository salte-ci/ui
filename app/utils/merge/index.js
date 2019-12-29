export function MergeDeep(target = {}, ...sources) {
  const result = Object.keys(target).length === 0 ? target : MergeDeep({}, target);

  sources.forEach(source => {
    if (!source) return;

    Object.entries(source).forEach(([key, value]) => {
      if (value && typeof value === 'object' && !Array.isArray(value) && value.constructor === Object) {
        result[key] = MergeDeep(result[key], value);
      } else if (value !== undefined) {
        result[key] = value;
      }
    });
  });

  return result;
}
