export function UniqueElementMixin(base) {
  return class extends base {
    constructor() {
      super();

      this.$cache = {};
    }

    /**
     * Finds an element by its id within the shadow root.
     * @param {String} id The unique id of the element
     * @returns {HTMLElement} the matching element
     */
    $(id) {
      if (!this.$cache[id]) {
        this.$cache[id] = this.shadowRoot.getElementById(id);
      }

      return this.$cache[id];
    }
  }
}
