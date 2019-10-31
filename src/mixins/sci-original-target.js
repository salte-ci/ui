export function OriginalTargetMixin(superClass) {
  return class extends superClass {
    getOriginalTarget(ev) {
      return this.getPath(ev)[0];
    }

    getPath(ev) {
      if ('composedPath' in ev) return ev.composedPath(); // Standard
      else if ('path' in ev) return ev.path; // Old Chrome
      else if ('originalTarget' in ev) return [ev.originalTarget]; // Firefox
      else if ('srcElement' in ev) return [ev.srcElement]; // Old IE & Safari
      else return [ev.target]; // Fallback to normal target.
    }
  };
}
