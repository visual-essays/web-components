import { proxyCustomElement, HTMLElement } from '@stencil/core/internal/client';

const Style = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  removeLinkTag(href) {
    let link = document.querySelector(`link[href$="${href}"]`);
    if (link)
      link.parentElement.removeChild(link);
  }
  connectedCallback() {
    // let server = location.hostname === 'localhost' ? 'http://localhost:8080' : 'https://visual-essays.net'
    let server = 'https://visual-essays.net';
    // console.log(`layout=${this.layout} theme=${this.theme}`)
    if (this.layout) {
      this.removeLinkTag('/static/css/default-layout.css');
      let link = document.createElement('link');
      link.href = this.layout.indexOf('http') === 0 ? this.layout : `${server}${this.layout}`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    if (this.theme) {
      this.removeLinkTag('/static/css/default-theme.css');
      let link = document.createElement('link');
      link.href = this.theme.indexOf('http') === 0 ? this.theme : `${server}${this.theme}`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  }
  render() { return null; }
}, [0, "ve-style", {
    "layout": [1],
    "theme": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ve-style"];
  components.forEach(tagName => { switch (tagName) {
    case "ve-style":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Style);
      }
      break;
  } });
}

const VeStyle = Style;
const defineCustomElement = defineCustomElement$1;

export { VeStyle, defineCustomElement };
