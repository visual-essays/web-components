'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5f005592.js');

const veEntitiesCss = ":host{font-family:Roboto, sans-serif}";

const Entities = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return [
      index.h("section", { class: "ve-entities" }, this.entities)
    ];
  }
};
Entities.style = veEntitiesCss;

exports.ve_entities = Entities;
