import { Component, Element, Prop, State, h } from '@stencil/core';
import { getManifest, label, thumbnail } from '../../utils';
import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';
setBasePath('https://visual-essays.github.io/web-components/www');
export class Card {
  async connectedCallback() {
    this.description = this.el.innerHTML.trim();
    this._manifest = await getManifest(this.manifest);
  }
  render() {
    return [
      h("sl-card", { class: "card-overview" },
        h("img", { slot: "image", src: thumbnail(this._manifest), alt: label(this._manifest) }),
        h("div", { class: "label", innerHTML: this.label }),
        h("sl-icon", { name: "envelope" }),
        this.description && h("div", { class: "description", innerHTML: this.description }))
    ];
  }
  static get is() { return "ve-card"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["ve-card.css"]
  }; }
  static get styleUrls() { return {
    "$": ["ve-card.css"]
  }; }
  static get properties() { return {
    "entities": {
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
      "attribute": "entities",
      "reflect": false
    },
    "manifest": {
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
      "attribute": "manifest",
      "reflect": false
    },
    "label": {
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
      "attribute": "label",
      "reflect": false
    }
  }; }
  static get states() { return {
    "_manifest": {},
    "description": {}
  }; }
  static get elementRef() { return "el"; }
}
