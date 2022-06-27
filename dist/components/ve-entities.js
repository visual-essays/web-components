import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';

const veEntitiesCss = ":host{font-family:Roboto, sans-serif}";

const Entities = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
  }
  render() {
    return [
      h("section", { class: "ve-entities" }, this.entities)
    ];
  }
  static get style() { return veEntitiesCss; }
}, [1, "ve-entities", {
    "entities": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ve-entities"];
  components.forEach(tagName => { switch (tagName) {
    case "ve-entities":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Entities);
      }
      break;
  } });
}

const VeEntities = Entities;
const defineCustomElement = defineCustomElement$1;

export { VeEntities, defineCustomElement };
