import { r as registerInstance, h, g as getElement } from './index-e29ebc89.js';
import './icon-9d4c8e57.js';
import './tooltip-210a958e.js';
import './base-path-b3229270.js';
import { a as setBasePath } from './chunk.GP3HCHHG-12935597.js';
import './chunk.6WMYSCDC-38d8f355.js';

const veFooterCss = "*{box-sizing:border-box}:host{font-family:Roboto, sans-serif;z-index:100}.container{clear:both;display:flex;padding:3px 12px;align-items:center;gap:12px;width:100%;background-color:inherit;}.container a{text-decoration:none}.logo{height:20px}.contact{display:flex;align-items:center;gap:6px;cursor:pointer}.push{margin-left:auto}.contact-dialog::part(body){display:flex;flex-direction:column;padding:24px;gap:16px}";

setBasePath(location.port === '3333' ? '' : 'https://visual-essays.github.io/web-components/src');
const Footer = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  get el() { return getElement(this); }
};
Footer.style = veFooterCss;

export { Footer as ve_footer };
