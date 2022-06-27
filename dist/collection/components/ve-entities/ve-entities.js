import { Component, Prop, h } from '@stencil/core';
export class Entities {
  render() {
    return [
      h("section", { class: "ve-entities" }, this.entities)
    ];
  }
  static get is() { return "ve-entities"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["ve-entities.css"]
  }; }
  static get styleUrls() { return {
    "$": ["ve-entities.css"]
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
    }
  }; }
}
