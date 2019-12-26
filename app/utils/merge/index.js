export function MergeDeep(target, ...sources) {
  const result = {
    ...target,
  };

  sources.forEach(source => {
    if (!source) return;

    Object.entries(source).forEach(([key, value]) => {
      if (typeof value === 'object') {
        result[key] = MergeDeep(result[key], value);
      } else {
        result[key] = value;
      }
    });
  });

  return result;
}
