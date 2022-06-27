import { Component, Element, Prop, h } from '@stencil/core';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';
setBasePath(location.port === '3333' ? '' : '/web-components/');
export class Footer {
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
      h("section", { class: "container" },
        h("a", { href: "https://visual-essays.net", target: "_blank" },
          h("img", { class: "logo", src: "https://visual-essays.github.io/content/static/images/favicon.svg", alt: "Logo" })),
        h("a", { href: "https://visual-essays.net", target: "_blank" }, "visual-essays.net"),
        h("div", { class: "contact push", onClick: this.showContactForm.bind(this) },
          h("sl-tooltip", { content: "Contact us" },
            h("sl-icon", { name: "envelope", label: "Contact us" })))),
      h("ve-contact", { contact: this.contact })
    ];
  }
  static get is() { return "ve-footer"; }
  static get originalStyleUrls() { return {
    "$": ["ve-footer.css"]
  }; }
  static get styleUrls() { return {
    "$": ["ve-footer.css"]
  }; }
  static get properties() { return {
    "sticky": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "sticky",
      "reflect": false
    },
    "contact": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "contact",
      "reflect": false
    }
  }; }
  static get elementRef() { return "el"; }
}
