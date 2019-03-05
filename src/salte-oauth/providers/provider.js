export default class Provider {
  constructor(options) {
    if (typeof(options) === 'string') {
      options = { clientID: options };
    }

    this.options = Object.assign({
      redirectUrl: location.origin
    }, this.defaults, options);
  }

  /**
   * The unique name of the provider
   */
  static get name() {
    throw new Error('Name not specified.');
  }

  url() {
    throw new Error('Method not implemented.');
  }
}
