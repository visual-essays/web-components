import { r as registerInstance, h } from './index-82518b18.js';

const veEntitiesCss = ":host{font-family:Roboto, sans-serif}";

const Entities = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return [
      h("section", { class: "ve-entities" }, this.entities)
    ];
  }
};
Entities.style = veEntitiesCss;

export { Entities as ve_entities };
