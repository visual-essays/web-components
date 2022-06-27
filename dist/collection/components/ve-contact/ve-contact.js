import { Component, Element, Prop, State, Watch, h } from '@stencil/core';
const emailAddressRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export class Header {
  constructor() {
    this.show = false;
  }
  showChanged() {
    console.log(`show=${this.show}`);
    if (this.show)
      this.showContactForm();
    else
      this.hideContactForm();
  }
  componentDidLoad() {
    this.contactDialog = this.el.shadowRoot.querySelector('.contact-dialog');
    this.from = this.el.shadowRoot.getElementById('from');
    this.message = this.el.shadowRoot.getElementById('message');
    this.emailAlert = this.el.shadowRoot.getElementById('bad-email-alert');
    this.noMessageAlert = this.el.shadowRoot.getElementById('no-message-alert');
    this.contactDialog.addEventListener('sl-hide', () => this.show = false);
    if (this.show)
      this.showContactForm();
  }
  hideContactForm() {
    this.contactDialog.hide();
    this.from.value = '';
    this.message.value = '';
    this.emailAlert.hide();
    this.noMessageAlert.hide();
  }
  showContactForm() {
    console.log('showContactForm');
    this.contactDialog.show();
  }
  async sendmail() {
    let emailIsValid = emailAddressRegex.test(this.from.value);
    if (emailIsValid)
      this.emailAlert.hide();
    else
      this.emailAlert.show();
    let messageIsValid = this.message.value.trim().length > 0;
    if (messageIsValid)
      this.noMessageAlert.hide();
    else
      this.noMessageAlert.show();
    if (emailIsValid && messageIsValid) {
      let body = {
        to: this.contact,
        from: this.from.value,
        subject: 'Contact Us',
        message: this.message.value
      };
      this.hideContactForm();
      let resp = await fetch('https://api.visual-essays.net/sendmail/', {
        method: 'POST', body: JSON.stringify(body)
      });
      if (resp.ok)
        console.log(await resp.json());
    }
  }
  render() {
    return [
      h("sl-dialog", { label: "Contact Us", class: "contact-dialog" },
        h("sl-input", { id: "from", autofocus: true, type: "email", label: "Email address" }),
        h("sl-alert", { id: "bad-email-alert", variant: "danger" },
          h("sl-icon", { slot: "icon", name: "exclamation-octagon" }),
          h("strong", null, "Invalid email address"),
          h("br", null),
          "Please fix and resubmit"),
        h("sl-textarea", { id: "message", label: "Message" }),
        h("sl-alert", { id: "no-message-alert", variant: "danger" },
          h("sl-icon", { slot: "icon", name: "exclamation-octagon" }),
          h("strong", null, "No message entered"),
          h("br", null)),
        h("sl-button", { id: "cancel", slot: "footer", onClick: this.hideContactForm.bind(this) }, "Cancel"),
        h("sl-button", { slot: "footer", variant: "primary", onClick: this.sendmail.bind(this) }, "Submit"))
    ];
  }
  static get is() { return "ve-contact"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["ve-contact.css"]
  }; }
  static get styleUrls() { return {
    "$": ["ve-contact.css"]
  }; }
  static get properties() { return {
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
    },
    "show": {
      "type": "boolean",
      "mutable": true,
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
      "attribute": "show",
      "reflect": true,
      "defaultValue": "false"
    }
  }; }
  static get states() { return {
    "contactDialog": {},
    "from": {},
    "emailAlert": {},
    "message": {},
    "noMessageAlert": {}
  }; }
  static get elementRef() { return "el"; }
  static get watchers() { return [{
      "propName": "show",
      "methodName": "showChanged"
    }]; }
}
