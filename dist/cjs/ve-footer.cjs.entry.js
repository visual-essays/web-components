'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5f005592.js');

const veFooterCss = "*{box-sizing:border-box}:host{font-family:Roboto, sans-serif;z-index:100}.container{clear:both;display:flex;padding:3px 12px;align-items:center;gap:12px;width:100%;background-color:inherit;}.container a{text-decoration:none}.logo{height:20px}.contact{display:flex;align-items:center;gap:6px;cursor:pointer}.push{margin-left:auto}.contact-dialog::part(body){display:flex;flex-direction:column;padding:24px;gap:16px}";

const Footer = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
      index.h("section", { class: "container" }, index.h("a", { href: "https://visual-essays.net", target: "_blank" }, index.h("img", { class: "logo", src: "https://visual-essays.github.io/content/static/images/favicon.svg", alt: "Logo" })), index.h("a", { href: "https://visual-essays.net", target: "_blank" }, "visual-essays.net"), index.h("div", { class: "contact push", onClick: this.showContactForm.bind(this) }, index.h("sl-tooltip", { content: "Contact us" }, index.h("sl-icon", { name: "envelope", label: "Contact us" })))),
      index.h("ve-contact", { contact: this.contact })
    ];
  }
  get el() { return index.getElement(this); }
};
Footer.style = veFooterCss;

exports.ve_footer = Footer;
