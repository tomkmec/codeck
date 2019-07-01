import * as basicElements from '../resources/elements/elements.js'

class ElementRegister {
  constructor() {
    this._registry = { ...basicElements };
  }

  get(name) {
    return this._registry[name.toLowerCase()];
  }

  register(name, spec) {
    this._registry[name.toLowerCase()] = spec;
  }
}

export { ElementRegister }