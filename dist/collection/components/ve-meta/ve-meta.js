import { Component, Prop } from '@stencil/core';
export class Meta {
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
  static get is() { return "ve-meta"; }
  static get properties() { return {
    "title": {
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
      "attribute": "title",
      "reflect": false
    },
    "description": {
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
      "attribute": "description",
      "reflect": false
    }
  }; }
}
