export default class Events {
  $fire(event, value) {
    const listeners = this.$listeners[event];

    if (!listeners) return;

    listeners.forEach((listener) => listener(event, value));
  }

  on(event, callback) {
    if (!this.$listeners[event]) {
      this.$listeners[event] = [];
    }

    this.$listeners[event].push(callback);
  }

  off(event, callback) {
    if (!this.$listeners[event]) {
      this.$listeners[event] = [];
    }

    const index = this.$listeners[event].indexOf(callback);

    if (index === -1) return;

    this.$listeners[event].splice(index, 1);
  }

  get $listeners() {
    if (!this._listeners) {
      this._listeners = {};
    }

    return this._listeners;
  }
}
