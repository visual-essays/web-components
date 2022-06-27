import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { a as setBasePath } from './chunk.GP3HCHHG.js';
import './chunk.COG46KYT.js';
import './chunk.H262HIXG.js';
import { d as defineCustomElement$2 } from './ve-contact2.js';

const veFooterCss = "*{box-sizing:border-box}:host{font-family:Roboto, sans-serif;z-index:100}.container{clear:both;display:flex;padding:3px 12px;align-items:center;gap:12px;width:100%;background-color:inherit;}.container a{text-decoration:none}.logo{height:20px}.contact{display:flex;align-items:center;gap:6px;cursor:pointer}.push{margin-left:auto}.contact-dialog::part(body){display:flex;flex-direction:column;padding:24px;gap:16px}";

setBasePath(location.port === '3333' ? '' : '/web-components/');
const Footer = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentWillLoad() {
    if (this.sticky) {
      this.el.style.position = 'fixed';
      this.el.style.bottom = '0';
      // this.el.style.left = '0'
      this.el.style.width = `${this.el.parentElement.clientWidth}px`;
    }
  }
  showContactForm() {
    let contactDialog = this.el.querySelector('ve-contact');
    contactDialog.show = !contactDialog.show;
  }
  render() {
    return [
      h("section", { class: "container" }, h("a", { href: "https://visual-essays.net", target: "_blank" }, h("img", { class: "logo", src: "https://visual-essays.github.io/content/static/images/favicon.svg", alt: "Logo" })), h("a", { href: "https://visual-essays.net", target: "_blank" }, "visual-essays.net"), h("div", { class: "contact push", onClick: this.showContactForm.bind(this) }, h("sl-tooltip", { content: "Contact us" }, h("sl-icon", { name: "envelope", label: "Contact us" })))),
      h("ve-contact", { contact: this.contact })
    ];
  }
  get el() { return this; }
  static get style() { return veFooterCss; }
}, [0, "ve-footer", {
    "sticky": [4],
    "contact": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ve-footer", "ve-contact"];
  components.forEach(tagName => { switch (tagName) {
    case "ve-footer":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Footer);
      }
      break;
    case "ve-contact":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const VeFooter = Footer;
const defineCustomElement = defineCustomElement$1;

export { VeFooter, defineCustomElement };
