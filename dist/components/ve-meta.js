import { proxyCustomElement, HTMLElement } from '@stencil/core/internal/client';

const Meta = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  addMetaTag(name, content) {
    let metaEl = document.createElement('meta');
    metaEl.setAttribute('name', name);
    metaEl.setAttribute('content', content);
    document.head.appendChild(metaEl);
  }
  addTitle(title) {
    let titleEl = document.querySelector(`title`);
    if (titleEl) {
      titleEl.title = title;
    }
    else {
      titleEl = document.createElement('title');
      titleEl.title = title;
      document.head.appendChild(titleEl);
    }
  }
  connectedCallback() {
    if (this.title)
      this.addTitle(this.title);
    if (this.description)
      this.addMetaTag('description', this.description);
  }
  render() { return null; }
}, [0, "ve-meta", {
    "title": [1],
    "description": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ve-meta"];
  components.forEach(tagName => { switch (tagName) {
    case "ve-meta":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Meta);
      }
      break;
  } });
}

const VeMeta = Meta;
const defineCustomElement = defineCustomElement$1;

export { VeMeta, defineCustomElement };
